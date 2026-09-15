/** Daily learning goal options in minutes (spec §22). */
export const DAILY_GOAL_OPTIONS = [10, 20, 30, 45, 60] as const;

export type DailyGoalMinutes = (typeof DAILY_GOAL_OPTIONS)[number];

/** Preferred learning-time slots stored on `users.preferred_learning_time`. */
export const PREFERRED_LEARNING_TIMES = [
  "morning",
  "afternoon",
  "evening",
  "anytime",
] as const;

export type PreferredLearningTime = (typeof PREFERRED_LEARNING_TIMES)[number];

export const PREFERRED_LEARNING_TIME_LABELS: Record<PreferredLearningTime, string> =
  {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    anytime: "Anytime",
  };

export function isPreferredLearningTime(
  value: string,
): value is PreferredLearningTime {
  return (PREFERRED_LEARNING_TIMES as readonly string[]).includes(value);
}

export function isDailyGoalMinutes(value: number): value is DailyGoalMinutes {
  return (DAILY_GOAL_OPTIONS as readonly number[]).includes(value);
}
