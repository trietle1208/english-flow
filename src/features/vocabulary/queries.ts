import { and, asc, count, desc, eq, gt, gte, ilike, inArray, isNull, lte, min, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { userVocabularies, vocabularies } from "@/db/schema";
import {
  TOEIC_CATALOG_SOURCE,
  isToeicTopicId,
  type ToeicTopicId,
} from "@/db/seed-data/toeic-vocabulary";
import type {
  FlashcardDueInfo,
  FlashcardItem,
  SavedVocabularyItem,
  ToeicCatalogItem,
  ToeicTopicFilter,
  VocabularyFilter,
  VocabularyListFilters,
  VocabularyPosFilter,
  VocabularySort,
  VocabularyStats,
} from "./types";

export const VOCABULARY_PAGE_SIZE = 24;

/** Cards per flashcard study session (v1). */
export const FLASHCARD_SESSION_SIZE = 20;

/** Saved words from the last N days count as "Recently Added". */
const RECENT_DAYS = 7;

type ListUserVocabulariesParams = VocabularyListFilters & {
  userId: string;
};

/**
 * Paginated personal vocabulary for `/vocabulary`. Search runs in SQL
 * (ILIKE on word + meaning); never loads the full list into JS (spec §32).
 */
export async function listUserVocabularies({
  userId,
  search,
  filter = "all",
  pos = "all",
  sort = "recent",
  page = 1,
}: ListUserVocabulariesParams): Promise<{
  items: SavedVocabularyItem[];
  page: number;
  pageSize: number;
  total: number;
}> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const where = buildListWhere(userId, search, filter, pos);

  const [rows, totalRow] = await Promise.all([
    db
      .select({
        id: vocabularies.id,
        word: vocabularies.word,
        pronunciation: vocabularies.pronunciation,
        phonetic: vocabularies.phonetic,
        partOfSpeech: vocabularies.partOfSpeech,
        meaning: vocabularies.meaning,
        exampleSentence: vocabularies.exampleSentence,
        audioUrl: vocabularies.audioUrl,
        isManual: vocabularies.isManual,
        savedAt: userVocabularies.savedAt,
        isLearned: userVocabularies.isLearned,
        isPinned: userVocabularies.isPinned,
        learnedAt: userVocabularies.learnedAt,
        reviewCount: userVocabularies.reviewCount,
      })
      .from(userVocabularies)
      .innerJoin(vocabularies, eq(vocabularies.id, userVocabularies.vocabularyId))
      .where(where)
      .orderBy(...buildOrderBy(sort))
      .limit(VOCABULARY_PAGE_SIZE)
      .offset((safePage - 1) * VOCABULARY_PAGE_SIZE),
    db
      .select({ total: count() })
      .from(userVocabularies)
      .innerJoin(vocabularies, eq(vocabularies.id, userVocabularies.vocabularyId))
      .where(where),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      word: row.word,
      pronunciation: row.pronunciation,
      phonetic: row.phonetic,
      partOfSpeech: row.partOfSpeech,
      meaning: row.meaning,
      exampleSentence: row.exampleSentence,
      audioUrl: row.audioUrl,
      isManual: row.isManual,
      isPinned: row.isPinned,
      savedAt: row.savedAt,
      isLearned: row.isLearned,
      learnedAt: row.learnedAt,
      reviewCount: row.reviewCount,
    })),
    page: safePage,
    pageSize: VOCABULARY_PAGE_SIZE,
    total: totalRow[0]?.total ?? 0,
  };
}

/**
 * Aggregate counts for the header stats (Total / Learned / Not learned) in
 * one query — never by loading every saved row (spec §32).
 */
export async function getVocabularyStats(userId: string): Promise<VocabularyStats> {
  const [row] = await db
    .select({
      totalSaved: count(),
      learned: sql<number>`coalesce(sum(case when ${userVocabularies.isLearned} then 1 else 0 end), 0)::int`,
      manual: sql<number>`coalesce(sum(case when ${vocabularies.isManual} then 1 else 0 end), 0)::int`,
      pinned: sql<number>`coalesce(sum(case when ${userVocabularies.isPinned} then 1 else 0 end), 0)::int`,
    })
    .from(userVocabularies)
    .innerJoin(vocabularies, eq(vocabularies.id, userVocabularies.vocabularyId))
    .where(eq(userVocabularies.userId, userId));

  const totalSaved = Number(row?.totalSaved ?? 0);
  const learned = Number(row?.learned ?? 0);
  const manual = Number(row?.manual ?? 0);
  const pinned = Number(row?.pinned ?? 0);

  return {
    totalSaved,
    learned,
    notLearned: totalSaved - learned,
    manual,
    pinned,
  };
}

