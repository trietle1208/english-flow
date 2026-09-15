"use client";

import { CheckCircle2, Circle, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizAnswerOption } from "../types";

export type AnswerVisualState = "default" | "selected" | "correct" | "incorrect";

type QuestionMultipleChoiceProps = {
  questionId: string;
  prompt: string;
  answers: QuizAnswerOption[];
  selectedId: string | null;
  /** Per-option visual state after grading (immediate mode) or selection. */
  optionState?: (answerId: string) => AnswerVisualState;
  disabled?: boolean;
  onSelect: (answerId: string) => void;
};

/**
 * Multiple-choice options. States use icon + color (spec §31 — not color alone).
 * Keyboard 1–4 is handled by QuizRunner.
 */
export function QuestionMultipleChoice({
  questionId,
  prompt,
  answers,
  selectedId,
  optionState,
  disabled,
  onSelect,
}: QuestionMultipleChoiceProps) {
  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className="text-base font-medium leading-relaxed sm:text-lg">{prompt}</legend>
      <ul className="flex flex-col gap-2">
        {answers.map((answer, index) => {
          const state = optionState
            ? optionState(answer.id)
            : selectedId === answer.id
              ? "selected"
              : "default";
          const inputId = `${questionId}-${answer.id}`;

          return (
            <li key={answer.id}>
              <label
                htmlFor={inputId}
                className={cn(
                  "flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  state === "default" && "hover:bg-muted/50",
                  state === "selected" && "border-primary bg-primary/5",
                  state === "correct" &&
                    "border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
                  state === "incorrect" &&
                    "border-destructive/50 bg-destructive/10 text-destructive",
                  disabled && "cursor-default",
                )}
              >
                <input
                  id={inputId}
                  type="radio"
                  name={questionId}
                  value={answer.id}
                  checked={selectedId === answer.id}
                  disabled={disabled}
                  onChange={() => onSelect(answer.id)}
                  className="sr-only"
                />
                <StateIcon state={state} />
                <span className="min-w-0 flex-1">
                  <span className="mr-2 inline-flex size-5 items-center justify-center rounded border text-xs tabular-nums text-muted-foreground">
                    {index + 1}
                  </span>
                  {answer.content}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

function StateIcon({ state }: { state: AnswerVisualState }) {
  if (state === "correct") {
    return (
      <CheckCircle2
        className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
        aria-hidden="true"
      />
    );
  }
  if (state === "incorrect") {
    return <CircleX className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />;
  }
  if (state === "selected") {
    return (
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
    );
  }
  return <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />;
}
