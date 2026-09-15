import { and, asc, count, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  courses,
  lessons,
  quizAttempts,
  quizzes,
  userAchievements,
  userDailyActivity,
  userProgress,
  userVocabularies,
  vocabularies,
} from "@/db/schema";
import type { CefrLevel } from "@/config/cefr";
import { activityDateInTimezone } from "@/lib/activity-date";
import { ACHIEVEMENTS } from "./achievements";
import {
  buildWeekActivity,
  computeStreaks,
  isActiveDay,
  type ActivityCounters,
} from "./streak";
import type {
  AchievementProgress,
  AchievementStats,
  ContinueLearningData,
  DailyGoalData,
  OverallStats,
  ProgressSkill,
  RecentActivityItem,
  RecommendedLesson,
  SkillOverviewItem,
  StreakData,
} from "./types";

const PROGRESS_SKILLS: ProgressSkill[] = ["vocabulary", "grammar", "listening", "reading"];

/** True when the learner has never started a lesson, saved a word, or taken a quiz. */
export async function isBrandNewUser(userId: string): Promise<boolean> {
  const [[progress], [vocab], [quiz]] = await Promise.all([
    db
      .select({ n: count() })
      .from(userProgress)
      .where(eq(userProgress.userId, userId)),
    db
      .select({ n: count() })
      .from(userVocabularies)
      .where(eq(userVocabularies.userId, userId)),
    db
      .select({ n: count() })
      .from(quizAttempts)
      .where(eq(quizAttempts.userId, userId)),
  ]);

  return (progress?.n ?? 0) === 0 && (vocab?.n ?? 0) === 0 && (quiz?.n ?? 0) === 0;
}

export async function getDailyGoal(
  userId: string,
  timezone: string,
  goalMinutes: number,
): Promise<DailyGoalData> {
  const today = activityDateInTimezone(timezone);
  const [row] = await db
    .select({ minutes: userDailyActivity.minutes })
    .from(userDailyActivity)
    .where(
      and(eq(userDailyActivity.userId, userId), eq(userDailyActivity.activityDate, today)),
    )
    .limit(1);

  const minutesToday = row?.minutes ?? 0;
  const safeGoal = Math.max(1, goalMinutes);
  return {
    goalMinutes: safeGoal,
    minutesToday,
    percent: Math.min(100, Math.round((minutesToday / safeGoal) * 100)),
  };
}

export async function getStreakData(userId: string, timezone: string): Promise<StreakData> {
  const today = activityDateInTimezone(timezone);
  const rows = await db
    .select({
      activityDate: userDailyActivity.activityDate,
      minutes: userDailyActivity.minutes,
      lessonsCompleted: userDailyActivity.lessonsCompleted,
      wordsSaved: userDailyActivity.wordsSaved,
      quizzesCompleted: userDailyActivity.quizzesCompleted,
    })
    .from(userDailyActivity)
    .where(eq(userDailyActivity.userId, userId));

  const byDate = new Map<string, ActivityCounters>();
  const activeDates: string[] = [];

  for (const row of rows) {
    const counters: ActivityCounters = {
      minutes: row.minutes,
      lessonsCompleted: row.lessonsCompleted,
      wordsSaved: row.wordsSaved,
      quizzesCompleted: row.quizzesCompleted,
    };
    byDate.set(row.activityDate, counters);
    if (isActiveDay(counters)) {
      activeDates.push(row.activityDate);
    }
  }

  const { currentStreak, longestStreak } = computeStreaks(activeDates, today);

  return {
    currentStreak,
    longestStreak,
    week: buildWeekActivity(today, byDate),
  };
}

/**
 * Prefer the most recently updated in-progress lesson; otherwise the earliest
 * incomplete lesson in a course the user has already touched.
 */
