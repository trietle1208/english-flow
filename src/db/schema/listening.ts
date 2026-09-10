import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { courses } from "./courses";
import { difficultyEnum } from "./enums";
import { quizzes } from "./quizzes";

/** A listening practice lesson (spec §18): audio + transcript + comprehension quiz. */
export const listeningLessons = pgTable("listening_lessons", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  /** Static file in `public/audio/listening/*.mp3` (AD-04). */
  audioUrl: text("audio_url").notNull(),
  transcript: text("transcript").notNull(),
  quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "set null" }),
  courseId: uuid("course_id").references(() => courses.id, { onDelete: "set null" }),
  ...timestamps,
});