/**
 * Deck for `/vocabulary/review`: due saved words only
 * (`next_review_at` null or ≤ now). Prioritizes overdue, then not-learned,
 * then fewest reviews. Capped at `FLASHCARD_SESSION_SIZE`.
 */
export async function listFlashcardSession(
  userId: string,
  limit = FLASHCARD_SESSION_SIZE,
): Promise<FlashcardItem[]> {
  const safeLimit =
    Number.isFinite(limit) && limit > 0
      ? Math.min(Math.floor(limit), FLASHCARD_SESSION_SIZE)
      : FLASHCARD_SESSION_SIZE;
  const now = new Date();

  const rows = await db
    .select({
      id: vocabularies.id,
      word: vocabularies.word,
      pronunciation: vocabularies.pronunciation,
      phonetic: vocabularies.phonetic,
      partOfSpeech: vocabularies.partOfSpeech,
      meaning: vocabularies.meaning,
      exampleSentence: vocabularies.exampleSentence,
      audioUrl: vocabularies.audioUrl,
      isLearned: userVocabularies.isLearned,
    })
    .from(userVocabularies)
    .innerJoin(vocabularies, eq(vocabularies.id, userVocabularies.vocabularyId))
    .where(
      and(
        eq(userVocabularies.userId, userId),
        or(isNull(userVocabularies.nextReviewAt), lte(userVocabularies.nextReviewAt, now)),
      ),
    )
    .orderBy(
      sql`${userVocabularies.nextReviewAt} asc nulls first`,
      asc(userVocabularies.isLearned),
      asc(userVocabularies.reviewCount),
      asc(userVocabularies.savedAt),
    )
    .limit(safeLimit);

  return rows.map((row) => ({
    id: row.id,
    word: row.word,
    pronunciation: row.pronunciation,
    phonetic: row.phonetic,
    partOfSpeech: row.partOfSpeech,
    meaning: row.meaning,
    exampleSentence: row.exampleSentence,
    audioUrl: row.audioUrl,
    isLearned: row.isLearned,
  }));
}

/**
 * Counts for flashcard CTAs: how many cards are due now, and when the next
 * future review is if the learner is caught up.
 *
 * Uses drizzle operators (not raw `sql\`…${date}\``) so timestamps bind
 * correctly with postgres-js.
 */
export async function getFlashcardDueInfo(userId: string): Promise<FlashcardDueInfo> {
  const now = new Date();
  const owned = eq(userVocabularies.userId, userId);
  const isDue = or(isNull(userVocabularies.nextReviewAt), lte(userVocabularies.nextReviewAt, now));

  const [[totals], [due], [upcoming]] = await Promise.all([
    db.select({ totalSaved: count() }).from(userVocabularies).where(owned),
    db
      .select({ dueCount: count() })
      .from(userVocabularies)
      .where(and(owned, isDue)),
    db
      .select({ nextReviewAt: min(userVocabularies.nextReviewAt) })
      .from(userVocabularies)
      .where(and(owned, gt(userVocabularies.nextReviewAt, now))),
  ]);

  return {
    totalSaved: Number(totals?.totalSaved ?? 0),
    dueCount: Number(due?.dueCount ?? 0),
    nextReviewAt: upcoming?.nextReviewAt ?? null,
  };
}

/**
 * Which of the given vocabulary ids the user has already saved. Used by
 * lesson vocabulary blocks so Save buttons render the correct initial state.
 */
export async function getSavedVocabularyIds(
  userId: string,
  vocabularyIds: string[],
): Promise<Set<string>> {
  if (vocabularyIds.length === 0) {
    return new Set();
  }

  const rows = await db
    .select({ vocabularyId: userVocabularies.vocabularyId })
    .from(userVocabularies)
    .where(
      and(
        eq(userVocabularies.userId, userId),
        inArray(userVocabularies.vocabularyId, vocabularyIds),
      ),
    );

  return new Set(rows.map((row) => row.vocabularyId));
}

/**
 * Paginated TOEIC catalog (`catalog_source = 'toeic'`). Search / topic filter
 * run in SQL; saved state is joined so Save buttons render without N+1.
 * Results are ordered by curated topic order, then alphabetically.
 */
