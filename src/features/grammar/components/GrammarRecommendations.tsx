import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionCard } from "@/components/shared/SectionCard";
import { CEFR_LEVEL_LABELS, isCefrLevel, type CefrLevel } from "@/config/cefr";
import { listGrammarRecommendations } from "../queries";

type GrammarRecommendationsProps = {
  userId: string;
  userCefrLevel: string | null | undefined;
};

/**
 * Prompt 4 block on `/grammar`: next topics by unlock + CEFR + weak mastery.
 */
export async function GrammarRecommendations({
  userId,
  userCefrLevel,
}: GrammarRecommendationsProps) {
  const cefr: CefrLevel | null =
    typeof userCefrLevel === "string" && isCefrLevel(userCefrLevel)
      ? userCefrLevel
      : null;
  const items = await listGrammarRecommendations(userId, cefr, 4);

  if (items.length === 0) {
    return null;
  }

  return (
    <SectionCard
      title="Gợi ý học tiếp"
      description="Ưu tiên chủ điểm đang yếu, phù hợp trình độ, và đã mở khóa điều kiện tiên quyết."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((topic) => (
          <Card key={topic.id} className="flex flex-col">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{CEFR_LEVEL_LABELS[topic.level]}</Badge>
                <Badge variant="outline" className="gap-1 font-normal">
                  <Sparkles className="size-3" aria-hidden="true" />
                  {topic.reasonLabel}
                </Badge>
              </div>
              <CardTitle className="text-base leading-snug">{topic.titleVi}</CardTitle>
              <p className="text-sm text-muted-foreground">{topic.titleEn}</p>
              <CardDescription className="line-clamp-2">{topic.summaryVi}</CardDescription>
              {topic.masteryScore > 0 ? (
                <p className="text-xs text-muted-foreground">
                  Mastery {Math.round(topic.masteryScore * 100)}%
                </p>
              ) : null}
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild className="min-h-11 w-full" variant="outline">
                <Link href={`/grammar/${topic.slug}`}>Học ngay</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionCard>
  );
}
