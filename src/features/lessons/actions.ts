"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { userDailyActivity, userProgress } from "@/db/schema";
import { getLessonAccess } from "@/features/courses/queries";
import { evaluateAchievements } from "@/features/progress/actions";
import { activityDateInTimezone } from "@/lib/activity-date";
import { generateId } from "@/lib/id";
import { requireUser } from "@/lib/session";
import { logger } from "@/lib/logger";
import { completeLessonSchema, updateLessonProgressSchema } from "./schemas";

type ActionResult<T = void> =
  | (T extends void ? { ok: true } : { ok: true; data: T })
  | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Marks a lesson `in_progress` when the learner opens it (acceptance:
 * opening a lesson flips `user_progress`). No-op if already completed.
 * Called from the lesson Server Component — not from the client.
 */
export async function startLessonProgress(lessonId: string): Promise<ActionResult> {
  const user = await requireUser();

  const access = await getLessonAccess(lessonId, user.id);
  if (access.kind === "not_found") {
    return { ok: false, error: "Lesson not found." };
  }
  if (access.kind === "locked") {
    return { ok: false, error: "Complete the previous lesson to unlock this one." };
  }

  try {
    const [existing] = await db
      .select({
        id: userProgress.id,
        status: userProgress.status,
      })
      .from(userProgress)
      .where(and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, lessonId)))
      .limit(1);

    if (existing?.status === "completed") {
      return { ok: true };
    }

    if (existing) {
      if (existing.status !== "in_progress") {
        await db
          .update(userProgress)
          .set({ status: "in_progress", updatedAt: new Date() })
          .where(eq(userProgress.id, existing.id));
      }
      return { ok: true };
    }

    await db.insert(userProgress).values({
      id: generateId(),
      userId: user.id,
      lessonId,
      status: "in_progress",
      progressPercent: 0,
    });

    return { ok: true };
  } catch (error) {
    logger.error("startLessonProgress failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Mark the lesson complete: upsert `user_progress`, bump today's
 * `lessons_completed`, revalidate course detail + dashboard. Next lesson
 * unlocks automatically via sequential rules once this row is `completed`.
 */
export async function completeLesson(
  lessonId: string,
): Promise<ActionResult<{ courseId: string }>> {
  const user = await requireUser();
  const parsed = completeLessonSchema.safeParse({ lessonId });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const access = await getLessonAccess(parsed.data.lessonId, user.id);
  if (access.kind === "not_found") {
    return { ok: false, error: "Lesson not found." };
  }
  if (access.kind === "locked") {
    return { ok: false, error: "Complete the previous lesson to unlock this one." };
  }

  const courseId = access.courseId;
  const now = new Date();

  try {
    const [existing] = await db
      .select({
        id: userProgress.id,
        status: userProgress.status,
      })
      .from(userProgress)
      .where(
        and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, parsed.data.lessonId)),
      )
      .limit(1);

    const alreadyCompleted = existing?.status === "completed";

    if (existing) {
      await db
        .update(userProgress)
        .set({
          status: "completed",
          progressPercent: 100,
          ...(alreadyCompleted ? {} : { completedAt: now }),
          updatedAt: now,
        })
        .where(eq(userProgress.id, existing.id));
    } else {
      await db.insert(userProgress).values({
        id: generateId(),
        userId: user.id,
        lessonId: parsed.data.lessonId,
        status: "completed",
        progressPercent: 100,
        completedAt: now,
      });
    }

    if (!alreadyCompleted) {
      await incrementDailyLessonsCompleted(user.id, user.timezone ?? "Asia/Ho_Chi_Minh");
      await evaluateAchievements(user.id);
    }

    revalidatePath(`/courses/${courseId}`);
    revalidatePath("/courses");
    revalidatePath("/dashboard");
    revalidatePath("/progress");
    revalidatePath(`/lessons/${parsed.data.lessonId}`);

    return { ok: true, data: { courseId } };
  } catch (error) {
    logger.error("completeLesson failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Scroll / block progress while studying. Never demotes a completed lesson
 * and never lowers an existing percent.
 */
export async function updateLessonProgress(
  lessonId: string,
  percent: number,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = updateLessonProgressSchema.safeParse({ lessonId, percent });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const access = await getLessonAccess(parsed.data.lessonId, user.id);
  if (access.kind === "not_found") {
    return { ok: false, error: "Lesson not found." };
  }
  if (access.kind === "locked") {
    return { ok: false, error: "Complete the previous lesson to unlock this one." };
  }

  try {
    const [existing] = await db
      .select({
        id: userProgress.id,
        status: userProgress.status,
        progressPercent: userProgress.progressPercent,
      })
      .from(userProgress)
      .where(
        and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, parsed.data.lessonId)),
      )
      .limit(1);

    if (existing?.status === "completed") {
      return { ok: true };
    }

    const nextPercent = Math.max(existing?.progressPercent ?? 0, parsed.data.percent);

    if (existing) {
      await db
        .update(userProgress)
        .set({
          status: "in_progress",
          progressPercent: nextPercent,
          updatedAt: new Date(),
        })
        .where(eq(userProgress.id, existing.id));
    } else {
      await db.insert(userProgress).values({
        id: generateId(),
        userId: user.id,
        lessonId: parsed.data.lessonId,
        status: "in_progress",
        progressPercent: nextPercent,
      });
    }

    return { ok: true };
  } catch (error) {
    logger.error("updateLessonProgress failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

async function incrementDailyLessonsCompleted(userId: string, timezone: string) {
  const activityDate = activityDateInTimezone(timezone);
  const now = new Date();

  await db
    .insert(userDailyActivity)
    .values({
      id: generateId(),
      userId,
      activityDate,
      minutes: 0,
      lessonsCompleted: 1,
      wordsSaved: 0,
      quizzesCompleted: 0,
    })
    .onConflictDoUpdate({
      target: [userDailyActivity.userId, userDailyActivity.activityDate],
      set: {
        lessonsCompleted: sql`${userDailyActivity.lessonsCompleted} + 1`,
        updatedAt: now,
      },
    });
}
