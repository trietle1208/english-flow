import type { TranscriptCue } from "./types";

const CUE_LINE = /^\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]\s*(.+)$/;

/**
 * Parse optional timed cues from a transcript. Lines without timestamps
 * mean the whole transcript is shown as static text.
 */
export function parseTranscriptCues(transcript: string): TranscriptCue[] | null {
  const lines = transcript
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return null;
  }

  const cues: TranscriptCue[] = [];
  for (const line of lines) {
    const match = line.match(CUE_LINE);
    if (!match) {
      return null;
    }
    const minutes = Number(match[1]);
    const seconds = Number(match[2]);
    const fraction = match[3] ? Number(`0.${match[3]}`) : 0;
    cues.push({
      startSeconds: minutes * 60 + seconds + fraction,
      text: match[4]!.trim(),
    });
  }

  return cues;
}
