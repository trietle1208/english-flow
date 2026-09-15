import { cefrLevelEnum } from "@/db/schema/enums";

/** CEFR levels offered in Phase 1 (spec §8, §10, §16). */
export const CEFR_LEVELS = cefrLevelEnum.enumValues;

export type CefrLevel = (typeof CEFR_LEVELS)[number];

/** Human-readable labels for filters and badges (spec §10). */
export const CEFR_LEVEL_LABELS: Record<CefrLevel, string> = {
  A1: "A1 Beginner",
  A2: "A2 Elementary",
  B1: "B1 Intermediate",
  B2: "B2 Upper Intermediate",
  C1: "C1 Advanced",
};

export function isCefrLevel(value: string): value is CefrLevel {
  return (CEFR_LEVELS as readonly string[]).includes(value);
}
