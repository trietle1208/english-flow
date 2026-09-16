import { describe, expect, it } from "vitest";
import type { CefrLevel } from "@/config/cefr";
import {
  cefrDistance,
  prerequisitesMet,
  rankGrammarRecommendations,
  type RecommendableTopic,
} from "./recommendations";

function topic(
  partial: Partial<RecommendableTopic> & Pick<RecommendableTopic, "id" | "slug">,
): RecommendableTopic {
  return {
    titleEn: partial.slug,
    titleVi: partial.slug,
    level: "A1",
    summaryVi: "",
    orderIndex: 0,
    masteryScore: 0,
    prerequisiteIds: [],
    ...partial,
  };
}

describe("prerequisitesMet", () => {
  it("passes when there are no prerequisites", () => {
    expect(prerequisitesMet({ prerequisiteIds: [] }, new Map())).toBe(true);
  });

  it("requires each prerequisite mastery >= 0.8", () => {
    const mastery = new Map([
      ["ps", 0.8],
      ["past", 0.5],
    ]);
    expect(prerequisitesMet({ prerequisiteIds: ["ps"] }, mastery)).toBe(true);
    expect(prerequisitesMet({ prerequisiteIds: ["ps", "past"] }, mastery)).toBe(
      false,
    );
  });
});

describe("cefrDistance", () => {
  it("is 0 when user level is unknown", () => {
    expect(cefrDistance("B1", null)).toBe(0);
  });

  it("measures index distance", () => {
    expect(cefrDistance("A1", "A1")).toBe(0);
    expect(cefrDistance("A1", "A2")).toBe(1);
    expect(cefrDistance("A1", "B1")).toBe(2);
  });
});

describe("rankGrammarRecommendations", () => {
  const presentSimple = topic({
    id: "ps",
    slug: "present-simple",
    level: "A1",
    orderIndex: 1,
    masteryScore: 0.9,
  });
  const pastSimple = topic({
    id: "past",
    slug: "past-simple",
    level: "A2",
    orderIndex: 2,
    masteryScore: 0.2,
  });
  const presentPerfect = topic({
    id: "pp",
    slug: "present-perfect",
    level: "B1",
    orderIndex: 3,
    masteryScore: 0,
    prerequisiteIds: ["ps"],
  });

  it("excludes mastered topics and locked dependents", () => {
    const locked = topic({
      id: "pp",
      slug: "present-perfect",
      level: "B1",
      orderIndex: 3,
      masteryScore: 0,
      prerequisiteIds: ["ps"],
    });
    const notReady = topic({
      id: "ps",
      slug: "present-simple",
      level: "A1",
      orderIndex: 1,
      masteryScore: 0.5,
    });
    const ranked = rankGrammarRecommendations([notReady, locked], {
      userCefrLevel: "B1",
    });
    expect(ranked.map((r) => r.slug)).toEqual(["present-simple"]);
  });

  it("unlocks present-perfect once prerequisite is mastered", () => {
    const ranked = rankGrammarRecommendations(
      [presentSimple, pastSimple, presentPerfect],
      { userCefrLevel: "B1" as CefrLevel },
    );
    expect(ranked.map((r) => r.slug)).toEqual([
      "present-perfect",
      "past-simple",
    ]);
    expect(ranked[0]?.reason).toBe("cefr_match");
    expect(ranked[1]?.reason).toBe("weak");
  });

  it("prefers weaker mastery over CEFR when both are unlocked", () => {
    const weakMatch = topic({
      id: "a",
      slug: "weak-a1",
      level: "A1",
      orderIndex: 1,
      masteryScore: 0.1,
    });
    const strongMatch = topic({
      id: "b",
      slug: "ok-b1",
      level: "B1",
      orderIndex: 2,
      masteryScore: 0.5,
    });
    const ranked = rankGrammarRecommendations([strongMatch, weakMatch], {
      userCefrLevel: "B1",
    });
    expect(ranked[0]?.slug).toBe("weak-a1");
  });

  it("respects limit", () => {
    const many = [1, 2, 3, 4, 5].map((n) =>
      topic({
        id: `t${n}`,
        slug: `topic-${n}`,
        orderIndex: n,
        masteryScore: 0,
      }),
    );
    expect(
      rankGrammarRecommendations(many, { userCefrLevel: null, limit: 2 }),
    ).toHaveLength(2);
  });
});
