import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { cefrLevelEnum } from "./enums";

/**
 * Business `users` table (spec §23). Per AD-01, this is the table
 * better-auth's Drizzle adapter reads from and writes to directly — Phase 04
 * wires up better-auth with `usePlural: true` so its `user` model maps onto
 * this `users` table instead of creating a second identity table. The first
 * five columns below (`id`, `name`, `email`, `emailVerified`, `image`) are
 * exactly the fields better-auth's core schema expects; everything after
 * that is our own business data bolted onto the same row.
 */
export const users = pgTable("users", {
  id: id(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),

  // Business columns (spec §22 Settings, §8 Placement Test, §9 Daily Goal).
  cefrLevel: cefrLevelEnum("cefr_level"),
  dailyGoalMinutes: integer("daily_goal_minutes").notNull().default(20),
  preferredLearningTime: text("preferred_learning_time"),
  timezone: text("timezone").notNull().default("Asia/Ho_Chi_Minh"),
  onboardedAt: timestamp("onboarded_at", { withTimezone: true }),

  ...timestamps,
});
