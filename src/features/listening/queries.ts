import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { listeningLessons, quizAttempts } from "@/db/schema";
import { getQuizForAttempt } from "@/features/quiz/queries";
import type { ListeningLessonDetail, ListeningLessonListItem } from "./types";

/**
 * Listening catalog. Completion comes from `quiz_attempts` on the lesson's
 * comprehension quiz (same pattern as grammar topics).
 */
export async function listListeningLessons(
  userId: string,
): Promise<ListeningLessonListItem[]> {
  const completedSql = sql<boolean>`exists (
    select 1
    from quiz_attempts
    where quiz_attempts.quiz_id = listening_lessons.quiz_id
      and quiz_attempts.user_id = ${userId}
  )`;

  const rows = await db
    .select({
      id: listeningLessons.id,
      slug: listeningLessons.slug,
      title: listeningLessons.title,
      difficulty: listeningLessons.difficulty,
      durationSeconds: listeningLessons.durationSeconds,
      isCompleted: completedSql,
    })
    .from(listeningLessons)
    .orderBy(asc(listeningLessons.title));

  return rows.map((row) => ({
    ...row,
    isCompleted: Boolean(row.isCompleted),
  }));
}

export async function getListeningLessonTitle(
  lessonId: string,
): Promise<string | null> {
  const [row] = await db
    .select({ title: listeningLessons.title })
    .from(listeningLessons)
    .where(eq(listeningLessons.id, lessonId))
    .limit(1);
  return row?.title ?? null;
}

export async function getListeningLessonDetail(
  lessonId: string,
  userId: string,
): Promise<ListeningLessonDetail | null> {
  const [lesson] = await db
    .select({
      id: listeningLessons.id,
      slug: listeningLessons.slug,
      title: listeningLessons.title,
      difficulty: listeningLessons.difficulty,
      durationSeconds: listeningLessons.durationSeconds,
      audioUrl: listeningLessons.audioUrl,
      transcript: listeningLessons.transcript,
      quizId: listeningLessons.quizId,
    })
    .from(listeningLessons)
    .where(eq(listeningLessons.id, lessonId))
    .limit(1);

  if (!lesson) {
    return null;
  }

  const [completion, quiz] = await Promise.all([
    lesson.quizId
      ? db
          .select({ id: quizAttempts.id })
          .from(quizAttempts)
          .where(
            and(
              eq(quizAttempts.userId, userId),
              eq(quizAttempts.quizId, lesson.quizId),
            ),
          )
          .limit(1)
      : Promise.resolve([] as { id: string }[]),
    lesson.quizId ? getQuizForAttempt(lesson.quizId) : Promise.resolve(null),
  ]);

  return {
    ...lesson,
    quiz,
    isCompleted: completion.length > 0,
  };
}
