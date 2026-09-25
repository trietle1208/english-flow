import { and, asc, eq, isNull, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "@/db";
import {
  contentSources,
  grammarExamples,
  grammarLessons,
  grammarMistakes,
  grammarRules,
  grammarTopicRelations,
  grammarTopics,
  quizAttempts,
  userGrammarProgress,
} from "@/db/schema";
import {
  grammarLessonBodySchema,
  type GrammarErrorType,
} from "@/db/schema/grammar";
import { isCefrLevel, type CefrLevel } from "@/config/cefr";
import { getQuizForAttempt } from "@/features/quiz/queries";
import { logger } from "@/lib/logger";
import { toLearnerExercise, type ExerciseForLearner } from "./learner";
import {
  rankGrammarRecommendations,
  type GrammarRecommendation,
  type RecommendableTopic,
} from "./recommendations";
import {
  grammarExamplesQuerySchema,
  grammarExercisesQuerySchema,
  grammarListQuerySchema,
  grammarSearchQuerySchema,
  type GrammarListQuery,
  type GrammarSearchQuery,
} from "./schemas";
import {
  grammarStatusFromBestScore,
  type GrammarExampleView,
  type GrammarListFilters,
  type GrammarTopicDetail,
  type GrammarTopicListItem,
  type WeakGrammarTopic,
} from "./types";

const relatedTopic = alias(grammarTopics, "related_grammar_topic");

/** Short UI caption for external attributed examples (hide EnglishFlow original). */
function attributionLabelForSource(
  sourceName: string | null,
  sourceLicense: string | null,
): string | null {
  if (!sourceName || sourceName === "EnglishFlow original") {
    return null;
  }
  if (sourceLicense === "ATTRIBUTION_REQUIRED") {
    if (sourceName === "Tatoeba") {
      return "Nguồn: Tatoeba · CC BY 2.0 FR";
    }
    if (sourceName === "TALPCo") {
      return "Nguồn: TALPCo · CC BY 4.0";
    }
    return `Nguồn: ${sourceName}`;
  }
  return null;
}

function bestScoreSql(userId: string) {
  return sql<number | null>`(
    select max(${quizAttempts.score})
    from ${quizAttempts}
    where ${quizAttempts.quizId} = ${grammarTopics.quizId}
      and ${quizAttempts.userId} = ${userId}
  )`;
}

const publishedTopicFilter = and(
  eq(grammarTopics.status, "published"),
  isNull(grammarTopics.deletedAt),
);

export type GrammarProgressRow = {
  topicId: string;
  slug: string;
  titleEn: string;
  titleVi: string;
  level: GrammarTopicListItem["level"];
  attemptCount: number;
  correctCount: number;
  masteryScore: number;
  lastAttemptAt: Date | null;
  bestQuizScore: number | null;
  status: GrammarTopicListItem["status"];
};

export type GrammarSearchHit = {
  id: string;
  slug: string;
  titleEn: string;
  titleVi: string;
  level: GrammarTopicListItem["level"];
  summaryVi: string;
  rank: number;
};

/**
 * Grammar catalog with best quiz score → Weak / Practiced / Mastered.
 * Optional filters applied in-process (MVP catalog is small).
 */
export async function listGrammarTopics(
  userId: string,
  filters: GrammarListFilters = {},
): Promise<GrammarTopicListItem[]> {
  const rows = await db
    .select({
      id: grammarTopics.id,
      slug: grammarTopics.slug,
      titleEn: grammarTopics.titleEn,
      titleVi: grammarTopics.titleVi,
      level: grammarTopics.level,
      category: grammarTopics.category,
      summaryVi: grammarTopics.summaryVi,
      orderIndex: grammarTopics.orderIndex,
      bestScore: bestScoreSql(userId),
    })
    .from(grammarTopics)
    .where(publishedTopicFilter)
    .orderBy(asc(grammarTopics.orderIndex), asc(grammarTopics.titleEn));

  const search = filters.search?.trim().toLowerCase() ?? "";
  const levelFilter =
    filters.level && filters.level !== "all" && isCefrLevel(filters.level)
      ? filters.level
      : null;
  const statusFilter =
    filters.status && filters.status !== "all" ? filters.status : null;
  const categoryFilter =
    filters.category && filters.category !== "all" ? filters.category : null;

  return rows
    .map((row) => {
      const bestScore =
        row.bestScore === null || row.bestScore === undefined
          ? null
          : Number(row.bestScore);
      const status = grammarStatusFromBestScore(
        Number.isFinite(bestScore) ? bestScore : null,
      );
      return {
        id: row.id,
        slug: row.slug,
        title: row.titleVi,
        titleEn: row.titleEn,
        titleVi: row.titleVi,
        level: row.level,
        category: row.category as GrammarTopicListItem["category"],
        summary: row.summaryVi,
        orderIndex: row.orderIndex,
        bestScore: Number.isFinite(bestScore) ? bestScore : null,
        status,
        isCompleted: status !== "not_started",
      } satisfies GrammarTopicListItem;
    })
    .filter((topic) => {
      if (levelFilter && topic.level !== levelFilter) {
        return false;
      }
      if (statusFilter && topic.status !== statusFilter) {
        return false;
      }
      if (categoryFilter && topic.category !== categoryFilter) {
        return false;
      }
      if (search) {
        const haystack =
          `${topic.titleEn} ${topic.titleVi} ${topic.summary}`.toLowerCase();
        if (!haystack.includes(search)) {
          return false;
        }
      }
      return true;
    });
}

/**
 * Paginated catalog for Prompt 2 list query (Zod-validated).
 * Tree is flat for MVP (parent_id reserved); page slices after filters.
 */
export async function listGrammarTopicsPage(
  userId: string,
  rawQuery: unknown,
): Promise<{
  items: GrammarTopicListItem[];
  page: number;
  pageSize: number;
  total: number;
}> {
  const parsed = grammarListQuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return { items: [], page: 1, pageSize: 20, total: 0 };
  }
  const query: GrammarListQuery = parsed.data;
  const all = await listGrammarTopics(userId, {
    search: query.search,
    level: query.cefr ?? "all",
    category: query.category ?? "all",
  });
  const start = (query.page - 1) * query.pageSize;
  return {
    items: all.slice(start, start + query.pageSize),
    page: query.page,
    pageSize: query.pageSize,
    total: all.length,
  };
}

