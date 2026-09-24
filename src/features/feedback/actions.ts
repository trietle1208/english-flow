"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { feedbacks } from "@/db/schema";
import { logger } from "@/lib/logger";
import { requireUser } from "@/lib/session";
import { submitFeedbackSchema } from "./schemas";

type ActionResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = "Có lỗi xảy ra. Vui lòng thử lại.";

/**
 * Persist one Góp Ý note for the signed-in user (AD-06). Identity comes
 * from `requireUser()` — the client never supplies `userId`.
 */
export async function submitFeedback(input: unknown): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = submitFeedbackSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? GENERIC_ERROR,
    };
  }

  try {
    await db.insert(feedbacks).values({
      userId: user.id,
      category: parsed.data.category,
      rating: parsed.data.rating,
      title: parsed.data.title,
      message: parsed.data.message,
      isPublic: parsed.data.isPublic,
    });

    revalidatePath("/feedback");
    return { ok: true };
  } catch (error) {
    logger.error("submitFeedback failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
