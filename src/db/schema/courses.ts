import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { cefrLevelEnum } from "./enums";

/** A course groups lessons under one CEFR level and category (spec §10, §11). */
export const courses = pgTable("courses", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: cefrLevelEnum("level").notNull(),
  category: text("category").notNull(),
  lessonCount: integer("lesson_count").notNull().default(0),
  estimatedMinutes: integer("estimated_minutes").notNull(),
  /** Tailwind-safe color token (e.g. "blue") used for the course cover on `/courses` (spec §10). */
  coverColor: text("cover_color").notNull().default("blue"),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});
