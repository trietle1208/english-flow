import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DailyGoalData } from "@/features/progress/types";

type DailyGoalCardProps = {
  data: DailyGoalData;
};

/** Today's study minutes vs `users.daily_goal_minutes` (spec §9). */
export function DailyGoalCard({ data }: DailyGoalCardProps) {
  const { goalMinutes, minutesToday, percent } = data;
  const met = minutesToday >= goalMinutes;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
        <Target className="size-4 text-muted-foreground" aria-hidden="true" />
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-2xl font-semibold tabular-nums tracking-tight">
          {minutesToday}{" "}
          <span className="text-base font-normal text-muted-foreground">
            / {goalMinutes} min
          </span>
        </p>
        <Progress
          value={percent}
          className="h-2"
          aria-label={`Daily goal ${minutesToday} of ${goalMinutes} minutes`}
        />
        <p className="text-xs text-muted-foreground">
          {met
            ? "Goal reached for today — nice work."
            : `${Math.max(0, goalMinutes - minutesToday)} min left to hit today's goal.`}
        </p>
      </CardContent>
    </Card>
  );
}
