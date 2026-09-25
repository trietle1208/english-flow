import { normalizeBlankAnswer } from "@/features/quiz/engine";

export type ComparedToken = {
  token: string;
  matched: boolean;
};

export type TranscriptCompare = {
  overlapPercent: number;
  expected: ComparedToken[];
  recognized: ComparedToken[];
};

/** Split on whitespace after fill-blank normalize, dropping leftover punctuation. */
export function tokenizeForCompare(value: string): string[] {
  const normalized = normalizeBlankAnswer(value)
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!normalized) {
    return [];
  }
  return normalized.split(" ");
}

function uniqueTokenSet(tokens: readonly string[]): Set<string> {
  return new Set(tokens);
}

/**
 * Word-token Jaccard overlap (0–100). Extra or missing tokens both lower
 * the score. Empty recognized (or empty expected) is 0.
 */
export function compareTranscript(expected: string, recognized: string): number {
  return diffTranscript(expected, recognized).overlapPercent;
}

export function diffTranscript(expected: string, recognized: string): TranscriptCompare {
  const expectedTokens = tokenizeForCompare(expected);
  const recognizedTokens = tokenizeForCompare(recognized);

  if (expectedTokens.length === 0 || recognizedTokens.length === 0) {
    return {
      overlapPercent: 0,
      expected: expectedTokens.map((token) => ({ token, matched: false })),
      recognized: recognizedTokens.map((token) => ({ token, matched: false })),
    };
  }

  const expectedSet = uniqueTokenSet(expectedTokens);
  const recognizedSet = uniqueTokenSet(recognizedTokens);

  let intersection = 0;
  for (const token of expectedSet) {
    if (recognizedSet.has(token)) {
      intersection += 1;
    }
  }

  const union = expectedSet.size + recognizedSet.size - intersection;
  const overlapPercent = Math.round((intersection / union) * 100);

  return {
    overlapPercent,
    expected: expectedTokens.map((token) => ({
      token,
      matched: recognizedSet.has(token),
    })),
    recognized: recognizedTokens.map((token) => ({
      token,
      matched: expectedSet.has(token),
    })),
  };
}
