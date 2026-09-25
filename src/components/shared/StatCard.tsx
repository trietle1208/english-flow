import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StatCardProps = {
  label: string;
  value: string | number;
  /** Small subtext under the value — a delta ("+3 this week") or a unit. */
  subtext?: string;
  icon?: LucideIcon;
  /** 0-100. Renders a thin progress bar under the stat when provided. */
  progress?: number;
  className?: string;
};

/**
 * Label + big value + optional delta/subtext + optional progress bar.
 * Dashboard "Overview" cards and Progress page stats both use this (spec §9,
 * §28) instead of each hand-rolling a card.
 */
export function StatCard({ label, value, subtext, icon: Icon, progress, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-2 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 text-sm leading-snug text-muted-foreground">{label}</p>
          {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
        </div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        {progress !== undefined && (
          <Progress value={progress} className="mt-1 h-1.5" aria-label={`${label} progress`} />
        )}
      </CardContent>
    </Card>
  );
}
