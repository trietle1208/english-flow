import { z } from "zod";

export const submitSpeakingAttemptSchema = z.object({
  promptId: z.string().uuid("Prompt not found."),
  recognizedText: z
    .string()
    .trim()
    .min(1, "Please speak or type what you said.")
    .max(5000, "That transcript is too long."),
});

export type SubmitSpeakingAttemptInput = z.infer<typeof submitSpeakingAttemptSchema>;
