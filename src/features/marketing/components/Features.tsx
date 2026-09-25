import { BookMarked, BookOpen, Headphones, LineChart, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";

type FeatureKey = "Lessons" | "Vocab" | "Listening" | "Progress";

type Feature = {
  id?: string;
  icon: LucideIcon;
  key: FeatureKey;
};

/**
 * Feature cards — spec §6 "Feature section". `id` on 3 of the 4 matches the
 * `Header` section-nav anchors (`#courses`, `#vocabulary`, `#progress`);
 * "Listening practice" has no header nav item so gets none.
 */
const FEATURES: Feature[] = [
  { id: "courses", icon: BookOpen, key: "Lessons" },
  { id: "vocabulary", icon: BookMarked, key: "Vocab" },
  { icon: Headphones, key: "Listening" },
  { id: "progress", icon: LineChart, key: "Progress" },
];

export async function Features() {
  const t = await getTranslations("marketing");

  return (
    <section id="features" className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("featuresTitle")}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">{t("featuresSubtitle")}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.key} id={feature.id} className="scroll-mt-20">
              <CardContent className="flex flex-col items-start gap-3 p-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="size-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold">{t(`feature${feature.key}Title`)}</h3>
                <p className="text-sm text-muted-foreground">
                  {t(`feature${feature.key}Description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
