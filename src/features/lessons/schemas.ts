import { z } from "zod";
import {
  lessonBlockSchema,
  lessonContentSchema,
  type LessonBlock,
  type LessonContent,
} from "@/db/schema/lesson-content";

/**
 * Re-export of the AD-03 block schemas (canonical copy lives in
 * `db/schema/lesson-content.ts` for the seed script). Feature code imports
 * from here so the lessons module owns its public Zod surface.
 */
export { lessonBlockSchema, lessonContentSchema };
export type { LessonBlock, LessonContent };

export const completeLessonSchema = z.object({
  lessonId: z.string().uuid(),
});

export const updateLessonProgressSchema = z.object({
  lessonId: z.string().uuid(),
  percent: z.number().int().min(0).max(100),
});

/**
 * Parse stored `lessons.content` safely: drop any block that fails Zod
 * (unknown `type`, bad shape) instead of crashing the page. Spec/AD-03
 * allow new block kinds later; old clients must keep rendering.
 */
export function parseLessonBlocks(raw: unknown): LessonBlock[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const blocks: LessonBlock[] = [];
  for (const item of raw) {
    const parsed = lessonBlockSchema.safeParse(item);
    if (parsed.success) {
      blocks.push(parsed.data);
    }
  }
  return blocks;
}
