import type { questionTypeEnum, revealModeEnum } from "@/db/schema/enums";
import type { GradedAnswer } from "./engine";

export type QuestionType = (typeof questionTypeEnum.enumValues)[number];
export type RevealMode = (typeof revealModeEnum.enumValues)[number];

/** Answer option shown before submit — never includes `isCorrect` for after_submit. */
export type QuizAnswerOption = {
  id: string;
  content: string;
};

export type QuizQuestionForAttempt = {
  id: string;
  orderIndex: number;
  type: QuestionType;
  prompt: string;
  points: number;
  /** Present for multiple_choice / true_false; empty for fill_blank. */
  answers: QuizAnswerOption[];
};

export type QuizForAttempt = {
  id: string;
  title: string;
  description: string;
  passScore: number;
  revealMode: RevealMode;
  timeLimitSeconds: number | null;
  questions: QuizQuestionForAttempt[];
};

/** One answer the client sends on submit. */
export type QuizAttemptAnswerInput =
  | { questionId: string; selectedAnswerIds: string[] }
  | { questionId: string; textAnswer: string };

/** Snapshot row stored in `quiz_attempts.answers` jsonb (enriched for Review Mistakes). */
export type QuizAttemptAnswerSnapshot = {
  questionId: string;
  selectedAnswerIds?: string[];
  textAnswer?: string;
  isCorrect: boolean;
  prompt: string;
  type: QuestionType;
  explanation: string;
  userAnswerLabel: string;
  correctAnswerLabel: string;
};

export type QuizQuestionResult = {
  questionId: string;
  prompt: string;
  type: QuestionType;
  explanation: string;
  isCorrect: boolean;
  userAnswerLabel: string;
  correctAnswerLabel: string;
};

export type QuizSubmitResult = {
  attemptId: string;
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentSeconds: number;
  passed: boolean;
  results: QuizQuestionResult[];
};

export type QuizAttemptDetail = {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentSeconds: number;
  passed: boolean;
  passScore: number;
  answers: QuizAttemptAnswerSnapshot[];
  startedAt: Date;
  completedAt: Date;
};

/** Per-question grade returned only when `revealMode === "immediate"`. */
export type ImmediateGradeResult = {
  isCorrect: boolean;
  explanation: string;
  correctAnswerLabel: string;
  userAnswerLabel: string;
  /** Present for multiple_choice / true_false so the UI can highlight options. */
  correctAnswerIds?: string[];
};

export type GradedAnswerView = GradedAnswer;

export type QuizListItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  questionCount: number;
  passScore: number;
};
