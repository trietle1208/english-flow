"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Check, Copy, Pencil, PenLine, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AudioButton } from "@/components/shared/AudioButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  recordVocabularyReview,
  removeVocabulary,
  toggleLearned,
  togglePinned,
} from "../actions";
import type { SavedVocabularyItem } from "../types";
import { EditManualVocabularyDialog } from "./EditManualVocabularyDialog";

const POS_LABEL: Record<SavedVocabularyItem["partOfSpeech"], string> = {
  noun: "noun",
  verb: "verb",
  adjective: "adjective",
  adverb: "adverb",
  pronoun: "pronoun",
  preposition: "preposition",
  conjunction: "conjunction",
  interjection: "interjection",
  phrase: "phrase",
  phrasal_verb: "phrasal verb",
};

/** Examples longer than this open a modal instead of stretching the card. */
const EXAMPLE_PREVIEW_MAX = 72;

type VocabularyCardProps = {
  item: SavedVocabularyItem;
};

/**
 * Full My Vocabulary card (spec §14): word content plus a compact icon
 * toolbar (play / learned / pin / copy / edit / remove). Fixed-height grid
 * cell; long examples open in a modal.
 */
export function VocabularyCard({ item }: VocabularyCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmedLearned, setConfirmedLearned] = useState(item.isLearned);
  const [optimisticLearned, setOptimisticLearned] = useOptimistic(confirmedLearned);
  const [confirmedPinned, setConfirmedPinned] = useState(item.isPinned);
  const [optimisticPinned, setOptimisticPinned] = useOptimistic(confirmedPinned);
  const [isPending, startTransition] = useTransition();

  const example = item.exampleSentence.trim();
  const exampleNeedsModal = example.length > EXAMPLE_PREVIEW_MAX;

  useEffect(() => {
    setConfirmedLearned(item.isLearned);
  }, [item.isLearned]);

  useEffect(() => {
    setConfirmedPinned(item.isPinned);
  }, [item.isPinned]);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function handleToggleLearned() {
    const next = !optimisticLearned;
    startTransition(async () => {
      setOptimisticLearned(next);
      const result = await toggleLearned(item.id, next);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setConfirmedLearned(next);
      toast.success(next ? "Marked as learned." : "Marked as not learned.");
    });
  }

  function handleTogglePinned() {
    const next = !optimisticPinned;
    startTransition(async () => {
      setOptimisticPinned(next);
      const result = await togglePinned(item.id, next);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setConfirmedPinned(next);
      toast.success(next ? "Pinned." : "Unpinned.");
    });
  }

  function handleRemove() {
    startTransition(async () => {
      const result = await removeVocabulary(item.id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setConfirmOpen(false);
      toast.success("Removed from your vocabulary.");
    });
  }

  function handlePlay() {
    void recordVocabularyReview(item.id);
  }

  async function handleCopy() {
    const text = `${item.word} — ${item.meaning}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied word and meaning.");
    } catch {
      toast.error("Couldn’t copy. Try again.");
    }
  }

  return (
    <article className="flex h-full min-h-[17.5rem] flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex min-h-10 flex-wrap items-baseline gap-2">
          <h3 className="line-clamp-1 text-base font-semibold tracking-tight">{item.word}</h3>
          <span className="line-clamp-1 font-mono text-sm text-muted-foreground">
            {item.phonetic}
          </span>
          <Badge variant="outline" className="capitalize">
            {POS_LABEL[item.partOfSpeech]}
          </Badge>
          {item.isManual && (
            <Badge variant="secondary" className="gap-1">
              <PenLine className="size-3" aria-hidden="true" />
              Added by you
            </Badge>
          )}
          {optimisticPinned && (
            <Badge variant="secondary" className="gap-1">
              <Star className="size-3 fill-current" aria-hidden="true" />
              Pinned
            </Badge>
          )}
          {optimisticLearned && (
            <Badge variant="secondary" className="gap-1">
              <Check className="size-3" aria-hidden="true" />
              Learned
            </Badge>
          )}
        </div>

        <p className="line-clamp-1 text-sm text-muted-foreground">{item.pronunciation}</p>
        <p className="line-clamp-2 min-h-10 text-sm">{item.meaning}</p>

        <div className="min-h-10">
          {example ? (
            exampleNeedsModal ? (
              <button
                type="button"
                onClick={() => setExampleOpen(true)}
                className="group w-full rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <p className="line-clamp-2 text-sm italic text-muted-foreground group-hover:text-foreground">
                  &ldquo;{example}&rdquo;
                </p>
                <span className="mt-0.5 inline-block text-xs font-medium text-primary">
                  View full example
                </span>
              </button>
            ) : (
              <p className="line-clamp-2 text-sm italic text-muted-foreground">
                &ldquo;{example}&rdquo;
              </p>
            )
          ) : (
            <p className="line-clamp-2 text-sm italic text-muted-foreground/60">No example yet</p>
          )}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t pt-3">
        <div className="flex items-center gap-1">
          <AudioButton
            audioUrl={item.audioUrl}
            word={item.word}
            onPlay={handlePlay}
            className="size-8"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={optimisticLearned ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={handleToggleLearned}
                disabled={isPending}
                aria-pressed={optimisticLearned}
                aria-label={
                  optimisticLearned
                    ? `Mark ${item.word} as not learned`
                    : `Mark ${item.word} as learned`
                }
              >
                <Check
                  className={cn("size-4", optimisticLearned && "text-primary")}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {optimisticLearned ? "Mark as not learned" : "Mark as learned"}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleTogglePinned}
                disabled={isPending}
                aria-pressed={optimisticPinned}
                aria-label={optimisticPinned ? `Unpin ${item.word}` : `Pin ${item.word}`}
              >
                <Star
                  className={cn(
                    "size-4",
                    optimisticPinned && "fill-current text-primary",
                  )}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {optimisticPinned ? "Unpin" : "Pin"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleCopy}
                aria-label={`Copy ${item.word} and meaning`}
              >
                {copied ? (
                  <Check className="size-4 text-primary" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">{copied ? "Copied" : "Copy"}</TooltipContent>
          </Tooltip>

          {item.isManual ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setEditOpen(true)}
                  disabled={isPending}
                  aria-label={`Edit ${item.word}`}
                >
                  <Pencil className="size-4" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Edit</TooltipContent>
            </Tooltip>
          ) : null}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setConfirmOpen(true)}
                disabled={isPending}
                aria-label={`Remove ${item.word}`}
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Remove</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {item.isManual && (
        <EditManualVocabularyDialog item={item} open={editOpen} onOpenChange={setEditOpen} />
      )}

      <Dialog open={exampleOpen} onOpenChange={setExampleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{item.word}</DialogTitle>
            <DialogDescription className="sr-only">Full example sentence</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm">{item.meaning}</p>
            <p className="text-base italic leading-relaxed text-foreground">
              &ldquo;{example}&rdquo;
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setExampleOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove “{item.word}”?</DialogTitle>
            <DialogDescription>
              This removes the word from your personal vocabulary
              {item.isManual
                ? " and deletes the word you added."
                : ". You can save it again later from a lesson."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleRemove} disabled={isPending}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}
