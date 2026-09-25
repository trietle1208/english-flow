import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CefrLevel } from "@/config/cefr";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CourseListItem } from "../types";

/** Tailwind-safe cover accents matching seed `cover_color` tokens (spec §10). */
const COVER_BAR: Record<string, string> = {
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  blue: "bg-blue-500",
};

type CourseCardProps = {
  course: CourseListItem;
};

/**
 * One course on `/courses`: title, CEFR badge, lesson count, duration,
 * progress bar, and Start / Continue CTA (spec §10).
 */
export async function CourseCard({ course }: CourseCardProps) {
  const t = await getTranslations("courses");
  const tCefr = await getTranslations("cefr");
  const tCommon = await getTranslations("common");

  const isComplete =
    course.lessonCount > 0 && course.completedLessons >= course.lessonCount;
  const ctaLabel = isComplete
    ? tCommon("review")
    : course.completedLessons > 0
      ? t("continue")
      : tCommon("start");
  const ctaHref =
    !isComplete && course.continueLessonId
      ? `/lessons/${course.continueLessonId}`
      : `/courses/${course.id}`;

  return (
    <Card className="flex flex-col overflow-hidden">
      <div
        className={cn("h-1.5 w-full", COVER_BAR[course.coverColor] ?? "bg-primary")}
        aria-hidden="true"
      />
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{tCefr(course.level as CefrLevel)}</Badge>
          <Badge variant="outline">{course.category}</Badge>
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-base">
            <Link href={`/courses/${course.id}`} className="hover:underline">
              {course.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2">{course.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="size-3.5" aria-hidden="true" />
            {t("lessonCount", { count: course.lessonCount })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {formatDuration(course.estimatedMinutes)}
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{t("progress")}</span>
            <span className="font-medium tabular-nums">
              {t("progressCount", {
                completed: course.completedLessons,
                total: course.lessonCount,
              })}
            </span>
          </div>
          <Progress
            value={course.progressPercent}
            aria-label={t("percentCompleteShort", { percent: course.progressPercent })}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
