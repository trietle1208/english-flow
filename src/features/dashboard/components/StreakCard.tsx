import { Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StreakData } from "@/features/progress/types";

type StreakCardProps = {
  data: StreakData;
};

/** Current streak + 7-day activity dots (AD-09 / spec §9). */
export function StreakCard({ data }: StreakCardProps) {
  const { currentStreak, week } = data;
  const label =
    currentStreak === 1 ? "1 day streak" : `${currentStreak} day streak`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
        <Flame
          className={cn(
            "size-4",
            currentStreak > 0 ? "text-warning" : "text-muted-foreground",
          )}
          aria-hidden="true"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-2xl font-semibold tracking-tight">
          {currentStreak > 0 ? (
            <>
              <span aria-hidden="true">🔥 </span>
              {label}
            </>
          ) : (
            "No streak yet"
          )}
        </p>
        <div
          className="flex justify-between gap-1"
          role="list"
          aria-label="Last 7 days of activity"
        >
          {week.map((day) => (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-1.5" role="listitem">
              <span
                className={cn(
                  "size-3 rounded-full",
                  day.active ? "bg-success" : "bg-muted",
                )}
                title={`${day.date}: ${day.active ? "active" : "inactive"}`}
                aria-label={`${day.label} ${day.date}: ${day.active ? "active" : "no activity"}`}
              />
              <span className="text-[10px] text-muted-foreground">{day.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
