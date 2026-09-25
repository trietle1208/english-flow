import { index, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { cefrLevelEnum, difficultyEnum } from "./enums";
import { users } from "./users";

/**
 * Read-aloud practice prompt. Independent of course `lessons` /
 * `user_progress` (those stay lesson-FK only).
 */
export const speakingPrompts = pgTable("speaking_prompts", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  promptText: text("prompt_text").notNull(),
  cefrLevel: cefrLevelEnum("cefr_level").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  /** Static file under `public/` when present; otherwise the UI uses TTS. */
  audioUrl: text("audio_url"),
  ...timestamps,
});

/**
 * One recognized-text attempt. Score is always recomputed server-side.
 * Audio never leaves the browser — only the transcript is stored.
 */
export const userSpeakingAttempts = pgTable(
  "user_speaking_attempts",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    promptId: uuid("prompt_id")
      .notNull()
      .references(() => speakingPrompts.id, { onDelete: "cascade" }),
    recognizedText: text("recognized_text").notNull(),
    overlapPercent: integer("overlap_percent").notNull(),
    ...timestamps,
  },
  (table) => [
    index("user_speaking_attempts_user_prompt_created_idx").on(
      table.userId,
      table.promptId,
      table.createdAt,
    ),
  ],
);
