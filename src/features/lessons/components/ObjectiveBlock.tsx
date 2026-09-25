import { getTranslations } from "next-intl/server";
import { Target } from "lucide-react";

type ObjectiveBlockProps = {
  text: string;
};

export async function ObjectiveBlock({ text }: ObjectiveBlockProps) {
  const t = await getTranslations("lessons");

  return (
    <section
      aria-labelledby="lesson-objective-heading"
      className="rounded-lg border border-primary/25 bg-primary/5 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Target className="size-4" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h2 id="lesson-objective-heading" className="text-sm font-semibold tracking-tight">
            {t("objective")}
          </h2>
          <p className="text-sm leading-relaxed sm:text-base">{text}</p>
        </div>
      </div>
    </section>
  );
}
