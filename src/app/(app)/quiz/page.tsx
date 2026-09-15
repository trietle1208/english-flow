import type { Metadata } from "next";
import Link from "next/link";
import { ListChecks } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { listQuizzes } from "@/features/quiz/queries";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Quiz",
};

/**
 * Quiz catalog — standalone entry point into `/quiz/[quizId]` (spec §19).
 * Grammar / listening / lesson exercises also open the same QuizRunner.
 */
export default async function QuizIndexPage() {
  await requireUser();
  const quizzes = await listQuizzes();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Quiz"
        description="Practice with multiple choice, true/false, and fill-in-the-blank."
      />

      {quizzes.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No quizzes yet"
          description="Quizzes appear here once content is seeded."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <article className="flex h-full flex-col gap-3 rounded-lg border p-4">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold tracking-tight">{quiz.title}</h2>
                  <p className="text-sm text-muted-foreground">{quiz.description}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {quiz.questionCount} questions · Pass at {quiz.passScore}%
                </p>
                <Button asChild className="mt-auto min-h-11 w-full sm:w-auto">
                  <Link href={`/quiz/${quiz.id}`}>Start quiz</Link>
                </Button>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
