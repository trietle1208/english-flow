import { date, index, integer, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { progressStatusEnum } from "./enums";
import { lessons } from "./lessons";
import { users } from "./users";

/** A user's progress through one lesson (spec §21). */
export const userProgress = pgTable(
  "user_progress",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    status: progressStatusEnum("status").notNull().default("not_started"),
    progressPercent: integer("progress_percent").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    unique("user_progress_user_lesson_unique").on(table.userId, table.lessonId),
    // Dashboard/progress filters by status often (completed / in_progress).
    index("user_progress_user_status_idx").on(table.userId, table.status),
  ],
);

/**
 * One row per user per calendar day — the source of truth for Daily Goal
 * and Streak (AD-08, AD-09). `activityDate` is a plain date (no time zone),
 * computed by the server using `users.timezone` rather than UTC, so a
 * session just before/after local midnight lands on the right day.
 */
export const userDailyActivity = pgTable(
  "user_daily_activity",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    activityDate: date("activity_date").notNull(),
    minutes: integer("minutes").notNull().default(0),
    lessonsCompleted: integer("lessons_completed").notNull().default(0),
    wordsSaved: integer("words_saved").notNull().default(0),
    quizzesCompleted: integer("quizzes_completed").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    // Unique (user_id, activity_date) also serves streak/weekly lookups (AD-09).
    unique("user_daily_activity_user_date_unique").on(table.userId, table.activityDate),
  ],
);

/** Unlocked achievements (spec §21) — Phase 1 keys: first_lesson, ten_lessons, fifty_words, hundred_words, seven_day_streak. */
export const userAchievements = pgTable(
  "user_achievements",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    achievementKey: text("achievement_key").notNull(),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }).notNull().defaultNow(),
    ...timestamps,
  },
  (table) => [
    unique("user_achievements_user_key_unique").on(table.userId, table.achievementKey),
  ],
);
