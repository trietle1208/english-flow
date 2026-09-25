"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useTranslations } from "next-intl";
import { SectionCard } from "@/components/shared/SectionCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type WeeklyActivityChartProps = {
  days: { date: string; label: string; minutes: number }[];
};

/** Last 7 days of study minutes (spec §21) with a data table for a11y. */
export function WeeklyActivityChart({ days }: WeeklyActivityChartProps) {
  const t = useTranslations("progress");

  const chartConfig = {
    minutes: { label: t("minutes"), color: "var(--primary)" },
  } satisfies ChartConfig;

  const aria = days
    .map((d) => t("weeklyAria", { label: d.label, date: d.date, minutes: d.minutes }))
    .join(". ");

  return (
    <SectionCard title={t("weeklyActivity")} description={t("weeklyActivityDescription")}>
      <ChartContainer
        config={chartConfig}
        className="aspect-[2/1] w-full"
        aria-label={`${t("weeklyActivity")}. ${aria}`}
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
        <caption>{t("weeklyTable")}</caption>
        <thead>
          <tr>
            <th>{t("date")}</th>
            <th>{t("minutes")}</th>
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
