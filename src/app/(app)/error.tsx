"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/ErrorState";

/**
 * Error boundary for every authenticated page. Nests inside `(app)/layout.tsx`,
 * so the sidebar/header/bottom nav stay mounted and usable — only the page
 * content is replaced — and Retry re-renders just this segment (spec §33).
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error in (app):", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <ErrorState reset={reset} />
    </div>
  );
}
