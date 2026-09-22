import Link from "next/link";
import { SpellCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCard } from "@/components/shared/SectionCard";
import { CEFR_LEVEL_LABELS } from "@/config/cefr";
import type { WeakGrammarTopic } from "@/features/grammar/types";
import { GrammarProgressBadge } from "@/features/grammar/components/GrammarProgressBadge";

type GrammarToReviewProps = {
  topics: WeakGrammarTopic[];
};

/**
 * Dashboard block: grammar topics with best score &lt; 60% (Phase 15).
 * Empty → soft CTA to browse the catalog.
 */
export function GrammarToReview({ topics }: GrammarToReviewProps) {
  if (topics.length === 0) {
    return (
      <SectionCard
        title="Grammar to review"
        description="Topics under 60% show up here after you take a mini quiz."
        className="border-skill-grammar/15 bg-gradient-to-r from-skill-grammar/[0.06] to-card"
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            No weak topics right now — keep practising to stay sharp.
          </p>
          <Button asChild variant="outline" size="sm" className="gap-1.5 bg-card">
            <Link href="/grammar">
              <SpellCheck className="size-4" aria-hidden="true" />
              Browse grammar
            </Link>
          </Button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Grammar to review"
      description="Your weakest topics — practise again to reach Mastered (80%+)."
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
                <Badge variant="secondary">{CEFR_LEVEL_LABELS[topic.level]}</Badge>
                <GrammarProgressBadge status="weak" bestScore={topic.bestScore} />
              </div>
              <CardTitle className="text-base">{topic.titleVi}</CardTitle>
              <p className="text-sm text-muted-foreground">{topic.titleEn}</p>
              <CardDescription className="line-clamp-2">{topic.summary}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/grammar/${topic.slug}`}>Luyện lại</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionCard>
  );
}
