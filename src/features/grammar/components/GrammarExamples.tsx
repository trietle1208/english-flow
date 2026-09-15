"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GrammarExampleView } from "../types";
import { HighlightedSentence } from "./HighlightedSentence";

type GrammarExamplesProps = {
  items: GrammarExampleView[];
};

/**
 * English examples with grammar/signal highlights + toggle for Vietnamese meaning.
 */
export function GrammarExamples({ items }: GrammarExamplesProps) {
  const [showMeaning, setShowMeaning] = useState(true);

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Chưa có ví dụ cho chủ điểm này.</p>
    );
  }

  return (
    <section aria-labelledby="grammar-examples-heading" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="grammar-examples-heading" className="text-sm font-semibold tracking-tight">
          Ví dụ
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-h-11"
          onClick={() => setShowMeaning((prev) => !prev)}
          aria-pressed={showMeaning}
        >
          {showMeaning ? (
            <>
              <EyeOff className="size-4" aria-hidden="true" />
              Ẩn nghĩa
            </>
          ) : (
            <>
              <Eye className="size-4" aria-hidden="true" />
              Hiện nghĩa
            </>
          )}
        </Button>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-lg border bg-muted/40 px-4 py-3">
            <p className="text-sm font-medium sm:text-base">
              <HighlightedSentence
                sentence={item.sentenceEn}
                highlights={item.highlights}
              />
            </p>
            {showMeaning ? (
              <p className="mt-1 text-sm text-muted-foreground">{item.sentenceVi}</p>
            ) : (
              <p className="mt-1 text-sm italic text-muted-foreground/70">Nghĩa đã ẩn</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
