import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** When the learner has activity but nothing left to continue. */
export async function ContinueLearningEmpty() {
  const t = await getTranslations("dashboard");

  return (
    <Card className="overflow-hidden border-primary/10 bg-gradient-to-br from-primary/[0.06] via-card to-card">
      <CardHeader className="pb-3">
        <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <GraduationCap className="size-5" aria-hidden="true" />
        </div>
        <CardTitle className="text-lg">{t("caughtUp")}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {t("caughtUpDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/courses">{t("browseCourses")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
