"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function QuizError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("quiz");
  const tCommon = useTranslations("common");

  useEffect(() => {
    // error is logged by the Next.js error boundary; keep UI friendly (spec §33).
  }, []);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-16 text-center">
      <h2 className="text-lg font-semibold tracking-tight">{t("errorTitle")}</h2>
      <p className="text-sm text-muted-foreground">{t("loadError")}</p>
      <Button type="button" onClick={reset} className="min-h-11">
        {tCommon("tryAgain")}
      </Button>
    </div>
  );
}
