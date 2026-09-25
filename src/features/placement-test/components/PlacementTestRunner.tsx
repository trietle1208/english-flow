"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { submitPlacementTest } from "../actions";
import type {
  PlacementAttemptAnswerInput,
  PlacementSubmitResult,
  PlacementTestForAttempt,
} from "../types";

type DraftAnswer =
  | { kind: "choice"; optionIndex: number }
  | { kind: "text"; text: string };

type PlacementTestRunnerProps = {
  test: PlacementTestForAttempt;
  onComplete: (result: PlacementSubmitResult) => void;
};

/**
 * Placement test UI (spec §8): progress, question, Previous / Next, allow
 * going back to change answers before submit.
 */
export function PlacementTestRunner({ test, onComplete }: PlacementTestRunnerProps) {
  const t = useTranslations("placement");
  const tQuiz = useTranslations("quiz");
  const tCommon = useTranslations("common");
  const tVocab = useTranslations("vocabulary");
  const [pending, startTransition] = useTransition();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, DraftAnswer>>({});
  const startedAt = useMemo(() => new Date().toISOString(), []);

  const questions = test.questions;
  const total = questions.length;
  const question = questions[currentIndex];
  const isLast = currentIndex >= total - 1;
  const draft = question ? answers[question.id] : undefined;

  const percent = Math.round(((currentIndex + 1) / Math.max(1, total)) * 100);

  const hasAnswer = Boolean(
    draft &&
      ((draft.kind === "choice" && draft.optionIndex >= 0) ||
        (draft.kind === "text" && draft.text.trim())),
  );

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (!question) {
        return;
      }
      setAnswers((prev) => ({
        ...prev,
        [question.id]: { kind: "choice", optionIndex },
      }));
    },
    [question],
  );

  const setText = useCallback(
    (text: string) => {
      if (!question) {
        return;
      }
      setAnswers((prev) => ({
        ...prev,
        [question.id]: { kind: "text", text },
      }));
    },
    [question],
  );

  const buildPayload = useCallback((): PlacementAttemptAnswerInput[] | null => {
    const payload: PlacementAttemptAnswerInput[] = [];
    for (const q of questions) {
      const a = answers[q.id];
      if (!a) {
        return null;
      }
      if (q.type === "fill_blank") {
        if (a.kind !== "text" || !a.text.trim()) {
          return null;
        }
        payload.push({ questionId: q.id, textAnswer: a.text.trim() });
      } else {
        if (a.kind !== "choice") {
          return null;
        }
        payload.push({ questionId: q.id, selectedOptionIndex: a.optionIndex });
      }
    }
    return payload;
  }, [answers, questions]);

  const doSubmit = useCallback(() => {
    const payload = buildPayload();
    if (!payload) {
      toast.error(tQuiz("answerEvery"));
      // Jump to first unanswered.
      const firstMissing = questions.findIndex((q) => !answers[q.id]);
      if (firstMissing >= 0) {
        setCurrentIndex(firstMissing);
      }
      return;
    }

    startTransition(async () => {
      const response = await submitPlacementTest({
        placementTestId: test.id,
        answers: payload,
        startedAt,
      });

      if (!response.ok) {
        toast.error(response.error);
        return;
      }

      onComplete(response.data);
    });
  }, [answers, buildPayload, onComplete, questions, startedAt, tQuiz, test.id]);

  const goNext = useCallback(() => {
    if (!hasAnswer) {
      toast.error(tQuiz("selectAnswer"));
      return;
    }
    if (isLast) {
      doSubmit();
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, total - 1));
  }, [doSubmit, hasAnswer, isLast, tQuiz, total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" || tag === "textarea" || target?.isContentEditable;

      if (event.key === "Enter" && !event.shiftKey) {
        if (isTyping && tag === "input") {
          event.preventDefault();
          goNextRef.current();
          return;
        }
        if (!isTyping) {
          event.preventDefault();
          goNextRef.current();
        }
        return;
      }

      if (isTyping || !question || question.type === "fill_blank") {
        return;
      }

      const num = Number.parseInt(event.key, 10);
      if (num >= 1 && num <= question.options.length) {
        event.preventDefault();
        selectOption(num - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [question, selectOption]);

  if (!question || total === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("noQuestions")}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="font-medium tabular-nums text-muted-foreground">
            {tVocab("questionOf", { n: currentIndex + 1, total })}
          </p>
          <p className="text-xs text-muted-foreground">Level focus: {question.level}</p>
        </div>
        <Progress value={percent} aria-label={t("progressAria", { percent })} />
      </div>

      <div className="space-y-4">
        <p className="text-base font-medium leading-relaxed sm:text-lg">{question.prompt}</p>

        {question.type === "fill_blank" ? (
          <div className="space-y-2">
            <Label htmlFor={`placement-blank-${question.id}`}>{t("yourAnswer")}</Label>
            <Input
              id={`placement-blank-${question.id}`}
              value={draft?.kind === "text" ? draft.text : ""}
              onChange={(event) => setText(event.target.value)}
              placeholder={t("typeAnswer")}
              autoComplete="off"
              className="max-w-md"
              disabled={pending}
            />
          </div>
        ) : (
          <fieldset className="space-y-2" disabled={pending}>
            <legend className="sr-only">{t("answerOptions")}</legend>
            {question.options.map((option) => {
              const selected =
                draft?.kind === "choice" && draft.optionIndex === option.index;
              const inputId = `${question.id}-opt-${option.index}`;
              return (
                <label
                  key={option.index}
                  htmlFor={inputId}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50",
                  )}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name={question.id}
                    value={option.index}
                    checked={selected}
                    onChange={() => selectOption(option.index)}
                    className="sr-only"
                  />
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded border text-xs tabular-nums text-muted-foreground">
                    {option.index + 1}
                  </span>
                  <span>{option.content}</span>
                </label>
              );
            })}
          </fieldset>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {t("canGoBack")}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            disabled={currentIndex === 0 || pending}
            onClick={goPrev}
          >
            {tCommon("previous")}
          </Button>
          <Button
            type="button"
            className="min-h-11"
            disabled={pending || !hasAnswer}
            onClick={goNext}
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                {tQuiz("submitting")}
              </>
            ) : isLast ? (
              t("submit")
            ) : (
              tCommon("next")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
