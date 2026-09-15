import type { CefrLevel } from "@/config/cefr";

/** The four skills surfaced on Dashboard / Progress (spec §9, §21). */
export type ProgressSkill = "vocabulary" | "grammar" | "listening" | "reading";

export type SkillOverviewItem = {
  skill: ProgressSkill;
  total: number;
  completed: number;
  percent: number;
};

export type DailyGoalData = {
  goalMinutes: number;
  minutesToday: number;
  percent: number;
};

export type WeekDayActivity = {
  /** YYYY-MM-DD in the user's timezone */
  date: string;
  /** Short weekday label, e.g. "Mon" */
  label: string;
  active: boolean;
  minutes: number;
};

export type StreakData = {
  currentStreak: number;
  longestStreak: number;
  week: WeekDayActivity[];
};

export type ContinueLearningData = {
  lessonId: string;
  lessonTitle: string;
  lessonNumber: number;
  skill: ProgressSkill | "speaking";
  estimatedMinutes: number;
  progressPercent: number;
  courseId: string;
  courseTitle: string;
};

export type RecentActivityItem =
  | {
      kind: "lesson";
      id: string;
      title: string;
      at: string;
      href: string;
    }
  | {
      kind: "quiz";
      id: string;
      title: string;
      score: number;
      at: string;
      href: string;
    }
  | {
      kind: "vocabulary";
      id: string;
      title: string;
      at: string;
      href: string;
    };

export type RecommendedLesson = {
  lessonId: string;
  title: string;
  skill: ProgressSkill | "speaking";
  estimatedMinutes: number;
  courseTitle: string;
  level: CefrLevel;
};

export type OverallStats = {
  lessonsCompleted: number;
  learningMinutes: number;
  vocabularySaved: number;
  vocabularyLearned: number;
  quizAccuracy: number | null;
  quizAttempts: number;
};

export type AchievementProgress = {
  key: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt: string | null;
  /** 0–100 toward unlock (100 when unlocked). */
  progressPercent: number;
  current: number;
  target: number;
};

export type AchievementStats = {
  lessonsCompleted: number;
  wordsSaved: number;
  currentStreak: number;
};
