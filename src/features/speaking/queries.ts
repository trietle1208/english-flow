import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { speakingPrompts, userSpeakingAttempts } from "@/db/schema";
import type { SpeakingPromptDetail, SpeakingPromptListItem } from "./types";

export async function listSpeakingPrompts(userId: string): Promise<SpeakingPromptListItem[]> {
  const lastOverlapSql = sql<number | null>`(
    select overlap_percent
    from user_speaking_attempts
    where user_speaking_attempts.prompt_id = speaking_prompts.id
      and user_speaking_attempts.user_id = ${userId}
    order by created_at desc
    limit 1
  )`;

  const attemptCountSql = sql<number>`(
    select count(*)::int
    from user_speaking_attempts
    where user_speaking_attempts.prompt_id = speaking_prompts.id
      and user_speaking_attempts.user_id = ${userId}
  )`;

  const rows = await db
    .select({
      id: speakingPrompts.id,
      slug: speakingPrompts.slug,
      title: speakingPrompts.title,
      cefrLevel: speakingPrompts.cefrLevel,
      difficulty: speakingPrompts.difficulty,
      lastOverlapPercent: lastOverlapSql,
      attemptCount: attemptCountSql,
    })
    .from(speakingPrompts)
    .orderBy(asc(speakingPrompts.cefrLevel), asc(speakingPrompts.title));

  return rows.map((row) => ({
    ...row,
    lastOverlapPercent: row.lastOverlapPercent ?? null,
    attemptCount: Number(row.attemptCount),
  }));
}

export async function getSpeakingPromptTitle(promptId: string): Promise<string | null> {
  const [row] = await db
    .select({ title: speakingPrompts.title })
    .from(speakingPrompts)
    .where(eq(speakingPrompts.id, promptId))
    .limit(1);
  return row?.title ?? null;
}

export async function getSpeakingPromptDetail(
  promptId: string,
  userId: string,
): Promise<SpeakingPromptDetail | null> {
  const [prompt] = await db
    .select({
      id: speakingPrompts.id,
      slug: speakingPrompts.slug,
      title: speakingPrompts.title,
      promptText: speakingPrompts.promptText,
      cefrLevel: speakingPrompts.cefrLevel,
      difficulty: speakingPrompts.difficulty,
      audioUrl: speakingPrompts.audioUrl,
    })
    .from(speakingPrompts)
    .where(eq(speakingPrompts.id, promptId))
    .limit(1);

  if (!prompt) {
    return null;
  }

  const [attempt] = await db
    .select({
      recognizedText: userSpeakingAttempts.recognizedText,
      overlapPercent: userSpeakingAttempts.overlapPercent,
      createdAt: userSpeakingAttempts.createdAt,
    })
    .from(userSpeakingAttempts)
    .where(
      and(eq(userSpeakingAttempts.userId, userId), eq(userSpeakingAttempts.promptId, promptId)),
    )
    .orderBy(desc(userSpeakingAttempts.createdAt))
    .limit(1);

  return {
    ...prompt,
    lastAttempt: attempt ?? null,
  };
}
