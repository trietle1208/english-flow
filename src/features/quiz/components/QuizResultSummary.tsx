import type { ReactNode } from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { formatTimeSpent } from "@/lib/format";

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
export async function QuizResultSummary({
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
  const t = await getTranslations("quiz");
  const headline =
    score >= 90
      ? t("outstanding")
      : score >= 80 || passed
        ? t("greatJob")
        : score >= 60
          ? t("niceEffort")
          : score >= 40
            ? t("keepPracticing")
            : t("dontGiveUp");

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">{headline}</h1>
        <p className="text-sm text-muted-foreground">
          {passed ? t("passedBody") : t("failedBody")}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label={t("score")} value={`${score}%`} />
        <Stat label={t("correct")} value={String(correctCount)} />
        <Stat label={t("incorrect")} value={String(incorrectCount)} />
        <Stat label={t("accuracy")} value={`${accuracy}%`} />
        <Stat label={t("timeSpent")} value={formatTimeSpent(timeSpentSeconds)} />
      </dl>

      <p className="text-sm text-muted-foreground">
        {t("questionsCorrect", { correct: correctCount, total: totalQuestions })}
        {passed ? t("passed") : t("notPassed")}
      </p>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button asChild className="min-h-11">
          <Link href={`/quiz/${quizId}`}>{t("tryAgain")}</Link>
        </Button>
        <Button asChild variant="secondary" className="min-h-11">
          <Link href={continueHref}>{t("continueLearning")}</Link>
        </Button>
        {children ? (
          <Button asChild variant="outline" className="min-h-11">
            <a href="#review-mistakes">{t("reviewMistakes")}</a>
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
