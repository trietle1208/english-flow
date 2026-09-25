"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import {
  placementTestAttempts,
  placementTestQuestions,
  placementTests,
  users,
} from "@/db/schema";
import type { PlacementTestOption } from "@/db/schema/placement-test";
import { placementScoreToLevel } from "@/features/placement-test/thresholds";
import {
  isFillBlankCorrect,
  scoreToCefrLevel,
} from "@/features/quiz/engine";
import { generateId } from "@/lib/id";
import { refreshSessionCache, requireUser } from "@/lib/session";
import { logger } from "@/lib/logger";
import { submitPlacementTestSchema } from "./schemas";
import type {
  PlacementAttemptAnswerSnapshot,
  PlacementSubmitResult,
} from "./types";

type ActionResult<T = void> =
  | (T extends void ? { ok: true } : { ok: true; data: T })
  | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Score the placement test, store the attempt, and update `users.cefr_level`
 * (spec §8).
 */
export async function submitPlacementTest(
  input: unknown,
): Promise<ActionResult<PlacementSubmitResult>> {
  const user = await requireUser();
  const parsed = submitPlacementTestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const { placementTestId, answers, startedAt } = parsed.data;

  try {
    const [test] = await db
      .select({ id: placementTests.id })
      .from(placementTests)
      .where(eq(placementTests.id, placementTestId))
      .limit(1);

    if (!test) {
      return { ok: false, error: "Placement test not found." };
    }

    const questions = await db
      .select({
        id: placementTestQuestions.id,
        type: placementTestQuestions.type,
        prompt: placementTestQuestions.prompt,
        points: placementTestQuestions.points,
        options: placementTestQuestions.options,
        orderIndex: placementTestQuestions.orderIndex,
      })
      .from(placementTestQuestions)
      .where(eq(placementTestQuestions.placementTestId, placementTestId))
      .orderBy(asc(placementTestQuestions.orderIndex));

    if (questions.length === 0) {
      return { ok: false, error: "This placement test has no questions yet." };
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

    const snapshot: PlacementAttemptAnswerSnapshot[] = [];
    let earnedPoints = 0;
    let maxPoints = 0;
    let correctCount = 0;

    for (const question of questions) {
      maxPoints += question.points;
      const options = (question.options ?? []) as PlacementTestOption[];
      const correctOptions = options.filter((o) => o.isCorrect);
      const correctAnswerLabel = correctOptions.map((o) => o.content).join(" / ");
      const submitted = submittedByQuestion.get(question.id)!;

      let isCorrect = false;
      let userAnswerLabel = "";
      let selectedOptionIndex: number | undefined;
      let textAnswer: string | undefined;

      if (question.type === "fill_blank") {
        if (!("textAnswer" in submitted)) {
          return { ok: false, error: "Please answer every question before submitting." };
        }
        textAnswer = submitted.textAnswer.trim();
        userAnswerLabel = textAnswer;
        isCorrect = isFillBlankCorrect(
          textAnswer,
          correctOptions.map((o) => o.content),
        );
      } else {
        if (!("selectedOptionIndex" in submitted)) {
          return { ok: false, error: "Please answer every question before submitting." };
        }
        selectedOptionIndex = submitted.selectedOptionIndex;
        const chosen = options[selectedOptionIndex];
        if (!chosen) {
          return { ok: false, error: "Invalid answer selection." };
        }
        userAnswerLabel = chosen.content;
        isCorrect = Boolean(chosen.isCorrect);
      }

      if (isCorrect) {
        correctCount += 1;
        earnedPoints += question.points;
      }

      snapshot.push({
        questionId: question.id,
        selectedOptionIndex,
        textAnswer,
        isCorrect,
        prompt: question.prompt,
        userAnswerLabel,
        correctAnswerLabel,
      });
    }

    const score =
      maxPoints === 0 ? 0 : Math.round((earnedPoints / maxPoints) * 100);
    const estimatedLevel = scoreToCefrLevel(score, placementScoreToLevel);
    const attemptId = generateId();
    const started = new Date(startedAt);
    const completedAt = new Date();

    await db.insert(placementTestAttempts).values({
      id: attemptId,
      userId: user.id,
      placementTestId,
      score,
      estimatedLevel,
      answers: snapshot,
      startedAt: Number.isNaN(started.getTime()) ? completedAt : started,
      completedAt,
    });

    await db
      .update(users)
      .set({
        cefrLevel: estimatedLevel,
        onboardedAt: user.onboardedAt ?? completedAt,
        updatedAt: completedAt,
      })
      .where(eq(users.id, user.id));
    await refreshSessionCache();

    revalidatePath("/placement-test");
    revalidatePath("/courses");
    revalidatePath("/dashboard");
    revalidatePath("/settings");

    return {
      ok: true,
      data: {
        attemptId,
        score,
        estimatedLevel,
        correctCount,
        totalQuestions: questions.length,
      },
    };
  } catch (error) {
    logger.error("submitPlacementTest failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
