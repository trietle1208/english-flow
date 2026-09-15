"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ListeningLessonErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ListeningLessonError({
  error,
  reset,
}: ListeningLessonErrorProps) {
  useEffect(() => {
    console.error("Listening lesson error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-16 text-center">
      <AlertTriangle className="size-10 text-destructive" aria-hidden="true" />
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          Something went wrong. Please try again.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/listening">Back to listening</Link>
        </Button>
      </div>
    </div>
  );
}
