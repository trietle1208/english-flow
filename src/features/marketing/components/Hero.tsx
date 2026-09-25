import Link from "next/link";
import { BookMarked, Clock, Flame } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
 * the real `ProgressRing`/`Card` components (task list: "không dùng ảnh
 * stock"), so it's `aria-hidden` — the numbers are illustrative, not a real
 * user's data, and shouldn't be announced to screen readers as if they were.
 */
export async function Hero() {
  const user = await getCurrentUser();
  const t = await getTranslations("marketing");
  const tSkills = await getTranslations("skills");

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
      <div className="flex flex-col items-start gap-5 sm:gap-6">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
          {t("heroSubtitle")}
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href={user ? "/dashboard" : "/register"}>
              {user ? t("goToDashboard") : t("startLearning")}
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/courses">{t("exploreCourses")}</Link>
          </Button>
        </div>
      </div>

      <div aria-hidden="true" className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1.5 p-4 sm:p-6">
            <CardTitle className="text-base">{t("thisWeek")}</CardTitle>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Flame className="size-4 shrink-0 text-warning" />
              {t("mockStreak")}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0 sm:space-y-4 sm:p-6 sm:pt-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-1">
                  <p className="min-w-0 text-xs leading-snug text-muted-foreground">
                    {t("wordsLearned")}
                  </p>
                  <BookMarked className="size-3.5 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1.5 text-xl font-semibold tracking-tight">340</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-1">
                  <p className="min-w-0 text-xs leading-snug text-muted-foreground">
                    {t("studyTime")}
                  </p>
                  <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1.5 text-xl font-semibold tracking-tight">18h</p>
                <p className="text-[11px] text-muted-foreground">{t("thisMonth")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3 sm:gap-4 sm:p-4">
              <ProgressRing value={72} size={52} strokeWidth={5} />
              <div className="min-w-0">
                <p className="text-sm font-medium">{t("weeklyGoal")}</p>
                <p className="text-xs text-muted-foreground">{t("fiveOfSeven")}</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground sm:mb-3">
                {t("skillBreakdown")}
              </p>
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {SKILL_KEYS.map((skill) => (
                  <div key={skill.key} className="flex min-w-0 flex-col items-center gap-1">
                    <ProgressRing
                      value={skill.value}
                      size={36}
                      strokeWidth={4}
                      colorClassName={skill.colorClassName}
                    />
                    <span className="text-center text-[10px] leading-tight text-muted-foreground sm:text-[11px]">
                      {tSkills(skill.key)}
                    </span>
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
