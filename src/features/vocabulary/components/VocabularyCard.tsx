"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Check, Trash2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { recordVocabularyReview, removeVocabulary, toggleLearned } from "../actions";
import type { SavedVocabularyItem } from "../types";

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

type VocabularyCardProps = {
  item: SavedVocabularyItem;
};

/**
 * Full My Vocabulary card (spec §14): word content, Play, Mark as learned,
 * and Remove with a confirm dialog.
 */
export function VocabularyCard({ item }: VocabularyCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmedLearned, setConfirmedLearned] = useState(item.isLearned);
  const [optimisticLearned, setOptimisticLearned] = useOptimistic(confirmedLearned);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setConfirmedLearned(item.isLearned);
  }, [item.isLearned]);

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

  return (
    <article className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-base font-semibold tracking-tight">{item.word}</h3>
          <span className="font-mono text-sm text-muted-foreground">{item.phonetic}</span>
          <Badge variant="outline" className="capitalize">
            {POS_LABEL[item.partOfSpeech]}
          </Badge>
          {optimisticLearned && (
            <Badge variant="secondary" className="gap-1">
              <Check className="size-3" aria-hidden="true" />
              Learned
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{item.pronunciation}</p>
        <p className="text-sm">{item.meaning}</p>
        <p className="text-sm italic text-muted-foreground">
          &ldquo;{item.exampleSentence}&rdquo;
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <AudioButton audioUrl={item.audioUrl} word={item.word} onPlay={handlePlay} />
        <Button
          type="button"
          variant={optimisticLearned ? "secondary" : "outline"}
          size="sm"
          onClick={handleToggleLearned}
          disabled={isPending}
          aria-pressed={optimisticLearned}
        >
          <Check className={cn("size-4", optimisticLearned && "text-primary")} aria-hidden="true" />
          {optimisticLearned ? "Learned" : "Mark as learned"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => setConfirmOpen(true)}
          disabled={isPending}
        >
          <Trash2 className="size-4" aria-hidden="true" />
          Remove
        </Button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove “{item.word}”?</DialogTitle>
            <DialogDescription>
              This removes the word from your personal vocabulary. You can save it again later from
              a lesson.
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
