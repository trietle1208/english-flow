"use server";

import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import {
  quizAnswers,
  quizAttempts,
  quizQuestions,
  quizzes,
  userDailyActivity,
} from "@/db/schema";
import { evaluateAchievements } from "@/features/progress/actions";
import { activityDateInTimezone } from "@/lib/activity-date";
import { generateId } from "@/lib/id";
import { requireUser } from "@/lib/session";
import { logger } from "@/lib/logger";
import { scoreQuizAttempt } from "./engine";
import { gradeQuestionSchema, submitQuizAttemptSchema } from "./schemas";
import type {
  ImmediateGradeResult,
  QuizAttemptAnswerSnapshot,
  QuizQuestionResult,
  QuizSubmitResult,
} from "./types";

type ActionResult<T = void> =
  | (T extends void ? { ok: true } : { ok: true; data: T })
  | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

type SubmitOptions = {
  /** Paths to revalidate after a successful attempt (grammar / listening detail). */
  revalidatePaths?: string[];
};

/**
 * Score a quiz entirely on the server and persist a `quiz_attempts` row
 * (spec §19 / §20 / §34). Correct answers never leave the server until this returns.
 */
export async function submitQuizAttempt(
  input: unknown,
  options: SubmitOptions = {},
): Promise<ActionResult<QuizSubmitResult>> {
  const user = await requireUser();
  const parsed = submitQuizAttemptSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const { quizId, answers, timeSpentSeconds, startedAt } = parsed.data;

  try {
    const [quiz] = await db
      .select({
        id: quizzes.id,
        passScore: quizzes.passScore,
      })
      .from(quizzes)
      .where(eq(quizzes.id, quizId))
      .limit(1);

    if (!quiz) {
      return { ok: false, error: "Quiz not found." };
    }

    const scored = await loadAndScore(quizId, answers);
    if (!scored.ok) {
      return scored;
    }

    const { questions, result } = scored.data;
    const attemptId = generateId();
    const started = new Date(startedAt);
    const completedAt = new Date();

    const snapshot: QuizAttemptAnswerSnapshot[] = result.graded.map((g) => ({
      questionId: g.questionId,
      selectedAnswerIds: g.selectedAnswerIds,
      textAnswer: g.textAnswer,
      isCorrect: g.isCorrect,
      prompt: g.prompt,
      type: g.type,
      explanation: g.explanation,
      userAnswerLabel: g.userAnswerLabel,
      correctAnswerLabel: g.correctAnswerLabel,
    }));

    const results: QuizQuestionResult[] = result.graded.map((g) => ({
      questionId: g.questionId,
      prompt: g.prompt,
      type: g.type,
      explanation: g.explanation,
      isCorrect: g.isCorrect,
      userAnswerLabel: g.userAnswerLabel,
      correctAnswerLabel: g.correctAnswerLabel,
    }));

    await db.insert(quizAttempts).values({
      id: attemptId,
      userId: user.id,
      quizId,
      score: result.score,
      totalQuestions: questions.length,
      correctCount: result.correctCount,
      timeSpentSeconds,
      answers: snapshot,
      startedAt: Number.isNaN(started.getTime()) ? completedAt : started,
      completedAt,
    });

    await incrementDailyQuizzesCompleted(user.id, user.timezone ?? "Asia/Ho_Chi_Minh");
    await evaluateAchievements(user.id);

    for (const path of options.revalidatePaths ?? []) {
      revalidatePath(path);
    }
    revalidatePath(`/quiz/${quizId}`);
    revalidatePath("/quiz");
    revalidatePath("/dashboard");
    revalidatePath("/progress");

    return {
      ok: true,
      data: {
        attemptId,
        score: result.score,
        correctCount: result.correctCount,
        incorrectCount: result.incorrectCount,
        totalQuestions: questions.length,
        accuracy: result.accuracy,
        timeSpentSeconds,
        passed: result.score >= quiz.passScore,
        results,
      },
    };
  } catch (error) {
    logger.error("submitQuizAttempt failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/** Phase 11 deliverable alias for `submitQuizAttempt`. */
export async function submitQuiz(
  input: unknown,
  options: SubmitOptions = {},
): Promise<ActionResult<QuizSubmitResult>> {
  return submitQuizAttempt(input, options);
}

/**
 * Immediate-mode only: grade a single question so the runner can show
 * correct/incorrect + explanation without exposing the full answer key.
 * Rejected when the quiz uses `after_submit`.
 */
export async function gradeQuestion(
  input: unknown,
): Promise<ActionResult<ImmediateGradeResult>> {
  const user = await requireUser();
  void user;

  const parsed = gradeQuestionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const data = parsed.data;

  try {
    const [quiz] = await db
      .select({ id: quizzes.id, revealMode: quizzes.revealMode })
      .from(quizzes)
      .where(eq(quizzes.id, data.quizId))
      .limit(1);

    if (!quiz) {
      return { ok: false, error: "Quiz not found." };
    }

    if (quiz.revealMode !== "immediate") {
      return { ok: false, error: "Answers are revealed after you submit this quiz." };
    }

    const [question] = await db
      .select({
        id: quizQuestions.id,
        type: quizQuestions.type,
        prompt: quizQuestions.prompt,
        explanation: quizQuestions.explanation,
        points: quizQuestions.points,
      })
      .from(quizQuestions)
      .where(and(eq(quizQuestions.id, data.questionId), eq(quizQuestions.quizId, data.quizId)))
      .limit(1);

    if (!question) {
      return { ok: false, error: "Question not found." };
    }

    const answerRows = await db
      .select({
        id: quizAnswers.id,
        content: quizAnswers.content,
        isCorrect: quizAnswers.isCorrect,
      })
      .from(quizAnswers)
      .where(eq(quizAnswers.questionId, question.id))
      .orderBy(asc(quizAnswers.orderIndex));

    const submitted =
      "textAnswer" in data
        ? [{ questionId: question.id, textAnswer: data.textAnswer }]
        : [{ questionId: question.id, selectedAnswerIds: data.selectedAnswerIds }];

    const result = scoreQuizAttempt(
      [
        {
          id: question.id,
          type: question.type,
          prompt: question.prompt,
          explanation: question.explanation,
          points: question.points,
          answers: answerRows,
        },
      ],
      submitted,
    );

    const graded = result.graded[0];
    if (!graded) {
      return { ok: false, error: GENERIC_ERROR };
    }

    return {
      ok: true,
      data: {
        isCorrect: graded.isCorrect,
        explanation: graded.explanation,
        correctAnswerLabel: graded.correctAnswerLabel,
        userAnswerLabel: graded.userAnswerLabel,
        correctAnswerIds: answerRows.filter((a) => a.isCorrect).map((a) => a.id),
      },
    };
  } catch (error) {
    logger.error("gradeQuestion failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

async function loadAndScore(
  quizId: string,
  answers: { questionId: string; selectedAnswerIds?: string[]; textAnswer?: string }[],
): Promise<
  ActionResult<{
    questions: { id: string }[];
    result: ReturnType<typeof scoreQuizAttempt>;
  }>
> {
  const questions = await db
    .select({
      id: quizQuestions.id,
      type: quizQuestions.type,
      prompt: quizQuestions.prompt,
      explanation: quizQuestions.explanation,
      points: quizQuestions.points,
      orderIndex: quizQuestions.orderIndex,
    })
    .from(quizQuestions)
    .where(eq(quizQuestions.quizId, quizId))
    .orderBy(asc(quizQuestions.orderIndex));

  if (questions.length === 0) {
    return { ok: false, error: "This quiz has no questions yet." };
  }

  const submittedByQuestion = new Map(answers.map((a) => [a.questionId, a]));
  if (answers.length !== questions.length) {
    return { ok: false, error: "Please answer every question before submitting." };
  }
  for (const q of questions) {
    if (!submittedByQuestion.has(q.id)) {
      return { ok: false, error: "Please answer every question before submitting." };
    }
  }

  const questionIds = questions.map((q) => q.id);
  const answerRows = await db
    .select({
      id: quizAnswers.id,
      questionId: quizAnswers.questionId,
      content: quizAnswers.content,
      isCorrect: quizAnswers.isCorrect,
      orderIndex: quizAnswers.orderIndex,
    })
    .from(quizAnswers)
    .where(inArray(quizAnswers.questionId, questionIds))
    .orderBy(asc(quizAnswers.orderIndex));

  const answersByQuestion = new Map<string, typeof answerRows>();
  for (const row of answerRows) {
    const list = answersByQuestion.get(row.questionId) ?? [];
    list.push(row);
    answersByQuestion.set(row.questionId, list);
  }

  const scoreable = questions.map((q) => ({
    id: q.id,
    type: q.type,
    prompt: q.prompt,
    explanation: q.explanation,
    points: q.points,
    answers: (answersByQuestion.get(q.id) ?? []).map((a) => ({
      id: a.id,
      content: a.content,
      isCorrect: a.isCorrect,
    })),
  }));

  const submitted = answers.map((a) => {
    if ("textAnswer" in a && a.textAnswer !== undefined) {
      return { questionId: a.questionId, textAnswer: a.textAnswer };
    }
    return {
      questionId: a.questionId,
      selectedAnswerIds: a.selectedAnswerIds ?? [],
    };
  });

  // Validate fill_blank vs selection shape against question type.
  for (const q of questions) {
    const submittedAnswer = submittedByQuestion.get(q.id)!;
    if (q.type === "fill_blank") {
      if (!("textAnswer" in submittedAnswer) || submittedAnswer.textAnswer === undefined) {
        return { ok: false, error: "Please answer every question before submitting." };
      }
    } else if (
      !("selectedAnswerIds" in submittedAnswer) ||
      !submittedAnswer.selectedAnswerIds?.length
    ) {
      return { ok: false, error: "Please answer every question before submitting." };
    } else {
      const options = answersByQuestion.get(q.id) ?? [];
      const optionIds = new Set(options.map((o) => o.id));
      for (const id of submittedAnswer.selectedAnswerIds) {
        if (!optionIds.has(id)) {
          return { ok: false, error: "Invalid answer selection." };
        }
      }
    }
  }

  return {
    ok: true,
    data: {
      questions,
      result: scoreQuizAttempt(scoreable, submitted),
    },
  };
}

async function incrementDailyQuizzesCompleted(userId: string, timezone: string) {
  const activityDate = activityDateInTimezone(timezone);
  const now = new Date();

  await db
    .insert(userDailyActivity)
    .values({
      id: generateId(),
      userId,
      activityDate,
      minutes: 0,
      lessonsCompleted: 0,
      wordsSaved: 0,
      quizzesCompleted: 1,
    })
    .onConflictDoUpdate({
      target: [userDailyActivity.userId, userDailyActivity.activityDate],
      set: {
        quizzesCompleted: sql`${userDailyActivity.quizzesCompleted} + 1`,
        updatedAt: now,
      },
    });
}
