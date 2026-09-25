import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type LessonHeaderProps = {
  courseId: string;
  courseTitle: string;
  lessonTitle: string;
  lessonNumber: number;
  lessonCount: number;
};

/**
 * Top bar: course crumb, lesson title, "Lesson N of M" progress (spec §12).
 */
export async function LessonHeader({
  courseId,
  courseTitle,
  lessonTitle,
  lessonNumber,
  lessonCount,
}: LessonHeaderProps) {
  const t = await getTranslations("lessons");

  const percent =
    lessonCount === 0 ? 0 : Math.round((lessonNumber / lessonCount) * 100);

  const lessonOfLabel = t("lessonOf", { number: lessonNumber, count: lessonCount });

  return (
    <header className="space-y-4">
      <nav aria-label={t("breadcrumb")} className="flex flex-wrap items-center gap-1 text-sm">
        <Link
          href={`/courses/${courseId}`}
          className="font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {courseTitle}
        </Link>
        <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="truncate text-muted-foreground" aria-current="page">
          {lessonTitle}
        </span>
      </nav>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{lessonTitle}</h1>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{lessonOfLabel}</span>
            <span className="font-medium tabular-nums text-muted-foreground">{percent}%</span>
          </div>
          <Progress value={percent} aria-label={lessonOfLabel} />
        </div>
      </div>
    </header>
  );
}