/**
 * Topics whose best quiz score is under 60%, lowest first (dashboard review).
 */
export async function listWeakGrammarTopics(
  userId: string,
  limit = 3,
): Promise<WeakGrammarTopic[]> {
  const rows = await listGrammarTopics(userId, { status: "weak" });
  return rows.slice(0, limit).map((topic) => ({
    id: topic.id,
    slug: topic.slug,
    title: topic.titleVi,
    titleEn: topic.titleEn,
    titleVi: topic.titleVi,
    level: topic.level,
    bestScore: topic.bestScore ?? 0,
    summary: topic.summary,
  }));
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isGrammarTopicParamUuid(value: string): boolean {
  return UUID_RE.test(value);
}

export async function getGrammarTopicTitle(param: string): Promise<string | null> {
  const where = isGrammarTopicParamUuid(param)
    ? and(eq(grammarTopics.id, param), publishedTopicFilter)
    : and(eq(grammarTopics.slug, param), publishedTopicFilter);
  const [row] = await db
    .select({ titleVi: grammarTopics.titleVi, titleEn: grammarTopics.titleEn })
    .from(grammarTopics)
    .where(where)
    .limit(1);
  return row ? row.titleVi || row.titleEn : null;
}

async function loadGrammarTopicDetail(
  where: ReturnType<typeof and>,
  userId: string,
): Promise<GrammarTopicDetail | null> {
  const [topic] = await db
    .select({
      id: grammarTopics.id,
      slug: grammarTopics.slug,
      titleEn: grammarTopics.titleEn,
      titleVi: grammarTopics.titleVi,
      level: grammarTopics.level,
      summaryVi: grammarTopics.summaryVi,
      orderIndex: grammarTopics.orderIndex,
      quizId: grammarTopics.quizId,
      bestScore: bestScoreSql(userId),
    })
    .from(grammarTopics)
    .where(where)
    .limit(1);

  if (!topic) {
    return null;
  }

  const [lessonRow, rules, examples, mistakes, relatedRows, neighbors, rawQuiz] =
    await Promise.all([
      db
        .select({
          body: grammarLessons.body,
          status: grammarLessons.status,
        })
        .from(grammarLessons)
        .where(
          and(
            eq(grammarLessons.topicId, topic.id),
            eq(grammarLessons.status, "published"),
          ),
        )
        .orderBy(sql`${grammarLessons.version} desc`)
        .limit(1)
        .then((rows) => rows[0] ?? null),
      db
        .select({
          id: grammarRules.id,
          titleEn: grammarRules.titleEn,
          titleVi: grammarRules.titleVi,
          pattern: grammarRules.pattern,
          explanationVi: grammarRules.explanationVi,
          orderIndex: grammarRules.orderIndex,
        })
        .from(grammarRules)
        .where(eq(grammarRules.topicId, topic.id))
        .orderBy(asc(grammarRules.orderIndex)),
      db
        .select({
          id: grammarExamples.id,
          sentenceEn: grammarExamples.sentenceEn,
          sentenceVi: grammarExamples.sentenceVi,
          highlights: grammarExamples.highlights,
          sourceName: contentSources.name,
          sourceLicense: contentSources.licenseCode,
        })
        .from(grammarExamples)
        .leftJoin(contentSources, eq(grammarExamples.sourceId, contentSources.id))
        .where(eq(grammarExamples.topicId, topic.id))
        .orderBy(asc(grammarExamples.createdAt)),
      db
        .select({
          id: grammarMistakes.id,
          incorrectSentence: grammarMistakes.incorrectSentence,
          correctSentence: grammarMistakes.correctSentence,
          errorType: grammarMistakes.errorType,
          explanationVi: grammarMistakes.explanationVi,
          severity: grammarMistakes.severity,
        })
        .from(grammarMistakes)
        .where(eq(grammarMistakes.topicId, topic.id))
        .orderBy(asc(grammarMistakes.createdAt)),
      db
        .select({
          id: relatedTopic.id,
          slug: relatedTopic.slug,
          titleEn: relatedTopic.titleEn,
          titleVi: relatedTopic.titleVi,
          relationType: grammarTopicRelations.relationType,
        })
        .from(grammarTopicRelations)
        .innerJoin(
          relatedTopic,
          eq(grammarTopicRelations.toTopicId, relatedTopic.id),
        )
        .where(
          and(
            eq(grammarTopicRelations.fromTopicId, topic.id),
            eq(relatedTopic.status, "published"),
            isNull(relatedTopic.deletedAt),
          ),
        ),
      db
        .select({
          id: grammarTopics.id,
          slug: grammarTopics.slug,
          orderIndex: grammarTopics.orderIndex,
        })
        .from(grammarTopics)
        .where(publishedTopicFilter)
        .orderBy(asc(grammarTopics.orderIndex), asc(grammarTopics.titleEn)),
      topic.quizId ? getQuizForAttempt(topic.quizId) : Promise.resolve(null),
    ]);

  let lesson = null;
  if (lessonRow) {
    const parsed = grammarLessonBodySchema.safeParse(lessonRow.body);
    if (!parsed.success) {
      logger.error("Invalid grammar lesson body", {
        topicId: topic.id,
        error: parsed.error,
      });
    } else {
      lesson = parsed.data;
    }
  }

  const index = neighbors.findIndex((row) => row.id === topic.id);
  const previousSlug = index > 0 ? neighbors[index - 1]!.slug : null;
  const nextSlug =
    index >= 0 && index < neighbors.length - 1 ? neighbors[index + 1]!.slug : null;

  const bestScore =
    topic.bestScore === null || topic.bestScore === undefined
      ? null
      : Number(topic.bestScore);
  const status = grammarStatusFromBestScore(
    Number.isFinite(bestScore) ? bestScore : null,
  );

  const quiz: ExerciseForLearner | null = rawQuiz
    ? toLearnerExercise(rawQuiz, { shuffleSeed: `${rawQuiz.id}:${userId}` })
    : null;

  return {
    id: topic.id,
    slug: topic.slug,
    title: topic.titleVi,
    titleEn: topic.titleEn,
    titleVi: topic.titleVi,
    level: topic.level,
    summary: topic.summaryVi,
    lesson,
    rules,
    examples: examples.map((row) => ({
      id: row.id,
      sentenceEn: row.sentenceEn,
      sentenceVi: row.sentenceVi,
      highlights: row.highlights,
      attributionLabel: attributionLabelForSource(row.sourceName, row.sourceLicense),
    })),
    mistakes: mistakes.map((row) => ({
      ...row,
      errorType: row.errorType as GrammarErrorType,
    })),
    related: relatedRows,
    orderIndex: topic.orderIndex,
    quizId: topic.quizId,
    quiz,
    bestScore: Number.isFinite(bestScore) ? bestScore : null,
    status,
    isCompleted: status !== "not_started",
    previousSlug,
    nextSlug,
  };
}

/**
 * Topic detail for `/grammar/[slug]` (UUID param still accepted for old links).
 */
export async function getGrammarTopicDetail(
  topicId: string,
  userId: string,
): Promise<GrammarTopicDetail | null> {
  return loadGrammarTopicDetail(
    and(eq(grammarTopics.id, topicId), publishedTopicFilter),
    userId,
  );
}

/** Detail keyed by stable slug. */
export async function getGrammarTopicDetailBySlug(
  slug: string,
  userId: string,
): Promise<GrammarTopicDetail | null> {
  return loadGrammarTopicDetail(
    and(eq(grammarTopics.slug, slug), publishedTopicFilter),
    userId,
  );
}

/** Resolve `/grammar/[slug]` whether the segment is a slug or a legacy UUID. */
export async function getGrammarTopicDetailByParam(
  param: string,
  userId: string,
): Promise<GrammarTopicDetail | null> {
  if (isGrammarTopicParamUuid(param)) {
    return getGrammarTopicDetail(param, userId);
  }
  return getGrammarTopicDetailBySlug(param, userId);
}

export async function listGrammarTopicExamples(
  rawQuery: unknown,
): Promise<GrammarExampleView[]> {
  const parsed = grammarExamplesQuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return [];
  }
  const { slug, limit } = parsed.data;
  const [topic] = await db
    .select({ id: grammarTopics.id })
    .from(grammarTopics)
    .where(and(eq(grammarTopics.slug, slug), publishedTopicFilter))
    .limit(1);
  if (!topic) {
    return [];
  }
  const rows = await db
    .select({
      id: grammarExamples.id,
      sentenceEn: grammarExamples.sentenceEn,
      sentenceVi: grammarExamples.sentenceVi,
      highlights: grammarExamples.highlights,
      sourceName: contentSources.name,
      sourceLicense: contentSources.licenseCode,
    })
    .from(grammarExamples)
    .leftJoin(contentSources, eq(grammarExamples.sourceId, contentSources.id))
    .where(eq(grammarExamples.topicId, topic.id))
    .orderBy(asc(grammarExamples.createdAt))
    .limit(limit);

  return rows.map((row) => ({
    id: row.id,
    sentenceEn: row.sentenceEn,
    sentenceVi: row.sentenceVi,
    highlights: row.highlights,
    attributionLabel: attributionLabelForSource(row.sourceName, row.sourceLicense),
  }));
}

