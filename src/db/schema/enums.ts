import { pgEnum } from "drizzle-orm/pg-core";

/** CEFR proficiency levels used across users, courses, grammar and the placement test. Phase 1 stops at C1 (spec §8, §16). */
export const cefrLevelEnum = pgEnum("cefr_level", ["A1", "A2", "B1", "B2", "C1"]);

/** Skill areas tracked for lessons and per-skill progress (spec §21 "Skill Performance"). */
export const skillEnum = pgEnum("skill", [
  "vocabulary",
  "grammar",
  "listening",
  "reading",
  "speaking",
]);

/** Part of speech tag on a vocabulary entry. */
export const partOfSpeechEnum = pgEnum("part_of_speech", [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
  "phrase",
  "phrasal_verb",
]);

/** The three question types supported in Phase 1 (spec §19). */
export const questionTypeEnum = pgEnum("question_type", [
  "multiple_choice",
  "true_false",
  "fill_blank",
]);

/** Generic content difficulty, independent of CEFR level (used on vocabulary + listening). */
export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

/** When quiz answers are revealed to the learner (spec §19). */
export const revealModeEnum = pgEnum("reveal_mode", ["immediate", "after_submit"]);

/** Lifecycle of a user's progress through one lesson (spec §21). */
export const progressStatusEnum = pgEnum("progress_status", [
  "not_started",
  "in_progress",
  "completed",
]);
