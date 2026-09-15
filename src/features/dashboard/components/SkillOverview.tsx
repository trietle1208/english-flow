import { BookOpen, Ear, Languages, PencilLine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { cn } from "@/lib/utils";
import type { ProgressSkill, SkillOverviewItem } from "@/features/progress/types";

const SKILL_META: Record<
  ProgressSkill,
  { label: string; icon: LucideIcon; colorClass: string; barClass: string }
> = {
  vocabulary: {
    label: "Vocabulary",
    icon: BookOpen,
    colorClass: "text-skill-vocabulary",
    barClass: "[&_[data-slot=progress-indicator]]:bg-skill-vocabulary",
  },
  grammar: {
    label: "Grammar",
    icon: PencilLine,
    colorClass: "text-skill-grammar",
    barClass: "[&_[data-slot=progress-indicator]]:bg-skill-grammar",
  },
  listening: {
    label: "Listening",
    icon: Ear,
    colorClass: "text-skill-listening",
    barClass: "[&_[data-slot=progress-indicator]]:bg-skill-listening",
  },
  reading: {
    label: "Reading",
    icon: Languages,
    colorClass: "text-skill-reading",
    barClass: "[&_[data-slot=progress-indicator]]:bg-skill-reading",
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
          <Card key={item.skill}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{meta.label}</CardTitle>
              <Icon className={cn("size-4", meta.colorClass)} aria-hidden="true" />
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <ProgressRing
                value={item.percent}
                size={56}
                strokeWidth={5}
                label={`${meta.label} ${item.percent}%`}
                colorClassName={meta.colorClass}
              />
              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-xs text-muted-foreground">{subtext}</p>
                <Progress
                  value={item.percent}
                  className={cn("h-1.5", meta.barClass)}
                  aria-label={`${meta.label} progress`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
