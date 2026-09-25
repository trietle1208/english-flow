"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizAttemptAnswerSnapshot } from "../types";

type ReviewMistakesProps = {
  answers: QuizAttemptAnswerSnapshot[];
  /** When true, only incorrect answers are listed (default). */
  mistakesOnly?: boolean;
};

/**
 * Lists wrong answers with the user's pick, the correct answer, and explanation
 * (read from `quiz_attempts.answers` jsonb — spec §20).
 */
export function ReviewMistakes({ answers, mistakesOnly = true }: ReviewMistakesProps) {
  const t = useTranslations("quiz");
  const items = mistakesOnly ? answers.filter((a) => !a.isCorrect) : answers;

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {mistakesOnly ? t("noMistakes") : t("noAnswers")}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => (
        <li
          key={item.questionId}
          className={cn(
            "rounded-lg border px-4 py-3",
            item.isCorrect
              ? "border-emerald-500/40 bg-emerald-500/5"
              : "border-destructive/40 bg-destructive/5",
          )}
        >
          <div className="flex items-start gap-2">
            {item.isCorrect ? (
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
            ) : (
              <CircleX
                className="mt-0.5 size-4 shrink-0 text-destructive"
                aria-hidden="true"
              />
            )}
            <div className="min-w-0 space-y-2">
              <p className="text-sm font-medium">
                {index + 1}. {item.prompt || t("question")}
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">{t("yourAnswerLabel")}</span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 font-medium",
                    item.isCorrect
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      : "bg-destructive/15 text-destructive line-through decoration-destructive/60",
                  )}
                >
                  {item.userAnswerLabel || "—"}
                </span>
              </p>
              {!item.isCorrect ? (
                <p className="text-sm">
                  <span className="text-muted-foreground">{t("correctAnswerLabel")}</span>
                  <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-medium text-emerald-700 dark:text-emerald-400">
                    {item.correctAnswerLabel || "—"}
                  </span>
                </p>
              ) : null}
              {item.explanation ? (
                <p className="text-sm text-muted-foreground">{item.explanation}</p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
