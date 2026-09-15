import { boolean, index, integer, jsonb, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { questionTypeEnum, revealModeEnum } from "./enums";
import { users } from "./users";

/**
 * A reusable quiz (spec §19) — attached to a lesson's `exercise` block, a
 * grammar topic's mini quiz, or a listening lesson's comprehension check.
 * `slug` isn't in the original spec table sketch (§23); added so
 * `db:seed` can upsert quizzes idempotently the same way it does courses and
 * lessons, instead of matching on the free-text `title`.
 */
export const quizzes = pgTable("quizzes", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  revealMode: revealModeEnum("reveal_mode").notNull().default("after_submit"),
  passScore: integer("pass_score").notNull().default(70),
  timeLimitSeconds: integer("time_limit_seconds"),
  ...timestamps,
});

export const quizQuestions = pgTable(
  "quiz_questions",
  {
    id: id(),
    quizId: uuid("quiz_id")
      .notNull()
      .references(() => quizzes.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
    type: questionTypeEnum("type").notNull(),
    prompt: text("prompt").notNull(),
    explanation: text("explanation").notNull(),
    points: integer("points").notNull().default(1),
    ...timestamps,
  },
  (table) => [
    unique("quiz_questions_quiz_order_unique").on(table.quizId, table.orderIndex),
    index("quiz_questions_quiz_idx").on(table.quizId),
  ],
);

export const quizAnswers = pgTable(
  "quiz_answers",
  {
    id: id(),
    questionId: uuid("question_id")
      .notNull()
      .references(() => quizQuestions.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
    /** The option text (multiple_choice/true_false) or an accepted answer (fill_blank — matched case/whitespace-insensitively). */
    content: text("content").notNull(),
    isCorrect: boolean("is_correct").notNull().default(false),
    ...timestamps,
  },
  (table) => [
    unique("quiz_answers_question_order_unique").on(table.questionId, table.orderIndex),
    index("quiz_answers_question_idx").on(table.questionId),
  ],
);

/** One user's completed attempt at a quiz (spec §20). `answers` snapshots what they picked, for "Review Mistakes". */
export const quizAttempts = pgTable(
  "quiz_attempts",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    quizId: uuid("quiz_id")
      .notNull()
      .references(() => quizzes.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    totalQuestions: integer("total_questions").notNull(),
    correctCount: integer("correct_count").notNull(),
    timeSpentSeconds: integer("time_spent_seconds").notNull(),
    /** `{ questionId, selectedAnswerIds | textAnswer, isCorrect }[]` snapshot at submit time. */
    answers: jsonb("answers").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
    ...timestamps,
  },
  (table) => [
    // Recent activity + quiz accuracy order/filter by completed_at.
    index("quiz_attempts_user_completed_idx").on(table.userId, table.completedAt),
  ],
);
