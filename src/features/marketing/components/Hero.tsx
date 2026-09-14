import Link from "next/link";
import { BookMarked, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { getCurrentUser } from "@/lib/session";

const SKILL_BREAKDOWN = [
  { label: "Vocabulary", value: 82, colorClassName: "text-skill-vocabulary" },
  { label: "Grammar", value: 64, colorClassName: "text-skill-grammar" },
  { label: "Listening", value: 57, colorClassName: "text-skill-listening" },
  { label: "Reading", value: 71, colorClassName: "text-skill-reading" },
] as const;

/**
 * Hero section — spec §6. The right-hand visual is a static mock built from
 * the real `StatCard`/`ProgressRing`/`Card` components (task list: "không
 * dùng ảnh stock"), so it's `aria-hidden` — the numbers are illustrative,
 * not a real user's data, and shouldn't be announced to screen readers as if
 * they were.
 */
export async function Hero() {
  const user = await getCurrentUser();

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Learn English with a system built around you.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Build vocabulary, improve grammar, strengthen listening skills, and make consistent
          progress every day.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={user ? "/dashboard" : "/register"}>
              {user ? "Go to Dashboard" : "Start Learning"}
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      </div>

      <div aria-hidden="true" className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1.5">
            <CardTitle className="text-base">This week</CardTitle>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Flame className="size-4 text-warning" />
              12-day streak
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Words learned" value={340} icon={BookMarked} />
              <StatCard label="Study time" value="18h" subtext="this month" icon={Clock} />
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-4">
              <ProgressRing value={72} size={56} strokeWidth={5} />
              <div>
                <p className="text-sm font-medium">Weekly goal</p>
                <p className="text-xs text-muted-foreground">5 of 7 days</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">Skill breakdown</p>
              <div className="grid grid-cols-4 gap-2">
                {SKILL_BREAKDOWN.map((skill) => (
                  <div key={skill.label} className="flex flex-col items-center gap-1.5">
                    <ProgressRing
                      value={skill.value}
                      size={40}
                      strokeWidth={4}
                      colorClassName={skill.colorClassName}
                    />
                    <span className="text-[11px] text-muted-foreground">{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
