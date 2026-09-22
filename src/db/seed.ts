/**
 * Seed script (`npm run db:seed`) — idempotent by design: every entity is
 * upserted by its natural unique key (slug/word), so running this twice in a
 * row updates existing rows in place instead of duplicating them, and ids
 * stay stable across reseeds (so real Server Actions or DB rows created
 * later by users that reference these ids — `user_vocabularies`,
 * `user_progress`, `quiz_attempts` — aren't invalidated by a reseed).
 *
 * Known limitation: if a later edit to a seed-data file *removes* a
 * question/answer that a previous run inserted, the now-stale row is left
 * behind rather than deleted (upsert-by-key doesn't know what to prune).
 * Not a concern for Phase 1's fixed catalog content; worth a proper
 * "sync, not just upsert" pass if seed data churns a lot later.
 *
 * All content here is real (CLAUDE.md "No fake content"): real IPA, real
 * Vietnamese meanings, real example sentences, real (if short) dialogues.
 */
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { and, eq, notInArray } from "drizzle-orm";
import {
  contentSources,
  courses,
  grammarExamples,
  grammarLessons,
  grammarMistakes,
  grammarRules,
  grammarTopicRelations,
  grammarTopics,
  lessons,
  lessonVocabularies,
  listeningLessons,
  placementTestQuestions,
  placementTests,
  quizAnswers,
  quizQuestions,
  quizzes,
  vocabularies,
} from "@/db/schema";
import { lessonContentSchema, type LessonBlock } from "@/db/schema/lesson-content";
import { coursesSeed } from "@/db/seed-data/courses";
import {
  ENGLISHFLOW_ORIGINAL_SOURCE,
  grammarContentSourcesSeed,
  grammarExampleHash,
  grammarTopicRelationsSeed,
  grammarTopicsSeed,
} from "@/db/seed-data/grammar";
import { listeningLessonsSeed } from "@/db/seed-data/listening";
import { placementTestQuestionsSeed, placementTestSeed } from "@/db/seed-data/placement-test";
import { coursePracticeQuizzes, grammarCourseOnlyQuizzes, type QuizSeed } from "@/db/seed-data/quizzes";
import { vocabularySeed } from "@/db/seed-data/vocabulary";
import {
  TOEIC_CATALOG_SOURCE,
  TOEIC_DICT_ATTRIBUTION,
  TOEIC_TSL_ATTRIBUTION,
} from "@/db/seed-data/toeic-vocabulary";
import { toeicVocabularySeed } from "@/db/seed-data/toeic-vocabulary-seed";

/** `INSERT ... RETURNING` always returns a row here (we just upserted it) — this just satisfies strict TS. */
function firstOrThrow<T>(rows: T[], context: string): T {
  const row = rows[0];
  if (!row) throw new Error(`Expected at least one row after upsert: ${context}`);
  return row;
}

