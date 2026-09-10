import { integer, jsonb, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";
import { id, timestamps } from "./columns.helpers";
import { cefrLevelEnum, questionTypeEnum } from "./enums";
import { users } from "./users";

/** Shape of `placement_test_questions.options` — no separate answers table (unlike quizzes) since a placement test is never edited question-by-question after seeding. */
export const placementTestOptionSchema = z.object({
  content: z.string().min(1),
  isCorrect: z.boolean(),
});
export type PlacementTestOption = z.infer<typeof placementTestOptionSchema>;

/** The single Phase 1 placement test (spec §8) — modeled as a table (not a hardcoded constant) so a second test could be added later without a schema change. */
export const placementTests = pgTable("placement_tests", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ...timestamps,
});

export const placementTestQuestions = pgTable(
  "placement_test_questions",
  {
    id: id(),
    placementTestId: uuid("placement_test_id")
      .notNull()
      .references(() => placementTests.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
    /** CEFR level this question targets, used to weight the final score → level conversion. */
    level: cefrLevelEnum("level").notNull(),
    type: questionTypeEnum("type").notNull(),
    prompt: text("prompt").notNull(),
    options: jsonb("options").$type<PlacementTestOption[]>().notNull(),
    explanation: text("explanation").notNull(),
    points: integer("points").notNull().default(1),
    ...timestamps,
  },
  (table) => [
    unique("placement_test_questions_test_order_unique").on(
      table.placementTestId,
      table.orderIndex,
    ),
  ],
);

/** One user's completed placement test attempt (spec §8): raw score plus the CEFR level it maps to. */
export const placementTestAttempts = pgTable("placement_test_attempts", {
  id: id(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  placementTestId: uuid("placement_test_id")
    .notNull()
    .references(() => placementTests.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  estimatedLevel: cefrLevelEnum("estimated_level").notNull(),
  /** `{ questionId, selectedOptionIndex, isCorrect }[]` snapshot at submit time. */
  answers: jsonb("answers").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
  ...timestamps,
});
