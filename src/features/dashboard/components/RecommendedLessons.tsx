import Link from "next/link";
import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCard } from "@/components/shared/SectionCard";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { RecommendedLesson } from "@/features/progress/types";

const SKILL_BORDER: Record<RecommendedLesson["skill"], string> = {
  vocabulary: "border-l-skill-vocabulary",
  grammar: "border-l-skill-grammar",
  listening: "border-l-skill-listening",
  reading: "border-l-skill-reading",
  speaking: "border-l-primary",
};

type RecommendedLessonsProps = {
  lessons: RecommendedLesson[];
};

/** 3–4 lesson suggestions by CEFR + weakest skill (spec §9). */
export async function RecommendedLessons({ lessons }: RecommendedLessonsProps) {
  const t = await getTranslations("dashboard");
  const tSkills = await getTranslations("skills");
  const tCefr = await getTranslations("cefr");

  if (lessons.length === 0) return null;

  return (
    <SectionCard
      title={t("recommended")}
      description={t("recommendedDescription")}
      className="h-full"
    >
      <div className="grid gap-3">
        {lessons.map((lesson) => (
          <Card
            key={lesson.lessonId}
            className={cn(
              "flex flex-col border-l-4 shadow-none",
              SKILL_BORDER[lesson.skill],
            )}
          >
            <CardHeader className="space-y-2 pb-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{tSkills(lesson.skill)}</Badge>
                <Badge variant="outline">{tCefr(lesson.level)}</Badge>
              </div>
              <CardTitle className="text-base leading-snug">{lesson.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{lesson.courseTitle}</p>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden="true" />
                {formatDuration(lesson.estimatedMinutes)}
              </span>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/lessons/${lesson.lessonId}`}>{t("openLesson")}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionCard>
  );
}