export async function getContinueLearning(
  userId: string,
): Promise<ContinueLearningData | null> {
  const [inProgress] = await db
    .select({
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      orderIndex: lessons.orderIndex,
      skill: lessons.skill,
      estimatedMinutes: lessons.estimatedMinutes,
      progressPercent: userProgress.progressPercent,
      courseId: courses.id,
      courseTitle: courses.title,
    })
    .from(userProgress)
    .innerJoin(lessons, eq(lessons.id, userProgress.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(and(eq(userProgress.userId, userId), eq(userProgress.status, "in_progress")))
    .orderBy(desc(userProgress.updatedAt))
    .limit(1);

  if (inProgress) {
    return mapContinue(inProgress);
  }

  // First incomplete lesson among courses the user has any progress in.
  const [next] = await db
    .select({
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      orderIndex: lessons.orderIndex,
      skill: lessons.skill,
      estimatedMinutes: lessons.estimatedMinutes,
      progressPercent: sql<number>`coalesce(${userProgress.progressPercent}, 0)`,
      courseId: courses.id,
      courseTitle: courses.title,
    })
    .from(lessons)
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .leftJoin(
      userProgress,
      and(eq(userProgress.lessonId, lessons.id), eq(userProgress.userId, userId)),
    )
    .where(
      and(
        sql`exists (
          select 1 from user_progress up
          inner join lessons l2 on l2.id = up.lesson_id
          where up.user_id = ${userId}
            and l2.course_id = ${courses.id}
        )`,
        sql`(${userProgress.status} is null or ${userProgress.status} <> 'completed')`,
      ),
    )
    .orderBy(asc(courses.sortOrder), asc(lessons.orderIndex))
    .limit(1);

  return next ? mapContinue(next) : null;
}

function mapContinue(row: {
  lessonId: string;
  lessonTitle: string;
  orderIndex: number;
  skill: ContinueLearningData["skill"];
  estimatedMinutes: number;
  progressPercent: number;
  courseId: string;
  courseTitle: string;
}): ContinueLearningData {
  return {
    lessonId: row.lessonId,
    lessonTitle: row.lessonTitle,
    lessonNumber: row.orderIndex + 1,
    skill: row.skill,
    estimatedMinutes: row.estimatedMinutes,
    progressPercent: Number(row.progressPercent) || 0,
    courseId: row.courseId,
    courseTitle: row.courseTitle,
  };
}

export async function getSkillOverview(userId: string): Promise<SkillOverviewItem[]> {
  const rows = await db
    .select({
      skill: lessons.skill,
      total: count(),
      completed: sql<number>`count(*) filter (where ${userProgress.status} = 'completed')::int`,
    })
    .from(lessons)
    .leftJoin(
      userProgress,
      and(eq(userProgress.lessonId, lessons.id), eq(userProgress.userId, userId)),
    )
    .where(inArray(lessons.skill, PROGRESS_SKILLS))
    .groupBy(lessons.skill);

  const bySkill = new Map(
    rows.map((r) => [
      r.skill as ProgressSkill,
      {
        total: Number(r.total),
        completed: Number(r.completed),
      },
    ]),
  );

  return PROGRESS_SKILLS.map((skill) => {
    const entry = bySkill.get(skill) ?? { total: 0, completed: 0 };
    const percent =
      entry.total === 0 ? 0 : Math.round((entry.completed / entry.total) * 100);
    return { skill, total: entry.total, completed: entry.completed, percent };
  });
}

export async function getRecentActivity(
  userId: string,
  limit = 8,
): Promise<RecentActivityItem[]> {
  const [lessonRows, quizRows, vocabRows] = await Promise.all([
    db
      .select({
        id: userProgress.id,
        title: lessons.title,
        lessonId: lessons.id,
        at: userProgress.completedAt,
      })
      .from(userProgress)
      .innerJoin(lessons, eq(lessons.id, userProgress.lessonId))
      .where(
        and(eq(userProgress.userId, userId), eq(userProgress.status, "completed")),
      )
      .orderBy(desc(userProgress.completedAt))
      .limit(limit),
    db
      .select({
        id: quizAttempts.id,
        title: quizzes.title,
        quizId: quizzes.id,
        score: quizAttempts.score,
        at: quizAttempts.completedAt,
      })
      .from(quizAttempts)
      .innerJoin(quizzes, eq(quizzes.id, quizAttempts.quizId))
      .where(eq(quizAttempts.userId, userId))
      .orderBy(desc(quizAttempts.completedAt))
      .limit(limit),
    db
      .select({
        id: userVocabularies.id,
        title: vocabularies.word,
        at: userVocabularies.savedAt,
      })
      .from(userVocabularies)
      .innerJoin(vocabularies, eq(vocabularies.id, userVocabularies.vocabularyId))
      .where(eq(userVocabularies.userId, userId))
      .orderBy(desc(userVocabularies.savedAt))
      .limit(limit),
  ]);

  const items: RecentActivityItem[] = [];

  for (const row of lessonRows) {
    if (!row.at) continue;
    items.push({
      kind: "lesson",
      id: row.id,
      title: row.title,
      at: row.at.toISOString(),
      href: `/lessons/${row.lessonId}`,
    });
  }
  for (const row of quizRows) {
    items.push({
      kind: "quiz",
      id: row.id,
      title: row.title,
      score: row.score,
      at: row.at.toISOString(),
      href: `/quiz/${row.quizId}/result?attempt=${row.id}`,
    });
  }
  for (const row of vocabRows) {
    items.push({
      kind: "vocabulary",
      id: row.id,
      title: row.title,
      at: row.at.toISOString(),
      href: "/vocabulary",
    });
  }

  items.sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0));
  return items.slice(0, limit);
}

/**
 * 3–4 incomplete lessons: prefer the user's CEFR level and weakest skill.
 */
