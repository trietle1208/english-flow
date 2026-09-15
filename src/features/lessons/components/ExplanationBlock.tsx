import { SimpleMarkdown } from "./SimpleMarkdown";

type ExplanationBlockProps = {
  markdown: string;
};

export function ExplanationBlock({ markdown }: ExplanationBlockProps) {
  return (
    <section aria-labelledby="lesson-explanation-heading" className="space-y-3">
      <h2 id="lesson-explanation-heading" className="text-sm font-semibold tracking-tight">
        Explanation
      </h2>
      <SimpleMarkdown markdown={markdown} />
    </section>
  );
}
