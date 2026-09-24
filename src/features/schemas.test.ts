import { describe, expect, it } from "vitest";
import { registerSchema } from "@/features/auth/schemas";
import { parseLessonBlocks } from "@/features/lessons/schemas";
import { submitFeedbackSchema } from "@/features/feedback/schemas";
import { updateSettingsSchema } from "@/features/settings/schemas";

describe("registerSchema", () => {
  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      name: "Jane",
      email: "jane@example.com",
      password: "Password1",
      confirmPassword: "Password2",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Passwords do not match.");
    }
  });

  it("rejects weak passwords", () => {
    const result = registerSchema.safeParse({
      name: "Jane",
      email: "jane@example.com",
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid payload", () => {
    const result = registerSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "Password1",
      confirmPassword: "Password1",
    });
    expect(result.success).toBe(true);
  });
});

describe("updateSettingsSchema", () => {
  it("accepts allowed daily goals and nullable prefs", () => {
    const result = updateSettingsSchema.safeParse({
      name: "Jane",
      cefrLevel: "B1",
      dailyGoalMinutes: 45,
      preferredLearningTime: "morning",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid daily goals", () => {
    const result = updateSettingsSchema.safeParse({
      name: "Jane",
      cefrLevel: null,
      dailyGoalMinutes: 15,
      preferredLearningTime: null,
    });
    expect(result.success).toBe(false);
  });
});

describe("submitFeedbackSchema", () => {
  const valid = {
    category: "suggestion" as const,
    rating: null,
    title: "Quiz layout on mobile",
    message: "The fill-blank input is hard to tap on a small phone.",
    isPublic: false,
  };

  it("accepts a suggestion without a rating", () => {
    expect(submitFeedbackSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a rating when the category is review", () => {
    const result = submitFeedbackSchema.safeParse({
      ...valid,
      category: "review",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Hãy chọn số sao cho đánh giá.",
      );
    }
  });

  it("accepts a public review with stars", () => {
    const result = submitFeedbackSchema.safeParse({
      ...valid,
      category: "review",
      rating: 5,
      isPublic: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a short message", () => {
    const result = submitFeedbackSchema.safeParse({
      ...valid,
      message: "too short",
    });
    expect(result.success).toBe(false);
  });
});

describe("parseLessonBlocks", () => {
  it("keeps valid blocks and drops unknown types", () => {
    const blocks = parseLessonBlocks([
      { type: "objective", text: "Learn greetings." },
      { type: "ai-tutor", prompt: "future" },
      { type: "explanation", markdown: "Hello means xin chào." },
      { type: "vocabulary", vocabularyIds: [] },
    ]);

    expect(blocks).toEqual([
      { type: "objective", text: "Learn greetings." },
      { type: "explanation", markdown: "Hello means xin chào." },
    ]);
  });

  it("returns [] for non-arrays", () => {
    expect(parseLessonBlocks(null)).toEqual([]);
    expect(parseLessonBlocks({ type: "objective" })).toEqual([]);
  });
});