/**
 * Learner-safe exercises for a topic slug. Options are seeded-shuffled;
 * answer keys never leave this function's return value.
 */
export async function getGrammarTopicExercisesForLearner(
  userId: string,
  rawQuery: unknown,
): Promise<ExerciseForLearner | null> {
  const parsed = grammarExercisesQuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return null;
  }
  const { slug, shuffleSeed } = parsed.data;
  const [topic] = await db
    .select({ quizId: grammarTopics.quizId })
    .from(grammarTopics)
    .where(and(eq(grammarTopics.slug, slug), publishedTopicFilter))
    .limit(1);
  if (!topic?.quizId) {
    return null;
  }
  const quiz = await getQuizForAttempt(topic.quizId);
  if (!quiz) {
    return null;
  }
  return toLearnerExercise(quiz, {
    shuffleSeed: shuffleSeed ?? `${quiz.id}:${userId}`,
  });
}

/**
 * Full-text + trigram fuzzy search over published topics (Prompt 2).
 * Requires `pg_trgm` (migration 0004). Falls back to ILIKE if extension missing.
 */
export async function searchGrammarTopics(
  rawQuery: unknown,
): Promise<GrammarSearchHit[]> {
  const parsed = grammarSearchQuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return [];
  }
  const query: GrammarSearchQuery = parsed.data;
  const q = query.q;
  const like = `%${q}%`;

  try {
    const { rows } = await db.execute<{
      id: string;
      slug: string;
      title_en: string;
      title_vi: string;
      level: GrammarTopicListItem["level"];
      summary_vi: string;
      rank: number;
    }>(sql`
      SELECT
        t.id,
        t.slug,
        t.title_en,
        t.title_vi,
        t.level,
        t.summary_vi,
        GREATEST(
          ts_rank(
            to_tsvector(
              'simple',
              coalesce(t.title_en, '') || ' ' || coalesce(t.title_vi, '') || ' ' || coalesce(t.summary_vi, '')
            ),
            plainto_tsquery('simple', ${q})
          ),
          similarity(t.title_en, ${q}),
          similarity(t.title_vi, ${q}),
          similarity(t.summary_vi, ${q})
        )::float8 AS rank
      FROM grammar_topics t
      WHERE t.status = 'published'
        AND t.deleted_at IS NULL
        AND (
          to_tsvector(
            'simple',
            coalesce(t.title_en, '') || ' ' || coalesce(t.title_vi, '') || ' ' || coalesce(t.summary_vi, '')
          ) @@ plainto_tsquery('simple', ${q})
          OR t.title_en % ${q}
          OR t.title_vi % ${q}
          OR t.summary_vi % ${q}
          OR t.title_en ILIKE ${like}
          OR t.title_vi ILIKE ${like}
          OR t.summary_vi ILIKE ${like}
        )
      ORDER BY rank DESC, t.order_index ASC
      LIMIT ${query.limit}
    `);

    const list = rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      titleEn: row.title_en,
      titleVi: row.title_vi,
      level: row.level,
      summaryVi: row.summary_vi,
      rank: Number(row.rank) || 0,
    }));

    return list;
  } catch (error) {
    logger.error("searchGrammarTopics failed, falling back to ILIKE", { error });
    const fallback = await db
      .select({
        id: grammarTopics.id,
        slug: grammarTopics.slug,
        titleEn: grammarTopics.titleEn,
        titleVi: grammarTopics.titleVi,
        level: grammarTopics.level,
        summaryVi: grammarTopics.summaryVi,
      })
      .from(grammarTopics)
      .where(
        and(
          publishedTopicFilter,
          sql`(
            ${grammarTopics.titleEn} ILIKE ${like}
            OR ${grammarTopics.titleVi} ILIKE ${like}
            OR ${grammarTopics.summaryVi} ILIKE ${like}
          )`,
        ),
      )
      .orderBy(asc(grammarTopics.orderIndex))
      .limit(query.limit);

    return fallback.map((row) => ({
      ...row,
      rank: 0,
    }));
  }
}

