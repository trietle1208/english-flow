import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  check,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { id, timestamps } from "./columns.helpers";
import { cefrLevelEnum } from "./enums";
import { quizzes } from "./quizzes";
import { users } from "./users";

/** Publish pipeline for grammar topics / lessons (v3 schema). */
export const grammarContentStatusEnum = pgEnum("grammar_content_status", [
  "draft",
  "review",
  "published",
]);

export const grammarRelationTypeEnum = pgEnum("grammar_relation_type", [
  "prerequisite",
  "related",
  "confused_with",
]);

/**
 * Dataset / source license policy. Expandable list — keep as pgEnum while
 * the set is small and stable.
 */
export const contentLicenseCodeEnum = pgEnum("content_license_code", [
  "PRODUCTION_ALLOWED",
  "ATTRIBUTION_REQUIRED",
  "RESEARCH_ONLY",
  "UNKNOWN",
  "DO_NOT_USE",
]);

/** Topic categories — text + CHECK so we can add values without ALTER TYPE. */
export const GRAMMAR_TOPIC_CATEGORIES = [
  "verb_tenses",
  "articles",
  "clauses",
  "modals",
  "prepositions",
  "other",
] as const;
export type GrammarTopicCategory = (typeof GRAMMAR_TOPIC_CATEGORIES)[number];

/** Mistake taxonomy — text + CHECK (same reason as category). */
export const GRAMMAR_ERROR_TYPES = [
  "article",
  "preposition",
  "verb_tense",
  "subject_verb_agreement",
  "plural",
  "pronoun",
  "word_form",
  "word_order",
  "modal",
  "conditional",
  "passive",
  "relative_clause",
  "gerund_infinitive",
  "other",
] as const;
export type GrammarErrorType = (typeof GRAMMAR_ERROR_TYPES)[number];

export const grammarLessonBodySchema = z.object({
  when_to_use: z.string().min(1),
  when_not_to_use: z.string().min(1),
  formation: z.object({
    affirmative: z.string().min(1),
    negative: z.string().min(1),
    question: z.string().min(1),
  }),
  signal_words: z.array(z.string().min(1)),
  tips: z.array(z.string().min(1)),
});
export type GrammarLessonBody = z.infer<typeof grammarLessonBodySchema>;

export const grammarExampleHighlightSchema = z.object({
  text: z.string().min(1),
  type: z.enum(["grammar", "signal"]),
});
export type GrammarExampleHighlight = z.infer<typeof grammarExampleHighlightSchema>;

/**
 * Provenance for imported / attributed content. Original seed text uses an
 * internal "EnglishFlow original" source with PRODUCTION_ALLOWED.
 */
export const contentSources = pgTable("content_sources", {
  id: id(),
  name: text("name").notNull(),
  url: text("url"),
  licenseCode: contentLicenseCodeEnum("license_code").notNull(),
  attributionText: text("attribution_text"),
  sourceVersion: text("source_version"),
  importedAt: timestamp("imported_at", { withTimezone: true }).notNull().defaultNow(),
  ...timestamps,
});

/**
 * Grammar catalog topic (v3 normalized). Mini practice stays on shared
 * `quizzes` via `quiz_id` (AD-06 / Phase 11 QuizRunner) — no separate
 * grammar_exercises tables.
 */
export const grammarTopics = pgTable(
  "grammar_topics",
  {
    id: id(),
    slug: text("slug").notNull().unique(),
    titleEn: text("title_en").notNull(),
    titleVi: text("title_vi").notNull(),
    level: cefrLevelEnum("level").notNull(),
    category: text("category").notNull(),
    parentId: uuid("parent_id").references((): AnyPgColumn => grammarTopics.id, {
      onDelete: "set null",
    }),
    orderIndex: integer("order_index").notNull().default(0),
    summaryVi: text("summary_vi").notNull(),
    status: grammarContentStatusEnum("status").notNull().default("draft"),
    quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "set null" }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    index("grammar_topics_slug_idx").on(table.slug),
    index("grammar_topics_level_category_idx").on(table.level, table.category),
    check(
      "grammar_topics_category_check",
      sql`${table.category} in ('verb_tenses','articles','clauses','modals','prepositions','other')`,
    ),
  ],
);

export const grammarTopicRelations = pgTable(
  "grammar_topic_relations",
  {
    id: id(),
    fromTopicId: uuid("from_topic_id")
      .notNull()
      .references(() => grammarTopics.id, { onDelete: "cascade" }),
    toTopicId: uuid("to_topic_id")
      .notNull()
      .references(() => grammarTopics.id, { onDelete: "cascade" }),
    relationType: grammarRelationTypeEnum("relation_type").notNull(),
    ...timestamps,
  },
  (table) => [
    unique("grammar_topic_relations_unique").on(
      table.fromTopicId,
      table.toTopicId,
      table.relationType,
    ),
    check(
      "grammar_topic_relations_no_self",
      sql`${table.fromTopicId} <> ${table.toTopicId}`,
    ),
  ],
);

