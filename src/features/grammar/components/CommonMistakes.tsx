"use client";

import { useTranslations } from "next-intl";

type MistakeItem = { mistake: string; correction: string };

type CommonMistakesProps = {
  items: MistakeItem[];
};

/**
 * ❌ wrong / ✅ right pairs with a short explanation (often embedded in the
 * correction string from seed data).
 */
export function CommonMistakes({ items }: CommonMistakesProps) {
  const t = useTranslations("grammar");

  return (
    <section aria-labelledby="grammar-mistakes-heading" className="space-y-3">
      <h2 id="grammar-mistakes-heading" className="text-sm font-semibold tracking-tight">
        {t("commonMistakes")}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item, index) => {
          const { correction, note } = splitCorrection(item.correction);
          return (
            <li
              key={`${item.mistake}-${index}`}
              className="space-y-2 rounded-lg border px-4 py-3"
            >
              <p className="text-sm">
                <span className="mr-2" aria-hidden="true">
                  ❌
                </span>
                <span className="sr-only">{t("incorrect")}</span>
                <span className="text-destructive line-through decoration-destructive/60">
                  {item.mistake}
                </span>
              </p>
              <p className="text-sm">
                <span className="mr-2" aria-hidden="true">
                  ✅
                </span>
                <span className="sr-only">{t("correct")}</span>
                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                  {correction}
                </span>
              </p>
              {note ? (
                <p className="text-sm text-muted-foreground">{note}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Seed corrections often look like `"She works… (add -s for he/she/it)"`. */
function splitCorrection(raw: string): { correction: string; note: string | null } {
  const match = raw.match(/^(.*?)\s*\((.+)\)\s*$/);
  if (!match) {
    return { correction: raw, note: null };
  }
  return { correction: match[1]!.trim(), note: match[2]!.trim() };
}
