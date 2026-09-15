"use server";

/**
 * Listening mutations go through the shared quiz action for Phase 10
 * (`submitQuizAttempt` in `features/quiz`). This module is reserved for
 * listening-specific writes if Phase 11+ needs them (e.g. progress without
 * a quiz). Kept so the feature folder matches AD-07 conventions.
 */

export { submitQuizAttempt as submitListeningQuiz } from "@/features/quiz/actions";