export const grammarRules = pgTable(
  "grammar_rules",
  {
    id: id(),
    topicId: uuid("topic_id")
      .notNull()
      .references(() => grammarTopics.id, { onDelete: "cascade" }),
    titleEn: text("title_en").notNull(),
    titleVi: text("title_vi").notNull(),
    pattern: text("pattern").notNull(),
    explanationVi: text("explanation_vi").notNull(),
    orderIndex: integer("order_index").notNull().default(0),
    ...timestamps,
  },
  (table) => [index("grammar_rules_topic_idx").on(table.topicId)],
);

export const grammarLessons = pgTable(
  "grammar_lessons",
  {
    id: id(),
    topicId: uuid("topic_id")
      .notNull()
      .references(() => grammarTopics.id, { onDelete: "cascade" }),
    version: integer("version").notNull().default(1),
    body: jsonb("body").$type<GrammarLessonBody>().notNull(),
    status: grammarContentStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    unique("grammar_lessons_topic_version_unique").on(table.topicId, table.version),
    index("grammar_lessons_topic_status_idx").on(table.topicId, table.status),
  ],
);

export const grammarExamples = pgTable(
  "grammar_examples",
  {
    id: id(),
    topicId: uuid("topic_id")
      .notNull()
      .references(() => grammarTopics.id, { onDelete: "cascade" }),
    ruleId: uuid("rule_id").references(() => grammarRules.id, { onDelete: "set null" }),
    sentenceEn: text("sentence_en").notNull(),
    sentenceVi: text("sentence_vi").notNull(),
    highlights: jsonb("highlights").$type<GrammarExampleHighlight[]>().notNull().default([]),
    level: cefrLevelEnum("cefr_level").notNull(),
    difficulty: smallint("difficulty").notNull().default(1),
    sourceId: uuid("source_id").references(() => contentSources.id, {
      onDelete: "set null",
    }),
    sourceRecordId: text("source_record_id"),
    normalizedHash: text("normalized_hash").notNull(),
    ...timestamps,
  },
  (table) => [
    index("grammar_examples_topic_idx").on(table.topicId),
    index("grammar_examples_normalized_hash_idx").on(table.normalizedHash),
    check(
      "grammar_examples_difficulty_check",
      sql`${table.difficulty} >= 1 and ${table.difficulty} <= 5`,
    ),
  ],
);

export const grammarMistakes = pgTable(
  "grammar_mistakes",
  {
    id: id(),
    topicId: uuid("topic_id")
      .notNull()
      .references(() => grammarTopics.id, { onDelete: "cascade" }),
    incorrectSentence: text("incorrect_sentence").notNull(),
    correctSentence: text("correct_sentence").notNull(),
    errorType: text("error_type").notNull(),
    explanationVi: text("explanation_vi").notNull(),
    severity: smallint("severity").notNull().default(1),
    level: cefrLevelEnum("cefr_level").notNull(),
    ...timestamps,
  },
  (table) => [
    index("grammar_mistakes_topic_idx").on(table.topicId),
    check(
      "grammar_mistakes_severity_check",
      sql`${table.severity} >= 1 and ${table.severity} <= 3`,
    ),
    check(
      "grammar_mistakes_error_type_check",
      sql`${table.errorType} in ('article','preposition','verb_tense','subject_verb_agreement','plural','pronoun','word_form','word_order','modal','conditional','passive','relative_clause','gerund_infinitive','other')`,
    ),
  ],
);

/**
 * Per-user topic mastery. Attempts themselves live in shared `quiz_attempts`
 * (choice: keep QuizRunner). This row is updated when a grammar quiz is
 * submitted (Prompt 4); `next_review_at` reserved for SRS later.
 */
export const userGrammarProgress = pgTable(
  "user_grammar_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    topicId: uuid("topic_id")
      .notNull()
      .references(() => grammarTopics.id, { onDelete: "cascade" }),
    attemptCount: integer("attempt_count").notNull().default(0),
    correctCount: integer("correct_count").notNull().default(0),
    masteryScore: numeric("mastery_score", { precision: 4, scale: 3 })
      .notNull()
      .default("0"),
    lastAttemptAt: timestamp("last_attempt_at", { withTimezone: true }),
    nextReviewAt: timestamp("next_review_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.topicId] }),
    check(
      "user_grammar_progress_mastery_check",
      sql`${table.masteryScore} >= 0 and ${table.masteryScore} <= 1`,
    ),
    index("user_grammar_progress_user_idx").on(table.userId),
  ],
);
