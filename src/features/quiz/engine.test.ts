import { describe, expect, it } from "vitest";
import {
  computeAccuracy,
  isFillBlankCorrect,
  normalizeBlankAnswer,
  scoreQuizAttempt,
  scoreToCefrLevel,
  type ScoreableQuestion,
  type SubmittedAnswer,
} from "./engine";
import { placementScoreToLevel } from "@/features/placement-test/thresholds";

const mcQuestion: ScoreableQuestion = {
  id: "q-mc",
  type: "multiple_choice",
  prompt: "Pick chore",
  explanation: "A chore is a small home job.",
  points: 10,
  answers: [
    { id: "a1", content: "chore", isCorrect: true },
    { id: "a2", content: "meal", isCorrect: false },
  ],
};

const tfQuestion: ScoreableQuestion = {
  id: "q-tf",
  type: "true_false",
  prompt: "The sky is blue.",
  explanation: "True in fair weather.",
  points: 5,
  answers: [
    { id: "t", content: "True", isCorrect: true },
    { id: "f", content: "False", isCorrect: false },
  ],
};

const blankQuestion: ScoreableQuestion = {
  id: "q-blank",
  type: "fill_blank",
  prompt: "She ____ to work.",
  explanation: "Present simple: goes.",
  points: 10,
  answers: [
    { id: "b1", content: "goes", isCorrect: true },
    { id: "b2", content: "go", isCorrect: true },
  ],
};

describe("normalizeBlankAnswer", () => {
  it("trims, lowercases, and collapses whitespace", () => {
    expect(normalizeBlankAnswer("  Beautiful   Day ")).toBe("beautiful day");
  });
});

describe("isFillBlankCorrect", () => {
  it("matches any accepted answer ignoring case and padding", () => {
    expect(isFillBlankCorrect(" Goes ", ["goes", "go"])).toBe(true);
    expect(isFillBlankCorrect("GO", ["goes", "go"])).toBe(true);
    expect(isFillBlankCorrect("went", ["goes", "go"])).toBe(false);
    expect(isFillBlankCorrect("   ", ["goes"])).toBe(false);
  });
});

describe("computeAccuracy", () => {
  it("returns 0 for empty quizzes and rounds percentages", () => {
    expect(computeAccuracy(0, 0)).toBe(0);
    expect(computeAccuracy(1, 3)).toBe(33);
    expect(computeAccuracy(2, 4)).toBe(50);
  });
});

describe("scoreQuizAttempt", () => {
  it("grades multiple choice, true/false, and fill-blank together", () => {
    const questions = [mcQuestion, tfQuestion, blankQuestion];
    const submitted: SubmittedAnswer[] = [
      { questionId: "q-mc", selectedAnswerIds: ["a1"] },
      { questionId: "q-tf", selectedAnswerIds: ["f"] },
      { questionId: "q-blank", textAnswer: "  GOES " },
    ];

    const result = scoreQuizAttempt(questions, submitted);

    expect(result.totalQuestions).toBe(3);
    expect(result.correctCount).toBe(2);
    expect(result.incorrectCount).toBe(1);
    expect(result.maxPoints).toBe(25);
    expect(result.earnedPoints).toBe(20);
    expect(result.score).toBe(80);
    expect(result.accuracy).toBe(67);
    expect(result.graded.find((g) => g.questionId === "q-mc")?.isCorrect).toBe(true);
    expect(result.graded.find((g) => g.questionId === "q-tf")?.isCorrect).toBe(false);
    expect(result.graded.find((g) => g.questionId === "q-blank")?.isCorrect).toBe(true);
  });

  it("treats missing answers as incorrect without throwing", () => {
    const result = scoreQuizAttempt([mcQuestion], []);
    expect(result.correctCount).toBe(0);
    expect(result.graded[0]?.isCorrect).toBe(false);
    expect(result.graded[0]?.userAnswerLabel).toBe("");
  });

  it("returns zeros for an empty question bank", () => {
    const result = scoreQuizAttempt([], []);
    expect(result).toMatchObject({
      score: 0,
      correctCount: 0,
      incorrectCount: 0,
      totalQuestions: 0,
      maxPoints: 0,
      earnedPoints: 0,
      accuracy: 0,
      graded: [],
    });
  });

  it("rejects foreign answer ids as incorrect", () => {
    const result = scoreQuizAttempt(
      [mcQuestion],
      [{ questionId: "q-mc", selectedAnswerIds: ["not-a-real-id"] }],
    );
    expect(result.correctCount).toBe(0);
  });
});

describe("scoreToCefrLevel / placement thresholds", () => {
  it("maps every placement threshold boundary", () => {
    expect(scoreToCefrLevel(100, placementScoreToLevel)).toBe("C1");
    expect(scoreToCefrLevel(85, placementScoreToLevel)).toBe("C1");
    expect(scoreToCefrLevel(84, placementScoreToLevel)).toBe("B2");
    expect(scoreToCefrLevel(65, placementScoreToLevel)).toBe("B2");
    expect(scoreToCefrLevel(64, placementScoreToLevel)).toBe("B1");
    expect(scoreToCefrLevel(45, placementScoreToLevel)).toBe("B1");
    expect(scoreToCefrLevel(44, placementScoreToLevel)).toBe("A2");
    expect(scoreToCefrLevel(25, placementScoreToLevel)).toBe("A2");
    expect(scoreToCefrLevel(24, placementScoreToLevel)).toBe("A1");
    expect(scoreToCefrLevel(0, placementScoreToLevel)).toBe("A1");
  });
});
