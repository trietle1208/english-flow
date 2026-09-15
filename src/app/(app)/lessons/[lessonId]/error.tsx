"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/ErrorState";

/**
 * Lesson-specific error boundary so a render failure in the lesson body
 * doesn't replace the whole (app) shell content with a generic page.
 */
export default function LessonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error in lesson page:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <ErrorState
        reset={reset}
        title="Something went wrong loading this lesson. Please try again."
      />
    </div>
  );
}
