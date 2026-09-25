"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { CefrLevel } from "@/config/cefr";

type PlacementResultProps = {
  score: number;
  estimatedLevel: CefrLevel;
  correctCount: number;
  totalQuestions: number;
};

/**
 * Placement completion screen (spec §8): score, estimated CEFR, Start Learning.
 */
export function PlacementResult({
  score,
  estimatedLevel,
  correctCount,
  totalQuestions,
}: PlacementResultProps) {
  const t = useTranslations("placement");
  const tCefr = useTranslations("cefr");

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t("levelEstimate")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("basedOn", { correct: correctCount, total: totalQuestions, score })}
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 px-6 py-8">
        <p className="text-sm text-muted-foreground">{t("estimatedLevel")}</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight">{estimatedLevel}</p>
        <p className="mt-1 text-sm text-muted-foreground">{tCefr(estimatedLevel)}</p>
      </div>

      <p className="text-base font-medium">
        {t("recommended", { level: estimatedLevel })}
      </p>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button asChild className="min-h-11">
          <Link href={`/courses?level=${estimatedLevel}`}>{t("startLearning")}</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/dashboard">{t("goToDashboard")}</Link>
        </Button>
      </div>
    </div>
  );
}
