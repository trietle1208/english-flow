import { integer, jsonb, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { courses } from "./courses";
import type { LessonContent } from "./lesson-content";
import { skillEnum } from "./enums";

/** One lesson inside a course (spec §12). `content` is validated with `lessonContentSchema` (AD-03) before insert. */
export const lessons = pgTable(
  "lessons",
  {
    id: id(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    skill: skillEnum("skill").notNull(),
    estimatedMinutes: integer("estimated_minutes").notNull(),
    content: jsonb("content").$type<LessonContent>().notNull(),
    ...timestamps,
  },
  (table) => [
    unique("lessons_course_order_unique").on(table.courseId, table.orderIndex),
  ],
);
