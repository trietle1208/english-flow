import Link from "next/link";
import { BookMarked, Clock, Flame } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { getCurrentUser } from "@/lib/session";

const SKILL_KEYS = [
  { key: "vocabulary", value: 82, colorClassName: "text-skill-vocabulary" },
  { key: "grammar", value: 64, colorClassName: "text-skill-grammar" },
  { key: "listening", value: 57, colorClassName: "text-skill-listening" },
  { key: "reading", value: 71, colorClassName: "text-skill-reading" },
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
  const t = await getTranslations("marketing");
  const tSkills = await getTranslations("skills");

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">{t("heroSubtitle")}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={user ? "/dashboard" : "/register"}>
              {user ? t("goToDashboard") : t("startLearning")}
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/courses">{t("exploreCourses")}</Link>
          </Button>
        </div>
      </div>

      <div aria-hidden="true" className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1.5">
            <CardTitle className="text-base">{t("thisWeek")}</CardTitle>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Flame className="size-4 text-warning" />
              {t("mockStreak")}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label={t("wordsLearned")} value={340} icon={BookMarked} />
              <StatCard label={t("studyTime")} value="18h" subtext={t("thisMonth")} icon={Clock} />
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-4">
              <ProgressRing value={72} size={56} strokeWidth={5} />
              <div>
                <p className="text-sm font-medium">{t("weeklyGoal")}</p>
                <p className="text-xs text-muted-foreground">{t("fiveOfSeven")}</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">{t("skillBreakdown")}</p>
              <div className="grid grid-cols-4 gap-2">
                {SKILL_KEYS.map((skill) => (
                  <div key={skill.key} className="flex flex-col items-center gap-1.5">
                    <ProgressRing
                      value={skill.value}
                      size={40}
                      strokeWidth={4}
                      colorClassName={skill.colorClassName}
                    />
                    <span className="text-[11px] text-muted-foreground">{tSkills(skill.key)}</span>
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
