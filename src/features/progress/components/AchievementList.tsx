import { Award } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Progress } from "@/components/ui/progress";
import { SectionCard } from "@/components/shared/SectionCard";
import { cn } from "@/lib/utils";
import type { AchievementProgress } from "../types";

type AchievementListProps = {
  achievements: AchievementProgress[];
};

const ACHIEVEMENT_I18N: Record<
  string,
  { title: "achievementFirstLesson"; description: "achievementFirstLessonDesc" } | {
    title: "achievementTenLessons";
    description: "achievementTenLessonsDesc";
  } | {
    title: "achievementFiftyWords";
    description: "achievementFiftyWordsDesc";
  } | {
    title: "achievementHundredWords";
    description: "achievementHundredWordsDesc";
  } | {
    title: "achievementSevenDay";
    description: "achievementSevenDayDesc";
  }
> = {
  first_lesson: {
    title: "achievementFirstLesson",
    description: "achievementFirstLessonDesc",
  },
  ten_lessons: {
    title: "achievementTenLessons",
    description: "achievementTenLessonsDesc",
  },
  fifty_words: {
    title: "achievementFiftyWords",
    description: "achievementFiftyWordsDesc",
  },
  hundred_words: {
    title: "achievementHundredWords",
    description: "achievementHundredWordsDesc",
  },
  seven_day_streak: {
    title: "achievementSevenDay",
    description: "achievementSevenDayDesc",
  },
};

/**
 * All Phase 1 achievements — unlocked and locked (muted + progress).
 * Kept visually secondary to learning (spec §21).
 */
export async function AchievementList({ achievements }: AchievementListProps) {
  const t = await getTranslations("progress");

  return (
    <SectionCard title={t("achievements")} description={t("achievementsDescription")}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {achievements.map((item) => {
          const keys = ACHIEVEMENT_I18N[item.key];
          const title = keys ? t(keys.title) : item.title;
          const description = keys ? t(keys.description) : item.description;

          return (
            <li
              key={item.key}
              className={cn(
                "flex gap-3 rounded-lg border p-4",
                !item.unlocked && "opacity-60",
              )}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  item.unlocked ? "bg-success/15 text-success" : "bg-muted text-muted-foreground",
                )}
              >
                <Award className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                {!item.unlocked && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>
                        {item.current} / {item.target}
                      </span>
                      <span>{item.progressPercent}%</span>
                    </div>
                    <Progress
                      value={item.progressPercent}
                      className="h-1.5"
                      aria-label={`${title} progress`}
                    />
                  </div>
                )}
                {item.unlocked && item.unlockedAt && (
                  <p className="text-[11px] text-muted-foreground">{t("unlocked")}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
