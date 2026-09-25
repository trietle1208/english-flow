"use client";

import { motion, useReducedMotion } from "motion/react";
import { Flame, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const TOEIC_PLAY_TIMER_MS = 8_000;

type PlayHudProps = {
  index: number;
  total: number;
  score: number;
  streak: number;
  /** 1 = full time left, 0 = expired. */
  timerRatio: number;
  onExit: () => void;
};

/**
 * Arcade HUD: exit, progress pills, score, streak, and circular timer.
 */
export function PlayHud({
  index,
  total,
  score,
  streak,
  timerRatio,
  onExit,
}: PlayHudProps) {
  const t = useTranslations("vocabulary");
  const reduceMotion = useReducedMotion();
  const urgent = timerRatio <= 0.25 && timerRatio > 0;
  const circumference = 2 * Math.PI * 18;
  const dashOffset = circumference * (1 - Math.max(0, Math.min(1, timerRatio)));
  const secondsLeft = Math.max(0, Math.ceil(timerRatio * (TOEIC_PLAY_TIMER_MS / 1000)));

  return (
    <div className="flex w-full items-start justify-between gap-3">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-11 shrink-0 rounded-full bg-background/60 backdrop-blur-sm"
        onClick={onExit}
        aria-label={t("exitPractice")}
      >
        <X className="size-5" aria-hidden="true" />
      </Button>

      <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
        <div
          className="flex max-w-full flex-wrap justify-center gap-1"
          aria-label={t("questionOf", { n: index + 1, total })}
        >
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-3 rounded-full sm:w-4",
                i < index && "bg-primary",
                i === index && "bg-[var(--skill-vocabulary)]",
                i > index && "bg-muted-foreground/25",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {index + 1} / {total}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {streak >= 2 ? (
          <motion.div
            key={streak}
            initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1 rounded-full bg-warning/20 px-2 py-1 text-xs font-semibold text-warning-foreground"
            aria-live="polite"
          >
            <Flame className="size-3.5 text-warning" aria-hidden="true" />
            x{Math.min(streak, 5)}
          </motion.div>
        ) : null}

        <div
          className="min-w-[3.5rem] rounded-full bg-background/60 px-2.5 py-1.5 text-center text-sm font-semibold tabular-nums backdrop-blur-sm"
          aria-label={t("scoreLabel", { score })}
        >
          {score}
        </div>

        <div
          className={cn("relative size-11", urgent && !reduceMotion && "animate-pulse")}
          role="timer"
          aria-label={t("secondsLeft", { count: secondsLeft })}
        >
          <svg className="size-11 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted/40"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className={cn(
                "transition-[stroke-dashoffset] duration-100 ease-linear",
                urgent ? "text-destructive" : "text-primary",
              )}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold tabular-nums">
            {secondsLeft}
          </span>
        </div>
      </div>
    </div>
  );
}
