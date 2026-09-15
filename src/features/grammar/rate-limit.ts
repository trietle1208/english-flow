/** Tiny in-process rate limit for grammar-linked quiz submits (Prompt 2). */
const attemptBuckets = new Map<string, number[]>();

export function allowGrammarAttempt(userId: string, limit = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const prev = (attemptBuckets.get(userId) ?? []).filter((t) => now - t < windowMs);
  if (prev.length >= limit) {
    return false;
  }
  prev.push(now);
  attemptBuckets.set(userId, prev);
  return true;
}

/** Test helper — clear buckets between unit tests. */
export function resetGrammarAttemptRateLimit(): void {
  attemptBuckets.clear();
}
