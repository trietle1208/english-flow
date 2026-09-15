/**
 * Mastery helpers for `user_grammar_progress` (Prompt 2 / 4).
 * Scores are 0–100 (from `quiz_attempts.score`); mastery is 0–1.
 */

/**
 * Weighted average of recent attempt scores (0–100), heavier weight on the
 * newest. Uses at most the last 10 attempts. Empty → 0.
 */
export function masteryFromRecentScores(scoresNewestLast: number[]): number {
  if (scoresNewestLast.length === 0) {
    return 0;
  }
  const recent = scoresNewestLast.slice(-10);
  let weightSum = 0;
  let valueSum = 0;
  for (let i = 0; i < recent.length; i += 1) {
    const weight = i + 1;
    const score = recent[i] ?? 0;
    const clamped = Math.min(100, Math.max(0, score));
    weightSum += weight;
    valueSum += (clamped / 100) * weight;
  }
  return weightSum === 0 ? 0 : valueSum / weightSum;
}

/** Format for `numeric(4,3)` column. */
export function formatMasteryScore(mastery: number): string {
  const clamped = Math.min(1, Math.max(0, mastery));
  return clamped.toFixed(3);
}
