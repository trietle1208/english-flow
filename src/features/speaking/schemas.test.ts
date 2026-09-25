import { describe, expect, it } from "vitest";
import { submitSpeakingAttemptSchema } from "./schemas";

describe("submitSpeakingAttemptSchema", () => {
  const promptId = "11111111-1111-4111-8111-111111111111";

  it("rejects empty recognized text", () => {
    const result = submitSpeakingAttemptSchema.safeParse({
      promptId,
      recognizedText: "   ",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Please speak or type what you said.");
    }
  });

  it("rejects an unknown-shaped prompt id", () => {
    const result = submitSpeakingAttemptSchema.safeParse({
      promptId: "not-a-prompt",
      recognizedText: "hello",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Prompt not found.");
    }
  });

  it("accepts a spoken transcript", () => {
    const result = submitSpeakingAttemptSchema.safeParse({
      promptId,
      recognizedText: "  Hello, my name is Linh.  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.recognizedText).toBe("Hello, my name is Linh.");
    }
  });
});
