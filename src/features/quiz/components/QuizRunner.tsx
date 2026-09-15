"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useStudyHeartbeat } from "@/features/study-time/useStudyHeartbeat";
import { cn } from "@/lib/utils";
import { gradeQuestion, submitQuiz } from "../actions";
import type {
  ImmediateGradeResult,
  QuizAttemptAnswerInput,
  QuizForAttempt,
} from "../types";
import type { AnswerVisualState } from "./QuestionMultipleChoice";
import { QuestionFillBlank } from "./QuestionFillBlank";
import { QuestionMultipleChoice } from "./QuestionMultipleChoice";
import { QuestionTrueFalse } from "./QuestionTrueFalse";
import { QuizProgressBar } from "./QuizProgressBar";

type DraftAnswer =
  | { kind: "choice"; answerId: string }
  | { kind: "text"; text: string };

type DraftState = {
  quizId: string;
  startedAt: string;
  currentIndex: number;
  answers: Record<string, DraftAnswer>;
  grades: Record<string, ImmediateGradeResult>;
};

type QuizRunnerProps = {
  quiz: QuizForAttempt;
  /** Paths revalidated after submit (grammar / listening / lesson). */
  revalidatePaths?: string[];
  /**
   * Where the result page's "Continue Learning" should send the user.
   * Stored in the result URL as `?from=`.
   */
  returnTo?: string;
  /**
   * When true (default), navigate to `/quiz/[id]/result?attempt=…`.
   * When false, call `onComplete` instead (inline embed).
   */
  redirectOnComplete?: boolean;
  onComplete?: (attemptId: string) => void;
  /** AD-08 heartbeat; disable when a parent session already records study time. */
  enableHeartbeat?: boolean;
  /** Hide the in-runner title when the page already has a PageHeader. */
  hideTitle?: boolean;
  className?: string;
};

function storageKey(quizId: string) {
  return `englishflow:quiz-draft:${quizId}`;
}

function readDraft(quizId: string): DraftState | null {
  try {
    const raw = sessionStorage.getItem(storageKey(quizId));
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as DraftState;
    if (parsed.quizId !== quizId || typeof parsed.startedAt !== "string") {
      return null;
    }
    return {
      ...parsed,
      answers: parsed.answers ?? {},
      grades: parsed.grades ?? {},
      currentIndex:
        typeof parsed.currentIndex === "number" && parsed.currentIndex >= 0
          ? parsed.currentIndex
          : 0,
    };
  } catch {
    return null;
  }
}

function writeDraft(draft: DraftState) {
  try {
    sessionStorage.setItem(storageKey(draft.quizId), JSON.stringify(draft));
  } catch {
    // Ignore quota / private-mode failures — draft is best-effort.
  }
}

function clearDraft(quizId: string) {
  try {
    sessionStorage.removeItem(storageKey(quizId));
  } catch {
    // ignore
  }
}

/**
 * Shared quiz engine UI (spec §19): one question at a time, keyboard 1–4 + Enter,
 * reveal_mode respect, sessionStorage draft, server-side submit.
 */
