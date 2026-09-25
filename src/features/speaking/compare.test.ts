import { describe, expect, it } from "vitest";
import { compareTranscript, tokenizeForCompare } from "./compare";

describe("tokenizeForCompare", () => {
  it("trims, lowercases, and collapses whitespace", () => {
    expect(tokenizeForCompare("  Beautiful   Day ")).toEqual(["beautiful", "day"]);
  });

  it("strips punctuation while keeping apostrophes", () => {
    expect(tokenizeForCompare("Hello, world! It's seven o'clock.")).toEqual([
      "hello",
      "world",
      "it's",
      "seven",
      "o'clock",
    ]);
  });
});

describe("compareTranscript", () => {
  it("scores Beautiful Day vs beautiful  day as 100 overlap", () => {
    expect(compareTranscript("Beautiful Day", "beautiful  day")).toBe(100);
  });

  it("ignores punctuation and case", () => {
    expect(compareTranscript("Hello, World!", "hello world")).toBe(100);
  });

  it("reduces percent when tokens are missing", () => {
    expect(compareTranscript("beautiful day today", "beautiful day")).toBe(67);
  });

  it("reduces percent when extra tokens appear", () => {
    expect(compareTranscript("beautiful day", "beautiful day today")).toBe(67);
  });

  it("returns 0 for empty recognized text", () => {
    expect(compareTranscript("Beautiful Day", "")).toBe(0);
    expect(compareTranscript("Beautiful Day", "   ")).toBe(0);
  });
});
