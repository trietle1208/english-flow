import Link from "next/link";
import { ArrowRight, Clock, PlayCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDuration, formatLessonNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ContinueLearningData } from "@/features/progress/types";

const SKILL_ACCENT: Record<ContinueLearningData["skill"], string> = {
  vocabulary: "from-skill-vocabulary/15 via-card to-card border-skill-vocabulary/25",
  grammar: "from-skill-grammar/15 via-card to-card border-skill-grammar/25",
  listening: "from-skill-listening/15 via-card to-card border-skill-listening/25",
  reading: "from-skill-reading/15 via-card to-card border-skill-reading/25",
  speaking: "from-primary/15 via-card to-card border-primary/25",
};

const SKILL_ICON: Record<ContinueLearningData["skill"], string> = {
  vocabulary: "bg-skill-vocabulary/15 text-skill-vocabulary",
  grammar: "bg-skill-grammar/15 text-skill-grammar",
  listening: "bg-skill-listening/15 text-skill-listening",
  reading: "bg-skill-reading/15 text-skill-reading",
  speaking: "bg-primary/15 text-primary",
};

type ContinueLearningCardProps = {
  data: ContinueLearningData;
};

/** Large Continue card pointing at the in-progress (or next) lesson (spec §9). */
export async function ContinueLearningCard({ data }: ContinueLearningCardProps) {
  const t = await getTranslations("dashboard");
  const tSkills = await getTranslations("skills");
  const tCommon = await getTranslations("common");

  return (
    <Card
      className={cn(
        "relative overflow-hidden border bg-gradient-to-br shadow-sm",
        SKILL_ACCENT[data.skill],
      )}
    >
      <CardContent className="flex flex-col gap-5 p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              {t("continueLearning")}
            </p>
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">{data.courseTitle}</p>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                {t("lessonNumberTitle", {
                  number: formatLessonNumber(data.lessonNumber - 1),
                  title: data.lessonTitle,
                })}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{tSkills(data.skill)}</Badge>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden="true" />
                {formatDuration(data.estimatedMinutes)}
              </span>
            </div>
          </div>

          <span
            className={cn(
              "hidden size-14 shrink-0 items-center justify-center rounded-2xl sm:flex",
              SKILL_ICON[data.skill],
            )}
            aria-hidden="true"
          >
            <PlayCircle className="size-7" />
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{t("lessonProgress")}</span>
            <span className="font-medium tabular-nums">{data.progressPercent}%</span>
          </div>
          <Progress
            value={data.progressPercent}
            className="h-2.5"
            aria-label={t("lessonPercentComplete", { percent: data.progressPercent })}
          />
        </div>

        <Button asChild size="lg" className="w-full gap-2 sm:w-fit">
          <Link href={`/lessons/${data.lessonId}`}>
            {tCommon("continue")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