/** Per-topic mastery rows for the current user (Prompt 2 / 4). */
export async function listUserGrammarProgress(
  userId: string,
): Promise<GrammarProgressRow[]> {
  const rows = await db
    .select({
      topicId: userGrammarProgress.topicId,
      slug: grammarTopics.slug,
      titleEn: grammarTopics.titleEn,
      titleVi: grammarTopics.titleVi,
      level: grammarTopics.level,
      attemptCount: userGrammarProgress.attemptCount,
      correctCount: userGrammarProgress.correctCount,
      masteryScore: userGrammarProgress.masteryScore,
      lastAttemptAt: userGrammarProgress.lastAttemptAt,
      bestQuizScore: bestScoreSql(userId),
    })
    .from(userGrammarProgress)
    .innerJoin(grammarTopics, eq(userGrammarProgress.topicId, grammarTopics.id))
    .where(and(eq(userGrammarProgress.userId, userId), publishedTopicFilter))
    .orderBy(asc(grammarTopics.orderIndex));

  return rows.map((row) => {
    const bestScore =
      row.bestQuizScore === null || row.bestQuizScore === undefined
        ? null
        : Number(row.bestQuizScore);
    const status = grammarStatusFromBestScore(
      Number.isFinite(bestScore) ? bestScore : null,
    );
    return {
      topicId: row.topicId,
      slug: row.slug,
      titleEn: row.titleEn,
      titleVi: row.titleVi,
      level: row.level,
      attemptCount: row.attemptCount,
      correctCount: row.correctCount,
      masteryScore: Number(row.masteryScore),
      lastAttemptAt: row.lastAttemptAt,
      bestQuizScore: Number.isFinite(bestScore) ? bestScore : null,
      status,
    };
  });
}

