import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SectionCard } from "@/components/shared/SectionCard";
import { cn } from "@/lib/utils";
import type { AchievementProgress } from "../types";

type AchievementListProps = {
  achievements: AchievementProgress[];
};

/**
 * All Phase 1 achievements — unlocked and locked (muted + progress).
 * Kept visually secondary to learning (spec §21).
 */
export function AchievementList({ achievements }: AchievementListProps) {
  return (
    <SectionCard
      title="Achievements"
      description="Milestones along the way — learning comes first."
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {achievements.map((item) => (
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
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
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
                    aria-label={`${item.title} progress`}
                  />
                </div>
              )}
              {item.unlocked && item.unlockedAt && (
                <p className="text-[11px] text-muted-foreground">Unlocked</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
