import { z } from "zod";

export const vocabularyIdSchema = z.object({
  vocabularyId: z.string().uuid(),
});

export const toggleLearnedSchema = z.object({
  vocabularyId: z.string().uuid(),
  isLearned: z.boolean(),
});

export const vocabularyFilterSchema = z.enum(["all", "recent", "learned", "not_learned"]);
export const vocabularySortSchema = z.enum(["recent", "alphabetical", "most_reviewed"]);
