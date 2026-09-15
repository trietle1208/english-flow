import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { grammarTopics, quizAttempts, userGrammarProgress } from "@/db/schema";
import { formatMasteryScore, masteryFromRecentScores } from "./mastery";

type DbClient = typeof db;

/**
 * After a scored grammar quiz attempt: upsert `user_grammar_progress` using
 * the last 10 attempt scores for mastery (Prompt 2 + 4).
 * No-op when `quizId` is not linked to a grammar topic.
 */
export async function recordGrammarProgressForQuizAttempt(
  client: DbClient,
  input: {
    userId: string;
    quizId: string;
    correctCount: number;
    completedAt: Date;
  },
): Promise<{ topicId: string; masteryScore: string } | null> {
  const [topic] = await client
    .select({ id: grammarTopics.id })
    .from(grammarTopics)
    .where(eq(grammarTopics.quizId, input.quizId))
    .limit(1);

  if (!topic) {
    return null;
  }

  const recentRows = await client
    .select({ score: quizAttempts.score })
    .from(quizAttempts)
    .where(
      and(eq(quizAttempts.userId, input.userId), eq(quizAttempts.quizId, input.quizId)),
    )
    .orderBy(desc(quizAttempts.completedAt))
    .limit(10);

  // Rows come newest-first; mastery helper wants oldest → newest.
  const scoresNewestLast = [...recentRows].reverse().map((row) => row.score);
  const masteryScore = formatMasteryScore(masteryFromRecentScores(scoresNewestLast));

  const [existing] = await client
    .select({
      attemptCount: userGrammarProgress.attemptCount,
      correctCount: userGrammarProgress.correctCount,
    })
    .from(userGrammarProgress)
    .where(
      and(
        eq(userGrammarProgress.userId, input.userId),
        eq(userGrammarProgress.topicId, topic.id),
      ),
    )
    .limit(1);

  if (existing) {
    await client
      .update(userGrammarProgress)
      .set({
        attemptCount: existing.attemptCount + 1,
        correctCount: existing.correctCount + input.correctCount,
        masteryScore,
        lastAttemptAt: input.completedAt,
        nextReviewAt: null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userGrammarProgress.userId, input.userId),
          eq(userGrammarProgress.topicId, topic.id),
        ),
      );
  } else {
    await client.insert(userGrammarProgress).values({
      userId: input.userId,
      topicId: topic.id,
      attemptCount: 1,
      correctCount: input.correctCount,
      masteryScore,
      lastAttemptAt: input.completedAt,
      nextReviewAt: null,
    });
  }

  return { topicId: topic.id, masteryScore };
}

/** Whether a quiz id is linked to any grammar topic (for rate-limit scope). */
export async function isGrammarLinkedQuiz(
  client: DbClient,
  quizId: string,
): Promise<boolean> {
  const [row] = await client
    .select({ id: grammarTopics.id })
    .from(grammarTopics)
    .where(eq(grammarTopics.quizId, quizId))
    .limit(1);
  return Boolean(row);
}
