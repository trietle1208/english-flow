"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("lessons");

  useEffect(() => {
    console.error("Unhandled error in lesson page:", error);
  }, [error]);

  return (
    <div className="flex w-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <ErrorState reset={reset} title={t("loadError")} />
    </div>
  );
}
