"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { useTranslations } from "next-intl";
import { SectionCard } from "@/components/shared/SectionCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { SkillOverviewItem } from "../types";

type SkillPerformanceChartProps = {
  skills: SkillOverviewItem[];
};

/** Theme-aware skill % bars + screen-reader table (AD-05 / §31). */
export function SkillPerformanceChart({ skills }: SkillPerformanceChartProps) {
  const t = useTranslations("progress");
  const tSkills = useTranslations("skills");

  const chartConfig = {
    percent: { label: t("completion"), color: "var(--primary)" },
    vocabulary: { label: tSkills("vocabulary"), color: "var(--skill-vocabulary)" },
    grammar: { label: tSkills("grammar"), color: "var(--skill-grammar)" },
    listening: { label: tSkills("listening"), color: "var(--skill-listening)" },
    reading: { label: tSkills("reading"), color: "var(--skill-reading)" },
  } satisfies ChartConfig;

  const data = skills.map((s) => ({
    skill: s.skill,
    label: tSkills(s.skill),
    percent: s.percent,
    completed: s.completed,
    total: s.total,
  }));

  const aria = skills
    .map((s) =>
      t("skillAria", {
        skill: tSkills(s.skill),
        percent: s.percent,
        completed: s.completed,
        total: s.total,
      }),
    )
    .join(". ");

  return (
    <SectionCard title={t("skillPerformance")} description={t("skillPerformanceDescription")}>
      <ChartContainer
        config={chartConfig}
        className="aspect-[2/1] w-full"
        aria-label={`${t("skillPerformance")}. ${aria}`}
      >
        <BarChart data={data} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
            width={40}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, _name, item) => (
                  <div className="flex w-full justify-between gap-4">
                    <span className="text-muted-foreground">
                      {item.payload.label}
                    </span>
                    <span className="font-mono font-medium tabular-nums">
                      {value}% ({item.payload.completed}/{item.payload.total})
                    </span>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="percent" radius={4}>
            {data.map((entry) => (
              <Cell key={entry.skill} fill={`var(--color-${entry.skill})`} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      <table className="sr-only">
        <caption>{t("skillTable")}</caption>
        <thead>
          <tr>
            <th>{t("skill")}</th>
            <th>{t("completed")}</th>
            <th>{t("total")}</th>
            <th>{t("percent")}</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s) => (
            <tr key={s.skill}>
              <td>{tSkills(s.skill)}</td>
              <td>{s.completed}</td>
              <td>{s.total}</td>
              <td>{s.percent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
