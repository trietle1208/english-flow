import { and, asc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { courses, lessons, listeningLessons, userProgress, vocabularies } from "@/db/schema";
import { getLessonAccess } from "@/features/courses/queries";
import { getSavedVocabularyIds } from "@/features/vocabulary/queries";
import { parseLessonBlocks } from "./schemas";
import type { LessonDetail, VocabularySummary } from "./types";

/**
 * Full lesson payload for `/lessons/[lessonId]`. Content blocks are Zod-parsed
 * (unknown types dropped). Vocabulary / listening titles are loaded by id
 * from the blocks — never embedded in the JSONB (AD-03).
 *
 * Returns `null` when the lesson is missing; callers that need the unlock
 * gate should use `getLessonAccess` first (or check `kind` via that helper).
 */
export async function getLessonDetail(
  lessonId: string,
  userId: string,
): Promise<LessonDetail | null> {
  const [row] = await db
    .select({
      id: lessons.id,
      title: lessons.title,
      slug: lessons.slug,
      skill: lessons.skill,
      estimatedMinutes: lessons.estimatedMinutes,
      orderIndex: lessons.orderIndex,
      content: lessons.content,
      courseId: lessons.courseId,
      courseTitle: courses.title,
      lessonCount: courses.lessonCount,
      progressStatus: userProgress.status,
      progressPercent: userProgress.progressPercent,
    })
    .from(lessons)
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .leftJoin(
      userProgress,
      and(eq(userProgress.lessonId, lessons.id), eq(userProgress.userId, userId)),
    )
    .where(eq(lessons.id, lessonId))
    .limit(1);

  if (!row) {
    return null;
  }

  const blocks = parseLessonBlocks(row.content);

  const vocabularyIds = [
    ...new Set(
      blocks.flatMap((block) => (block.type === "vocabulary" ? block.vocabularyIds : [])),
    ),
  ];
  const listeningIds = [
    ...new Set(
      blocks.flatMap((block) => (block.type === "audio" ? [block.listeningLessonId] : [])),
    ),
  ];

  // Everything below depends only on the lesson row, so it goes out in one
  // parallel batch (incl. the learner's saved-word state for Save buttons).
  const [vocabRows, listeningRows, siblings, savedVocabularyIds] = await Promise.all([
    vocabularyIds.length > 0
      ? db
          .select({
            id: vocabularies.id,
            word: vocabularies.word,
            pronunciation: vocabularies.pronunciation,
            phonetic: vocabularies.phonetic,
            partOfSpeech: vocabularies.partOfSpeech,
            meaning: vocabularies.meaning,
            exampleSentence: vocabularies.exampleSentence,
            audioUrl: vocabularies.audioUrl,
          })
          .from(vocabularies)
          .where(inArray(vocabularies.id, vocabularyIds))
      : Promise.resolve([]),
    listeningIds.length > 0
      ? db
          .select({ id: listeningLessons.id, title: listeningLessons.title })
          .from(listeningLessons)
          .where(inArray(listeningLessons.id, listeningIds))
      : Promise.resolve([]),
    db
      .select({ id: lessons.id, orderIndex: lessons.orderIndex })
      .from(lessons)
      .where(eq(lessons.courseId, row.courseId))
      .orderBy(asc(lessons.orderIndex)),
    getSavedVocabularyIds(userId, vocabularyIds),
  ]);

  const vocabulariesById: Record<string, VocabularySummary> = {};
  for (const vocab of vocabRows) {
    vocabulariesById[vocab.id] = vocab;
  }

  const listeningTitlesById: Record<string, string> = {};
  for (const listening of listeningRows) {
    listeningTitlesById[listening.id] = listening.title;
  }

  const currentIndex = siblings.findIndex((sibling) => sibling.id === lessonId);
  const previousLessonId = currentIndex > 0 ? (siblings[currentIndex - 1]?.id ?? null) : null;
  const nextLessonId =
    currentIndex >= 0 && currentIndex < siblings.length - 1
      ? (siblings[currentIndex + 1]?.id ?? null)
      : null;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    skill: row.skill,
    estimatedMinutes: row.estimatedMinutes,
    orderIndex: row.orderIndex,
    lessonNumber: row.orderIndex + 1,
    lessonCount: row.lessonCount,
    courseId: row.courseId,
    courseTitle: row.courseTitle,
    blocks,
    vocabulariesById,
    savedVocabularyIds,
    listeningTitlesById,
    previousLessonId,
    nextLessonId,
    progressStatus: row.progressStatus ?? "not_started",
    progressPercent: row.progressPercent ?? 0,
  };
}

/** Lightweight title lookup for `generateMetadata`. */
export async function getLessonTitle(lessonId: string): Promise<string | null> {
  const [row] = await db
    .select({ title: lessons.title })
    .from(lessons)
    .where(eq(lessons.id, lessonId))
    .limit(1);

  return row?.title ?? null;
}

/**
 * Re-export so the lesson feature can document its unlock dependency without
 * callers reaching into `features/courses` for the gate alone.
 */
export { getLessonAccess };
