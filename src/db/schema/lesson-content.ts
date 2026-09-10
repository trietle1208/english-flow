import { z } from "zod";

/**
 * Shape of `lessons.content` (AD-03) — a JSONB array of typed blocks.
 *
 * Blocks only ever *reference* other entities by id (`vocabularyIds`,
 * `quizId`, `listeningLessonId`); they never copy that entity's content in,
 * so there is a single source of truth. Exported from `db/schema` (not a
 * `features/lessons/schemas.ts`) because it describes a column's on-disk
 * shape, and is needed here by the seed script before the `lessons` feature
 * folder exists (Phase 08).
 */
export const lessonBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("objective"), text: z.string().min(1) }),
  z.object({ type: z.literal("explanation"), markdown: z.string().min(1) }),
  z.object({ type: z.literal("vocabulary"), vocabularyIds: z.array(z.string().uuid()).min(1) }),
  z.object({
    type: z.literal("examples"),
    items: z.array(z.object({ en: z.string().min(1), vi: z.string().min(1) })).min(1),
  }),
  z.object({ type: z.literal("exercise"), quizId: z.string().uuid() }),
  z.object({ type: z.literal("audio"), listeningLessonId: z.string().uuid() }),
]);

export const lessonContentSchema = z.array(lessonBlockSchema).min(1);

export type LessonBlock = z.infer<typeof lessonBlockSchema>;
export type LessonContent = z.infer<typeof lessonContentSchema>;