/** Upserts one quiz + its questions + its answers, returning the quiz's (stable) id. */
async function seedQuiz(quiz: QuizSeed): Promise<string> {
  const quizRows = await db
    .insert(quizzes)
    .values({
      slug: quiz.slug,
      title: quiz.title,
      description: quiz.description,
      revealMode: quiz.revealMode ?? "after_submit",
      passScore: quiz.passScore ?? 70,
      timeLimitSeconds: quiz.timeLimitSeconds ?? null,
    })
    .onConflictDoUpdate({
      target: quizzes.slug,
      set: {
        title: sql`excluded.title`,
        description: sql`excluded.description`,
        revealMode: sql`excluded.reveal_mode`,
        passScore: sql`excluded.pass_score`,
        timeLimitSeconds: sql`excluded.time_limit_seconds`,
        updatedAt: new Date(),
      },
    })
    .returning({ id: quizzes.id });
  const quizId = firstOrThrow(quizRows, `quiz "${quiz.slug}"`).id;

  for (const [index, question] of quiz.questions.entries()) {
    const questionRows = await db
      .insert(quizQuestions) 
      .values({
        quizId,
        orderIndex: index,
        type: question.type,
        prompt: question.prompt,
        explanation: question.explanation,
        points: question.points ?? 1,
      })
      .onConflictDoUpdate({
        target: [quizQuestions.quizId, quizQuestions.orderIndex],
        set: {
          type: sql`excluded.type`,
          prompt: sql`excluded.prompt`,
          explanation: sql`excluded.explanation`,
          points: sql`excluded.points`,
          updatedAt: new Date(),
        },
      })
      .returning({ id: quizQuestions.id });
    const questionId = firstOrThrow(questionRows, `quiz "${quiz.slug}" question #${index}`).id;

    for (const [answerIndex, answer] of question.answers.entries()) {
      await db
        .insert(quizAnswers)
        .values({
          questionId,
          orderIndex: answerIndex,
          content: answer.content,
          isCorrect: answer.isCorrect,
        })
        .onConflictDoUpdate({
          target: [quizAnswers.questionId, quizAnswers.orderIndex],
          set: {
            content: sql`excluded.content`,
            isCorrect: sql`excluded.is_correct`,
            updatedAt: new Date(),
          },
        });
    }
  }

  return quizId;
}

async function seedVocabulary(): Promise<Map<string, string>> {
  const rows = await db
    .insert(vocabularies)
    .values(
      vocabularySeed.map((row) => ({
        ...row,
        isManual: false as const,
        createdByUserId: null,
      })),
    )
    .onConflictDoUpdate({
      target: vocabularies.word,
      targetWhere: sql`${vocabularies.isManual} = false`,
      set: {
        pronunciation: sql`excluded.pronunciation`,
        phonetic: sql`excluded.phonetic`,
        partOfSpeech: sql`excluded.part_of_speech`,
        meaning: sql`excluded.meaning`,
        exampleSentence: sql`excluded.example_sentence`,
        difficulty: sql`excluded.difficulty`,
        isManual: false,
        createdByUserId: null,
        updatedAt: new Date(),
        // `audioUrl` is intentionally NOT overwritten here — if a real mp3
        // is added under `public/audio/vocab/` and the DB updated by hand
        // later, reseeding must not wipe it back to null.
        // `catalogSource` is left alone so TOEIC tags from a later seed
        // pass are not cleared when general vocab reseeds.
      },
    })
    .returning({ id: vocabularies.id, word: vocabularies.word });

  const wordToId = new Map(rows.map((row) => [row.word, row.id]));

  await seedToeicVocabulary(wordToId);
  return wordToId;
}

/** Upserts the curated TOEIC catalog subset and records provenance (when seeded). */
async function seedToeicVocabulary(wordToId: Map<string, string>): Promise<void> {
  if (toeicVocabularySeed.length === 0) {
    return;
  }

  for (const source of [TOEIC_TSL_ATTRIBUTION, TOEIC_DICT_ATTRIBUTION]) {
    const [existingSource] = await db
      .select({ id: contentSources.id })
      .from(contentSources)
      .where(eq(contentSources.name, source.name))
      .limit(1);

    if (existingSource) {
      await db
        .update(contentSources)
        .set({
          url: source.url,
          licenseCode: source.licenseCode,
          attributionText: source.attributionText,
          sourceVersion: source.sourceVersion,
          updatedAt: new Date(),
        })
        .where(eq(contentSources.id, existingSource.id));
    } else {
      await db.insert(contentSources).values({
        name: source.name,
        url: source.url,
        licenseCode: source.licenseCode,
        attributionText: source.attributionText,
        sourceVersion: source.sourceVersion,
      });
    }
  }

  const existingCatalogWords = new Set(wordToId.keys());
  const toeicRows = toeicVocabularySeed.filter(
    (row) => !existingCatalogWords.has(row.word),
  );

  if (toeicRows.length === 0) {
    return;
  }

  const inserted = await db
    .insert(vocabularies)
    .values(
      toeicRows.map((row) => ({
        ...row,
        catalogSource: TOEIC_CATALOG_SOURCE,
        isManual: false as const,
        createdByUserId: null,
      })),
    )
    .onConflictDoUpdate({
      target: vocabularies.word,
      targetWhere: sql`${vocabularies.isManual} = false`,
      set: {
        pronunciation: sql`excluded.pronunciation`,
        phonetic: sql`excluded.phonetic`,
        partOfSpeech: sql`excluded.part_of_speech`,
        meaning: sql`excluded.meaning`,
        exampleSentence: sql`excluded.example_sentence`,
        difficulty: sql`excluded.difficulty`,
        catalogSource: TOEIC_CATALOG_SOURCE,
        topic: sql`excluded.topic`,
        isManual: false,
        createdByUserId: null,
        updatedAt: new Date(),
      },
    })
    .returning({ id: vocabularies.id, word: vocabularies.word });

  for (const row of inserted) {
    wordToId.set(row.word, row.id);
  }
}

