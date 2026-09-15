import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { grammarTopics, quizAttempts } from "@/db/schema";
import { grammarContentSchema } from "@/db/schema/grammar";
import { getQuizForAttempt } from "@/features/quiz/queries";
import { logger } from "@/lib/logger";
import type { GrammarTopicDetail, GrammarTopicListItem } from "./types";

/**
 * All grammar topics ordered for the catalog, grouped client-side by CEFR
 * level. Completion is derived from `quiz_attempts` (no separate progress
 * table for grammar).
 */
export async function listGrammarTopics(
  userId: string,
): Promise<GrammarTopicListItem[]> {
  const completedSql = sql<boolean>`exists (
    select 1
    from quiz_attempts
    where quiz_attempts.quiz_id = grammar_topics.quiz_id
      and quiz_attempts.user_id = ${userId}
  )`;

  const rows = await db
    .select({
      id: grammarTopics.id,
      slug: grammarTopics.slug,
      title: grammarTopics.title,
      level: grammarTopics.level,
      summary: grammarTopics.summary,
      sortOrder: grammarTopics.sortOrder,
      isCompleted: completedSql,
    })
    .from(grammarTopics)
    .orderBy(asc(grammarTopics.sortOrder), asc(grammarTopics.title));

  return rows.map((row) => ({
    ...row,
    isCompleted: Boolean(row.isCompleted),
  }));
}

export async function getGrammarTopicTitle(topicId: string): Promise<string | null> {
  const [row] = await db
    .select({ title: grammarTopics.title })
    .from(grammarTopics)
    .where(eq(grammarTopics.id, topicId))
    .limit(1);
  return row?.title ?? null;
}

/**
 * Topic detail for `/grammar/[topicId]`: validated content, mini quiz (if
 * linked), completion flag, and previous/next topic ids by `sort_order`.
 */
export async function getGrammarTopicDetail(
  topicId: string,
  userId: string,
): Promise<GrammarTopicDetail | null> {
  const [topic] = await db
    .select({
      id: grammarTopics.id,
      slug: grammarTopics.slug,
      title: grammarTopics.title,
      level: grammarTopics.level,
      summary: grammarTopics.summary,
      content: grammarTopics.content,
      sortOrder: grammarTopics.sortOrder,
      quizId: grammarTopics.quizId,
    })
    .from(grammarTopics)
    .where(eq(grammarTopics.id, topicId))
    .limit(1);

  if (!topic) {
    return null;
  }

  const parsedContent = grammarContentSchema.safeParse(topic.content);
  if (!parsedContent.success) {
    logger.error("Invalid grammar content for topic", { topicId, error: parsedContent.error });
    return null;
  }

  const [neighbors, completion, quiz] = await Promise.all([
    db
      .select({
        id: grammarTopics.id,
        sortOrder: grammarTopics.sortOrder,
      })
      .from(grammarTopics)
      .orderBy(asc(grammarTopics.sortOrder), asc(grammarTopics.title)),
    topic.quizId
      ? db
          .select({ id: quizAttempts.id })
          .from(quizAttempts)
          .where(
            and(
              eq(quizAttempts.userId, userId),
              eq(quizAttempts.quizId, topic.quizId),
            ),
          )
          .limit(1)
      : Promise.resolve([] as { id: string }[]),
    topic.quizId ? getQuizForAttempt(topic.quizId) : Promise.resolve(null),
  ]);

  const index = neighbors.findIndex((row) => row.id === topic.id);
  const previousTopicId = index > 0 ? neighbors[index - 1]!.id : null;
  const nextTopicId =
    index >= 0 && index < neighbors.length - 1 ? neighbors[index + 1]!.id : null;

  return {
    id: topic.id,
    slug: topic.slug,
    title: topic.title,
    level: topic.level,
    summary: topic.summary,
    content: parsedContent.data,
    sortOrder: topic.sortOrder,
    quizId: topic.quizId,
    quiz,
    isCompleted: completion.length > 0,
    previousTopicId,
    nextTopicId,
  };
}
