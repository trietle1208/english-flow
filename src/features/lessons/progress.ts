import { notInArray } from "drizzle-orm";
import { db } from "@/db";
import { userProgress } from "@/db/schema";
import { generateId } from "@/lib/id";

/**
 * Flips `user_progress` to `in_progress` when the learner opens a lesson
 * (Phase 08 acceptance). Never demotes `completed` or rewrites an existing
 * `in_progress` row. One upsert on the `(user_id, lesson_id)` unique key, so
 * two tabs opening the same lesson can't race into a duplicate insert.
 *
 * Deliberately NOT a Server Action: it takes `userId` as an argument, so it
 * must only be called from server code that already ran `requireUser()` and
 * the `getLessonAccess` unlock gate (the lesson page does both).
 */
export async function markLessonInProgress(userId: string, lessonId: string): Promise<void> {
  await db
    .insert(userProgress)
    .values({
      id: generateId(),
      userId,
      lessonId,
      status: "in_progress",
      progressPercent: 0,
    })
    .onConflictDoUpdate({
      target: [userProgress.userId, userProgress.lessonId],
      set: { status: "in_progress", updatedAt: new Date() },
      setWhere: notInArray(userProgress.status, ["in_progress", "completed"]),
    });
}
