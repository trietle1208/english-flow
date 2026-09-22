import { Check, Flame, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StreakData, WeekDayActivity } from "@/features/progress/types";

type StreakCardProps = {
  data: StreakData;
};

function weekActiveCount(week: WeekDayActivity[]): number {
  return week.filter((day) => day.active).length;
}

function streakMessage(current: number, activeThisWeek: number): string {
  if (current === 0) {
    return activeThisWeek > 0
      ? "Study today to start a new streak."
      : "Open a lesson today to light your streak.";
  }
  if (current === 1) return "Nice start — come back tomorrow to keep it going.";
  if (current < 7) {
    return `${7 - current} more day${7 - current === 1 ? "" : "s"} to a full week.`;
  }
  return "You're on a roll — keep the chain unbroken.";
}

/** Current streak + 7-day activity heatmap (AD-09 / spec §9). */
export function StreakCard({ data }: StreakCardProps) {
  const { currentStreak, longestStreak, week } = data;
  const lit = currentStreak > 0;
  const activeThisWeek = weekActiveCount(week);
  const today = week[week.length - 1];
  const bestIsCurrent =
    longestStreak > 0 && longestStreak === currentStreak && currentStreak > 0;

  return (
    <Card className="relative overflow-hidden border-warning/30 bg-gradient-to-br from-warning/[0.18] via-card to-card dark:from-warning/25 dark:via-warning/[0.06] dark:to-card">
      <div
        className="pointer-events-none absolute -right-6 -top-8 size-40 rounded-full bg-warning/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-14 left-4 size-32 rounded-full bg-warning/15 blur-3xl"
        aria-hidden="true"
      />

      <CardContent className="relative flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
            <div className="flex items-baseline gap-2">
              <p
                className={cn(
                  "text-4xl font-semibold tabular-nums tracking-tight",
                  lit ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {currentStreak}
              </p>
              <span className="text-sm text-muted-foreground">
                {currentStreak === 1 ? "day" : "days"}
              </span>
            </div>
          </div>

          <span
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-2xl",
              lit
                ? "bg-warning text-warning-foreground shadow-lg shadow-warning/40 ring-4 ring-warning/25"
                : "bg-muted text-muted-foreground",
            )}
            aria-hidden="true"
          >
            <Flame className="size-6" />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-border/70 bg-background/65 px-3 py-2.5 backdrop-blur-sm">
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Trophy className="size-3 text-warning" aria-hidden="true" />
              Best
            </p>
            <p className="mt-0.5 text-lg font-semibold tabular-nums tracking-tight">
              {longestStreak}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {bestIsCurrent ? "· record" : "days"}
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/65 px-3 py-2.5 backdrop-blur-sm">
            <p className="text-[11px] text-muted-foreground">This week</p>
            <p className="mt-0.5 text-lg font-semibold tabular-nums tracking-tight">
              {activeThisWeek}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / 7 days
              </span>
            </p>
          </div>
        </div>

        <div
          className="rounded-xl border border-border/70 bg-background/65 p-3 backdrop-blur-sm"
          role="list"
          aria-label="Last 7 days of activity"
        >
          <div className="flex justify-between gap-1">
            {week.map((day) => {
              const isToday = day.date === today?.date;
              return (
                <div
                  key={day.date}
                  className="flex flex-1 flex-col items-center gap-1.5"
                  role="listitem"
                >
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isToday ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {day.label}
                  </span>
                  <span
                    className={cn(
                      "flex aspect-square w-full max-w-10 items-center justify-center rounded-xl text-[10px] font-semibold tabular-nums transition-colors",
                      day.active
                        ? "bg-warning text-warning-foreground shadow-sm shadow-warning/30"
                        : "border border-dashed border-border bg-muted/40 text-muted-foreground",
                      isToday &&
                        !day.active &&
                        "border-solid border-warning/60 ring-2 ring-warning/40",
                      isToday &&
                        day.active &&
                        "ring-2 ring-warning ring-offset-2 ring-offset-background",
                    )}
                    title={`${day.date}: ${day.active ? `${day.minutes} min` : "inactive"}`}
                    aria-label={`${day.label} ${day.date}: ${
                      day.active ? `${day.minutes} min` : "no activity"
                    }`}
                  >
                    {day.active ? (
                      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                    ) : (
                      day.date.slice(8)
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {streakMessage(currentStreak, activeThisWeek)}
        </p>
      </CardContent>
    </Card>
  );
}
