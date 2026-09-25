"use client";

import { useTranslations } from "next-intl";
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
  const tQuiz = useTranslations("quiz");
  const tVocab = useTranslations("vocabulary");

  const safeTotal = Math.max(1, total);
  const clamped = Math.min(Math.max(current, 0), safeTotal);
  const percent = Math.round((clamped / safeTotal) * 100);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-medium tabular-nums text-muted-foreground">
          {tVocab("questionOf", { n: clamped, total: safeTotal })}
        </p>
        {scoreLabel ? (
          <p className="tabular-nums text-muted-foreground" aria-live="polite">
            {tVocab("scoreLabel", { score: scoreLabel })}
          </p>
        ) : null}
      </div>
      <Progress value={percent} aria-label={tQuiz("progressAria", { percent })} />
    </div>
  );
}
