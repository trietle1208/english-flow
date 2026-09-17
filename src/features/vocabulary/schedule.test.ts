import { describe, expect, it } from "vitest";
import {
  DAY_MS,
  formatReviewDueLabel,
  nextGoodIntervalDays,
  previousIntervalDaysBetween,
  scheduleNextReview,
} from "./schedule";

describe("previousIntervalDaysBetween", () => {
  it("returns 0 when either date is missing", () => {
    expect(previousIntervalDaysBetween(null, new Date())).toBe(0);
    expect(previousIntervalDaysBetween(new Date(), null)).toBe(0);
  });

  it("rounds the gap in whole days", () => {
    const last = new Date("2026-09-10T10:00:00.000Z");
    const next = new Date(last.getTime() + 3 * DAY_MS);
    expect(previousIntervalDaysBetween(last, next)).toBe(3);
  });
});

describe("nextGoodIntervalDays", () => {
  it("steps 1 → 3 → 7", () => {
    expect(nextGoodIntervalDays(0)).toBe(1);
    expect(nextGoodIntervalDays(1)).toBe(3);
    expect(nextGoodIntervalDays(2)).toBe(3);
    expect(nextGoodIntervalDays(3)).toBe(7);
    expect(nextGoodIntervalDays(10)).toBe(7);
  });
});

describe("scheduleNextReview", () => {
  const now = new Date("2026-09-17T12:00:00.000Z");

  it("schedules Again as due immediately", () => {
    const result = scheduleNextReview({
      rating: "again",
      now,
      previousNextReviewAt: new Date(now.getTime() + 7 * DAY_MS),
      previousLastReviewedAt: now,
    });
    expect(result.intervalDays).toBe(0);
    expect(result.nextReviewAt.getTime()).toBe(now.getTime());
  });

  it("uses 1 day on first Good", () => {
    const result = scheduleNextReview({
      rating: "good",
      now,
      previousNextReviewAt: null,
      previousLastReviewedAt: null,
    });
    expect(result.intervalDays).toBe(1);
    expect(result.nextReviewAt.getTime()).toBe(now.getTime() + DAY_MS);
  });

  it("steps Good from 1d → 3d → 7d", () => {
    const after1 = scheduleNextReview({
      rating: "good",
      now,
      previousNextReviewAt: new Date(now.getTime() + DAY_MS),
      previousLastReviewedAt: now,
    });
    expect(after1.intervalDays).toBe(3);

    const after3 = scheduleNextReview({
      rating: "good",
      now,
      previousNextReviewAt: new Date(now.getTime() + 3 * DAY_MS),
      previousLastReviewedAt: now,
    });
    expect(after3.intervalDays).toBe(7);

    const after7 = scheduleNextReview({
      rating: "good",
      now,
      previousNextReviewAt: new Date(now.getTime() + 7 * DAY_MS),
      previousLastReviewedAt: now,
    });
    expect(after7.intervalDays).toBe(7);
  });
});

describe("formatReviewDueLabel", () => {
  const now = new Date("2026-09-17T12:00:00.000Z");

  it("labels overdue and upcoming reviews", () => {
    expect(formatReviewDueLabel(new Date(now.getTime() - 1000), now)).toBe("due now");
    expect(formatReviewDueLabel(new Date(now.getTime() + DAY_MS), now)).toBe("due tomorrow");
    expect(formatReviewDueLabel(new Date(now.getTime() + 3 * DAY_MS), now)).toBe(
      "due in 3 days",
    );
  });
});
