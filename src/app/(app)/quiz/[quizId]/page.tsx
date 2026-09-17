import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { QuizRunner } from "@/features/quiz/components/QuizRunner";
import { getQuizForAttempt, getQuizTitle } from "@/features/quiz/queries";
import { requireUser } from "@/lib/session";

type QuizPageProps = {
  params: Promise<{ quizId: string }>;
  searchParams: Promise<{ from?: string }>;
};

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { quizId } = await params;
  const title = await getQuizTitle(quizId);
  return { title: title ?? "Quiz" };
}

/**
 * Standalone quiz runner at `/quiz/[quizId]` (Phase 11 / spec §19).
 */
export default async function QuizPage({ params, searchParams }: QuizPageProps) {
  await requireUser();
  const { quizId } = await params;
  const { from } = await searchParams;
  const quiz = await getQuizForAttempt(quizId);

  if (!quiz) {
    notFound();
  }

  const returnTo =
    from && from.startsWith("/") && !from.startsWith("//") ? from : undefined;

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title={quiz.title} description={quiz.description} />
      <QuizRunner quiz={quiz} returnTo={returnTo} hideTitle />
    </div>
  );
}