export function QuizRunner({
  quiz,
  revalidatePaths,
  returnTo,
  redirectOnComplete = true,
  onComplete,
  enableHeartbeat = true,
  hideTitle = false,
  className,
}: QuizRunnerProps) {
  useStudyHeartbeat(enableHeartbeat);

  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [grading, setGrading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [startedAt, setStartedAt] = useState(() => new Date().toISOString());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, DraftAnswer>>({});
  const [grades, setGrades] = useState<Record<string, ImmediateGradeResult>>({});
  const [revealed, setRevealed] = useState(false);

  // Restore draft after mount so SSR HTML matches the first paint.
  useEffect(() => {
    const draft = readDraft(quiz.id);
    if (draft) {
      setStartedAt(draft.startedAt);
      setCurrentIndex(Math.min(draft.currentIndex, Math.max(0, quiz.questions.length - 1)));
      setAnswers(draft.answers);
      setGrades(draft.grades);
    }
    setHydrated(true);
  }, [quiz.id, quiz.questions.length]);

  const questions = quiz.questions;
  const total = questions.length;
  const question = questions[currentIndex];
  const isLast = currentIndex >= total - 1;
  const isImmediate = quiz.revealMode === "immediate";

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    writeDraft({
      quizId: quiz.id,
      startedAt,
      currentIndex,
      answers,
      grades,
    });
  }, [quiz.id, startedAt, currentIndex, answers, grades, hydrated]);

  useEffect(() => {
    setRevealed(Boolean(question && grades[question.id]));
  }, [currentIndex, question, grades]);

  const currentDraft = question ? answers[question.id] : undefined;
  const currentGrade = question ? grades[question.id] : undefined;

  const runningScoreLabel = useMemo(() => {
    if (!isImmediate) {
      return null;
    }
    const gradedIds = Object.keys(grades);
    if (gradedIds.length === 0) {
      return "—";
    }
    let earned = 0;
    let max = 0;
    for (const q of questions) {
      const grade = grades[q.id];
      if (!grade) {
        continue;
      }
      max += q.points;
      if (grade.isCorrect) {
        earned += q.points;
      }
    }
    if (max === 0) {
      return "—";
    }
    return `${Math.round((earned / max) * 100)}%`;
  }, [grades, isImmediate, questions]);

  const hasAnswer = Boolean(
    currentDraft &&
      ((currentDraft.kind === "choice" && currentDraft.answerId) ||
        (currentDraft.kind === "text" && currentDraft.text.trim())),
  );

  const selectChoice = useCallback(
    (answerId: string) => {
      if (!question || revealed) {
        return;
      }
      setAnswers((prev) => ({
        ...prev,
        [question.id]: { kind: "choice", answerId },
      }));
    },
    [question, revealed],
  );

  const setText = useCallback(
    (text: string) => {
      if (!question || revealed) {
        return;
      }
      setAnswers((prev) => ({
        ...prev,
        [question.id]: { kind: "text", text },
      }));
    },
    [question, revealed],
  );

  const buildSubmitPayload = useCallback((): QuizAttemptAnswerInput[] | null => {
    const payload: QuizAttemptAnswerInput[] = [];
    for (const q of questions) {
      const draft = answers[q.id];
      if (!draft) {
        return null;
      }
      if (q.type === "fill_blank") {
        if (draft.kind !== "text" || !draft.text.trim()) {
          return null;
        }
        payload.push({ questionId: q.id, textAnswer: draft.text.trim() });
      } else {
        if (draft.kind !== "choice" || !draft.answerId) {
          return null;
        }
        payload.push({ questionId: q.id, selectedAnswerIds: [draft.answerId] });
      }
    }
    return payload;
  }, [answers, questions]);

  const doSubmit = useCallback(() => {
    const payload = buildSubmitPayload();
    if (!payload) {
      toast.error("Please answer every question before submitting.");
      return;
    }

    const elapsed = Math.max(
      0,
      Math.round((Date.now() - new Date(startedAt).getTime()) / 1000),
    );

    startTransition(async () => {
      const response = await submitQuiz(
        {
          quizId: quiz.id,
          answers: payload,
          timeSpentSeconds: elapsed,
          startedAt,
        },
        { revalidatePaths },
      );

      if (!response.ok) {
        toast.error(response.error);
        return;
      }

      clearDraft(quiz.id);

      const from = returnTo ? `&from=${encodeURIComponent(returnTo)}` : "";
      if (redirectOnComplete) {
        router.push(`/quiz/${quiz.id}/result?attempt=${response.data.attemptId}${from}`);
        return;
      }
      onComplete?.(response.data.attemptId);
    });
  }, [
    buildSubmitPayload,
    onComplete,
    quiz.id,
    redirectOnComplete,
    revalidatePaths,
    returnTo,
    router,
    startedAt,
  ]);

  const gradeCurrent = useCallback(async (): Promise<boolean> => {
    if (!question || !isImmediate) {
      return true;
    }
    if (grades[question.id]) {
      return true;
    }
    if (!hasAnswer || !currentDraft) {
      toast.error("Select or type an answer first.");
      return false;
    }

    setGrading(true);
    try {
      const input =
        currentDraft.kind === "text"
          ? {
              quizId: quiz.id,
              questionId: question.id,
              textAnswer: currentDraft.text.trim(),
            }
          : {
              quizId: quiz.id,
              questionId: question.id,
              selectedAnswerIds: [currentDraft.answerId],
            };

      const response = await gradeQuestion(input);
      if (!response.ok) {
        toast.error(response.error);
        return false;
      }

      setGrades((prev) => ({ ...prev, [question.id]: response.data }));
      setRevealed(true);
      return true;
    } finally {
      setGrading(false);
    }
  }, [currentDraft, grades, hasAnswer, isImmediate, question, quiz.id]);

  const goNext = useCallback(async () => {
    if (!question) {
      return;
    }

    if (isImmediate && !grades[question.id]) {
      const ok = await gradeCurrent();
      if (!ok) {
        return;
      }
      // Stay so the learner can read the explanation; next Enter / Next advances.
      return;
    }

    if (!hasAnswer) {
      toast.error("Select or type an answer first.");
      return;
    }

    if (isLast) {
      doSubmit();
      return;
    }

    setCurrentIndex((i) => Math.min(i + 1, total - 1));
  }, [
    doSubmit,
    gradeCurrent,
    grades,
    hasAnswer,
    isImmediate,
    isLast,
    question,
    total,
  ]);

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
          void goNextRef.current();
          return;
        }
        if (!isTyping) {
          event.preventDefault();
          void goNextRef.current();
        }
        return;
      }

      if (isTyping || revealed || !question) {
        return;
      }

      if (question.type === "fill_blank") {
        return;
      }

      const num = Number.parseInt(event.key, 10);
      if (num >= 1 && num <= question.answers.length) {
        event.preventDefault();
        const option = question.answers[num - 1];
        if (option) {
          selectChoice(option.id);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [question, revealed, selectChoice]);

  if (total === 0 || !question) {
    return (
      <p className="text-sm text-muted-foreground">This quiz has no questions yet.</p>
    );
  }

  const optionState = (answerId: string): AnswerVisualState => {
    if (currentGrade) {
      const correctIds = new Set(currentGrade.correctAnswerIds ?? []);
      if (correctIds.has(answerId)) {
        return "correct";
      }
      if (currentDraft?.kind === "choice" && currentDraft.answerId === answerId) {
        return currentGrade.isCorrect ? "correct" : "incorrect";
      }
      return "default";
    }
    return currentDraft?.kind === "choice" && currentDraft.answerId === answerId
      ? "selected"
      : "default";
  };

  const fillState: AnswerVisualState = currentGrade
    ? currentGrade.isCorrect
      ? "correct"
      : "incorrect"
    : currentDraft?.kind === "text" && currentDraft.text.trim()
      ? "selected"
      : "default";

  const primaryLabel = (() => {
    if (isImmediate && !currentGrade) {
      return "Check answer";
    }
    if (isLast) {
      return "Submit quiz";
    }
    return "Next";
  })();

  return (
    <div className={cn("space-y-6", className)}>
      {!hideTitle ? (
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">{quiz.title}</h2>
          {quiz.description ? (
            <p className="text-sm text-muted-foreground">{quiz.description}</p>
          ) : null}
        </div>
      ) : null}

      <QuizProgressBar
        current={currentIndex + 1}
        total={total}
        scoreLabel={runningScoreLabel}
      />

      <div className="space-y-4">
        {question.type === "fill_blank" ? (
          <QuestionFillBlank
            questionId={question.id}
            prompt={question.prompt}
            value={currentDraft?.kind === "text" ? currentDraft.text : ""}
            state={fillState}
            disabled={revealed || pending}
            onChange={setText}
          />
        ) : question.type === "true_false" ? (
          <QuestionTrueFalse
            questionId={question.id}
            prompt={question.prompt}
            answers={question.answers}
            selectedId={currentDraft?.kind === "choice" ? currentDraft.answerId : null}
            optionState={optionState}
            disabled={revealed || pending}
            onSelect={selectChoice}
          />
        ) : (
          <QuestionMultipleChoice
            questionId={question.id}
            prompt={question.prompt}
            answers={question.answers}
            selectedId={currentDraft?.kind === "choice" ? currentDraft.answerId : null}
            optionState={optionState}
            disabled={revealed || pending}
            onSelect={selectChoice}
          />
        )}

        {currentGrade ? (
          <div
            className={cn(
              "rounded-lg border px-4 py-3 text-sm",
              currentGrade.isCorrect
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-destructive/40 bg-destructive/5",
            )}
            role="status"
          >
            <p className="font-medium">
              {currentGrade.isCorrect ? "Correct" : "Incorrect"}
            </p>
            {!currentGrade.isCorrect ? (
              <p className="mt-1">
                <span className="text-muted-foreground">Correct answer: </span>
                {currentGrade.correctAnswerLabel}
              </p>
            ) : null}
            <p className="mt-1 text-muted-foreground">{currentGrade.explanation}</p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Tip: press 1–4 to choose an option, Enter to continue.
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            disabled={currentIndex === 0 || pending || grading}
            onClick={goPrev}
          >
            Previous
          </Button>
          <Button
            type="button"
            className="min-h-11"
            disabled={pending || grading || (!hasAnswer && !currentGrade)}
            onClick={() => void goNext()}
          >
            {pending || grading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                {grading ? "Checking…" : "Submitting…"}
              </>
            ) : (
              primaryLabel
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
