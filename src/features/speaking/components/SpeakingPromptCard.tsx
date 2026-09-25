"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SpeakingPromptListItem } from "../types";

type SpeakingPromptCardProps = {
  prompt: SpeakingPromptListItem;
};

export function SpeakingPromptCard({ prompt }: SpeakingPromptCardProps) {
  const t = useTranslations("speaking");
  const tCefr = useTranslations("cefr");
  const tCommon = useTranslations("common");

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{tCefr(prompt.cefrLevel)}</Badge>
          <Badge variant="outline">{t(prompt.difficulty)}</Badge>
          {prompt.lastOverlapPercent != null ? (
            <Badge variant="outline" className="text-emerald-700 dark:text-emerald-400">
              {t("lastScore", { percent: prompt.lastOverlapPercent })}
            </Badge>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-base">
            <Link href={`/speaking/${prompt.id}`} className="hover:underline">
              {prompt.title}
            </Link>
          </CardTitle>
          <CardDescription>
            {prompt.attemptCount > 0
              ? t("attemptCount", { count: prompt.attemptCount })
              : t("noAttemptsYet")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Mic className="size-3.5" aria-hidden="true" />
          {t("readAloud")}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={prompt.lastOverlapPercent != null ? "outline" : "default"}>
          <Link href={`/speaking/${prompt.id}`}>
            {prompt.lastOverlapPercent != null ? tCommon("review") : t("startSpeaking")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
