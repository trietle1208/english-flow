"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function QuizError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // error is logged by the Next.js error boundary; keep UI friendly (spec §33).
  }, []);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-16 text-center">
      <h2 className="text-lg font-semibold tracking-tight">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">
        We couldn&apos;t load this quiz. Please try again.
      </p>
      <Button type="button" onClick={reset} className="min-h-11">
        Try again
      </Button>
    </div>
  );
}
