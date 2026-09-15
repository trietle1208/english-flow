import { z } from "zod";
import { CEFR_LEVELS } from "@/config/cefr";
import { PREFERRED_LEARNING_TIMES } from "./constants";

export const updateSettingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name is too long."),
  cefrLevel: z.enum(CEFR_LEVELS).nullable(),
  dailyGoalMinutes: z.union([
    z.literal(10),
    z.literal(20),
    z.literal(30),
    z.literal(45),
    z.literal(60),
  ]),
  preferredLearningTime: z.enum(PREFERRED_LEARNING_TIMES).nullable(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
