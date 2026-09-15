/**
 * Calendar date (`YYYY-MM-DD`) for a user in their own timezone (AD-09).
 * Used when writing `user_daily_activity.activity_date` so a session just
 * before/after local midnight lands on the right day — never raw UTC.
 */
export function activityDateInTimezone(
  timezone: string,
  date: Date = new Date(),
): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone || "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
