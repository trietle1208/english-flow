import type { GrammarLessonBody } from "@/db/schema/grammar";
import type { GrammarMistakeView, GrammarRuleView } from "../types";
import { CommonMistakes } from "./CommonMistakes";

type GrammarTheoryPanelProps = {
  summary: string;
  lesson: GrammarLessonBody | null;
  rules: GrammarRuleView[];
  mistakes: GrammarMistakeView[];
};

/**
 * Tab "Lý thuyết": when to use, formation, signal words, tips, rules, mistakes.
 */
export function GrammarTheoryPanel({
  summary,
  lesson,
  rules,
  mistakes,
}: GrammarTheoryPanelProps) {
  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="grammar-summary-heading" className="space-y-3">
        <h2 id="grammar-summary-heading" className="text-sm font-semibold tracking-tight">
          Tóm tắt
        </h2>
        <p className="text-sm leading-relaxed sm:text-base">{summary}</p>
      </section>

      {lesson ? (
        <>
          <section aria-labelledby="grammar-when-heading" className="space-y-3">
            <h2 id="grammar-when-heading" className="text-sm font-semibold tracking-tight">
              Khi nào dùng
            </h2>
            <p className="text-sm leading-relaxed sm:text-base">{lesson.when_to_use}</p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              <span className="font-medium text-foreground">Khi nào không dùng: </span>
              {lesson.when_not_to_use}
            </p>
          </section>

          <section aria-labelledby="grammar-formation-heading" className="space-y-3">
            <h2
              id="grammar-formation-heading"
              className="text-sm font-semibold tracking-tight"
            >
              Cấu trúc
            </h2>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="rounded-lg border bg-muted/40 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Khẳng định
                </p>
                <p className="mt-1 font-mono text-sm">{lesson.formation.affirmative}</p>
              </li>
              <li className="rounded-lg border bg-muted/40 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Phủ định
                </p>
                <p className="mt-1 font-mono text-sm">{lesson.formation.negative}</p>
              </li>
              <li className="rounded-lg border bg-muted/40 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Nghi vấn
                </p>
                <p className="mt-1 font-mono text-sm">{lesson.formation.question}</p>
              </li>
            </ul>
          </section>

          {lesson.signal_words.length > 0 ? (
            <section aria-labelledby="grammar-signals-heading" className="space-y-3">
              <h2
                id="grammar-signals-heading"
                className="text-sm font-semibold tracking-tight"
              >
                Dấu hiệu nhận biết
              </h2>
              <ul className="flex flex-wrap gap-2">
                {lesson.signal_words.map((word) => (
                  <li
                    key={word}
                    className="rounded-md border bg-muted/50 px-2.5 py-1 text-sm"
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {lesson.tips.length > 0 ? (
            <section aria-labelledby="grammar-tips-heading" className="space-y-3">
              <h2 id="grammar-tips-heading" className="text-sm font-semibold tracking-tight">
                Mẹo học
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {lesson.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      ) : null}

      {rules.length > 0 ? (
        <section aria-labelledby="grammar-rules-heading" className="space-y-3">
          <h2 id="grammar-rules-heading" className="text-sm font-semibold tracking-tight">
            Quy tắc
          </h2>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed sm:text-base">
            {rules.map((rule) => (
              <li key={rule.id}>
                <p className="font-medium text-foreground">
                  {rule.titleVi}
                  <span className="ml-2 font-normal text-muted-foreground">
                    ({rule.pattern})
                  </span>
                </p>
                <p className="mt-1 text-muted-foreground">{rule.explanationVi}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {mistakes.length > 0 ? (
        <CommonMistakes
          items={mistakes.map((item) => ({
            mistake: item.incorrectSentence,
            correction: `${item.correctSentence} (${item.explanationVi})`,
          }))}
        />
      ) : null}
    </div>
  );
}
