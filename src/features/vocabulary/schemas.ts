import { z } from "zod";

const PART_OF_SPEECH = [
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
] as const;

export const vocabularyIdSchema = z.object({
  vocabularyId: z.string().uuid(),
});

export const toggleLearnedSchema = z.object({
  vocabularyId: z.string().uuid(),
  isLearned: z.boolean(),
});

export const vocabularyFilterSchema = z.enum(["all", "recent", "learned", "not_learned"]);
export const vocabularySortSchema = z.enum(["recent", "alphabetical", "most_reviewed"]);

export const createManualVocabularySchema = z.object({
  word: z
    .string()
    .trim()
    .min(1, "Enter an English word.")
    .max(100, "Word is too long."),
  meaning: z
    .string()
    .trim()
    .min(1, "Enter the meaning.")
    .max(500, "Meaning is too long."),
  partOfSpeech: z.enum(PART_OF_SPEECH),
  phonetic: z
    .string()
    .trim()
    .min(1, "Enter the phonetic transcription.")
    .max(120, "Phonetic is too long."),
  pronunciation: z
    .string()
    .trim()
    .max(120, "Pronunciation is too long.")
    .optional()
    .or(z.literal("")),
  exampleSentence: z
    .string()
    .trim()
    .max(300, "Example is too long.")
    .optional()
    .or(z.literal("")),
});

export type CreateManualVocabularyInput = z.infer<typeof createManualVocabularySchema>;
