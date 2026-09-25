import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { AudioButton } from "@/components/shared/AudioButton";
import { Badge } from "@/components/ui/badge";
import type { VocabularySummary } from "@/features/lessons/types";
import { cn } from "@/lib/utils";

type VocabularyItemProps = {
  vocabulary: VocabularySummary;
  className?: string;
  /** Typically `SaveVocabularyButton` from lessons (Phase 09). */
  actions?: ReactNode;
};

/**
 * Shared vocabulary row (spec §12/§14). Lessons mount Save via `actions`;
 * `/vocabulary` uses `VocabularyCard` for the fuller learned/remove UI.
 */
export async function VocabularyItem({ vocabulary, className, actions }: VocabularyItemProps) {
  const t = await getTranslations("vocabulary");

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-base font-semibold tracking-tight">{vocabulary.word}</h3>
          <span className="font-mono text-sm text-muted-foreground">{vocabulary.phonetic}</span>
          <Badge variant="outline" className="capitalize">
            {t(`pos.${vocabulary.partOfSpeech}`)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{vocabulary.pronunciation}</p>
        <p className="text-sm">{vocabulary.meaning}</p>
        {vocabulary.exampleSentence.trim() ? (
          <p className="text-sm italic text-muted-foreground">
            &ldquo;{vocabulary.exampleSentence}&rdquo;
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <AudioButton audioUrl={vocabulary.audioUrl} word={vocabulary.word} />
        {actions}
      </div>
    </article>
  );
}
