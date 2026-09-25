import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";

/** spec §6 "Final CTA". */
export async function FinalCTA() {
  const user = await getCurrentUser();
  const t = await getTranslations("marketing");

  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("finalCta")}</h2>
        <Button size="lg" asChild>
          <Link href={user ? "/dashboard" : "/register"}>
            {user ? t("goToDashboard") : t("startLearning")}
          </Link>
        </Button>
      </div>
    </section>
  );
}
