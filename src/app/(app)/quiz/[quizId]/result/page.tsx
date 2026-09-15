import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizResultSummary } from "@/features/quiz/components/QuizResultSummary";
import { ReviewMistakes } from "@/features/quiz/components/ReviewMistakes";
import { getQuizAttemptForOwner, getQuizTitle } from "@/features/quiz/queries";
import { requireUser } from "@/lib/session";

type QuizResultPageProps = {
  params: Promise<{ quizId: string }>;
  searchParams: Promise<{ attempt?: string; from?: string }>;
};

export async function generateMetadata({ params }: QuizResultPageProps): Promise<Metadata> {
  const { quizId } = await params;
  const title = await getQuizTitle(quizId);
  return { title: title ? `${title} — Result` : "Quiz result" };
}

/**
 * Quiz result + Review Mistakes (spec §20). Ownership-gated via attempt id.
 */
export default async function QuizResultPage({ params, searchParams }: QuizResultPageProps) {
  const user = await requireUser();
  const { quizId } = await params;
  const { attempt, from } = await searchParams;

  if (!attempt) {
    notFound();
  }

  const detail = await getQuizAttemptForOwner(attempt, user.id);
  if (!detail || detail.quizId !== quizId) {
    notFound();
  }

  const continueHref =
    from && from.startsWith("/") && !from.startsWith("//") ? from : "/courses";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <QuizResultSummary
        score={detail.score}
        correctCount={detail.correctCount}
        incorrectCount={detail.incorrectCount}
        totalQuestions={detail.totalQuestions}
        accuracy={detail.accuracy}
        timeSpentSeconds={detail.timeSpentSeconds}
        passed={detail.passed}
        quizId={detail.quizId}
        continueHref={continueHref}
      >
        <section id="review-mistakes" className="space-y-4 scroll-mt-8 pt-4">
          <h2 className="text-base font-semibold tracking-tight">Review Mistakes</h2>
          <ReviewMistakes answers={detail.answers} />
        </section>
      </QuizResultSummary>
    </div>
  );
}
