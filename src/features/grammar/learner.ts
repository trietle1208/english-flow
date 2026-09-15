import type { QuizForAttempt, QuizQuestionForAttempt } from "@/features/quiz/types";

/**
 * Learner-facing grammar exercise payload (Prompt 2).
 * Same shape as `QuizForAttempt` — **never** includes `isCorrect` / answer keys.
 * Kept as a distinct alias so call sites stay auditable.
 */
export type ExerciseForLearner = QuizForAttempt;

/** Server-only answer key for a single option. */
export type ExerciseOptionWithAnswer = {
  id: string;
  content: string;
  isCorrect: boolean;
};

/** Server-only question + answer key. Never pass to Client Components. */
export type ExerciseQuestionWithAnswer = {
  id: string;
  orderIndex: number;
  type: QuizQuestionForAttempt["type"];
  prompt: string;
  points: number;
  explanation: string;
  answers: ExerciseOptionWithAnswer[];
};

/** Server-only quiz with answer keys. */
export type ExerciseWithAnswer = {
  id: string;
  title: string;
  description: string;
  passScore: number;
  revealMode: QuizForAttempt["revealMode"];
  timeLimitSeconds: number | null;
  questions: ExerciseQuestionWithAnswer[];
};

export type ToLearnerOptions = {
  /**
   * Seed for deterministic option shuffle (exerciseId + userId / sessionId).
   * Same seed → same order across F5.
   */
  shuffleSeed: string;
};

/** Mulberry32 PRNG — tiny deterministic shuffle helper (no new deps). */
function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Fisher–Yates with seeded RNG so refreshes keep option order stable. */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const result = [...items];
  const rand = mulberry32(hashSeed(seed));
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = result[i]!;
    result[i] = result[j]!;
    result[j] = tmp;
  }
  return result;
}

/**
 * Map a server quiz (with or without `isCorrect`) to a learner-safe payload.
 * Strips correctness flags and shuffles MCQ/TF options.
 */
export function toLearnerExercise(
  exercise: ExerciseWithAnswer | QuizForAttempt,
  options: ToLearnerOptions,
): ExerciseForLearner {
  return {
    id: exercise.id,
    title: exercise.title,
    description: exercise.description,
    passScore: exercise.passScore,
    revealMode: exercise.revealMode,
    timeLimitSeconds: exercise.timeLimitSeconds,
    questions: exercise.questions.map((question) => {
      const rawAnswers = question.answers.map((answer) => ({
        id: answer.id,
        content: answer.content,
      }));
      const answers =
        question.type === "fill_blank"
          ? []
          : seededShuffle(rawAnswers, `${options.shuffleSeed}:${question.id}`);
      return {
        id: question.id,
        orderIndex: question.orderIndex,
        type: question.type,
        prompt: question.prompt,
        points: question.points,
        answers,
      };
    }),
  };
}

/**
 * Assert a learner payload cannot leak answer keys when serialized to the
 * RSC/JSON boundary. Checks the raw string (Prompt 2 DoD).
 */
export function learnerPayloadContainsAnswerLeak(payload: unknown): boolean {
  const raw = JSON.stringify(payload);
  return /is_correct|isCorrect/i.test(raw);
}
