"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { SectionCard } from "@/components/shared/SectionCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { SkillOverviewItem } from "../types";

const SKILL_LABEL: Record<SkillOverviewItem["skill"], string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  listening: "Listening",
  reading: "Reading",
};

const chartConfig = {
  percent: { label: "Completion %", color: "var(--primary)" },
  vocabulary: { label: "Vocabulary", color: "var(--skill-vocabulary)" },
  grammar: { label: "Grammar", color: "var(--skill-grammar)" },
  listening: { label: "Listening", color: "var(--skill-listening)" },
  reading: { label: "Reading", color: "var(--skill-reading)" },
} satisfies ChartConfig;

type SkillPerformanceChartProps = {
  skills: SkillOverviewItem[];
};

/** Theme-aware skill % bars + screen-reader table (AD-05 / §31). */
export function SkillPerformanceChart({ skills }: SkillPerformanceChartProps) {
  const data = skills.map((s) => ({
    skill: s.skill,
    label: SKILL_LABEL[s.skill],
    percent: s.percent,
    completed: s.completed,
    total: s.total,
  }));

  const aria = skills
    .map(
      (s) =>
        `${SKILL_LABEL[s.skill]}: ${s.percent}% (${s.completed} of ${s.total} lessons)`,
    )
    .join(". ");

  return (
    <SectionCard
      title="Skill Performance"
      description="Lesson completion by skill area."
    >
      <ChartContainer
        config={chartConfig}
        className="aspect-[2/1] w-full"
        aria-label={`Skill performance. ${aria}`}
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
        <caption>Skill performance percentages</caption>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Completed</th>
            <th>Total</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s) => (
            <tr key={s.skill}>
              <td>{SKILL_LABEL[s.skill]}</td>
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
