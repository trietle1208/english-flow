import { BookMarked, BookOpen, Headphones, LineChart, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Feature = {
  id?: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * Feature cards — spec §6 "Feature section". `id` on 3 of the 4 matches the
 * `Header` section-nav anchors (`#courses`, `#vocabulary`, `#progress`);
 * "Listening practice" has no header nav item so gets none.
 */
const FEATURES: Feature[] = [
  {
    id: "courses",
    icon: BookOpen,
    title: "Structured lessons",
    description:
      "Progress through CEFR-leveled courses and lessons built to develop real fluency, not just vocabulary lists.",
  },
  {
    id: "vocabulary",
    icon: BookMarked,
    title: "Personal vocabulary",
    description:
      "Save any word you come across, track how well you know it, and review it on your own schedule.",
  },
  {
    icon: Headphones,
    title: "Listening practice",
    description:
      "Train your ear with real audio, transcripts, and comprehension checks at every CEFR level.",
  },
  {
    id: "progress",
    icon: LineChart,
    title: "Progress tracking",
    description:
      "See your streak, daily goal, and skill breakdown at a glance, so you always know where you stand.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            One system, every skill.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to learn English well, in one focused, distraction-free place.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.title} id={feature.id} className="scroll-mt-20">
              <CardContent className="flex flex-col items-start gap-3 p-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="size-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
