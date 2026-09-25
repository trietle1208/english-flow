"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  /** Passed straight through from Next.js's `error.tsx` `reset` prop. Omit to hide the button. */
  reset?: () => void;
  title?: string;
  className?: string;
};

/**
 * Friendly fallback rendered by every `error.tsx` boundary (spec §33): never
 * the raw error message, just this + Retry. The thrown error itself is
 * logged where it's caught (see the `error.tsx` files using this), not here.
 */
export function ErrorState({
  reset,
  title,
  className,
}: ErrorStateProps) {
  const t = useTranslations("common");
  const resolvedTitle = title ?? t("genericError");

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-6 text-destructive" aria-hidden="true" />
      </div>
      <p className="max-w-sm text-sm font-medium">{resolvedTitle}</p>
      {reset && (
        <Button onClick={reset} variant="outline">
          {t("retry")}
        </Button>
      )}
    </div>
  );
}
