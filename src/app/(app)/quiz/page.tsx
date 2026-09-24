import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { isQuizCatalogKind } from "@/features/quiz/catalog";
import { QuizCatalog } from "@/features/quiz/components/QuizCatalog";
import { QuizCatalogFilters } from "@/features/quiz/components/QuizCatalogFilters";
import { listQuizzes } from "@/features/quiz/queries";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Quiz",
};

type QuizIndexPageProps = {
  searchParams: Promise<{ kind?: string }>;
};

/**
 * Quiz catalog — standalone entry point into `/quiz/[quizId]` (spec §19).
 * Grammar / listening / lesson exercises also open the same QuizRunner.
 */
export default async function QuizIndexPage({ searchParams }: QuizIndexPageProps) {
  await requireUser();
  const params = await searchParams;
  const kind =
    typeof params.kind === "string" && isQuizCatalogKind(params.kind)
      ? params.kind
      : "all";

  const quizzes = await listQuizzes();
  const visible = kind === "all" ? quizzes : quizzes.filter((quiz) => quiz.kind === kind);

  const counts = {
    all: quizzes.length,
    vocabulary: quizzes.filter((quiz) => quiz.kind === "vocabulary").length,
    toeic: quizzes.filter((quiz) => quiz.kind === "toeic").length,
    grammar: quizzes.filter((quiz) => quiz.kind === "grammar").length,
    listening: quizzes.filter((quiz) => quiz.kind === "listening").length,
  };

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Quiz"
        description={`${counts.all} quizzes grouped by skill — vocabulary, TOEIC, grammar, and listening.`}
      />

      <QuizCatalogFilters activeKind={kind} counts={counts} />
      <QuizCatalog quizzes={visible} filtered={kind !== "all"} />
    </div>
  );
}
