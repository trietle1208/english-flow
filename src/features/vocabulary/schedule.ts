import type { FlashcardRating } from "./types";

export const DAY_MS = 24 * 60 * 60 * 1000;

/** Light SRS ladder (v2): Again → due now; Good → 1 → 3 → 7 days. */
export const GOOD_INTERVAL_DAYS = [1, 3, 7] as const;

export type ScheduleNextReviewInput = {
  rating: FlashcardRating;
  now: Date;
  /** Previous `next_review_at` (null = never scheduled). */
  previousNextReviewAt: Date | null;
  /** Previous `last_reviewed_at` (null = never reviewed). */
  previousLastReviewedAt: Date | null;
};

export type ScheduleNextReviewResult = {
  nextReviewAt: Date;
  /** Interval applied for this rating (0 = due immediately). */
  intervalDays: number;
};

/**
 * Compute the next review time from Again / Good (no full SM-2).
 * Interval steps up only on Good: <1d → 1d, <3d → 3d, else 7d (cap).
 */
export function scheduleNextReview({
  rating,
  now,
  previousNextReviewAt,
  previousLastReviewedAt,
}: ScheduleNextReviewInput): ScheduleNextReviewResult {
  if (rating === "again") {
    return { nextReviewAt: new Date(now.getTime()), intervalDays: 0 };
  }

  const previousIntervalDays = previousIntervalDaysBetween(
    previousLastReviewedAt,
    previousNextReviewAt,
  );
  const intervalDays = nextGoodIntervalDays(previousIntervalDays);
  return {
    nextReviewAt: new Date(now.getTime() + intervalDays * DAY_MS),
    intervalDays,
  };
}

/** Days between last review and the scheduled next review (0 if unknown). */
export function previousIntervalDaysBetween(
  lastReviewedAt: Date | null,
  nextReviewAt: Date | null,
): number {
  if (!lastReviewedAt || !nextReviewAt) {
    return 0;
  }
  const delta = nextReviewAt.getTime() - lastReviewedAt.getTime();
  if (delta <= 0) {
    return 0;
  }
  return Math.round(delta / DAY_MS);
}

export function nextGoodIntervalDays(previousIntervalDays: number): number {
  if (previousIntervalDays < GOOD_INTERVAL_DAYS[0]) {
    return GOOD_INTERVAL_DAYS[0];
  }
  if (previousIntervalDays < GOOD_INTERVAL_DAYS[1]) {
    return GOOD_INTERVAL_DAYS[1];
  }
  return GOOD_INTERVAL_DAYS[2];
}

/** Short learner-facing label for a future `next_review_at`. */
export function formatReviewDueLabel(nextReviewAt: Date, now = new Date()): string {
  const diffMs = nextReviewAt.getTime() - now.getTime();
  if (diffMs <= 0) {
    return "due now";
  }
  const days = Math.ceil(diffMs / DAY_MS);
  if (days <= 1) {
    return "due tomorrow";
  }
  return `due in ${days} days`;
}