/**
 * Upserts normalized grammar catalog (topics, lessons, rules, examples,
 * mistakes, relations) + shared mini quizzes. Returns quiz slug → id so
 * course lessons can reuse the same quizzes as exercises.
 */
async function seedGrammarTopics(): Promise<Map<string, string>> {
  const quizSlugToId = new Map<string, string>();
  const topicSlugToId = new Map<string, string>();
  const ruleKeyToId = new Map<string, string>();
  const sourceKeyToId = new Map<string, string>();

  for (const source of grammarContentSourcesSeed) {
    const [existingSource] = await db
      .select({ id: contentSources.id })
      .from(contentSources)
      .where(eq(contentSources.name, source.name))
      .limit(1);

    let sourceId = existingSource?.id;
    if (sourceId) {
      await db
        .update(contentSources)
        .set({
          url: source.url,
          licenseCode: source.licenseCode,
          attributionText: source.attributionText,
          sourceVersion: source.sourceVersion,
          updatedAt: new Date(),
        })
        .where(eq(contentSources.id, sourceId));
    } else {
      const inserted = await db
        .insert(contentSources)
        .values({
          name: source.name,
          url: source.url,
          licenseCode: source.licenseCode,
          attributionText: source.attributionText,
          sourceVersion: source.sourceVersion,
        })
        .returning({ id: contentSources.id });
      sourceId = firstOrThrow(inserted, `content source "${source.name}"`).id;
    }
    sourceKeyToId.set(source.key, sourceId);
  }

  const defaultSourceId = sourceKeyToId.get(ENGLISHFLOW_ORIGINAL_SOURCE.key);
  if (!defaultSourceId) {
    throw new Error("Missing EnglishFlow original content source id");
  }

  for (const topic of grammarTopicsSeed) {
    const quizId = await seedQuiz(topic.quiz);
    quizSlugToId.set(topic.quiz.slug, quizId);

    const topicRows = await db
      .insert(grammarTopics)
      .values({
        slug: topic.slug,
        titleEn: topic.titleEn,
        titleVi: topic.titleVi,
        level: topic.level,
        category: topic.category,
        orderIndex: topic.orderIndex,
        summaryVi: topic.summaryVi,
        status: "published",
        quizId,
        deletedAt: null,
      })
      .onConflictDoUpdate({
        target: grammarTopics.slug,
        set: {
          titleEn: sql`excluded.title_en`,
          titleVi: sql`excluded.title_vi`,
          level: sql`excluded.level`,
          category: sql`excluded.category`,
          orderIndex: sql`excluded.order_index`,
          summaryVi: sql`excluded.summary_vi`,
          status: sql`excluded.status`,
          quizId: sql`excluded.quiz_id`,
          deletedAt: null,
          updatedAt: new Date(),
        },
      })
      .returning({ id: grammarTopics.id });

    const topicId = firstOrThrow(topicRows, `grammar topic "${topic.slug}"`).id;
    topicSlugToId.set(topic.slug, topicId);

    await db
      .insert(grammarLessons)
      .values({
        topicId,
        version: 1,
        body: topic.lesson,
        status: "published",
        publishedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [grammarLessons.topicId, grammarLessons.version],
        set: {
          body: sql`excluded.body`,
          status: sql`excluded.status`,
          publishedAt: sql`excluded.published_at`,
          updatedAt: new Date(),
        },
      });

    for (const rule of topic.rules) {
      const [existingRule] = await db
        .select({ id: grammarRules.id })
        .from(grammarRules)
        .where(
          and(eq(grammarRules.topicId, topicId), eq(grammarRules.orderIndex, rule.orderIndex)),
        )
        .limit(1);

      let ruleId = existingRule?.id;
      if (ruleId) {
        await db
          .update(grammarRules)
          .set({
            titleEn: rule.titleEn,
            titleVi: rule.titleVi,
            pattern: rule.pattern,
            explanationVi: rule.explanationVi,
            updatedAt: new Date(),
          })
          .where(eq(grammarRules.id, ruleId));
      } else {
        const inserted = await db
          .insert(grammarRules)
          .values({
            topicId,
            titleEn: rule.titleEn,
            titleVi: rule.titleVi,
            pattern: rule.pattern,
            explanationVi: rule.explanationVi,
            orderIndex: rule.orderIndex,
          })
          .returning({ id: grammarRules.id });
        ruleId = firstOrThrow(inserted, `grammar rule "${topic.slug}/${rule.key}"`).id;
      }
      ruleKeyToId.set(`${topic.slug}:${rule.key}`, ruleId);
    }

    for (const example of topic.examples) {
      const hash = grammarExampleHash(example.sentenceEn);
      const ruleId = example.ruleKey
        ? ruleKeyToId.get(`${topic.slug}:${example.ruleKey}`) ?? null
        : null;
      const exampleSourceId =
        sourceKeyToId.get(example.sourceKey ?? ENGLISHFLOW_ORIGINAL_SOURCE.key) ??
        defaultSourceId;

      const [existingExample] = await db
        .select({ id: grammarExamples.id })
        .from(grammarExamples)
        .where(
          and(eq(grammarExamples.topicId, topicId), eq(grammarExamples.normalizedHash, hash)),
        )
        .limit(1);

      if (existingExample) {
        await db
          .update(grammarExamples)
          .set({
            ruleId,
            sentenceEn: example.sentenceEn,
            sentenceVi: example.sentenceVi,
            highlights: example.highlights,
            level: example.level,
            difficulty: example.difficulty,
            sourceId: exampleSourceId,
            sourceRecordId: example.sourceRecordId ?? null,
            updatedAt: new Date(),
          })
          .where(eq(grammarExamples.id, existingExample.id));
      } else {
        await db.insert(grammarExamples).values({
          topicId,
          ruleId,
          sentenceEn: example.sentenceEn,
          sentenceVi: example.sentenceVi,
          highlights: example.highlights,
          level: example.level,
          difficulty: example.difficulty,
          sourceId: exampleSourceId,
          sourceRecordId: example.sourceRecordId ?? null,
          normalizedHash: hash,
        });
      }
    }

    for (const mistake of topic.mistakes) {
      const [existingMistake] = await db
        .select({ id: grammarMistakes.id })
        .from(grammarMistakes)
        .where(
          and(
            eq(grammarMistakes.topicId, topicId),
            eq(grammarMistakes.incorrectSentence, mistake.incorrectSentence),
          ),
        )
        .limit(1);

      if (existingMistake) {
        await db
          .update(grammarMistakes)
          .set({
            correctSentence: mistake.correctSentence,
            errorType: mistake.errorType,
            explanationVi: mistake.explanationVi,
            severity: mistake.severity,
            level: mistake.level,
            updatedAt: new Date(),
          })
          .where(eq(grammarMistakes.id, existingMistake.id));
      } else {
        await db.insert(grammarMistakes).values({
          topicId,
          incorrectSentence: mistake.incorrectSentence,
          correctSentence: mistake.correctSentence,
          errorType: mistake.errorType,
          explanationVi: mistake.explanationVi,
          severity: mistake.severity,
          level: mistake.level,
        });
      }
    }
  }

  for (const relation of grammarTopicRelationsSeed) {
    const fromTopicId = topicSlugToId.get(relation.fromSlug);
    const toTopicId = topicSlugToId.get(relation.toSlug);
    if (!fromTopicId || !toTopicId) {
      throw new Error(
        `Missing topic for relation ${relation.fromSlug} → ${relation.toSlug}`,
      );
    }

    const [existingRelation] = await db
      .select({ id: grammarTopicRelations.id })
      .from(grammarTopicRelations)
      .where(
        and(
          eq(grammarTopicRelations.fromTopicId, fromTopicId),
          eq(grammarTopicRelations.toTopicId, toTopicId),
          eq(grammarTopicRelations.relationType, relation.relationType),
        ),
      )
      .limit(1);

    if (!existingRelation) {
      await db.insert(grammarTopicRelations).values({
        fromTopicId,
        toTopicId,
        relationType: relation.relationType,
      });
    }
  }

  // Drop catalog rows no longer in seed (cascade children).
  const keepSlugs = grammarTopicsSeed.map((topic) => topic.slug);
  await db.delete(grammarTopics).where(notInArray(grammarTopics.slug, keepSlugs));

  return quizSlugToId;
}

