"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/ErrorState";

/**
 * Root error boundary — catches anything thrown in `(marketing)`/`(auth)`
 * (they don't yet have their own `error.tsx`; those phases can add a more
 * specific one later) and anything under `(app)` that isn't already caught
 * by `(app)/error.tsx`. Never renders `error.message` (spec §33) — the
 * actual error is only ever logged, here, server-side.
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ErrorState reset={reset} />
    </div>
  );
}
