"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { SpellCheck } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { GRAMMAR_CATEGORY_I18N_KEY } from "../categories";
import type { GrammarTopicListItem } from "../types";
import { GrammarProgressBadge } from "./GrammarProgressBadge";

type GrammarTopicCardProps = {
  topic: GrammarTopicListItem;
};

/**
 * Catalog card: title VI lớn, title EN nhỏ, CEFR + progress (Prompt 3).
 */
export function GrammarTopicCard({ topic }: GrammarTopicCardProps) {
  const t = useTranslations("grammar");
  const tCefr = useTranslations("cefr");
  const href = `/grammar/${topic.slug}`;
  const ctaLabel =
    topic.status === "not_started"
      ? t("learnNow")
      : topic.status === "weak"
        ? t("practiceAgain")
        : t("review");
  const progressValue = topic.bestScore ?? 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{tCefr(topic.level)}</Badge>
          <Badge variant="outline">
            {t(`categories.${GRAMMAR_CATEGORY_I18N_KEY[topic.category]}`)}
          </Badge>
          <GrammarProgressBadge
            status={topic.status}
            bestScore={topic.bestScore}
            hideNotStarted
          />
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-lg leading-snug">
            <Link href={href} className="hover:underline">
              {topic.titleVi}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{topic.titleEn}</p>
          <CardDescription className="line-clamp-2">{topic.summary}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        {topic.status !== "not_started" ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{t("progress")}</span>
              <span>{progressValue}%</span>
            </div>
            <Progress
              value={progressValue}
              aria-label={t("progressAria", { percent: progressValue })}
            />
          </div>
        ) : (
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <SpellCheck className="size-3.5" aria-hidden="true" />
            {t("theoryExamplesExercises")}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="min-h-11 w-full"
          variant={topic.status === "not_started" ? "default" : "outline"}
        >
          <Link href={href}>{ctaLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
