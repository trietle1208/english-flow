"use client";

import { Progress } from "@/components/ui/progress";

type QuizProgressBarProps = {
  current: number;
  total: number;
  /** Optional live score — only shown when reveal_mode is immediate. */
  scoreLabel?: string | null;
};

/**
 * Top-of-quiz progress: "Question 3 of 10" + bar (+ optional running score).
 */
export function QuizProgressBar({ current, total, scoreLabel }: QuizProgressBarProps) {
  const safeTotal = Math.max(1, total);
  const clamped = Math.min(Math.max(current, 0), safeTotal);
  const percent = Math.round((clamped / safeTotal) * 100);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-medium tabular-nums text-muted-foreground">
          Question {clamped} of {safeTotal}
        </p>
        {scoreLabel ? (
          <p className="tabular-nums text-muted-foreground" aria-live="polite">
            Score: {scoreLabel}
          </p>
        ) : null}
      </div>
      <Progress value={percent} aria-label={`Progress: ${percent}%`} />
    </div>
  );
}
