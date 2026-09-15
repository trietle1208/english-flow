import { and, asc, count, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { quizAnswers, quizAttempts, quizQuestions, quizzes } from "@/db/schema";
import type {
  QuizAttemptAnswerSnapshot,
  QuizAttemptDetail,
  QuizForAttempt,
  QuizListItem,
} from "./types";

/**
 * Load a quiz for the runner UI. Correctness flags are intentionally omitted
 * — scoring happens server-side (spec §34 / after_submit).
 */
export async function getQuizForAttempt(quizId: string): Promise<QuizForAttempt | null> {
  const [quiz] = await db
    .select({
      id: quizzes.id,
      title: quizzes.title,
      description: quizzes.description,
      passScore: quizzes.passScore,
      revealMode: quizzes.revealMode,
      timeLimitSeconds: quizzes.timeLimitSeconds,
    })
    .from(quizzes)
    .where(eq(quizzes.id, quizId))
    .limit(1);

  if (!quiz) {
    return null;
  }

  const questions = await db
    .select({
      id: quizQuestions.id,
      orderIndex: quizQuestions.orderIndex,
      type: quizQuestions.type,
      prompt: quizQuestions.prompt,
      points: quizQuestions.points,
    })
    .from(quizQuestions)
    .where(eq(quizQuestions.quizId, quizId))
    .orderBy(asc(quizQuestions.orderIndex));

  if (questions.length === 0) {
    return { ...quiz, questions: [] };
  }

  const questionIds = questions.map((q) => q.id);
  const answerRows = await db
    .select({
      id: quizAnswers.id,
      questionId: quizAnswers.questionId,
      orderIndex: quizAnswers.orderIndex,
      content: quizAnswers.content,
    })
    .from(quizAnswers)
    .where(inArray(quizAnswers.questionId, questionIds))
    .orderBy(asc(quizAnswers.orderIndex));

  const answersByQuestion = new Map<string, { id: string; content: string }[]>();
  for (const row of answerRows) {
    const list = answersByQuestion.get(row.questionId) ?? [];
    list.push({ id: row.id, content: row.content });
    answersByQuestion.set(row.questionId, list);
  }

  return {
    ...quiz,
    questions: questions.map((q) => ({
      id: q.id,
      orderIndex: q.orderIndex,
      type: q.type,
      prompt: q.prompt,
      points: q.points,
      // fill_blank accepted strings never leave the server before submit.
      answers: q.type === "fill_blank" ? [] : (answersByQuestion.get(q.id) ?? []),
    })),
  };
}

/** Lightweight title lookup for metadata / links. */
export async function getQuizTitle(quizId: string): Promise<string | null> {
  const [row] = await db
    .select({ title: quizzes.title })
    .from(quizzes)
    .where(eq(quizzes.id, quizId))
    .limit(1);
  return row?.title ?? null;
}

/**
 * Attempt detail for `/quiz/[quizId]/result`. Returns `null` when missing or
 * not owned by `userId` (spec §34 — never leak another user's attempt).
 */
export async function getQuizAttemptForOwner(
  attemptId: string,
  userId: string,
): Promise<QuizAttemptDetail | null> {
  const [row] = await db
    .select({
      id: quizAttempts.id,
      quizId: quizAttempts.quizId,
      quizTitle: quizzes.title,
      score: quizAttempts.score,
      correctCount: quizAttempts.correctCount,
      totalQuestions: quizAttempts.totalQuestions,
      timeSpentSeconds: quizAttempts.timeSpentSeconds,
      answers: quizAttempts.answers,
      startedAt: quizAttempts.startedAt,
      completedAt: quizAttempts.completedAt,
      passScore: quizzes.passScore,
      userId: quizAttempts.userId,
    })
    .from(quizAttempts)
    .innerJoin(quizzes, eq(quizzes.id, quizAttempts.quizId))
    .where(and(eq(quizAttempts.id, attemptId), eq(quizAttempts.userId, userId)))
    .limit(1);

  if (!row) {
    return null;
  }

  const answers = normalizeAttemptAnswers(row.answers);
  const incorrectCount = Math.max(0, row.totalQuestions - row.correctCount);
  const accuracy =
    row.totalQuestions === 0
      ? 0
      : Math.round((row.correctCount / row.totalQuestions) * 100);

  return {
    id: row.id,
    quizId: row.quizId,
    quizTitle: row.quizTitle,
    score: row.score,
    correctCount: row.correctCount,
    incorrectCount,
    totalQuestions: row.totalQuestions,
    accuracy,
    timeSpentSeconds: row.timeSpentSeconds,
    passed: row.score >= row.passScore,
    passScore: row.passScore,
    answers,
    startedAt: row.startedAt,
    completedAt: row.completedAt,
  };
}

/** Catalog of quizzes for `/quiz` index. */
export async function listQuizzes(): Promise<QuizListItem[]> {
  const rows = await db
    .select({
      id: quizzes.id,
      slug: quizzes.slug,
      title: quizzes.title,
      description: quizzes.description,
      passScore: quizzes.passScore,
      questionCount: count(quizQuestions.id),
    })
    .from(quizzes)
    .leftJoin(quizQuestions, eq(quizQuestions.quizId, quizzes.id))
    .groupBy(quizzes.id)
    .orderBy(asc(quizzes.title));

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    passScore: row.passScore,
    questionCount: Number(row.questionCount),
  }));
}

function normalizeAttemptAnswers(raw: unknown): QuizAttemptAnswerSnapshot[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }
    const row = item as Record<string, unknown>;
    if (typeof row.questionId !== "string") {
      return [];
    }
    return [
      {
        questionId: row.questionId,
        selectedAnswerIds: Array.isArray(row.selectedAnswerIds)
          ? row.selectedAnswerIds.filter((id): id is string => typeof id === "string")
          : undefined,
        textAnswer: typeof row.textAnswer === "string" ? row.textAnswer : undefined,
        isCorrect: Boolean(row.isCorrect),
        prompt: typeof row.prompt === "string" ? row.prompt : "",
        type:
          row.type === "true_false" || row.type === "fill_blank" || row.type === "multiple_choice"
            ? row.type
            : "multiple_choice",
        explanation: typeof row.explanation === "string" ? row.explanation : "",
        userAnswerLabel: typeof row.userAnswerLabel === "string" ? row.userAnswerLabel : "",
        correctAnswerLabel:
          typeof row.correctAnswerLabel === "string" ? row.correctAnswerLabel : "",
      },
    ];
  });
}
