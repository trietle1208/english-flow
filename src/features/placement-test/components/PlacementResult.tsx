import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CEFR_LEVEL_LABELS, type CefrLevel } from "@/config/cefr";

type PlacementResultProps = {
  score: number;
  estimatedLevel: CefrLevel;
  correctCount: number;
  totalQuestions: number;
};

/**
 * Placement completion screen (spec §8): score, estimated CEFR, Start Learning.
 */
export function PlacementResult({
  score,
  estimatedLevel,
  correctCount,
  totalQuestions,
}: PlacementResultProps) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Your level estimate</h1>
        <p className="text-sm text-muted-foreground">
          Based on {correctCount}/{totalQuestions} correct answers ({score}%).
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 px-6 py-8">
        <p className="text-sm text-muted-foreground">Estimated CEFR level</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight">{estimatedLevel}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {CEFR_LEVEL_LABELS[estimatedLevel]}
        </p>
      </div>

      <p className="text-base font-medium">
        Your recommended starting level is {estimatedLevel}.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button asChild className="min-h-11">
          <Link href={`/courses?level=${estimatedLevel}`}>Start Learning</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
