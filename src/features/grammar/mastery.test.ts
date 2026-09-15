import { describe, expect, it } from "vitest";
import { formatMasteryScore, masteryFromRecentScores } from "./mastery";
import { allowGrammarAttempt, resetGrammarAttemptRateLimit } from "./rate-limit";

describe("masteryFromRecentScores", () => {
  it("returns 0 for empty history", () => {
    expect(masteryFromRecentScores([])).toBe(0);
  });

  it("weights newer attempts more heavily", () => {
    const olderHeavy = masteryFromRecentScores([100, 0]);
    const newerHeavy = masteryFromRecentScores([0, 100]);
    expect(newerHeavy).toBeGreaterThan(olderHeavy);
  });

  it("uses at most the last 10 scores", () => {
    const scores = Array.from({ length: 12 }, (_, i) => (i < 2 ? 0 : 100));
    // First two (oldest) dropped → all remaining are 100
    expect(masteryFromRecentScores(scores)).toBe(1);
  });

  it("formats numeric(4,3)", () => {
    expect(formatMasteryScore(0.5)).toBe("0.500");
    expect(formatMasteryScore(1.5)).toBe("1.000");
    expect(formatMasteryScore(-1)).toBe("0.000");
  });
});

describe("allowGrammarAttempt", () => {
  it("rate-limits after the configured burst", () => {
    resetGrammarAttemptRateLimit();
    const userId = "rate-limit-user";
    for (let i = 0; i < 30; i += 1) {
      expect(allowGrammarAttempt(userId, 30, 60_000)).toBe(true);
    }
    expect(allowGrammarAttempt(userId, 30, 60_000)).toBe(false);
    resetGrammarAttemptRateLimit();
  });
});
