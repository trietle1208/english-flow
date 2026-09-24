import { describe, expect, it } from "vitest";
import {
  classifyQuizKind,
  isQuizCatalogKind,
  quizDisplayDescription,
  quizDisplayTitle,
  quizSourceLabel,
} from "./catalog";

describe("quiz catalog grouping", () => {
  it("classifies by listening/grammar links first", () => {
    expect(
      classifyQuizKind("present-simple-quiz", { grammar: true, listening: false }),
    ).toBe("grammar");
    expect(
      classifyQuizKind("ordering-coffee-quiz", { grammar: false, listening: true }),
    ).toBe("listening");
  });

  it("classifies generated and course-practice slugs", () => {
    expect(
      classifyQuizKind("vocab-generated-toeic-office", { grammar: false, listening: false }),
    ).toBe("toeic");
    expect(
      classifyQuizKind("vocab-generated-travel", { grammar: false, listening: false }),
    ).toBe("vocabulary");
    expect(
      classifyQuizKind("academic-english-practice", { grammar: false, listening: false }),
    ).toBe("vocabulary");
  });

  it("cleans titles and license footnotes", () => {
    expect(quizDisplayTitle("Academic English — Vocabulary Practice")).toBe(
      "Academic English",
    );
    expect(quizDisplayTitle("Articles — Mini Quiz")).toBe("Articles");
    expect(
      quizDisplayTitle("TOEIC · Văn phòng · Office & admin — Vocabulary Practice", "toeic"),
    ).toBe("Văn phòng · Office & admin");
    expect(
      quizDisplayDescription(
        "Practice 8 words from this topic. EnglishFlow original vocabulary seed.",
        "Everyday English · Daily routine — Vocabulary Practice",
      ),
    ).toBe("Practice words in Everyday English · Daily routine.");
    expect(quizSourceLabel("vocab-generated-travel")).toBe("Practice set");
    expect(quizSourceLabel("everyday-english-practice")).toBe("Course");
    expect(isQuizCatalogKind("grammar")).toBe(true);
    expect(isQuizCatalogKind("exam")).toBe(false);
  });
});
