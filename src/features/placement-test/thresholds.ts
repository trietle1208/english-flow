import type { CefrLevel } from "@/config/cefr";
import type { PlacementLevelThreshold } from "@/features/quiz/engine";

/**
 * Score → CEFR conversion (spec §8). `score` is percent of points (0–100).
 * Read top-to-bottom; first match where `score >= minScore` wins.
 * Shared by seed + `submitPlacementTest`.
 */
export const placementScoreToLevel: PlacementLevelThreshold[] = [
  { minScore: 85, level: "C1" },
  { minScore: 65, level: "B2" },
  { minScore: 45, level: "B1" },
  { minScore: 25, level: "A2" },
  { minScore: 0, level: "A1" },
];

export type { CefrLevel };
