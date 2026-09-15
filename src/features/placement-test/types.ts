import type { CefrLevel } from "@/config/cefr";
import type { QuestionType } from "@/features/quiz/types";

export type PlacementOptionForAttempt = {
  index: number;
  content: string;
};

export type PlacementQuestionForAttempt = {
  id: string;
  orderIndex: number;
  level: CefrLevel;
  type: QuestionType;
  prompt: string;
  points: number;
  /** MC / TF options without correctness. Empty for fill_blank. */
  options: PlacementOptionForAttempt[];
};

export type PlacementTestForAttempt = {
  id: string;
  slug: string;
  title: string;
  description: string;
  questionCount: number;
  questions: PlacementQuestionForAttempt[];
};

export type PlacementAttemptAnswerInput =
  | { questionId: string; selectedOptionIndex: number }
  | { questionId: string; textAnswer: string };

export type PlacementAttemptAnswerSnapshot = {
  questionId: string;
  selectedOptionIndex?: number;
  textAnswer?: string;
  isCorrect: boolean;
  prompt: string;
  userAnswerLabel: string;
  correctAnswerLabel: string;
};

export type PlacementSubmitResult = {
  attemptId: string;
  score: number;
  estimatedLevel: CefrLevel;
  correctCount: number;
  totalQuestions: number;
};

export type PlacementResultView = {
  attemptId: string;
  score: number;
  estimatedLevel: CefrLevel;
  correctCount: number;
  totalQuestions: number;
  completedAt: Date;
};
