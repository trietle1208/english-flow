import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Check, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDuration, formatLessonNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CourseLessonItem, Skill } from "../types";

const SKILL_CLASS: Record<Skill, string> = {
  vocabulary: "border-transparent bg-skill-vocabulary/15 text-skill-vocabulary",
  grammar: "border-transparent bg-skill-grammar/15 text-skill-grammar",
  listening: "border-transparent bg-skill-listening/15 text-skill-listening",
  reading: "border-transparent bg-skill-reading/15 text-skill-reading",
  speaking: "border-transparent bg-secondary text-secondary-foreground",
};

type LessonListItemProps = {
  lesson: CourseLessonItem;
};

/**
 * One numbered row on the course detail list. Completed / Current / Locked
 * are distinguished by both icon and color (spec §11, §31) — locked rows
 * show a tooltip and do not navigate.
 */
export async function LessonListItem({ lesson }: LessonListItemProps) {
  const t = await getTranslations("courses");
  const tSkills = await getTranslations("skills");

  const number = formatLessonNumber(lesson.orderIndex);
  const label = t("lessonAria", { number, title: lesson.title });

  const rowClass = cn(
    "flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors sm:gap-4 sm:px-4",
    lesson.status === "completed" && "border-success/30 bg-success/5",
    lesson.status === "current" && "border-primary bg-primary/5 shadow-sm",
    lesson.status === "locked" && "border-border bg-muted/40 opacity-70",
  );

  const content = (
    <>
      <StatusIcon status={lesson.status} />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={cn(
              "truncate text-sm font-medium",
              lesson.status === "locked" && "text-muted-foreground",
            )}
          >
            {label}
          </p>
          {lesson.status === "current" && (
            <Badge variant="default" className="shrink-0">
              {t("current")}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className={cn("capitalize", SKILL_CLASS[lesson.skill])}>
            {tSkills(lesson.skill)}
          </Badge>
          <span>{formatDuration(lesson.estimatedMinutes)}</span>
        </div>
      </div>
    </>
  );

  if (lesson.status === "locked") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(rowClass, "cursor-not-allowed")}
            aria-disabled="true"
            tabIndex={0}
          >
            {content}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          {t("unlockHint")}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link href={`/lessons/${lesson.id}`} className={cn(rowClass, "hover:bg-accent/50")}>
      {content}
    </Link>
  );
}

async function StatusIcon({ status }: { status: CourseLessonItem["status"] }) {
  const t = await getTranslations("courses");

  if (status === "completed") {
    return (
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground"
        aria-label={t("completed")}
      >
        <Check className="size-4" aria-hidden="true" />
      </span>
    );
  }

  if (status === "current") {
    return (
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
        aria-label={t("currentLesson")}
      >
        <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
      aria-label={t("locked")}
    >
      <Lock className="size-3.5" aria-hidden="true" />
    </span>
  );
}
