import Link from "next/link";
import { SpellCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCard } from "@/components/shared/SectionCard";
import type { WeakGrammarTopic } from "@/features/grammar/types";
import { GrammarProgressBadge } from "@/features/grammar/components/GrammarProgressBadge";

type GrammarToReviewProps = {
  topics: WeakGrammarTopic[];
};

/**
 * Dashboard block: grammar topics with best score &lt; 60% (Phase 15).
 * Empty → soft CTA to browse the catalog.
 */
export async function GrammarToReview({ topics }: GrammarToReviewProps) {
  const t = await getTranslations("dashboard");
  const tCefr = await getTranslations("cefr");

  if (topics.length === 0) {
    return (
      <SectionCard
        title={t("grammarToReview")}
        description={t("grammarToReviewEmptyHint")}
        className="border-skill-grammar/15 bg-gradient-to-r from-skill-grammar/[0.06] to-card"
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{t("noWeakTopics")}</p>
          <Button asChild variant="outline" size="sm" className="gap-1.5 bg-card">
            <Link href="/grammar">
              <SpellCheck className="size-4" aria-hidden="true" />
              {t("browseGrammar")}
            </Link>
          </Button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title={t("grammarToReview")}
      description={t("weakTopicsHint")}
      className="border-skill-grammar/15"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            className="flex flex-col border-skill-grammar/20 bg-gradient-to-br from-skill-grammar/[0.05] to-card shadow-none"
          >
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{tCefr(topic.level)}</Badge>
                <GrammarProgressBadge status="weak" bestScore={topic.bestScore} />
              </div>
              <CardTitle className="text-base">{topic.titleVi}</CardTitle>
              <p className="text-sm text-muted-foreground">{topic.titleEn}</p>
              <CardDescription className="line-clamp-2">{topic.summary}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/grammar/${topic.slug}`}>{t("practiceAgain")}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionCard>
  );
}
