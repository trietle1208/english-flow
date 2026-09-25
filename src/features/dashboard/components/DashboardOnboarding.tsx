import Link from "next/link";
import { Compass, GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Shown instead of empty zero-stats when the user has no activity yet
 * (Phase 12 acceptance: no NaN / bare "0%").
 */
export async function DashboardOnboarding() {
  const t = await getTranslations("dashboard");

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/[0.08] via-card to-card">
        <CardHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Compass className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-lg">{t("placementTitle")}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {t("placementDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/placement-test">{t("startPlacement")}</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="overflow-hidden border-secondary bg-gradient-to-br from-secondary/70 via-card to-card">
        <CardHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-lg">{t("firstCourseTitle")}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {t("firstCourseDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/courses">{t("browseCourses")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
