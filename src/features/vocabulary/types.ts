import type { ToeicTopicId } from "@/db/seed-data/toeic-vocabulary";
import type { PartOfSpeech, VocabularySummary } from "@/features/lessons/types";

export type { VocabularySummary, PartOfSpeech };

/** One row on `/vocabulary` — vocab content + the user's relationship to it. */
export type SavedVocabularyItem = VocabularySummary & {
  savedAt: Date;
  isLearned: boolean;
  learnedAt: Date | null;
  reviewCount: number;
  isManual: boolean;
  isPinned: boolean;
};

export type VocabularyStats = {
  totalSaved: number;
  learned: number;
  notLearned: number;
  /** Words the learner created via the Add Word FAB. */
  manual: number;
  /** Words the learner starred for priority review. */
  pinned: number;
};

/** Filter tabs on `/vocabulary` (spec §14 + manual / pinned). */
export type VocabularyFilter =
  | "all"
  | "recent"
  | "learned"
  | "not_learned"
  | "manual"
  | "pinned";

/** Optional part-of-speech chip filter (`?pos=`). */
export type VocabularyPosFilter = "all" | PartOfSpeech;

/** Sort options on `/vocabulary` (spec §14 + difficulty). */
export type VocabularySort =
  | "recent"
  | "alphabetical"
  | "most_reviewed"
  | "difficulty"
  | "difficulty_desc";

export type VocabularyListFilters = {
  search?: string;
  filter?: VocabularyFilter;
  pos?: VocabularyPosFilter;
  sort?: VocabularySort;
  page?: number;
};

/** One card in a flashcard study session (`/vocabulary/review`). */
export type FlashcardItem = {
  id: string;
  word: string;
  pronunciation: string;
  phonetic: string;
  partOfSpeech: PartOfSpeech;
  meaning: string;
  exampleSentence: string;
  audioUrl: string | null;
  isLearned: boolean;
};

/** Self-grade after revealing the back of a flashcard (Again / Good). */
export type FlashcardRating = "again" | "good";

/** Due / catch-up summary for flashcard CTAs and empty states. */
export type FlashcardDueInfo = {
  dueCount: number;
  totalSaved: number;
  /** Earliest future `next_review_at` when nothing is due; null if unknown. */
  nextReviewAt: Date | null;
};

/** One row on `/vocabulary/toeic` — catalog content + whether the user already saved it. */
export type ToeicCatalogItem = VocabularySummary & {
  difficulty: "easy" | "medium" | "hard";
  topic: string | null;
  isSaved: boolean;
};

export type ToeicTopicFilter = "all" | ToeicTopicId;

/** One answer choice in a TOEIC Match Play round. */
export type ToeicPlayOption = {
  id: string;
  text: string;
};

/** One EN→VI match prompt with shuffled options (client grades locally). */
export type ToeicPlayCard = {
  id: string;
  word: string;
  pronunciation: string;
  phonetic: string;
  meaning: string;
  audioUrl: string | null;
  isSaved: boolean;
  correctOptionId: string;
  options: ToeicPlayOption[];
};

export type ToeicPlayDeck = {
  cards: ToeicPlayCard[];
  topic: ToeicTopicFilter;
  /** True when distractors were widened beyond the selected topic. */
  widenedDistractors: boolean;
};
