"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { userDailyActivity, users } from "@/db/schema";
import { evaluateAchievements } from "@/features/progress/actions";
import { activityDateInTimezone } from "@/lib/activity-date";
import { generateId } from "@/lib/id";
import { requireUser } from "@/lib/session";
import { logger } from "@/lib/logger";

type ActionResult = { ok: true; data?: { minutesAdded: number } } | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

/** Max minutes credited for a single heartbeat (AD-08 anti-abuse). */
const MAX_MINUTES_PER_HEARTBEAT = 2;

/**
 * Process-local last-heartbeat timestamps. AD-08 caps each heartbeat at 2
 * minutes based on the previous write — `user_daily_activity.updated_at` is
 * shared with lesson/quiz counters, so a dedicated in-memory stamp avoids
 * those writes resetting the anti-abuse window. Fine for Phase 1's single
 * Node process (Docker / `next start`); multi-instance deploys can move this
 * to Redis later without changing the client hook.
 */
const lastHeartbeatAtByUser = new Map<string, number>();

/**
 * Client heartbeats every 60s while the study tab is visible. Server decides
 * how many minutes to add (never trusts a client-supplied amount) and refuses
 * to credit more than {@link MAX_MINUTES_PER_HEARTBEAT} per call.
 */
export async function recordStudyTime(): Promise<ActionResult> {
  const user = await requireUser();
  const now = Date.now();

  try {
    const last = lastHeartbeatAtByUser.get(user.id);
    let minutesToAdd = 1;

    if (last !== undefined) {
      const elapsedMs = now - last;
      // Ignore spammy calls (<30s apart) without erroring — tab flicker / double mount.
      if (elapsedMs < 30_000) {
        return { ok: true, data: { minutesAdded: 0 } };
      }
      minutesToAdd = Math.min(
        MAX_MINUTES_PER_HEARTBEAT,
        Math.max(1, Math.floor(elapsedMs / 60_000)),
      );
    }

    lastHeartbeatAtByUser.set(user.id, now);

    const timezone = await resolveTimezone(user.id, user.timezone);
    const activityDate = activityDateInTimezone(timezone);
    const updatedAt = new Date();

    await db
      .insert(userDailyActivity)
      .values({
        id: generateId(),
        userId: user.id,
        activityDate,
        minutes: minutesToAdd,
        lessonsCompleted: 0,
        wordsSaved: 0,
        quizzesCompleted: 0,
      })
      .onConflictDoUpdate({
        target: [userDailyActivity.userId, userDailyActivity.activityDate],
        set: {
          minutes: sql`${userDailyActivity.minutes} + ${minutesToAdd}`,
          updatedAt,
        },
      });

    // Streak achievements may unlock when today's minutes first cross the active threshold.
    if (minutesToAdd > 0) {
      await evaluateAchievements(user.id);
    }

    return { ok: true, data: { minutesAdded: minutesToAdd } };
  } catch (error) {
    logger.error("recordStudyTime failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

async function resolveTimezone(
  userId: string,
  sessionTimezone: string | null | undefined,
): Promise<string> {
  if (sessionTimezone) {
    return sessionTimezone;
  }

  const [row] = await db
    .select({ timezone: users.timezone })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return row?.timezone ?? "Asia/Ho_Chi_Minh";
}
