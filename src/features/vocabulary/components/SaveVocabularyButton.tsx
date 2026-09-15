"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { removeVocabulary, saveVocabulary } from "../actions";

type SaveVocabularyButtonProps = {
  vocabularyId: string;
  /** Server-rendered initial saved state for this user. */
  isSaved: boolean;
  className?: string;
};

/**
 * Optimistic Save ⭐ ↔ Saved toggle (spec §15). Confirmed local state keeps
 * the button correct on lesson pages without a full reload; failed actions
 * roll back via `useOptimistic`.
 */
export function SaveVocabularyButton({
  vocabularyId,
  isSaved,
  className,
}: SaveVocabularyButtonProps) {
  const [confirmedSaved, setConfirmedSaved] = useState(isSaved);
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(confirmedSaved);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setConfirmedSaved(isSaved);
  }, [isSaved]);

  function handleClick() {
    const nextSaved = !optimisticSaved;

    startTransition(async () => {
      setOptimisticSaved(nextSaved);

      const result = nextSaved
        ? await saveVocabulary(vocabularyId)
        : await removeVocabulary(vocabularyId);

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      setConfirmedSaved(nextSaved);
      toast.success(
        nextSaved ? "Vocabulary saved." : "Removed from your vocabulary.",
      );
    });
  }

  return (
    <Button
      type="button"
      variant={optimisticSaved ? "secondary" : "outline"}
      size="sm"
      className={cn(className)}
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={optimisticSaved}
      aria-label={optimisticSaved ? "Remove from vocabulary" : "Save vocabulary"}
    >
      <Star
        className={cn("size-4", optimisticSaved && "fill-current")}
        aria-hidden="true"
      />
      {optimisticSaved ? "Saved" : "Save"}
    </Button>
  );
}
