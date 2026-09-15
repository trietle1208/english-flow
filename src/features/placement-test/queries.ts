import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  placementTestAttempts,
  placementTestQuestions,
  placementTests,
} from "@/db/schema";
import type { PlacementTestOption } from "@/db/schema/placement-test";
import type {
  PlacementResultView,
  PlacementTestForAttempt,
} from "./types";

const DEFAULT_SLUG = "general-placement-test";

/**
 * Load the placement test for the runner. Correctness flags are stripped
 * from options; fill_blank accepted answers are omitted entirely.
 */
export async function getPlacementTestForAttempt(
  slug = DEFAULT_SLUG,
): Promise<PlacementTestForAttempt | null> {
  const [test] = await db
    .select({
      id: placementTests.id,
      slug: placementTests.slug,
      title: placementTests.title,
      description: placementTests.description,
    })
    .from(placementTests)
    .where(eq(placementTests.slug, slug))
    .limit(1);

  if (!test) {
    return null;
  }

  const rows = await db
    .select({
      id: placementTestQuestions.id,
      orderIndex: placementTestQuestions.orderIndex,
      level: placementTestQuestions.level,
      type: placementTestQuestions.type,
      prompt: placementTestQuestions.prompt,
      points: placementTestQuestions.points,
      options: placementTestQuestions.options,
    })
    .from(placementTestQuestions)
    .where(eq(placementTestQuestions.placementTestId, test.id))
    .orderBy(asc(placementTestQuestions.orderIndex));

  return {
    ...test,
    questionCount: rows.length,
    questions: rows.map((row) => {
      const options = (row.options ?? []) as PlacementTestOption[];
      return {
        id: row.id,
        orderIndex: row.orderIndex,
        level: row.level,
        type: row.type,
        prompt: row.prompt,
        points: row.points,
        options:
          row.type === "fill_blank"
            ? []
            : options.map((opt, index) => ({
                index,
                content: opt.content,
              })),
      };
    }),
  };
}

/** Latest completed attempt for the signed-in user (settings / retake UI). */
export async function getLatestPlacementResult(
  userId: string,
): Promise<PlacementResultView | null> {
  const [row] = await db
    .select({
      attemptId: placementTestAttempts.id,
      score: placementTestAttempts.score,
      estimatedLevel: placementTestAttempts.estimatedLevel,
      completedAt: placementTestAttempts.completedAt,
      answers: placementTestAttempts.answers,
    })
    .from(placementTestAttempts)
    .where(eq(placementTestAttempts.userId, userId))
    .orderBy(desc(placementTestAttempts.completedAt))
    .limit(1);

  if (!row) {
    return null;
  }

  const answers = Array.isArray(row.answers) ? row.answers : [];
  const correctCount = answers.filter(
    (a) => a && typeof a === "object" && "isCorrect" in a && Boolean(a.isCorrect),
  ).length;

  return {
    attemptId: row.attemptId,
    score: row.score,
    estimatedLevel: row.estimatedLevel,
    correctCount,
    totalQuestions: answers.length,
    completedAt: row.completedAt,
  };
}
