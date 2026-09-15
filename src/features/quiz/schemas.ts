import { z } from "zod";

const attemptAnswerSchema = z.union([
  z.object({
    questionId: z.string().uuid(),
    selectedAnswerIds: z.array(z.string().uuid()).min(1),
  }),
  z.object({
    questionId: z.string().uuid(),
    textAnswer: z.string().trim().min(1).max(200),
  }),
]);

export const submitQuizAttemptSchema = z.object({
  quizId: z.string().uuid(),
  answers: z.array(attemptAnswerSchema).min(1),
  timeSpentSeconds: z.number().int().min(0).max(60 * 60 * 3),
  startedAt: z.string().datetime(),
});

export type SubmitQuizAttemptInput = z.infer<typeof submitQuizAttemptSchema>;

/** Alias matching Phase 11 deliverable naming (`submitQuiz`). */
export const submitQuizSchema = submitQuizAttemptSchema;

export const gradeQuestionSchema = z.union([
  z.object({
    quizId: z.string().uuid(),
    questionId: z.string().uuid(),
    selectedAnswerIds: z.array(z.string().uuid()).min(1),
  }),
  z.object({
    quizId: z.string().uuid(),
    questionId: z.string().uuid(),
    textAnswer: z.string().trim().min(1).max(200),
  }),
]);

export type GradeQuestionInput = z.infer<typeof gradeQuestionSchema>;