/**
 * Prompt 4: next-topic suggestions — prerequisites mastery ≥ 0.8, CEFR fit,
 * prioritize weak / not-started. Uses Server Actions / RSC (no `/api/grammar/*`).
 */
export async function listGrammarRecommendations(
  userId: string,
  userCefrLevel: CefrLevel | null,
  limit = 4,
): Promise<GrammarRecommendation[]> {
  const [topicRows, progressRows, prereqRows] = await Promise.all([
    db
      .select({
        id: grammarTopics.id,
        slug: grammarTopics.slug,
        titleEn: grammarTopics.titleEn,
        titleVi: grammarTopics.titleVi,
        level: grammarTopics.level,
        summaryVi: grammarTopics.summaryVi,
        orderIndex: grammarTopics.orderIndex,
      })
      .from(grammarTopics)
      .where(publishedTopicFilter)
      .orderBy(asc(grammarTopics.orderIndex)),
    db
      .select({
        topicId: userGrammarProgress.topicId,
        masteryScore: userGrammarProgress.masteryScore,
      })
      .from(userGrammarProgress)
      .where(eq(userGrammarProgress.userId, userId)),
    db
      .select({
        fromTopicId: grammarTopicRelations.fromTopicId,
        toTopicId: grammarTopicRelations.toTopicId,
      })
      .from(grammarTopicRelations)
      .where(eq(grammarTopicRelations.relationType, "prerequisite")),
  ]);

  const masteryByTopicId = new Map(
    progressRows.map(
      (row) => [row.topicId, Number(row.masteryScore)] as const,
    ),
  );

  const prereqsByTopicId = new Map<string, string[]>();
  for (const row of prereqRows) {
    const list = prereqsByTopicId.get(row.toTopicId) ?? [];
    list.push(row.fromTopicId);
    prereqsByTopicId.set(row.toTopicId, list);
  }

  const recommendable: RecommendableTopic[] = topicRows.map((row) => ({
    id: row.id,
    slug: row.slug,
    titleEn: row.titleEn,
    titleVi: row.titleVi,
    level: row.level,
    summaryVi: row.summaryVi,
    orderIndex: row.orderIndex,
    masteryScore: masteryByTopicId.get(row.id) ?? 0,
    prerequisiteIds: prereqsByTopicId.get(row.id) ?? [],
  }));

  return rankGrammarRecommendations(recommendable, {
    userCefrLevel,
    limit,
  });
}