/** Upserts every course (lessons come later, once vocab/quiz/listening ids all exist). Returns the course slug → id map. */
async function seedCourses(): Promise<Map<string, string>> {
  const slugToId = new Map<string, string>();

  for (const course of coursesSeed) {
    const estimatedMinutes = course.lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0);

    const rows = await db
      .insert(courses)
      .values({
        slug: course.slug,
        title: course.title,
        description: course.description,
        level: course.level,
        category: course.category,
        lessonCount: course.lessons.length,
        estimatedMinutes,
        coverColor: course.coverColor,
        sortOrder: course.sortOrder,
      })
      .onConflictDoUpdate({
        target: courses.slug,
        set: {
          title: sql`excluded.title`,
          description: sql`excluded.description`,
          level: sql`excluded.level`,
          category: sql`excluded.category`,
          lessonCount: sql`excluded.lesson_count`,
          estimatedMinutes: sql`excluded.estimated_minutes`,
          coverColor: sql`excluded.cover_color`,
          sortOrder: sql`excluded.sort_order`,
          updatedAt: new Date(),
        },
      })
      .returning({ id: courses.id });

    slugToId.set(course.slug, firstOrThrow(rows, `course "${course.slug}"`).id);
  }

  return slugToId;
}

/** Upserts every listening lesson + its comprehension quiz. Returns both id maps needed by lessons. */
async function seedListeningLessons(
  courseSlugToId: Map<string, string>,
): Promise<{ listeningSlugToId: Map<string, string>; quizSlugToId: Map<string, string> }> {
  const listeningSlugToId = new Map<string, string>();
  const quizSlugToId = new Map<string, string>();

  for (const lesson of listeningLessonsSeed) {
    const quizId = await seedQuiz(lesson.quiz);
    quizSlugToId.set(lesson.quiz.slug, quizId);
    const courseId = lesson.courseSlug ? (courseSlugToId.get(lesson.courseSlug) ?? null) : null;

    const rows = await db
      .insert(listeningLessons)
      .values({
        slug: lesson.slug,
        title: lesson.title,
        difficulty: lesson.difficulty,
        durationSeconds: lesson.durationSeconds,
        audioUrl: lesson.audioUrl,
        transcript: lesson.transcript,
        quizId,
        courseId,
      })
      .onConflictDoUpdate({
        target: listeningLessons.slug,
        set: {
          title: sql`excluded.title`,
          difficulty: sql`excluded.difficulty`,
          durationSeconds: sql`excluded.duration_seconds`,
          audioUrl: sql`excluded.audio_url`,
          transcript: sql`excluded.transcript`,
          quizId: sql`excluded.quiz_id`,
          courseId: sql`excluded.course_id`,
          updatedAt: new Date(),
        },
      })
      .returning({ id: listeningLessons.id });

    listeningSlugToId.set(lesson.slug, firstOrThrow(rows, `listening lesson "${lesson.slug}"`).id);
  }

  return { listeningSlugToId, quizSlugToId };
}

