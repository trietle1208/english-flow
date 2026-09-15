import { z } from "zod";
import { CEFR_LEVELS, type CefrLevel } from "@/config/cefr";
import {
  GRAMMAR_TOPIC_CATEGORIES,
  type GrammarTopicCategory,
} from "@/db/schema/grammar";

const cefrTuple = CEFR_LEVELS as unknown as [CefrLevel, ...CefrLevel[]];
const categoryTuple = GRAMMAR_TOPIC_CATEGORIES as unknown as [
  GrammarTopicCategory,
  ...GrammarTopicCategory[],
];

export const grammarListQuerySchema = z.object({
  cefr: z.enum(cefrTuple).optional(),
  category: z.enum(categoryTuple).optional(),
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});

export type GrammarListQuery = z.infer<typeof grammarListQuerySchema>;

export const grammarSearchQuerySchema = z.object({
  q: z.string().trim().min(1).max(100),
  limit: z.coerce.number().int().min(1).max(30).default(10),
});

export type GrammarSearchQuery = z.infer<typeof grammarSearchQuerySchema>;

export const grammarExamplesQuerySchema = z.object({
  slug: z.string().trim().min(1).max(120),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const grammarExercisesQuerySchema = z.object({
  slug: z.string().trim().min(1).max(120),
  /** Optional shuffle seed override (defaults to quizId + userId). */
  shuffleSeed: z.string().trim().min(1).max(200).optional(),
});
