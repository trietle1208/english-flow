/**
 * Pure quiz scoring helpers — no React, no DB. Unit-testable in Phase 14 (Vitest).
 * Spec §19 / §20; fill-blank matching is trim + lowercase + multi-answer.
 */

import type { CefrLevel } from "@/config/cefr";

export type ScoreableAnswerOption = {
  id: string;
  content: string;
  isCorrect: boolean;
};

export type ScoreableQuestion = {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_blank";
  prompt: string;
  explanation: string;
  points: number;
  answers: ScoreableAnswerOption[];
};

export type SubmittedAnswer =
  | { questionId: string; selectedAnswerIds: string[] }
  | { questionId: string; textAnswer: string };

export type GradedAnswer = {
  questionId: string;
  selectedAnswerIds?: string[];
  textAnswer?: string;
  isCorrect: boolean;
  prompt: string;
  type: ScoreableQuestion["type"];
  explanation: string;
  userAnswerLabel: string;
  correctAnswerLabel: string;
  points: number;
  earnedPoints: number;
};

export type QuizScoreResult = {
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  maxPoints: number;
  earnedPoints: number;
  accuracy: number;
  graded: GradedAnswer[];
};

/** Normalize fill-blank input: trim, collapse whitespace, lowercase. */
export function normalizeBlankAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * True when the typed answer matches any accepted answer
 * (e.g. " Beautiful " ↔ "beautiful").
 */
export function isFillBlankCorrect(
  userAnswer: string,
  acceptedAnswers: readonly string[],
): boolean {
  const normalized = normalizeBlankAnswer(userAnswer);
  if (!normalized) {
    return false;
  }
  return acceptedAnswers.some((accepted) => normalizeBlankAnswer(accepted) === normalized);
}

/** Exact set match: same ids, order-independent. */
export function isSelectionCorrect(
  selectedAnswerIds: readonly string[],
  correctAnswerIds: readonly string[],
): boolean {
  if (selectedAnswerIds.length !== correctAnswerIds.length) {
    return false;
  }
  const correct = new Set(correctAnswerIds);
  return selectedAnswerIds.every((id) => correct.has(id));
}

export function computeAccuracy(correctCount: number, totalQuestions: number): number {
  if (totalQuestions <= 0) {
    return 0;
  }
  return Math.round((correctCount / totalQuestions) * 100);
}

export function computeScorePercent(earnedPoints: number, maxPoints: number): number {
  if (maxPoints <= 0) {
    return 0;
  }
  return Math.round((earnedPoints / maxPoints) * 100);
}

/**
 * Grade every submitted answer against the question bank.
 * Throws nothing — callers validate completeness / ownership first.
 */
export function scoreQuizAttempt(
  questions: ScoreableQuestion[],
  submitted: SubmittedAnswer[],
): QuizScoreResult {
  const submittedByQuestion = new Map(submitted.map((a) => [a.questionId, a]));
  const graded: GradedAnswer[] = [];
  let earnedPoints = 0;
  let maxPoints = 0;
  let correctCount = 0;

  for (const question of questions) {
    maxPoints += question.points;
    const answer = submittedByQuestion.get(question.id);
    const correctOptions = question.answers.filter((a) => a.isCorrect);
    const correctAnswerLabel = correctOptions.map((o) => o.content).join(" / ");

    if (!answer) {
      graded.push({
        questionId: question.id,
        isCorrect: false,
        prompt: question.prompt,
        type: question.type,
        explanation: question.explanation,
        userAnswerLabel: "",
        correctAnswerLabel,
        points: question.points,
        earnedPoints: 0,
      });
      continue;
    }

    if (question.type === "fill_blank") {
      const textAnswer = "textAnswer" in answer ? answer.textAnswer.trim() : "";
      const isCorrect = isFillBlankCorrect(
        textAnswer,
        correctOptions.map((o) => o.content),
      );
      if (isCorrect) {
        correctCount += 1;
        earnedPoints += question.points;
      }
      graded.push({
        questionId: question.id,
        textAnswer,
        isCorrect,
        prompt: question.prompt,
        type: question.type,
        explanation: question.explanation,
        userAnswerLabel: textAnswer,
        correctAnswerLabel,
        points: question.points,
        earnedPoints: isCorrect ? question.points : 0,
      });
      continue;
    }

    const selectedAnswerIds =
      "selectedAnswerIds" in answer ? answer.selectedAnswerIds : [];
    const selected = question.answers.filter((o) => selectedAnswerIds.includes(o.id));
    const userAnswerLabel = selected.map((o) => o.content).join(", ");
    const isCorrect = isSelectionCorrect(
      selectedAnswerIds,
      correctOptions.map((o) => o.id),
    );
    // Reject ids that don't belong to this question as incorrect.
    const allBelong = selected.length === selectedAnswerIds.length;

    const finalCorrect = isCorrect && allBelong;
    if (finalCorrect) {
      correctCount += 1;
      earnedPoints += question.points;
    }

    graded.push({
      questionId: question.id,
      selectedAnswerIds,
      isCorrect: finalCorrect,
      prompt: question.prompt,
      type: question.type,
      explanation: question.explanation,
      userAnswerLabel,
      correctAnswerLabel,
      points: question.points,
      earnedPoints: finalCorrect ? question.points : 0,
    });
  }

  const score = computeScorePercent(earnedPoints, maxPoints);
  const totalQuestions = questions.length;

  return {
    score,
    correctCount,
    incorrectCount: Math.max(0, totalQuestions - correctCount),
    totalQuestions,
    maxPoints,
    earnedPoints,
    accuracy: computeAccuracy(correctCount, totalQuestions),
    graded,
  };
}

export type PlacementLevelThreshold = {
  minScore: number;
  level: CefrLevel;
};

/**
 * Map a 0–100 score to a CEFR level. Thresholds are read top-to-bottom;
 * first match where `score >= minScore` wins (seed order: C1 → A1).
 */
export function scoreToCefrLevel(
  score: number,
  thresholds: readonly PlacementLevelThreshold[],
): CefrLevel {
  const sorted = [...thresholds].sort((a, b) => b.minScore - a.minScore);
  for (const row of sorted) {
    if (score >= row.minScore) {
      return row.level;
    }
  }
  return "A1";
}

/** Encouraging (but honest) headline for the result screen (spec §20). */
export function quizResultHeadline(score: number, passed: boolean): string {
  if (score >= 90) {
    return "Outstanding!";
  }
  if (score >= 80 || passed) {
    return "Great job!";
  }
  if (score >= 60) {
    return "Nice effort!";
  }
  if (score >= 40) {
    return "Keep practicing";
  }
  return "Don't give up";
}
