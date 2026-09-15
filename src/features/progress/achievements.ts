import type { AchievementStats } from "./types";

/**
 * Phase 1 achievements (spec §21). Kept secondary to learning — definitions
 * only; unlock writes live in `actions.ts` via `evaluateAchievements`.
 */
export type AchievementDefinition = {
  key: string;
  title: string;
  description: string;
  target: number;
  /** Current numeric progress toward `target` (clamped later for UI %). */
  current: (stats: AchievementStats) => number;
  check: (stats: AchievementStats) => boolean;
};

export const ACHIEVEMENTS: readonly AchievementDefinition[] = [
  {
    key: "first_lesson",
    title: "First Lesson",
    description: "Complete your first lesson.",
    target: 1,
    current: (s) => s.lessonsCompleted,
    check: (s) => s.lessonsCompleted >= 1,
  },
  {
    key: "ten_lessons",
    title: "10 Lessons Completed",
    description: "Finish 10 lessons across any course.",
    target: 10,
    current: (s) => s.lessonsCompleted,
    check: (s) => s.lessonsCompleted >= 10,
  },
  {
    key: "fifty_words",
    title: "50 Words Saved",
    description: "Save 50 vocabulary words to your list.",
    target: 50,
    current: (s) => s.wordsSaved,
    check: (s) => s.wordsSaved >= 50,
  },
  {
    key: "hundred_words",
    title: "100 Words Saved",
    description: "Build a personal list of 100 words.",
    target: 100,
    current: (s) => s.wordsSaved,
    check: (s) => s.wordsSaved >= 100,
  },
  {
    key: "seven_day_streak",
    title: "7 Day Streak",
    description: "Study on 7 days in a row.",
    target: 7,
    current: (s) => s.currentStreak,
    check: (s) => s.currentStreak >= 7,
  },
] as const;

export type AchievementKey = (typeof ACHIEVEMENTS)[number]["key"];
