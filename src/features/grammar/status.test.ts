import { describe, expect, it } from "vitest";
import { grammarStatusFromBestScore } from "./types";

describe("grammarStatusFromBestScore", () => {
  it("maps null to not_started", () => {
    expect(grammarStatusFromBestScore(null)).toBe("not_started");
  });

  it("maps under 60 to weak", () => {
    expect(grammarStatusFromBestScore(0)).toBe("weak");
    expect(grammarStatusFromBestScore(59)).toBe("weak");
  });

  it("maps 60–79 to practiced", () => {
    expect(grammarStatusFromBestScore(60)).toBe("practiced");
    expect(grammarStatusFromBestScore(79)).toBe("practiced");
  });

  it("maps 80+ to mastered", () => {
    expect(grammarStatusFromBestScore(80)).toBe("mastered");
    expect(grammarStatusFromBestScore(100)).toBe("mastered");
  });
});
