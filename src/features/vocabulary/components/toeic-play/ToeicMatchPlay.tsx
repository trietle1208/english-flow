"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookMarked } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { useStudyHeartbeat } from "@/features/study-time/useStudyHeartbeat";
import { toeicTopicLabel } from "@/db/seed-data/toeic-vocabulary";
import type { ToeicPlayCard, ToeicPlayDeck } from "../../types";
import { PlayHud, TOEIC_PLAY_TIMER_MS } from "./PlayHud";
import { PlayOptions, type OptionVisualState } from "./PlayOptions";
import { PlayPrompt } from "./PlayPrompt";
import { PlayResults } from "./PlayResults";

const FEEDBACK_MS = 900;

type ToeicMatchPlayProps = {
  deck: ToeicPlayDeck;
};

type RoundResult = "correct" | "incorrect" | "timeout";

/**
 * Full-bleed arcade Match Play: EN prompt → 4 VI options, timer + streak.
 */
export function ToeicMatchPlay({ deck }: ToeicMatchPlayProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const cards = deck.cards;
  const total = cards.length;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [missed, setMissed] = useState<ToeicPlayCard[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [floatPoints, setFloatPoints] = useState<number | null>(null);
  const [finished, setFinished] = useState(total === 0);
  const [timerRatio, setTimerRatio] = useState(1);
  const [timerActive, setTimerActive] = useState(total > 0);

  const lockedRef = useRef(false);
  const roundStartedAtRef = useRef(Date.now());
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answeredCountRef = useRef(0);
  const finishedRef = useRef(finished);

  const current = cards[index] ?? null;
  const playing = !finished && current != null;

  useStudyHeartbeat(playing);

  const catalogHref =
    deck.topic === "all"
      ? "/vocabulary/toeic"
      : `/vocabulary/toeic?topic=${deck.topic}`;

  answeredCountRef.current = answeredCount;
  finishedRef.current = finished;

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current != null) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const requestExit = useCallback(() => {
    if (answeredCountRef.current > 0 && !finishedRef.current) {
      const ok = window.confirm("Leave this round? Progress will be lost.");
      if (!ok) {
        return;
      }
    }
    router.push(catalogHref);
  }, [catalogHref, router]);

  const advance = useCallback(() => {
    clearAdvanceTimer();
    setFloatPoints(null);
    setSelectedId(null);
    setRoundResult(null);
    lockedRef.current = false;

    setIndex((prev) => {
      if (prev >= total - 1) {
        setFinished(true);
        setTimerActive(false);
        return prev;
      }
      roundStartedAtRef.current = Date.now();
      setTimerRatio(1);
      setTimerActive(true);
      return prev + 1;
    });
  }, [clearAdvanceTimer, total]);

  const resolveRound = useCallback(
    (result: RoundResult, optionId: string | null) => {
      if (!current || lockedRef.current || finished) {
        return;
      }

      lockedRef.current = true;
      setTimerActive(false);
      setSelectedId(optionId);
      setRoundResult(result);
      setAnsweredCount((n) => n + 1);

      if (result === "correct") {
        const nextStreak = streak + 1;
        const multiplier = nextStreak >= 2 ? Math.min(nextStreak, 5) : 1;
        const points = 100 * multiplier;
        setStreak(nextStreak);
        setBestStreak((best) => Math.max(best, nextStreak));
        setScore((s) => s + points);
        setFloatPoints(points);
        setCorrectCount((n) => n + 1);
      } else {
        setStreak(0);
        setFloatPoints(null);
        setMissed((prev) =>
          prev.some((card) => card.id === current.id) ? prev : [...prev, current],
        );
      }

      clearAdvanceTimer();
      advanceTimerRef.current = setTimeout(advance, reduceMotion ? 400 : FEEDBACK_MS);
    },
    [advance, clearAdvanceTimer, current, finished, reduceMotion, streak],
  );

  const handleSelect = useCallback(
    (optionId: string) => {
      if (!current || lockedRef.current) {
        return;
      }
      const isCorrect = optionId === current.correctOptionId;
      resolveRound(isCorrect ? "correct" : "incorrect", optionId);
    },
    [current, resolveRound],
  );

  useEffect(() => {
    if (!timerActive || !playing) {
      return;
    }

    roundStartedAtRef.current = Date.now();
    setTimerRatio(1);

    const tick = () => {
      const elapsed = Date.now() - roundStartedAtRef.current;
      const ratio = Math.max(0, 1 - elapsed / TOEIC_PLAY_TIMER_MS);
      setTimerRatio(ratio);
      if (ratio <= 0) {
        resolveRound("timeout", null);
      }
    };

    const id = window.setInterval(tick, 50);
    return () => window.clearInterval(id);
  }, [timerActive, playing, index, resolveRound]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        requestExit();
        return;
      }

      if (!current || lockedRef.current || finished) {
        return;
      }

      const num = Number.parseInt(event.key, 10);
      if (num >= 1 && num <= current.options.length) {
        event.preventDefault();
        const option = current.options[num - 1];
        if (option) {
          handleSelect(option.id);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, finished, handleSelect, requestExit]);

  useEffect(() => () => clearAdvanceTimer(), [clearAdvanceTimer]);

  function optionState(optionId: string): OptionVisualState {
    if (!current || roundResult == null) {
      return selectedId === optionId ? "selected" : "default";
    }

    if (optionId === current.correctOptionId) {
      return roundResult === "correct" ? "correct" : "revealed";
    }
    if (optionId === selectedId && roundResult === "incorrect") {
      return "incorrect";
    }
    return "default";
  }

  if (total === 0) {
    return (
      <FocusStage>
        <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4">
          <EmptyState
            icon={BookMarked}
            title="Not enough words to play"
            description="This topic needs more TOEIC entries for a match round. Try All topics or pick another topic."
          />
          <Button type="button" variant="outline" onClick={() => router.push(catalogHref)}>
            Back to catalog
          </Button>
        </div>
      </FocusStage>
    );
  }

  if (finished) {
    return (
      <FocusStage>
        <div className="mx-auto w-full max-w-md px-4 py-8">
          <PlayResults
            score={score}
            bestStreak={bestStreak}
            correctCount={correctCount}
            total={total}
            missed={missed}
            topic={deck.topic}
            catalogHref={catalogHref}
          />
        </div>
      </FocusStage>
    );
  }

  if (!current) {
    return null;
  }

  return (
    <FocusStage>
      <div className="mx-auto flex h-full w-full max-w-md flex-col gap-5 px-4 py-4 sm:py-6">
        <PlayHud
          index={index}
          total={total}
          score={score}
          streak={streak}
          timerRatio={timerRatio}
          onExit={requestExit}
        />

        {deck.topic !== "all" ? (
          <p className="text-center text-xs text-muted-foreground">
            {toeicTopicLabel(deck.topic)}
            {deck.widenedDistractors ? " · distractors from all topics" : ""}
          </p>
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="flex flex-1 flex-col justify-center gap-5"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            <PlayPrompt card={current} floatPoints={floatPoints} />
            <PlayOptions
              options={current.options}
              selectedId={selectedId}
              correctOptionId={current.correctOptionId}
              locked={roundResult != null}
              optionState={optionState}
              onSelect={handleSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </FocusStage>
  );
}

function FocusStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain"
      style={{
        background:
          "linear-gradient(165deg, color-mix(in oklch, var(--skill-vocabulary) 14%, var(--background)) 0%, var(--background) 48%, color-mix(in oklch, var(--primary) 8%, var(--background)) 100%)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="TOEIC Match Play"
    >
      {children}
    </div>
  );
}