/** Builds each lesson's AD-03 content blocks, validates them, and upserts the lesson + its `lesson_vocabularies` links. */
async function seedLessons(
  courseSlugToId: Map<string, string>,
  wordToVocabId: Map<string, string>,
  quizSlugToId: Map<string, string>,
  listeningSlugToId: Map<string, string>,
): Promise<number> {
  let lessonCount = 0;

  for (const course of coursesSeed) {
    const courseId = courseSlugToId.get(course.slug)!;

    for (const [orderIndex, lesson] of course.lessons.entries()) {
      const blocks: LessonBlock[] = [
        { type: "objective", text: lesson.objective },
        { type: "explanation", markdown: lesson.explanationMarkdown },
      ];

      if (lesson.vocabularyWords?.length) {
        const vocabularyIds = lesson.vocabularyWords.map((word) => {
          const vocabId = wordToVocabId.get(word);
          if (!vocabId) throw new Error(`Lesson "${lesson.slug}" references unknown vocabulary word "${word}"`);
          return vocabId;
        });
        blocks.push({ type: "vocabulary", vocabularyIds });
      }

      blocks.push({ type: "examples", items: lesson.examples });

      if (lesson.audioListeningSlug) {
        const listeningLessonId = listeningSlugToId.get(lesson.audioListeningSlug);
        if (!listeningLessonId) {
          throw new Error(`Lesson "${lesson.slug}" references unknown listening lesson "${lesson.audioListeningSlug}"`);
        }
        blocks.push({ type: "audio", listeningLessonId });
      }

      if (lesson.exerciseQuizSlug) {
        const quizId = quizSlugToId.get(lesson.exerciseQuizSlug);
        if (!quizId) throw new Error(`Lesson "${lesson.slug}" references unknown quiz "${lesson.exerciseQuizSlug}"`);
        blocks.push({ type: "exercise", quizId });
      }

      const content = lessonContentSchema.parse(blocks);

      const lessonRows = await db
        .insert(lessons)
        .values({
          courseId,
          orderIndex,
          slug: lesson.slug,
          title: lesson.title,
          skill: lesson.skill,
          estimatedMinutes: lesson.estimatedMinutes,
          content,
        })
        .onConflictDoUpdate({
          target: lessons.slug,
          set: {
            courseId: sql`excluded.course_id`,
            orderIndex: sql`excluded.order_index`,
            title: sql`excluded.title`,
            skill: sql`excluded.skill`,
            estimatedMinutes: sql`excluded.estimated_minutes`,
            content: sql`excluded.content`,
            updatedAt: new Date(),
          },
        })
        .returning({ id: lessons.id });
      const lessonId = firstOrThrow(lessonRows, `lesson "${lesson.slug}"`).id;

      if (lesson.vocabularyWords?.length) {
        for (const [wordIndex, word] of lesson.vocabularyWords.entries()) {
          await db
            .insert(lessonVocabularies)
            .values({
              lessonId,
              vocabularyId: wordToVocabId.get(word)!,
              orderIndex: wordIndex,
            })
            .onConflictDoUpdate({
              target: [lessonVocabularies.lessonId, lessonVocabularies.vocabularyId],
              set: { orderIndex: sql`excluded.order_index`, updatedAt: new Date() },
            });
        }
      }

      lessonCount += 1;
    }
  }

  return lessonCount;
}