export async function listToeicCatalog({
  userId,
  search,
  topic = "all",
  page = 1,
}: {
  userId: string;
  search?: string;
  topic?: ToeicTopicFilter;
  page?: number;
}): Promise<{
  items: ToeicCatalogItem[];
  page: number;
  pageSize: number;
  total: number;
}> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const topicFilter: ToeicTopicId | null =
    topic !== "all" && isToeicTopicId(topic) ? topic : null;

  const clauses = [
    eq(vocabularies.catalogSource, TOEIC_CATALOG_SOURCE),
    eq(vocabularies.isManual, false),
  ];

  if (topicFilter) {
    clauses.push(eq(vocabularies.topic, topicFilter));
  }

  const trimmed = search?.trim();
  if (trimmed) {
    const pattern = `%${trimmed}%`;
    clauses.push(
      or(ilike(vocabularies.word, pattern), ilike(vocabularies.meaning, pattern))!,
    );
  }

  const where = and(...clauses);
  const offset = (safePage - 1) * VOCABULARY_PAGE_SIZE;

  const topicRank = sql`case ${vocabularies.topic}
    when 'office' then 1
    when 'hr' then 2
    when 'sales' then 3
    when 'logistics' then 4
    when 'meetings' then 5
    when 'core' then 6
    else 7
  end`;

  const [rows, totalRow] = await Promise.all([
    db
      .select({
        id: vocabularies.id,
        word: vocabularies.word,
        pronunciation: vocabularies.pronunciation,
        phonetic: vocabularies.phonetic,
        partOfSpeech: vocabularies.partOfSpeech,
        meaning: vocabularies.meaning,
        exampleSentence: vocabularies.exampleSentence,
        audioUrl: vocabularies.audioUrl,
        difficulty: vocabularies.difficulty,
        topic: vocabularies.topic,
        savedId: userVocabularies.id,
      })
      .from(vocabularies)
      .leftJoin(
        userVocabularies,
        and(
          eq(userVocabularies.vocabularyId, vocabularies.id),
          eq(userVocabularies.userId, userId),
        ),
      )
      .where(where)
      .orderBy(asc(topicRank), asc(vocabularies.word))
      .limit(VOCABULARY_PAGE_SIZE)
      .offset(offset),
    db.select({ total: count() }).from(vocabularies).where(where),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      word: row.word,
      pronunciation: row.pronunciation,
      phonetic: row.phonetic,
      partOfSpeech: row.partOfSpeech,
      meaning: row.meaning,
      exampleSentence: row.exampleSentence,
      audioUrl: row.audioUrl,
      difficulty: row.difficulty,
      topic: row.topic,
      isSaved: row.savedId != null,
    })),
    page: safePage,
    pageSize: VOCABULARY_PAGE_SIZE,
    total: Number(totalRow[0]?.total ?? 0),
  };
}

function buildListWhere(
  userId: string,
  search: string | undefined,
  filter: VocabularyFilter,
  pos: VocabularyPosFilter,
) {
  const clauses = [eq(userVocabularies.userId, userId)];

  const trimmed = search?.trim();
  if (trimmed) {
    const pattern = `%${trimmed}%`;
    clauses.push(
      or(ilike(vocabularies.word, pattern), ilike(vocabularies.meaning, pattern))!,
    );
  }

  if (filter === "learned") {
    clauses.push(eq(userVocabularies.isLearned, true));
  } else if (filter === "not_learned") {
    clauses.push(eq(userVocabularies.isLearned, false));
  } else if (filter === "recent") {
    const since = new Date();
    since.setDate(since.getDate() - RECENT_DAYS);
    clauses.push(gte(userVocabularies.savedAt, since));
  } else if (filter === "manual") {
    clauses.push(eq(vocabularies.isManual, true));
  } else if (filter === "pinned") {
    clauses.push(eq(userVocabularies.isPinned, true));
  }

  if (pos !== "all") {
    clauses.push(eq(vocabularies.partOfSpeech, pos));
  }

  return and(...clauses);
}

const DIFFICULTY_RANK = sql`case ${vocabularies.difficulty}
  when 'easy' then 1
  when 'medium' then 2
  when 'hard' then 3
  else 4
end`;

function buildOrderBy(sort: VocabularySort) {
  switch (sort) {
    case "alphabetical":
      return [asc(vocabularies.word)];
    case "most_reviewed":
      return [desc(userVocabularies.reviewCount), desc(userVocabularies.savedAt)];
    case "difficulty":
      return [asc(DIFFICULTY_RANK), asc(vocabularies.word)];
    case "difficulty_desc":
      return [desc(DIFFICULTY_RANK), asc(vocabularies.word)];
    case "recent":
    default:
      // Pinned words float to the top within the recent feed.
      return [desc(userVocabularies.isPinned), desc(userVocabularies.savedAt)];
  }
}
