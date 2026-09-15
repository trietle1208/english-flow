"use client";

import { useCallback, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AudioButtonProps = {
  /** Static file under `/public` when present (AD-04). */
  audioUrl?: string | null;
  /** Spoken fallback for the Web Speech API when `audioUrl` is missing. */
  word: string;
  className?: string;
  /** Fired when playback starts (e.g. bump `review_count` on My Vocabulary). */
  onPlay?: () => void;
};

/**
 * Play pronunciation: prefer `audio_url`, else Web Speech API (AD-04).
 * Keyboard-reachable with an explicit `aria-label` (spec §31).
 */
export function AudioButton({ audioUrl, word, className, onPlay }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    onPlay?.();

    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.addEventListener("ended", () => setPlaying(false));
        audioRef.current.addEventListener("pause", () => setPlaying(false));
      }
      void audioRef.current.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
      return;
    }

    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  }, [audioUrl, word, onPlay]);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn(playing && "border-primary text-primary", className)}
      onClick={play}
      aria-label={`Play pronunciation of ${word}`}
      aria-pressed={playing}
    >
      <Volume2 className="size-4" aria-hidden="true" />
    </Button>
  );
}
