"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { parseTranscriptCues } from "../transcript";
import type { TranscriptCue } from "../types";
type TranscriptPanelProps = {
  transcript: string;
  currentTime: number;
};

/**
 * Transcript hidden by default. When shown: timed cues highlight by
 * `currentTime` if the transcript uses `[mm:ss]` prefixes; otherwise static
 * dialogue text (seed data today).
 */
export function TranscriptPanel({ transcript, currentTime }: TranscriptPanelProps) {
  const [open, setOpen] = useState(false);
  const cues = useMemo(() => parseTranscriptCues(transcript), [transcript]);

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="min-h-11 w-full sm:w-auto"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <>
            <ChevronUp className="size-4" aria-hidden="true" />
            Hide transcript
          </>
        ) : (
          <>
            <ChevronDown className="size-4" aria-hidden="true" />
            Show transcript
          </>
        )}
      </Button>

      {open ? (
        <div
          className="rounded-lg border bg-muted/30 px-4 py-3 text-sm leading-relaxed"
          aria-live="polite"
        >
          {cues ? (
            <TimedTranscript cues={cues} currentTime={currentTime} />
          ) : (
            <StaticTranscript transcript={transcript} />
          )}
        </div>
      ) : null}
    </div>
  );
}

function StaticTranscript({ transcript }: { transcript: string }) {
  const lines = transcript
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <ul className="flex flex-col gap-2">
      {lines.map((line, index) => (
        <li key={`${index}-${line.slice(0, 24)}`}>{line}</li>
      ))}
    </ul>
  );
}

function TimedTranscript({
  cues,
  currentTime,
}: {
  cues: TranscriptCue[];
  currentTime: number;
}) {
  let activeIndex = 0;
  for (let i = 0; i < cues.length; i += 1) {
    if (cues[i]!.startSeconds <= currentTime) {
      activeIndex = i;
    } else {
      break;
    }
  }

  return (
    <ul className="flex flex-col gap-2">
      {cues.map((cue, index) => (
        <li
          key={`${cue.startSeconds}-${index}`}
          className={cn(
            "rounded-md px-2 py-1 transition-colors",
            index === activeIndex && "bg-primary/10 font-medium text-foreground",
          )}
        >
          {cue.text}
        </li>
      ))}
    </ul>
  );
}
