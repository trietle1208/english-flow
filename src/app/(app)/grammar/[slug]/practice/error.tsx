"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type GrammarPracticeErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GrammarPracticeError({
  error,
  reset,
}: GrammarPracticeErrorProps) {
  useEffect(() => {
    console.error("Grammar practice error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-16 text-center">
      <AlertTriangle className="size-10 text-destructive" aria-hidden="true" />
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Có lỗi xảy ra</h1>
        <p className="text-sm text-muted-foreground">
          Something went wrong. Please try again.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button type="button" className="min-h-11" onClick={reset}>
          Thử lại
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/grammar">Về ngữ pháp</Link>
        </Button>
      </div>
    </div>
  );
}
