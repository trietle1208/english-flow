import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatTimeSpent } from "@/lib/format";
import { quizResultHeadline } from "../engine";

type QuizResultSummaryProps = {
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentSeconds: number;
  passed: boolean;
  quizId: string;
  /** Where "Continue Learning" should go (lesson / grammar / listening / courses). */
  continueHref?: string;
  /** Optional slot below the stats (e.g. Review Mistakes). */
  children?: ReactNode;
};

/**
 * Result screen stats + actions (spec §20): Try Again / Continue / Review.
 */
export function QuizResultSummary({
  score,
  correctCount,
  incorrectCount,
  totalQuestions,
  accuracy,
  timeSpentSeconds,
  passed,
  quizId,
  continueHref = "/courses",
  children,
}: QuizResultSummaryProps) {
  const headline = quizResultHeadline(score, passed);

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">{headline}</h1>
        <p className="text-sm text-muted-foreground">
          {passed
            ? "You passed this quiz. Review anything you missed below, or move on."
            : "You didn't pass this time — review the mistakes and try again when you're ready."}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label="Score" value={`${score}%`} />
        <Stat label="Correct" value={String(correctCount)} />
        <Stat label="Incorrect" value={String(incorrectCount)} />
        <Stat label="Accuracy" value={`${accuracy}%`} />
        <Stat label="Time spent" value={formatTimeSpent(timeSpentSeconds)} />
      </dl>

      <p className="text-sm text-muted-foreground">
        {correctCount}/{totalQuestions} questions correct
        {passed ? " · Passed" : " · Not passed yet"}
      </p>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button asChild className="min-h-11">
          <Link href={`/quiz/${quizId}`}>Try Again</Link>
        </Button>
        <Button asChild variant="secondary" className="min-h-11">
          <Link href={continueHref}>Continue Learning</Link>
        </Button>
        {children ? (
          <Button asChild variant="outline" className="min-h-11">
            <a href="#review-mistakes">Review Mistakes</a>
          </Button>
        ) : null}
      </div>

      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-lg font-semibold tabular-nums tracking-tight">{value}</dd>
    </div>
  );
}
