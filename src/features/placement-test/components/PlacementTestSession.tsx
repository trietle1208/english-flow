"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { CefrLevel } from "@/config/cefr";
import type { PlacementSubmitResult, PlacementTestForAttempt } from "../types";
import { PlacementResult } from "./PlacementResult";
import { PlacementTestRunner } from "./PlacementTestRunner";

type PlacementTestSessionProps = {
  test: PlacementTestForAttempt;
  /** Prior result so retakers can see their last estimate before starting. */
  previousLevel?: CefrLevel | null;
};

/**
 * Client shell: intro → runner → result. Keeps "Skip for now" for first-time
 * visitors (Phase 04) and supports retake from settings.
 */
export function PlacementTestSession({
  test,
  previousLevel,
}: PlacementTestSessionProps) {
  const t = useTranslations("placement");
  const tCefr = useTranslations("cefr");
  const [phase, setPhase] = useState<"intro" | "running" | "done">("intro");
  const [result, setResult] = useState<PlacementSubmitResult | null>(null);

  if (phase === "done" && result) {
    return (
      <PlacementResult
        score={result.score}
        estimatedLevel={result.estimatedLevel}
        correctCount={result.correctCount}
        totalQuestions={result.totalQuestions}
      />
    );
  }

  if (phase === "running") {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{test.title}</h1>
          <p className="text-sm text-muted-foreground">{test.description}</p>
        </div>
        <PlacementTestRunner
          test={test}
          onComplete={(data) => {
            setResult(data);
            setPhase("done");
          }}
        />
      </div>
    );
  }

  const previousLevelLabel = previousLevel ? tCefr(previousLevel) : null;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">{t("findLevel")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("intro", {
            description: test.description,
            count: test.questionCount,
          })}
        </p>
        {previousLevel && previousLevelLabel ? (
          <p className="text-sm">
            {t("currentLevel", {
              level: previousLevel,
              label: previousLevelLabel,
            })}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          className="min-h-11"
          onClick={() => setPhase("running")}
        >
          {previousLevel ? t("retake") : t("start")}
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/dashboard">{t("skip")}</Link>
        </Button>
      </div>
    </div>
  );
}