async function seedPlacementTest(): Promise<number> {
  const testRows = await db
    .insert(placementTests)
    .values(placementTestSeed)
    .onConflictDoUpdate({
      target: placementTests.slug,
      set: {
        title: sql`excluded.title`,
        description: sql`excluded.description`,
        updatedAt: new Date(),
      },
    })
    .returning({ id: placementTests.id });
  const placementTestId = firstOrThrow(testRows, `placement test "${placementTestSeed.slug}"`).id;

  for (const [index, question] of placementTestQuestionsSeed.entries()) {
    await db
      .insert(placementTestQuestions)
      .values({
        placementTestId,
        orderIndex: index,
        level: question.level,
        type: question.type,
        prompt: question.prompt,
        options: question.options,
        explanation: question.explanation,
        points: question.points ?? 1,
      })
      .onConflictDoUpdate({
        target: [placementTestQuestions.placementTestId, placementTestQuestions.orderIndex],
        set: {
          level: sql`excluded.level`,
          type: sql`excluded.type`,
          prompt: sql`excluded.prompt`,
          options: sql`excluded.options`,
          explanation: sql`excluded.explanation`,
          points: sql`excluded.points`,
          updatedAt: new Date(),
        },
      });
  }

  return placementTestQuestionsSeed.length;
}

