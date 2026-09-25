"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type SpeakingPromptErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SpeakingPromptError({ error, reset }: SpeakingPromptErrorProps) {
  const t = useTranslations("speaking");
  const tCommon = useTranslations("common");

  useEffect(() => {
    console.error("Speaking prompt error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-16 text-center">
      <AlertTriangle className="size-10 text-destructive" aria-hidden="true" />
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">{t("errorTitle")}</h1>
        <p className="text-sm text-muted-foreground">{tCommon("genericError")}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button type="button" onClick={reset}>
          {tCommon("tryAgain")}
        </Button>
        <Button asChild variant="outline">
          <Link href="/speaking">{t("backToSpeaking")}</Link>
        </Button>
      </div>
    </div>
  );
}
