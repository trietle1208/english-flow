import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { difficultyEnum, partOfSpeechEnum } from "./enums";
import { lessons } from "./lessons";
import { users } from "./users";

/**
 * A reusable vocabulary entity (spec §16). Never duplicated per-lesson —
 * lessons reference existing words through `lessonVocabularies` so the same
 * word (e.g. "improve") is a single row shared across every lesson that
 * teaches it.
 */
export const vocabularies = pgTable(
  "vocabularies",
  {
    id: id(),
    word: text("word").notNull().unique(),
    /** How to say it, spelled out (e.g. "im-PROOV") — shown alongside the IPA for learners who don't read IPA. */
    pronunciation: text("pronunciation").notNull(),
    /** IPA transcription, e.g. "/ɪmˈpruːv/". */
    phonetic: text("phonetic").notNull(),
    partOfSpeech: partOfSpeechEnum("part_of_speech").notNull(),
    meaning: text("meaning").notNull(),
    exampleSentence: text("example_sentence").notNull(),
    /** Static file in `public/audio/vocab/*.mp3`; null falls back to the Web Speech API client-side (AD-04). */
    audioUrl: text("audio_url"),
    difficulty: difficultyEnum("difficulty").notNull(),
    ...timestamps,
  },
  (table) => [index("vocabularies_word_idx").on(table.word)],
);

/**
 * Junction table: which vocabulary words a lesson teaches, and in what
 * order. A word may appear in many lessons (spec §13 forbids duplicating the
 * vocabulary row itself).
 */
export const lessonVocabularies = pgTable(
  "lesson_vocabularies",
  {
    id: id(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    vocabularyId: uuid("vocabulary_id")
      .notNull()
      .references(() => vocabularies.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
    ...timestamps,
  },
  (table) => [
    unique("lesson_vocabularies_lesson_vocab_unique").on(table.lessonId, table.vocabularyId),
    index("lesson_vocabularies_lesson_idx").on(table.lessonId),
  ],
);

/** A user's personal relationship to one word: saved, learned, and (columns only, no logic yet — AD-02/§16/§35) spaced-repetition bookkeeping. */
export const userVocabularies = pgTable(
  "user_vocabularies",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    vocabularyId: uuid("vocabulary_id")
      .notNull()
      .references(() => vocabularies.id, { onDelete: "cascade" }),
    savedAt: timestamp("saved_at", { withTimezone: true }).notNull().defaultNow(),
    isLearned: boolean("is_learned").notNull().default(false),
    learnedAt: timestamp("learned_at", { withTimezone: true }),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
    // Reserved for a future Spaced Repetition feature — no SRS logic in Phase 1 (spec §16, §35).
    reviewCount: integer("review_count").notNull().default(0),
    nextReviewAt: timestamp("next_review_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    unique("user_vocabularies_user_vocab_unique").on(table.userId, table.vocabularyId),
    index("user_vocabularies_user_learned_idx").on(table.userId, table.isLearned),
  ],
);
