import { z } from "zod";

const placementAnswerSchema = z.union([
  z.object({
    questionId: z.string().uuid(),
    selectedOptionIndex: z.number().int().min(0).max(20),
  }),
  z.object({
    questionId: z.string().uuid(),
    textAnswer: z.string().trim().min(1).max(200),
  }),
]);

export const submitPlacementTestSchema = z.object({
  placementTestId: z.string().uuid(),
  answers: z.array(placementAnswerSchema).min(1),
  startedAt: z.string().datetime(),
});

export type SubmitPlacementTestInput = z.infer<typeof submitPlacementTestSchema>;
