"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { userDailyActivity, userVocabularies, vocabularies } from "@/db/schema";
import { evaluateAchievements } from "@/features/progress/actions";
import { activityDateInTimezone } from "@/lib/activity-date";
import { generateId } from "@/lib/id";
import { requireUser } from "@/lib/session";
import { logger } from "@/lib/logger";
import {
  createManualVocabularySchema,
  toggleLearnedSchema,
  vocabularyIdSchema,
  type CreateManualVocabularyInput,
} from "./schemas";

type ActionResult<T = void> =
  | (T extends void ? { ok: true } : { ok: true; data: T })
  | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Link the current user to an existing vocabulary row — never copies word
 * content (spec §13). Idempotent via unique `(user_id, vocabulary_id)`.
 */
export async function saveVocabulary(vocabularyId: string): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = vocabularyIdSchema.safeParse({ vocabularyId });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  try {
    const [exists] = await db
      .select({ id: vocabularies.id })
      .from(vocabularies)
      .where(eq(vocabularies.id, parsed.data.vocabularyId))
      .limit(1);

    if (!exists) {
      return { ok: false, error: "Vocabulary not found." };
    }

    const inserted = await db
      .insert(userVocabularies)
      .values({
        id: generateId(),
        userId: user.id,
        vocabularyId: parsed.data.vocabularyId,
      })
      .onConflictDoNothing({
        target: [userVocabularies.userId, userVocabularies.vocabularyId],
      })
      .returning({ id: userVocabularies.id });

    if (inserted.length > 0) {
      await incrementDailyWordsSaved(user.id, user.timezone ?? "Asia/Ho_Chi_Minh");
      await evaluateAchievements(user.id);
    }

    revalidatePath("/vocabulary");
    revalidatePath("/dashboard");
    revalidatePath("/progress");
    return { ok: true };
  } catch (error) {
    logger.error("saveVocabulary failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Create a learner-owned vocabulary row and link it to the current user.
 * Uniqueness is `(word, created_by_user_id)` for manual rows only.
 */
export async function createManualVocabulary(
  input: CreateManualVocabularyInput,
): Promise<ActionResult<{ vocabularyId: string }>> {
  const user = await requireUser();
  const parsed = createManualVocabularySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const word = parsed.data.word.trim();
  const meaning = parsed.data.meaning.trim();
  const phonetic = parsed.data.phonetic.trim();
  const pronunciation =
    parsed.data.pronunciation?.trim() || phonetic.replace(/^\/|\/$/g, "");
  const exampleSentence = parsed.data.exampleSentence?.trim() || "";

  try {
    const [existing] = await db
      .select({ id: vocabularies.id })
      .from(vocabularies)
      .where(
        and(
          eq(vocabularies.word, word),
          eq(vocabularies.isManual, true),
          eq(vocabularies.createdByUserId, user.id),
        ),
      )
      .limit(1);

    if (existing) {
      return {
        ok: false,
        error: "You've already added this word. Search your vocabulary list.",
      };
    }

    const vocabularyId = generateId();

    await db.insert(vocabularies).values({
      id: vocabularyId,
      word,
      pronunciation,
      phonetic,
      partOfSpeech: parsed.data.partOfSpeech,
      meaning,
      exampleSentence,
      audioUrl: null,
      difficulty: "medium",
      isManual: true,
      createdByUserId: user.id,
    });

    await db.insert(userVocabularies).values({
      id: generateId(),
      userId: user.id,
      vocabularyId,
    });

    await incrementDailyWordsSaved(user.id, user.timezone ?? "Asia/Ho_Chi_Minh");
    await evaluateAchievements(user.id);

    revalidatePath("/vocabulary");
    revalidatePath("/dashboard");
    revalidatePath("/progress");
    return { ok: true, data: { vocabularyId } };
  } catch (error) {
    logger.error("createManualVocabulary failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Remove a word from the user's personal list. Ownership is enforced by
 * scoping the delete to `user.id` (spec §34) — another user's save is a no-op
 * rejection, not a cross-user delete.
 *
 * Manual words owned by the user are deleted from `vocabularies` so the
 * `(word, creator)` unique slot frees up for a later re-add.
 */
export async function removeVocabulary(vocabularyId: string): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = vocabularyIdSchema.safeParse({ vocabularyId });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  try {
    const [owned] = await db
      .select({
        linkId: userVocabularies.id,
        isManual: vocabularies.isManual,
        createdByUserId: vocabularies.createdByUserId,
      })
      .from(userVocabularies)
      .innerJoin(vocabularies, eq(vocabularies.id, userVocabularies.vocabularyId))
      .where(
        and(
          eq(userVocabularies.userId, user.id),
          eq(userVocabularies.vocabularyId, parsed.data.vocabularyId),
        ),
      )
      .limit(1);

    if (!owned) {
      return { ok: false, error: "Vocabulary not found in your list." };
    }

    if (owned.isManual && owned.createdByUserId === user.id) {
      await db.delete(vocabularies).where(eq(vocabularies.id, parsed.data.vocabularyId));
    } else {
      await db
        .delete(userVocabularies)
        .where(
          and(
            eq(userVocabularies.userId, user.id),
            eq(userVocabularies.vocabularyId, parsed.data.vocabularyId),
          ),
        );
    }

    revalidatePath("/vocabulary");
    revalidatePath("/dashboard");
    revalidatePath("/progress");
    return { ok: true };
  } catch (error) {
    logger.error("removeVocabulary failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Mark / unmark learned. Sets `learned_at` when learning; clears it when
 * unlearning. Bumps `review_count` on learn (Phase 1 minimum — no SRS).
 */
export async function toggleLearned(
  vocabularyId: string,
  isLearned: boolean,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = toggleLearnedSchema.safeParse({ vocabularyId, isLearned });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const now = new Date();

  try {
    const updated = await db
      .update(userVocabularies)
      .set({
        isLearned: parsed.data.isLearned,
        learnedAt: parsed.data.isLearned ? now : null,
        ...(parsed.data.isLearned
          ? {
              reviewCount: sql`${userVocabularies.reviewCount} + 1`,
              lastReviewedAt: now,
            }
          : {}),
        updatedAt: now,
      })
      .where(
        and(
          eq(userVocabularies.userId, user.id),
          eq(userVocabularies.vocabularyId, parsed.data.vocabularyId),
        ),
      )
      .returning({ id: userVocabularies.id });

    if (updated.length === 0) {
      return { ok: false, error: "Vocabulary not found in your list." };
    }

    revalidatePath("/vocabulary");
    revalidatePath("/dashboard");
    revalidatePath("/progress");
    return { ok: true };
  } catch (error) {
    logger.error("toggleLearned failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Minimal review bump on Play (spec §16 / Phase 09 note). No SRS scheduling.
 */
export async function recordVocabularyReview(vocabularyId: string): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = vocabularyIdSchema.safeParse({ vocabularyId });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const now = new Date();

  try {
    await db
      .update(userVocabularies)
      .set({
        reviewCount: sql`${userVocabularies.reviewCount} + 1`,
        lastReviewedAt: now,
        updatedAt: now,
      })
      .where(
        and(
          eq(userVocabularies.userId, user.id),
          eq(userVocabularies.vocabularyId, parsed.data.vocabularyId),
        ),
      );

    return { ok: true };
  } catch (error) {
    logger.error("recordVocabularyReview failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

async function incrementDailyWordsSaved(userId: string, timezone: string) {
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
      wordsSaved: 1,
      quizzesCompleted: 0,
    })
    .onConflictDoUpdate({
      target: [userDailyActivity.userId, userDailyActivity.activityDate],
      set: {
        wordsSaved: sql`${userDailyActivity.wordsSaved} + 1`,
        updatedAt: now,
      },
    });
}
