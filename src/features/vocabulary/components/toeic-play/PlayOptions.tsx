"use client";

import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ToeicPlayOption } from "../../types";

export type OptionVisualState = "default" | "selected" | "correct" | "incorrect" | "revealed";

type PlayOptionsProps = {
  options: ToeicPlayOption[];
  selectedId: string | null;
  correctOptionId: string;
  locked: boolean;
  optionState: (optionId: string) => OptionVisualState;
  onSelect: (optionId: string) => void;
};

/**
 * Four VI meaning choices with arcade press / correct / wrong feedback.
 */
export function PlayOptions({
  options,
  selectedId,
  correctOptionId,
  locked,
  optionState,
  onSelect,
}: PlayOptionsProps) {
  const t = useTranslations("vocabulary");
  const reduceMotion = useReducedMotion();

  return (
    <ul className="flex w-full flex-col gap-2.5" role="listbox" aria-label={t("meanings")}>
      {options.map((option, index) => {
        const state = optionState(option.id);
        const isWrongShake = state === "incorrect" && !reduceMotion;

        return (
          <motion.li
            key={option.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={
              isWrongShake
                ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                : { opacity: 1, y: 0, x: 0 }
            }
            transition={
              isWrongShake
                ? { duration: 0.35 }
                : { type: "spring", stiffness: 400, damping: 30, delay: reduceMotion ? 0 : index * 0.04 }
            }
          >
            <motion.button
              type="button"
              role="option"
              aria-selected={selectedId === option.id}
              disabled={locked}
              whileTap={locked || reduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex min-h-12 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors sm:text-base",
                "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                state === "default" && "border-border bg-card/80 hover:bg-muted/60",
                state === "selected" && "border-primary bg-primary/10",
                state === "correct" && "border-success bg-success/10 text-foreground",
                state === "incorrect" && "border-destructive bg-destructive/10",
                state === "revealed" && "border-success/60 bg-success/5",
                locked && state === "default" && "opacity-60",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border text-xs font-semibold tabular-nums",
                  state === "correct" || state === "revealed"
                    ? "border-success text-success"
                    : state === "incorrect"
                      ? "border-destructive text-destructive"
                      : "border-border text-muted-foreground",
                )}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 leading-snug">{option.text}</span>
              {state === "correct" || (state === "revealed" && option.id === correctOptionId) ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              ) : null}
              {state === "incorrect" ? (
                <CircleX className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
              ) : null}
            </motion.button>
          </motion.li>
        );
      })}
    </ul>
  );
}
