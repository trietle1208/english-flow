"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { userAchievements, users } from "@/db/schema";
import { generateId } from "@/lib/id";
import { ACHIEVEMENTS } from "./achievements";
import { getAchievementStats } from "./queries";

/**
 * Check achievement definitions against live stats and insert any newly
 * unlocked keys into `user_achievements`. Idempotent via unique
 * `(user_id, achievement_key)`. Call after lesson complete / vocab save /
 * quiz submit (and study-time heartbeats that may extend a streak).
 */
export async function evaluateAchievements(userId: string): Promise<string[]> {
  const [userRow] = await db
    .select({ timezone: users.timezone })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const timezone = userRow?.timezone ?? "Asia/Ho_Chi_Minh";
  const stats = await getAchievementStats(userId, timezone);

  const existing = await db
    .select({ key: userAchievements.achievementKey })
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));

  const have = new Set(existing.map((r) => r.key));
  const unlocked: string[] = [];

  for (const def of ACHIEVEMENTS) {
    if (have.has(def.key)) continue;
    if (!def.check(stats)) continue;

    await db
      .insert(userAchievements)
      .values({
        id: generateId(),
        userId,
        achievementKey: def.key,
      })
      .onConflictDoNothing({
        target: [userAchievements.userId, userAchievements.achievementKey],
      });

    unlocked.push(def.key);
  }

  if (unlocked.length > 0) {
    revalidatePath("/progress");
    revalidatePath("/dashboard");
  }

  return unlocked;
}
