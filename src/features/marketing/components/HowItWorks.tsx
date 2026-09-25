import { getTranslations } from "next-intl/server";

const STEP_KEYS = [1, 2, 3, 4] as const;

export async function HowItWorks() {
  const t = await getTranslations("marketing");

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("howItWorks")}
        </h2>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
        {STEP_KEYS.map((step) => (
          <li key={step} className="flex flex-col items-start gap-3">
            <span
              className="flex size-9 items-center justify-center rounded-full border-2 border-primary text-sm font-semibold text-primary"
              aria-hidden="true"
            >
              {step}
            </span>
            <h3 className="font-semibold">{t(`step${step}Title`)}</h3>
            <p className="text-sm text-muted-foreground">{t(`step${step}Description`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
