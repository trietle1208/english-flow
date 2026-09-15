import { Headphones } from "lucide-react";

type AudioBlockProps = {
  listeningLessonId: string;
  title?: string;
};

/**
 * Listening block stub — full player lands in Phase 10. Keeps AD-03 `audio`
 * blocks visible instead of silently dropping them.
 */
export function AudioBlock({ listeningLessonId, title }: AudioBlockProps) {
  return (
    <section
      aria-labelledby="lesson-audio-heading"
      className="space-y-3 rounded-lg border border-dashed bg-muted/30 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-skill-listening/15 text-skill-listening">
          <Headphones className="size-4" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h2 id="lesson-audio-heading" className="text-sm font-semibold tracking-tight">
            Listening practice
          </h2>
          <p className="text-sm font-medium">{title ?? "Audio lesson"}</p>
          <p className="text-sm text-muted-foreground">
            The full listening player arrives in Phase 10. Continue with the rest of this
            lesson for now.
          </p>
          <p className="sr-only">Listening lesson id {listeningLessonId}</p>
        </div>
      </div>
    </section>
  );
}
