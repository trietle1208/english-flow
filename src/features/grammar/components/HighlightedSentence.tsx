import type { ReactNode } from "react";
import type { GrammarExampleHighlight } from "@/db/schema/grammar";
import { cn } from "@/lib/utils";

type HighlightedSentenceProps = {
  sentence: string;
  highlights: GrammarExampleHighlight[];
  className?: string;
};

type Mark = {
  start: number;
  end: number;
  type: GrammarExampleHighlight["type"];
};

/**
 * Renders an English sentence with grammar / signal spans from DB `highlights`.
 * Non-overlapping greedy match on first occurrence of each highlight text.
 */
export function HighlightedSentence({
  sentence,
  highlights,
  className,
}: HighlightedSentenceProps) {
  const marks = collectMarks(sentence, highlights);
  if (marks.length === 0) {
    return <span className={className}>{sentence}</span>;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;
  marks.forEach((mark, index) => {
    if (mark.start > cursor) {
      parts.push(sentence.slice(cursor, mark.start));
    }
    parts.push(
      <mark
        key={`${mark.start}-${index}`}
        className={cn(
          "rounded-sm px-0.5",
          mark.type === "grammar"
            ? "bg-skill-grammar/25 text-foreground"
            : "bg-amber-500/20 text-foreground",
        )}
      >
        {sentence.slice(mark.start, mark.end)}
      </mark>,
    );
    cursor = mark.end;
  });
  if (cursor < sentence.length) {
    parts.push(sentence.slice(cursor));
  }

  return <span className={className}>{parts}</span>;
}

function collectMarks(
  sentence: string,
  highlights: GrammarExampleHighlight[],
): Mark[] {
  const marks: Mark[] = [];
  const lower = sentence.toLowerCase();
  const used = new Set<number>();

  for (const highlight of highlights) {
    const needle = highlight.text.trim();
    if (!needle) {
      continue;
    }
    const idx = lower.indexOf(needle.toLowerCase());
    if (idx < 0) {
      continue;
    }
    const end = idx + needle.length;
    let overlaps = false;
    for (let i = idx; i < end; i += 1) {
      if (used.has(i)) {
        overlaps = true;
        break;
      }
    }
    if (overlaps) {
      continue;
    }
    for (let i = idx; i < end; i += 1) {
      used.add(i);
    }
    marks.push({ start: idx, end, type: highlight.type });
  }

  return marks.sort((a, b) => a.start - b.start);
}
