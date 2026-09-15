import { describe, expect, it } from "vitest";
import {
  buildWeekActivity,
  computeStreaks,
  greetingForHour,
  hourInTimezone,
  isActiveDay,
  shiftDateString,
} from "./streak";

describe("isActiveDay", () => {
  it("is active when any counter is at least 1", () => {
    expect(
      isActiveDay({ minutes: 0, lessonsCompleted: 0, wordsSaved: 0, quizzesCompleted: 0 }),
    ).toBe(false);
    expect(
      isActiveDay({ minutes: 1, lessonsCompleted: 0, wordsSaved: 0, quizzesCompleted: 0 }),
    ).toBe(true);
    expect(
      isActiveDay({ minutes: 0, lessonsCompleted: 0, wordsSaved: 2, quizzesCompleted: 0 }),
    ).toBe(true);
  });
});

describe("shiftDateString", () => {
  it("shifts calendar days across month boundaries", () => {
    expect(shiftDateString("2026-03-01", -1)).toBe("2026-02-28");
    expect(shiftDateString("2026-02-28", 1)).toBe("2026-03-01");
  });
});

describe("computeStreaks", () => {
  it("counts consecutive active days ending today", () => {
    const result = computeStreaks(
      ["2026-09-13", "2026-09-14", "2026-09-15"],
      "2026-09-15",
    );
    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
  });

  it("allows a grace day when today is inactive but yesterday is active", () => {
    const result = computeStreaks(["2026-09-13", "2026-09-14"], "2026-09-15");
    expect(result.currentStreak).toBe(2);
  });

  it("resets current streak after a gap while keeping longest", () => {
    const result = computeStreaks(
      ["2026-09-01", "2026-09-02", "2026-09-03", "2026-09-10"],
      "2026-09-15",
    );
    expect(result.currentStreak).toBe(0);
    expect(result.longestStreak).toBe(3);
  });

  it("returns zeros with no activity", () => {
    expect(computeStreaks([], "2026-09-15")).toEqual({
      currentStreak: 0,
      longestStreak: 0,
    });
  });
});

describe("buildWeekActivity", () => {
  it("returns the last 7 days ending on today", () => {
    const byDate = new Map([
      [
        "2026-09-15",
        { minutes: 20, lessonsCompleted: 1, wordsSaved: 0, quizzesCompleted: 0 },
      ],
    ]);
    const week = buildWeekActivity("2026-09-15", byDate);
    expect(week).toHaveLength(7);
    expect(week[0]?.date).toBe("2026-09-09");
    expect(week[6]?.date).toBe("2026-09-15");
    expect(week[6]?.active).toBe(true);
    expect(week[0]?.active).toBe(false);
  });
});

describe("hourInTimezone / greetingForHour", () => {
  it("resolves a stable hour in Asia/Ho_Chi_Minh", () => {
    // 2026-09-15T04:00:00Z = 11:00 in ICT (UTC+7)
    const hour = hourInTimezone(
      "Asia/Ho_Chi_Minh",
      new Date("2026-09-15T04:00:00.000Z"),
    );
    expect(hour).toBe(11);
    expect(greetingForHour(hour)).toBe("Good morning");
  });

  it("maps greeting bands", () => {
    expect(greetingForHour(5)).toBe("Good morning");
    expect(greetingForHour(12)).toBe("Good afternoon");
    expect(greetingForHour(18)).toBe("Good evening");
    expect(greetingForHour(4)).toBe("Good evening");
  });
});
