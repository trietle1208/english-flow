import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
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
 *
 * Catalog rows (`is_manual = false`) stay globally unique on `word`.
 * User-created rows (`is_manual = true`) are unique per `(word, created_by_user_id)`.
 */
export const vocabularies = pgTable(
  "vocabularies",
  {
    id: id(),
    word: text("word").notNull(),
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
    /**
     * Curated catalog tag for browseable lists (e.g. `"toeic"`).
     * Null = general lesson/catalog vocabulary. Manual rows stay null.
     */
    catalogSource: text("catalog_source"),
    /**
     * Topic slug within a curated catalog (e.g. TOEIC `"office"` / `"hr"`).
     * Null for general / manual vocabulary.
     */
    topic: text("topic"),
    /** True when the learner created this row via the global Add Word UI. */
    isManual: boolean("is_manual").notNull().default(false),
    /** Owner of a manual row; null for catalog/seed vocabulary. */
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    ...timestamps,
  },
  (table) => [
    index("vocabularies_word_idx").on(table.word),
    index("vocabularies_catalog_source_idx").on(table.catalogSource),
    index("vocabularies_catalog_source_topic_idx").on(table.catalogSource, table.topic),
    uniqueIndex("vocabularies_catalog_word_unique")
      .on(table.word)
      .where(sql`${table.isManual} = false`),
    uniqueIndex("vocabularies_manual_word_creator_unique")
      .on(table.word, table.createdByUserId)
      .where(sql`${table.isManual} = true`),
  ],
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

/** A user's personal relationship to one word: saved, learned, and spaced-repetition bookkeeping (light SRS via flashcards). */
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
    /** Learner-starred priority words for quick filtering. */
    isPinned: boolean("is_pinned").notNull().default(false),
    learnedAt: timestamp("learned_at", { withTimezone: true }),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
    // Reserved for spaced repetition — filled by flashcard `rateFlashcard` (v2 light SRS).
    reviewCount: integer("review_count").notNull().default(0),
    nextReviewAt: timestamp("next_review_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    unique("user_vocabularies_user_vocab_unique").on(table.userId, table.vocabularyId),
    index("user_vocabularies_user_learned_idx").on(table.userId, table.isLearned),
    index("user_vocabularies_user_pinned_idx").on(table.userId, table.isPinned),
  ],
);
