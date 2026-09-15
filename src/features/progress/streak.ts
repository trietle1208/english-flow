import type { WeekDayActivity } from "./types";

/** A calendar day counts as active when any counter is > 0 (AD-09). */
export type ActivityCounters = {
  minutes: number;
  lessonsCompleted: number;
  wordsSaved: number;
  quizzesCompleted: number;
};

export function isActiveDay(row: ActivityCounters): boolean {
  return (
    row.minutes >= 1 ||
    row.lessonsCompleted >= 1 ||
    row.wordsSaved >= 1 ||
    row.quizzesCompleted >= 1
  );
}

/** Shift a `YYYY-MM-DD` string by `delta` calendar days (UTC-safe arithmetic). */
export function shiftDateString(dateStr: string, delta: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, m! - 1, d!));
  dt.setUTCDate(dt.getUTCDate() + delta);
  return dt.toISOString().slice(0, 10);
}

/**
 * Current streak (AD-09): consecutive active days ending today, or yesterday
 * if today is not yet active (grace until local midnight). Longest streak
 * scans the full active-date set.
 */
export function computeStreaks(
  activeDates: Iterable<string>,
  today: string,
): { currentStreak: number; longestStreak: number } {
  const active = new Set(activeDates);

  let anchor = today;
  if (!active.has(today)) {
    const yesterday = shiftDateString(today, -1);
    if (active.has(yesterday)) {
      anchor = yesterday;
    } else {
      return { currentStreak: 0, longestStreak: longestRun(active) };
    }
  }

  let current = 0;
  let cursor = anchor;
  while (active.has(cursor)) {
    current += 1;
    cursor = shiftDateString(cursor, -1);
  }

  return { currentStreak: current, longestStreak: longestRun(active) };
}

function longestRun(active: Set<string>): number {
  if (active.size === 0) return 0;

  const sorted = [...active].sort();
  let longest = 1;
  let run = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1]!;
    const curr = sorted[i]!;
    if (shiftDateString(prev, 1) === curr) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  return longest;
}

/** Last 7 calendar days ending on `today` (inclusive), oldest → newest. */
export function lastSevenDays(today: string): string[] {
  return Array.from({ length: 7 }, (_, i) => shiftDateString(today, i - 6));
}

const WEEKDAY_FMT = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" });

export function buildWeekActivity(
  today: string,
  byDate: Map<string, ActivityCounters>,
): WeekDayActivity[] {
  return lastSevenDays(today).map((date) => {
    const row = byDate.get(date);
    const counters: ActivityCounters = row ?? {
      minutes: 0,
      lessonsCompleted: 0,
      wordsSaved: 0,
      quizzesCompleted: 0,
    };
    const [y, m, d] = date.split("-").map(Number);
    const label = WEEKDAY_FMT.format(new Date(Date.UTC(y!, m! - 1, d!)));

    return {
      date,
      label,
      active: isActiveDay(counters),
      minutes: counters.minutes,
    };
  });
}

/**
 * Local hour (0–23) in `timezone` for time-of-day greetings.
 */
export function hourInTimezone(timezone: string, date: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone || "Asia/Ho_Chi_Minh",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const hour = parts.find((p) => p.type === "hour")?.value;
  return hour ? Number(hour) : date.getHours();
}

export function greetingForHour(hour: number): "Good morning" | "Good afternoon" | "Good evening" {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}
