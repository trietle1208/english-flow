import { BookOpen, Ear, Languages, PencilLine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { cn } from "@/lib/utils";
import type { ProgressSkill, SkillOverviewItem } from "@/features/progress/types";

const SKILL_META: Record<
  ProgressSkill,
  {
    label: string;
    icon: LucideIcon;
    colorClass: string;
    barClass: string;
    washClass: string;
    iconWrapClass: string;
  }
> = {
  vocabulary: {
    label: "Vocabulary",
    icon: BookOpen,
    colorClass: "text-skill-vocabulary",
    barClass: "[&_[data-slot=progress-indicator]]:bg-skill-vocabulary",
    washClass: "border-skill-vocabulary/20 bg-gradient-to-br from-skill-vocabulary/[0.08] to-card",
    iconWrapClass: "bg-skill-vocabulary/10 text-skill-vocabulary",
  },
  grammar: {
    label: "Grammar",
    icon: PencilLine,
    colorClass: "text-skill-grammar",
    barClass: "[&_[data-slot=progress-indicator]]:bg-skill-grammar",
    washClass: "border-skill-grammar/20 bg-gradient-to-br from-skill-grammar/[0.08] to-card",
    iconWrapClass: "bg-skill-grammar/10 text-skill-grammar",
  },
  listening: {
    label: "Listening",
    icon: Ear,
    colorClass: "text-skill-listening",
    barClass: "[&_[data-slot=progress-indicator]]:bg-skill-listening",
    washClass: "border-skill-listening/20 bg-gradient-to-br from-skill-listening/[0.08] to-card",
    iconWrapClass: "bg-skill-listening/10 text-skill-listening",
  },
  reading: {
    label: "Reading",
    icon: Languages,
    colorClass: "text-skill-reading",
    barClass: "[&_[data-slot=progress-indicator]]:bg-skill-reading",
    washClass: "border-skill-reading/20 bg-gradient-to-br from-skill-reading/[0.08] to-card",
    iconWrapClass: "bg-skill-reading/10 text-skill-reading",
  },
};

type SkillOverviewProps = {
  skills: SkillOverviewItem[];
};

/** Four skill cards with % + bar + completed count (spec §9). */
export function SkillOverview({ skills }: SkillOverviewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((item) => {
        const meta = SKILL_META[item.skill];
        const Icon = meta.icon;
        const subtext =
          item.total === 0
            ? "No lessons yet"
            : `${item.completed} of ${item.total} completed`;

        return (
          <Card key={item.skill} className={cn("overflow-hidden", meta.washClass)}>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{meta.label}</p>
                  <p className="text-xs text-muted-foreground">{subtext}</p>
                </div>
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl",
                    meta.iconWrapClass,
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              </div>

              <div className="flex items-center gap-4">
                <ProgressRing
                  value={item.percent}
                  size={56}
                  strokeWidth={5}
                  label={`${meta.label} ${item.percent}%`}
                  colorClassName={meta.colorClass}
                />
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-2xl font-semibold tabular-nums tracking-tight">
                    {item.percent}
                    <span className="text-sm font-normal text-muted-foreground">%</span>
                  </p>
                  <Progress
                    value={item.percent}
                    className={cn("h-1.5", meta.barClass)}
                    aria-label={`${meta.label} progress`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
