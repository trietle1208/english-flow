"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { SectionCard } from "@/components/shared/SectionCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  minutes: { label: "Minutes", color: "var(--primary)" },
} satisfies ChartConfig;

type WeeklyActivityChartProps = {
  days: { date: string; label: string; minutes: number }[];
};

/** Last 7 days of study minutes (spec §21) with a data table for a11y. */
export function WeeklyActivityChart({ days }: WeeklyActivityChartProps) {
  const aria = days.map((d) => `${d.label} ${d.date}: ${d.minutes} minutes`).join(". ");

  return (
    <SectionCard
      title="Weekly Activity"
      description="Study minutes over the last 7 days."
    >
      <ChartContainer
        config={chartConfig}
        className="aspect-[2/1] w-full"
        aria-label={`Weekly activity. ${aria}`}
      >
        <BarChart data={days} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={32} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="minutes" fill="var(--color-minutes)" radius={4} />
        </BarChart>
      </ChartContainer>

      <table className="sr-only">
        <caption>Weekly study minutes</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Minutes</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d) => (
            <tr key={d.date}>
              <td>
                {d.label} {d.date}
              </td>
              <td>{d.minutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
