import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { DailyGoalData } from "@/features/progress/types";

type DailyGoalCardProps = {
  data: DailyGoalData;
};

/** Today's study minutes vs `users.daily_goal_minutes` (spec §9). */
export function DailyGoalCard({ data }: DailyGoalCardProps) {
  const { goalMinutes, minutesToday, percent } = data;
  const met = minutesToday >= goalMinutes;

  return (
    <Card className="overflow-hidden border-primary/10 bg-gradient-to-br from-card to-primary/[0.04]">
      <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Daily Goal</p>
            <p className="text-3xl font-semibold tabular-nums tracking-tight">
              {minutesToday}
              <span className="ml-1.5 text-base font-normal text-muted-foreground">
                / {goalMinutes} min
              </span>
            </p>
          </div>
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full",
              met ? "bg-success/15 text-success" : "bg-primary/10 text-primary",
            )}
          >
            <Target className="size-4" aria-hidden="true" />
          </span>
        </div>

        <Progress
          value={percent}
          className="h-2.5"
          aria-label={`Daily goal ${minutesToday} of ${goalMinutes} minutes`}
        />

        <p className="text-xs leading-relaxed text-muted-foreground">
          {met
            ? "Goal reached for today — nice work."
            : `${Math.max(0, goalMinutes - minutesToday)} min left to hit today's goal.`}
        </p>
      </CardContent>
    </Card>
  );
}
