"use client";

import { CheckCircle2, CircleX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnswerVisualState } from "./QuestionMultipleChoice";

type QuestionFillBlankProps = {
  questionId: string;
  prompt: string;
  value: string;
  state?: AnswerVisualState;
  disabled?: boolean;
  onChange: (value: string) => void;
};

/**
 * Fill-in-the-blank. Matching (trim / lowercase / multi-answer) is server-side
 * via `engine.normalizeBlankAnswer` — never trust the client.
 */
export function QuestionFillBlank({
  questionId,
  prompt,
  value,
  state = "default",
  disabled,
  onChange,
}: QuestionFillBlankProps) {
  const inputId = `blank-${questionId}`;

  return (
    <div className="space-y-3">
      <p className="text-base font-medium leading-relaxed sm:text-lg">{prompt}</p>
      <div className="space-y-2">
        <Label htmlFor={inputId}>Your answer</Label>
        <div className="relative max-w-md">
          <Input
            id={inputId}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            placeholder="Type your answer"
            autoComplete="off"
            aria-invalid={state === "incorrect" ? true : undefined}
            className={cn(
              "pr-10",
              state === "selected" && "border-primary",
              state === "correct" && "border-emerald-500/60 focus-visible:ring-emerald-500/30",
              state === "incorrect" && "border-destructive focus-visible:ring-destructive/30",
            )}
          />
          {state === "correct" ? (
            <CheckCircle2
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
          ) : null}
          {state === "incorrect" ? (
            <CircleX
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-destructive"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
