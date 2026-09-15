import { and, asc, count, desc, eq, gte, ilike, inArray, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { userVocabularies, vocabularies } from "@/db/schema";
import type {
  SavedVocabularyItem,
  VocabularyFilter,
  VocabularyListFilters,
  VocabularySort,
  VocabularyStats,
} from "./types";

export const VOCABULARY_PAGE_SIZE = 24;

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
  sort = "recent",
  page = 1,
}: ListUserVocabulariesParams): Promise<{
  items: SavedVocabularyItem[];
  page: number;
  pageSize: number;
  total: number;
}> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const where = buildListWhere(userId, search, filter);

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
        savedAt: userVocabularies.savedAt,
        isLearned: userVocabularies.isLearned,
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
    })
    .from(userVocabularies)
    .where(eq(userVocabularies.userId, userId));

  const totalSaved = Number(row?.totalSaved ?? 0);
  const learned = Number(row?.learned ?? 0);

  return {
    totalSaved,
    learned,
    notLearned: totalSaved - learned,
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

function buildListWhere(userId: string, search: string | undefined, filter: VocabularyFilter) {
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
  }

  return and(...clauses);
}

function buildOrderBy(sort: VocabularySort) {
  switch (sort) {
    case "alphabetical":
      return [asc(vocabularies.word)];
    case "most_reviewed":
      return [desc(userVocabularies.reviewCount), desc(userVocabularies.savedAt)];
    case "recent":
    default:
      return [desc(userVocabularies.savedAt)];
  }
}
