"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type ExampleItem = { en: string; vi: string };

type GrammarExamplesProps = {
  items: ExampleItem[];
};

/**
 * English examples with a toggle to reveal / hide Vietnamese meanings
 * so learners can self-check (spec §17).
 */
export function GrammarExamples({ items }: GrammarExamplesProps) {
  const [showMeaning, setShowMeaning] = useState(false);

  return (
    <section aria-labelledby="grammar-examples-heading" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="grammar-examples-heading" className="text-sm font-semibold tracking-tight">
          Examples
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowMeaning((prev) => !prev)}
          aria-pressed={showMeaning}
        >
          {showMeaning ? (
            <>
              <EyeOff className="size-4" aria-hidden="true" />
              Hide meanings
            </>
          ) : (
            <>
              <Eye className="size-4" aria-hidden="true" />
              Show meanings
            </>
          )}
        </Button>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item, index) => (
          <li
            key={`${item.en}-${index}`}
            className="rounded-lg border bg-muted/40 px-4 py-3"
          >
            <p className="text-sm font-medium sm:text-base">{item.en}</p>
            {showMeaning ? (
              <p className="mt-1 text-sm text-muted-foreground">{item.vi}</p>
            ) : (
              <p className="mt-1 text-sm italic text-muted-foreground/70">
                Meaning hidden
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
