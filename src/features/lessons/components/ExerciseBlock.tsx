import { getQuizForAttempt } from "@/features/quiz/queries";
import { QuizRunner } from "@/features/quiz/components/QuizRunner";

type ExerciseBlockProps = {
  quizId: string;
  /** Lesson path so the result page can send the learner back. */
  returnTo?: string;
};

/**
 * Inline lesson exercise — same QuizRunner as grammar / listening / standalone.
 */
export async function ExerciseBlock({ quizId, returnTo }: ExerciseBlockProps) {
  const quiz = await getQuizForAttempt(quizId);

  if (!quiz) {
    return (
      <section
        aria-labelledby="lesson-exercise-heading"
        className="space-y-3 rounded-lg border border-dashed bg-muted/30 p-4 sm:p-5"
      >
        <h2 id="lesson-exercise-heading" className="text-sm font-semibold tracking-tight">
          Practice exercise
        </h2>
        <p className="text-sm text-muted-foreground">
          This exercise isn&apos;t available yet.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="lesson-exercise-heading"
      className="space-y-4 rounded-lg border bg-card p-4 sm:p-5"
    >
      <h2 id="lesson-exercise-heading" className="sr-only">
        Practice exercise
      </h2>
      <QuizRunner
        quiz={quiz}
        returnTo={returnTo}
        revalidatePaths={returnTo ? [returnTo] : undefined}
        enableHeartbeat={false}
      />
    </section>
  );
}
