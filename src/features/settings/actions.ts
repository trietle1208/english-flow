"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { users } from "@/db/schema";
import { logger } from "@/lib/logger";
import { requireUser } from "@/lib/session";
import { updateSettingsSchema } from "./schemas";

type ActionResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Persist profile + learning preferences for the signed-in user only
 * (spec §22 / AD-06). Appearance (theme) stays client-side via next-themes.
 */
export async function updateSettings(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = updateSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? GENERIC_ERROR,
    };
  }

  const { name, cefrLevel, dailyGoalMinutes, preferredLearningTime } =
    parsed.data;

  try {
    await db
      .update(users)
      .set({
        name,
        cefrLevel,
        dailyGoalMinutes,
        preferredLearningTime,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    revalidatePath("/settings");
    revalidatePath("/dashboard");
    revalidatePath("/courses");
    revalidatePath("/progress");

    return { ok: true };
  } catch (error) {
    logger.error("updateSettings failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
