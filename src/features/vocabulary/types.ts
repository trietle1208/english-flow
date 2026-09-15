import type { VocabularySummary } from "@/features/lessons/types";

export type { VocabularySummary };

/** One row on `/vocabulary` — vocab content + the user's relationship to it. */
export type SavedVocabularyItem = VocabularySummary & {
  savedAt: Date;
  isLearned: boolean;
  learnedAt: Date | null;
  reviewCount: number;
};

export type VocabularyStats = {
  totalSaved: number;
  learned: number;
  notLearned: number;
};

/** Filter tabs on `/vocabulary` (spec §14). */
export type VocabularyFilter = "all" | "recent" | "learned" | "not_learned";

/** Sort options on `/vocabulary` (spec §14). */
export type VocabularySort = "recent" | "alphabetical" | "most_reviewed";

export type VocabularyListFilters = {
  search?: string;
  filter?: VocabularyFilter;
  sort?: VocabularySort;
  page?: number;
};
