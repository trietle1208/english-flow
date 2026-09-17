"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Layers, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStudyHeartbeat } from "@/features/study-time/useStudyHeartbeat";
import { rateFlashcard } from "../actions";
import { formatReviewDueLabel } from "../schedule";
import type { FlashcardDueInfo, FlashcardItem, FlashcardRating } from "../types";
import { Flashcard } from "./Flashcard";

type FlashcardSessionProps = {
  cards: FlashcardItem[];
  dueInfo: FlashcardDueInfo;
};

type SessionStats = {
  again: number;
  good: number;
};

/**
 * Interactive flashcard study session: flip → Again / Good → next card →
 * summary. Ratings schedule `next_review_at` via light SRS (v2).
 */
export function FlashcardSession({ cards, dueInfo }: FlashcardSessionProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [finished, setFinished] = useState(cards.length === 0);
  const [stats, setStats] = useState<SessionStats>({ again: 0, good: 0 });
  const [isPending, startTransition] = useTransition();

  useStudyHeartbeat(cards.length > 0 && !finished);

  const total = cards.length;
  const current = cards[index] ?? null;
  const progressCurrent = finished ? total : index + 1;
  const percent = total === 0 ? 0 : Math.round((progressCurrent / total) * 100);

  useEffect(() => {
    setFlipped(false);
  }, [index]);

  useEffect(() => {
    if (cards.length === 0) {
      setFinished(true);
    }
  }, [cards.length]);

  const handleRate = useCallback(
    (rating: FlashcardRating) => {
      if (!current || isPending || !flipped) {
        return;
      }

      const vocabularyId = current.id;
      const isLast = index >= total - 1;

      startTransition(async () => {
        const result = await rateFlashcard(vocabularyId, rating);
        if (!result.ok) {
          toast.error(result.error);
          return;
        }

        setStats((prev) => ({
          again: prev.again + (rating === "again" ? 1 : 0),
          good: prev.good + (rating === "good" ? 1 : 0),
        }));

        if (isLast) {
          setFinished(true);
          return;
        }

        setIndex((value) => value + 1);
      });
    },
    [current, flipped, index, isPending, total],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (finished || !current || isPending) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === " " || event.key === "Enter") {
        // Let the focused flashcard face handle Enter/Space itself.
        if (target?.getAttribute("role") === "button") {
          return;
        }
        event.preventDefault();
        setFlipped((value) => !value);
        return;
      }

      if (!flipped) {
        return;
      }

      if (event.key === "1") {
        event.preventDefault();
        handleRate("again");
      } else if (event.key === "2") {
        event.preventDefault();
        handleRate("good");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, finished, flipped, handleRate, isPending]);

  function handleStudyAgain() {
    setIndex(0);
    setFlipped(false);
    setFinished(false);
    setStats({ again: 0, good: 0 });
    router.refresh();
  }

  if (total === 0) {
    if (dueInfo.totalSaved === 0) {
      return (
        <EmptyState
          icon={Layers}
          title="No words to study yet"
          description="Save vocabulary from lessons — or add your own — then come back to practice with flashcards."
          action={
            <Button asChild>
              <Link href="/vocabulary">Back to My Vocabulary</Link>
            </Button>
          }
        />
      );
    }

    const nextLabel = dueInfo.nextReviewAt
      ? formatReviewDueLabel(dueInfo.nextReviewAt)
      : null;

    return (
      <EmptyState
        icon={CheckCircle2}
        title="You're caught up"
        description={
          nextLabel
            ? `No cards are due right now. Your next review is ${nextLabel}.`
            : "No cards are due right now. Check back later."
        }
        action={
          <Button asChild variant="outline">
            <Link href="/vocabulary">Back to My Vocabulary</Link>
          </Button>
        }
      />
    );
  }

  if (finished) {
    const reviewedCount = stats.again + stats.good;
    const canStudyAgain = stats.again > 0;
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <Layers className="size-7 text-muted-foreground" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Session complete</h2>
          <p className="text-sm text-muted-foreground">
            You reviewed {reviewedCount} {reviewedCount === 1 ? "word" : "words"} this round.
            {stats.good > 0
              ? " Good cards are scheduled for later (1 → 3 → 7 days)."
              : null}
            {stats.again > 0 ? " Again cards stay due now." : null}
          </p>
        </div>
        <dl className="grid w-full grid-cols-2 gap-3">
          <div className="rounded-lg border bg-card p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Again
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{stats.again}</dd>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Good
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{stats.good}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button asChild variant="outline">
            <Link href="/vocabulary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              My Vocabulary
            </Link>
          </Button>
          {canStudyAgain ? (
            <Button type="button" onClick={handleStudyAgain}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Review Again cards
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  if (!current) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="font-medium tabular-nums text-muted-foreground">
            Card {index + 1} of {total}
          </p>
          <p className="text-xs text-muted-foreground" aria-hidden="true">
            Space flip · 1 Again · 2 Good
          </p>
        </div>
        <Progress value={percent} aria-label={`Progress: ${percent}%`} />
      </div>

      <Flashcard item={current} flipped={flipped} onFlip={() => setFlipped((value) => !value)} />

      <div className="flex flex-wrap items-center justify-center gap-3" aria-live="polite">
        {flipped ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="min-w-28 flex-col gap-0.5 py-2"
              disabled={isPending}
              onClick={() => handleRate("again")}
            >
              <span>Again</span>
              <span className="text-[10px] font-normal text-muted-foreground">Due now</span>
            </Button>
            <Button
              type="button"
              size="lg"
              className="min-w-28 flex-col gap-0.5 py-2"
              disabled={isPending}
              onClick={() => handleRate("good")}
            >
              <span>Good</span>
              <span className="text-[10px] font-normal text-primary-foreground/80">
                1 → 3 → 7 days
              </span>
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Flip the card, then rate how well you knew it.
          </p>
        )}
      </div>
    </div>
  );
}
