import { Flame } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { cn } from "@/lib/utils";
import type { StreakData } from "../types";

type StreakCalendarProps = {
  data: StreakData;
};

/** Current / longest streak + week calendar (spec §21). */
export function StreakCalendar({ data }: StreakCalendarProps) {
  return (
    <SectionCard title="Streak" description="Consistency over recent days.">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-8">
          <div>
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="mt-1 flex items-center gap-1.5 text-2xl font-semibold tabular-nums">
              <Flame
                className={cn(
                  "size-5",
                  data.currentStreak > 0 ? "text-warning" : "text-muted-foreground",
                )}
                aria-hidden="true"
              />
              {data.currentStreak}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Longest</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {data.longestStreak}
            </p>
          </div>
        </div>

        <div
          className="flex flex-1 justify-between gap-1 sm:max-w-sm"
          role="list"
          aria-label="Last 7 days of activity"
        >
          {data.week.map((day) => (
            <div
              key={day.date}
              className="flex flex-1 flex-col items-center gap-1.5"
              role="listitem"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-md text-xs font-medium",
                  day.active
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground",
                )}
                aria-label={`${day.label} ${day.date}: ${day.active ? `${day.minutes} min` : "no activity"}`}
              >
                {day.label.slice(0, 1)}
              </span>
              <span className="text-[10px] tabular-nums text-muted-foreground">
                {day.date.slice(8)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
