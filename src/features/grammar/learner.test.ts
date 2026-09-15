import { describe, expect, it } from "vitest";
import {
  learnerPayloadContainsAnswerLeak,
  seededShuffle,
  toLearnerExercise,
  type ExerciseWithAnswer,
} from "./learner";

const sampleWithAnswers: ExerciseWithAnswer = {
  id: "11111111-1111-7111-8111-111111111111",
  title: "Present Simple",
  description: "Mini quiz",
  passScore: 70,
  revealMode: "after_submit",
  timeLimitSeconds: null,
  questions: [
    {
      id: "22222222-2222-7222-8222-222222222222",
      orderIndex: 0,
      type: "multiple_choice",
      prompt: "She ______ every day.",
      points: 1,
      explanation: "Third person -s",
      answers: [
        { id: "a1", content: "goes", isCorrect: true },
        { id: "a2", content: "go", isCorrect: false },
        { id: "a3", content: "going", isCorrect: false },
        { id: "a4", content: "gone", isCorrect: false },
      ],
    },
    {
      id: "33333333-3333-7333-8333-333333333333",
      orderIndex: 1,
      type: "fill_blank",
      prompt: "He ______ (not/like) coffee.",
      points: 1,
      explanation: "doesn't like",
      answers: [{ id: "b1", content: "doesn't like", isCorrect: true }],
    },
  ],
};

describe("toLearnerExercise", () => {
  it("strips isCorrect and fill_blank options from learner payload", () => {
    const learner = toLearnerExercise(sampleWithAnswers, {
      shuffleSeed: "quiz:user",
    });
    const raw = JSON.stringify(learner);
    expect(raw).not.toMatch(/is_correct/i);
    expect(raw).not.toMatch(/isCorrect/);
    expect(learnerPayloadContainsAnswerLeak(learner)).toBe(false);
    expect(learner.questions[0]?.answers).toHaveLength(4);
    expect(learner.questions[1]?.answers).toEqual([]);
    for (const answer of learner.questions[0]?.answers ?? []) {
      expect(answer).toEqual({ id: expect.any(String), content: expect.any(String) });
      expect(answer).not.toHaveProperty("isCorrect");
    }
  });

  it("keeps option order stable for the same seed", () => {
    const a = toLearnerExercise(sampleWithAnswers, { shuffleSeed: "stable-seed" });
    const b = toLearnerExercise(sampleWithAnswers, { shuffleSeed: "stable-seed" });
    expect(a.questions[0]?.answers.map((x) => x.id)).toEqual(
      b.questions[0]?.answers.map((x) => x.id),
    );
  });

  it("can change order when the seed changes", () => {
    const orders = new Set<string>();
    for (const seed of ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"]) {
      const learner = toLearnerExercise(sampleWithAnswers, { shuffleSeed: seed });
      orders.add((learner.questions[0]?.answers ?? []).map((x) => x.id).join(","));
    }
    expect(orders.size).toBeGreaterThan(1);
  });
});

describe("seededShuffle", () => {
  it("is deterministic", () => {
    const input = [1, 2, 3, 4, 5];
    expect(seededShuffle(input, "abc")).toEqual(seededShuffle(input, "abc"));
  });
});

describe("learnerPayloadContainsAnswerLeak", () => {
  it("detects is_correct in raw JSON string", () => {
    expect(learnerPayloadContainsAnswerLeak({ is_correct: true })).toBe(true);
    expect(learnerPayloadContainsAnswerLeak({ isCorrect: false })).toBe(true);
    expect(learnerPayloadContainsAnswerLeak({ id: "a1", content: "goes" })).toBe(false);
  });
});
