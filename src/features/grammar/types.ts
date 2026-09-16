import type { CefrLevel } from "@/config/cefr";
import type {
  GrammarErrorType,
  GrammarExampleHighlight,
  GrammarLessonBody,
  GrammarTopicCategory,
} from "@/db/schema/grammar";
import type { ExerciseForLearner } from "./learner";

// Re-export learner types for feature consumers.
export type { ExerciseForLearner, ExerciseWithAnswer } from "./learner";

/** Derived from best `quiz_attempts.score` for the topic's linked quiz (Phase 15). */
export type GrammarProgressStatus =
  | "not_started"
  | "weak"
  | "practiced"
  | "mastered";

export type GrammarStatusFilter = GrammarProgressStatus | "all";

export type GrammarListFilters = {
  search?: string;
  level?: CefrLevel | "all";
  status?: GrammarStatusFilter;
  category?: GrammarTopicCategory | "all";
};

export type GrammarRuleView = {
  id: string;
  titleEn: string;
  titleVi: string;
  pattern: string;
  explanationVi: string;
  orderIndex: number;
};

export type GrammarExampleView = {
  id: string;
  sentenceEn: string;
  sentenceVi: string;
  highlights: GrammarExampleHighlight[];
  /** Short caption when example is from an attributed external source. */
  attributionLabel: string | null;
};

export type GrammarMistakeView = {
  id: string;
  incorrectSentence: string;
  correctSentence: string;
  errorType: GrammarErrorType;
  explanationVi: string;
  severity: number;
};

export type GrammarRelatedTopic = {
  id: string;
  slug: string;
  titleEn: string;
  titleVi: string;
  relationType: "prerequisite" | "related" | "confused_with";
};

export type GrammarTopicListItem = {
  id: string;
  slug: string;
  /** Primary display title (Vietnamese — Prompt 3 catalog). */
  title: string;
  titleEn: string;
  titleVi: string;
  level: CefrLevel;
  category: GrammarTopicCategory;
  summary: string;
  orderIndex: number;
  /** Best attempt score 0–100, or null if never attempted. */
  bestScore: number | null;
  status: GrammarProgressStatus;
  /** True when the user has at least one completed attempt on this topic's quiz. */
  isCompleted: boolean;
};

export type GrammarTopicDetail = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  titleVi: string;
  level: CefrLevel;
  summary: string;
  lesson: GrammarLessonBody | null;
  rules: GrammarRuleView[];
  examples: GrammarExampleView[];
  mistakes: GrammarMistakeView[];
  related: GrammarRelatedTopic[];
  orderIndex: number;
  quizId: string | null;
  /** Learner-safe quiz — never includes answer keys (Prompt 2). */
  quiz: ExerciseForLearner | null;
  bestScore: number | null;
  status: GrammarProgressStatus;
  isCompleted: boolean;
  previousSlug: string | null;
  nextSlug: string | null;
};

export type WeakGrammarTopic = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  titleVi: string;
  level: CefrLevel;
  bestScore: number;
  summary: string;
};

/** Thresholds for progress badges (Phase 15). */
export function grammarStatusFromBestScore(
  bestScore: number | null,
): GrammarProgressStatus {
  if (bestScore === null) {
    return "not_started";
  }
  if (bestScore < 60) {
    return "weak";
  }
  if (bestScore < 80) {
    return "practiced";
  }
  return "mastered";
}

export function isGrammarStatusFilter(value: string): value is GrammarStatusFilter {
  return (
    value === "all" ||
    value === "not_started" ||
    value === "weak" ||
    value === "practiced" ||
    value === "mastered"
  );
}