export async function getRecommendedLessons(
  userId: string,
  cefrLevel: CefrLevel | null,
  limit = 4,
): Promise<RecommendedLesson[]> {
  const skills = await getSkillOverview(userId);
  const weakest = [...skills]
    .filter((s) => s.total > 0)
    .sort((a, b) => a.percent - b.percent || a.completed - b.completed)[0]?.skill;

  const conditions = [
    sql`(${userProgress.status} is null or ${userProgress.status} <> 'completed')`,
  ];
  if (cefrLevel) {
    conditions.push(eq(courses.level, cefrLevel));
  }

  const rows = await db
    .select({
      lessonId: lessons.id,
      title: lessons.title,
      skill: lessons.skill,
      estimatedMinutes: lessons.estimatedMinutes,
      courseTitle: courses.title,
      level: courses.level,
    })
    .from(lessons)
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .leftJoin(
      userProgress,
      and(eq(userProgress.lessonId, lessons.id), eq(userProgress.userId, userId)),
    )
    .where(and(...conditions))
    .orderBy(
      weakest
        ? sql`case when ${lessons.skill} = ${weakest} then 0 else 1 end`
        : asc(lessons.orderIndex),
      asc(courses.sortOrder),
      asc(lessons.orderIndex),
    )
    .limit(limit);

  // If CEFR filter yielded nothing, fall back without level constraint.
  if (rows.length === 0 && cefrLevel) {
    return getRecommendedLessons(userId, null, limit);
  }

  return rows.map((row) => ({
    lessonId: row.lessonId,
    title: row.title,
    skill: row.skill,
    estimatedMinutes: row.estimatedMinutes,
    courseTitle: row.courseTitle,
    level: row.level,
  }));
}

export async function getOverallStats(userId: string): Promise<OverallStats> {
  const [[lessonRow], [timeRow], [vocabRow], [quizRow]] = await Promise.all([
    db
      .select({ n: count() })
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.status, "completed"))),
    db
      .select({ minutes: sql<number>`coalesce(sum(${userDailyActivity.minutes}), 0)::int` })
      .from(userDailyActivity)
      .where(eq(userDailyActivity.userId, userId)),
    db
      .select({
        saved: count(),
        learned: sql<number>`count(*) filter (where ${userVocabularies.isLearned} = true)::int`,
      })
      .from(userVocabularies)
      .where(eq(userVocabularies.userId, userId)),
    db
      .select({
        attempts: count(),
        correct: sql<number>`coalesce(sum(${quizAttempts.correctCount}), 0)::int`,
        total: sql<number>`coalesce(sum(${quizAttempts.totalQuestions}), 0)::int`,
      })
      .from(quizAttempts)
      .where(eq(quizAttempts.userId, userId)),
  ]);

  const attempts = Number(quizRow?.attempts ?? 0);
  const totalQuestions = Number(quizRow?.total ?? 0);
  const correct = Number(quizRow?.correct ?? 0);

  return {
    lessonsCompleted: Number(lessonRow?.n ?? 0),
    learningMinutes: Number(timeRow?.minutes ?? 0),
    vocabularySaved: Number(vocabRow?.saved ?? 0),
    vocabularyLearned: Number(vocabRow?.learned ?? 0),
    quizAttempts: attempts,
    quizAccuracy:
      totalQuestions === 0 ? null : Math.round((correct / totalQuestions) * 100),
  };
}

export async function getWeeklyActivityMinutes(
  userId: string,
  timezone: string,
): Promise<{ date: string; label: string; minutes: number }[]> {
  const streak = await getStreakData(userId, timezone);
  return streak.week.map((d) => ({
    date: d.date,
    label: d.label,
    minutes: d.minutes,
  }));
}

/** Stats used by achievement checks (aggregated in SQL). */
export async function getAchievementStats(
  userId: string,
  timezone: string,
): Promise<AchievementStats> {
  const [[lessonRow], [vocabRow], streak] = await Promise.all([
    db
      .select({ n: count() })
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.status, "completed"))),
    db
      .select({ n: count() })
      .from(userVocabularies)
      .where(eq(userVocabularies.userId, userId)),
    getStreakData(userId, timezone),
  ]);

  return {
    lessonsCompleted: Number(lessonRow?.n ?? 0),
    wordsSaved: Number(vocabRow?.n ?? 0),
    currentStreak: streak.currentStreak,
  };
}

export async function getAchievementProgress(
  userId: string,
  timezone: string,
): Promise<AchievementProgress[]> {
  const [stats, unlockedRows] = await Promise.all([
    getAchievementStats(userId, timezone),
    db
      .select({
        key: userAchievements.achievementKey,
        unlockedAt: userAchievements.unlockedAt,
      })
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId)),
  ]);

  const unlocked = new Map(
    unlockedRows.map((r) => [r.key, r.unlockedAt.toISOString()] as const),
  );

  return ACHIEVEMENTS.map((def) => {
    const current = Math.max(0, def.current(stats));
    const isUnlocked = unlocked.has(def.key) || def.check(stats);
    const progressPercent = isUnlocked
      ? 100
      : Math.min(100, Math.round((current / def.target) * 100));

    return {
      key: def.key,
      title: def.title,
      description: def.description,
      unlocked: isUnlocked,
      unlockedAt: unlocked.get(def.key) ?? null,
      progressPercent,
      current: Math.min(current, def.target),
      target: def.target,
    };
  });
}

/** Weakest skill key for recommendations (null when no lesson totals). */
export function weakestSkill(skills: SkillOverviewItem[]): ProgressSkill | null {
  const ranked = skills.filter((s) => s.total > 0).sort((a, b) => a.percent - b.percent);
  return ranked[0]?.skill ?? null;
}
