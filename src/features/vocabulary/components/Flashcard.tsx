"use client";

import type { KeyboardEvent } from "react";
import { AudioButton } from "@/components/shared/AudioButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FlashcardItem } from "../types";

const POS_LABEL: Record<FlashcardItem["partOfSpeech"], string> = {
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

type FlashcardProps = {
  item: FlashcardItem;
  flipped: boolean;
  onFlip: () => void;
};

/**
 * Single flashcard: front = word + IPA + audio; back = meaning + example.
 * Flip target is a div (not a button) so AudioButton stays valid nested UI.
 */
export function Flashcard({ item, flipped, onFlip }: FlashcardProps) {
  const example = item.exampleSentence.trim();

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onFlip();
    }
  }

  return (
    <div className="[perspective:1000px]">
      <div
        className={cn(
          "relative min-h-[18rem] w-full transition-transform duration-500 ease-out",
          "[transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <div
          role="button"
          tabIndex={0}
          onClick={onFlip}
          onKeyDown={handleKeyDown}
          aria-pressed={flipped}
          aria-label={`Flashcard for ${item.word}. Activate to reveal meaning.`}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl border bg-card p-6 shadow-sm",
            "[backface-visibility:hidden]",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-hidden={flipped}
        >
          <Badge variant="outline" className="capitalize">
            {POS_LABEL[item.partOfSpeech]}
          </Badge>
          <p className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            {item.word}
          </p>
          <p className="font-mono text-base text-muted-foreground">{item.phonetic}</p>
          <p className="text-sm text-muted-foreground">{item.pronunciation}</p>
          <div
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <AudioButton audioUrl={item.audioUrl} word={item.word} />
          </div>
          <p className="text-xs text-muted-foreground">Tap to reveal meaning</p>
        </div>

        {/* Back */}
        <div
          role="button"
          tabIndex={flipped ? 0 : -1}
          onClick={onFlip}
          onKeyDown={handleKeyDown}
          aria-pressed={flipped}
          aria-label={`Meaning of ${item.word}. Activate to hide.`}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl border bg-card p-6 shadow-sm",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-hidden={!flipped}
        >
          <p className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
            {item.meaning}
          </p>
          {example ? (
            <p className="max-w-md text-center text-sm italic leading-relaxed text-muted-foreground">
              &ldquo;{example}&rdquo;
            </p>
          ) : null}
          <p className="text-xs text-muted-foreground">Tap to hide</p>
        </div>
      </div>
    </div>
  );
}
