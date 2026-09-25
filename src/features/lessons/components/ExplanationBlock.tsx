import { getTranslations } from "next-intl/server";
import { SimpleMarkdown } from "./SimpleMarkdown";

type ExplanationBlockProps = {
  markdown: string;
};

export async function ExplanationBlock({ markdown }: ExplanationBlockProps) {
  const t = await getTranslations("lessons");

  return (
    <section aria-labelledby="lesson-explanation-heading" className="space-y-3">
      <h2 id="lesson-explanation-heading" className="text-sm font-semibold tracking-tight">
        {t("explanation")}
      </h2>
      <SimpleMarkdown markdown={markdown} />
    </section>
  );
}
