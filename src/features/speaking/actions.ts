"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { speakingPrompts, userSpeakingAttempts } from "@/db/schema";
import { logger } from "@/lib/logger";
import { requireUser } from "@/lib/session";
import { compareTranscript } from "./compare";
import { submitSpeakingAttemptSchema } from "./schemas";

type SubmitSpeakingAttemptResult = {
  overlapPercent: number;
};

type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Persist one read-aloud attempt. Overlap is always recomputed here from
 * the stored prompt — the client never supplies the score.
 */
export async function submitSpeakingAttempt(input: unknown): Promise<ActionResult<SubmitSpeakingAttemptResult>> {
  const user = await requireUser();
  const parsed = submitSpeakingAttemptSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const { promptId, recognizedText } = parsed.data;

  try {
    const [prompt] = await db
      .select({ id: speakingPrompts.id, promptText: speakingPrompts.promptText })
      .from(speakingPrompts)
      .where(eq(speakingPrompts.id, promptId))
      .limit(1);

    if (!prompt) {
      return { ok: false, error: "Prompt not found." };
    }

    const overlapPercent = compareTranscript(prompt.promptText, recognizedText);

    await db.insert(userSpeakingAttempts).values({
      userId: user.id,
      promptId: prompt.id,
      recognizedText,
      overlapPercent,
    });

    revalidatePath("/speaking");
    revalidatePath(`/speaking/${prompt.id}`);
    return { ok: true, data: { overlapPercent } };
  } catch (error) {
    logger.error("submitSpeakingAttempt failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