/** Sanity check: fail loudly if anything that smells like filler content slipped in (CLAUDE.md "No fake content"). */
async function assertNoPlaceholderContent() {
  const needles = ["lorem ipsum", "dolor sit amet", "placeholder", "todo:"];
  for (const needle of needles) {
    const rows = await db
      .select({ word: vocabularies.word })
      .from(vocabularies)
      .where(sql`lower(${vocabularies.word}) like ${`%${needle}%`} or lower(${vocabularies.meaning}) like ${`%${needle}%`}`)
      .limit(1);
    const hit = rows[0];
    if (hit) {
      throw new Error(`Seed data looks like placeholder content near "${hit.word}" — see CLAUDE.md "No fake content".`);
    }
  }
}

async function printSummary() {
  const tables = [
    ["courses", courses],
    ["lessons", lessons],
    ["vocabularies", vocabularies],
    ["grammar_topics", grammarTopics],
    ["grammar_rules", grammarRules],
    ["grammar_examples", grammarExamples],
    ["grammar_mistakes", grammarMistakes],
    ["listening_lessons", listeningLessons],
    ["quizzes", quizzes],
    ["placement_tests", placementTests],
    ["placement_test_questions", placementTestQuestions],
  ] as const;

  const counts = await Promise.all(
    tables.map(async ([name, table]) => {
      const rows = await db.select({ count: sql<number>`count(*)::int` }).from(table);
      return [name, firstOrThrow(rows, `count(${name})`).count] as const;
    }),
  );

  console.table(Object.fromEntries(counts));
}

async function main() {
  console.log("Seeding vocabulary (+ TOEIC catalog)...");
  const wordToVocabId = await seedVocabulary();

  const quizSlugToId = new Map<string, string>();

  console.log("Seeding course-practice quizzes...");
  for (const quiz of coursePracticeQuizzes) {
    quizSlugToId.set(quiz.slug, await seedQuiz(quiz));
  }

  console.log("Seeding grammar course-only quizzes...");
  for (const quiz of grammarCourseOnlyQuizzes) {
    quizSlugToId.set(quiz.slug, await seedQuiz(quiz));
  }

  console.log("Seeding grammar topics...");
  for (const [slug, id] of await seedGrammarTopics()) quizSlugToId.set(slug, id);

  console.log("Seeding courses...");
  const courseSlugToId = await seedCourses();

  console.log("Seeding listening lessons...");
  const { listeningSlugToId, quizSlugToId: listeningQuizIds } = await seedListeningLessons(courseSlugToId);
  for (const [slug, id] of listeningQuizIds) quizSlugToId.set(slug, id);

  console.log("Seeding lessons...");
  await seedLessons(courseSlugToId, wordToVocabId, quizSlugToId, listeningSlugToId);

  console.log("Seeding placement test...");
  await seedPlacementTest();

  console.log("Checking for placeholder content...");
  await assertNoPlaceholderContent();

  console.log("\nSeed complete:");
  await printSummary();
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
