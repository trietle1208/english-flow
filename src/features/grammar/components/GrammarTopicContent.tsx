import { SectionCard } from "@/components/shared/SectionCard";
import { QuizRunner } from "@/features/quiz/components/QuizRunner";
import type { GrammarTopicDetail } from "../types";
import { CommonMistakes } from "./CommonMistakes";
import { GrammarExamples } from "./GrammarExamples";
import { GrammarFooterNav } from "./GrammarFooterNav";

type GrammarTopicContentProps = {
  topic: GrammarTopicDetail;
};

/**
 * Five content sections for a grammar topic (spec §17): Explanation → Rules
 * → Examples → Common mistakes → Mini exercises.
 */
export function GrammarTopicContent({ topic }: GrammarTopicContentProps) {
  const returnTo = `/grammar/${topic.id}`;

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="grammar-explanation-heading" className="space-y-3">
        <h2 id="grammar-explanation-heading" className="text-sm font-semibold tracking-tight">
          Explanation
        </h2>
        <p className="text-sm leading-relaxed sm:text-base">{topic.summary}</p>
      </section>

      <section aria-labelledby="grammar-rules-heading" className="space-y-3">
        <h2 id="grammar-rules-heading" className="text-sm font-semibold tracking-tight">
          Rules
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          {topic.content.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <GrammarExamples items={topic.content.examples} />

      <CommonMistakes items={topic.content.commonMistakes} />

      {topic.quiz ? (
        <SectionCard title="Mini exercises" description={topic.quiz.title}>
          <QuizRunner
            quiz={topic.quiz}
            returnTo={returnTo}
            revalidatePaths={[returnTo, "/grammar"]}
          />
        </SectionCard>
      ) : (
        <SectionCard title="Mini exercises">
          <p className="text-sm text-muted-foreground">
            A practice quiz for this topic is not available yet.
          </p>
        </SectionCard>
      )}

      <GrammarFooterNav
        previousTopicId={topic.previousTopicId}
        nextTopicId={topic.nextTopicId}
      />
    </div>
  );
}
