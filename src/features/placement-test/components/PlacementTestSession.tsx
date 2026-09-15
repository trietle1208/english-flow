"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CEFR_LEVEL_LABELS, type CefrLevel } from "@/config/cefr";
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

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Find your level</h1>
        <p className="text-sm text-muted-foreground">
          {test.description} About {test.questionCount} questions — take your time.
          You can skip and set a level later in Settings.
        </p>
        {previousLevel ? (
          <p className="text-sm">
            Current level on your profile:{" "}
            <span className="font-medium">
              {previousLevel} ({CEFR_LEVEL_LABELS[previousLevel]})
            </span>
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          className="min-h-11"
          onClick={() => setPhase("running")}
        >
          {previousLevel ? "Retake placement test" : "Start placement test"}
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/dashboard">Skip for now</Link>
        </Button>
      </div>
    </div>
  );
}
