"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, PencilLine } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { QuizRunner } from "@/features/quiz/components/QuizRunner";
import type { ExerciseForLearner } from "../learner";
import type { GrammarExampleView, GrammarRuleView } from "../types";

type GrammarPracticeRunnerProps = {
  slug: string;
  titleVi: string;
  quiz: ExerciseForLearner | null;
  rules: GrammarRuleView[];
  examples: GrammarExampleView[];
};

/**
 * Practice route client shell: ExerciseForLearner → QuizRunner (practiceMode).
 * Wrong answers show related rule + sample example (Prompt 3).
 */
export function GrammarPracticeRunner({
  slug,
  titleVi,
  quiz,
  rules,
  examples,
}: GrammarPracticeRunnerProps) {
  const t = useTranslations("grammar");
  const topicHref = `/grammar/${slug}`;

  if (!quiz || quiz.questions.length === 0) {
    return (
      <EmptyState
        icon={PencilLine}
        title={t("noExercises")}
        description={t("noPracticeQuestions", { title: titleVi })}
        action={
          <Button asChild variant="outline" className="min-h-11">
            <Link href={topicHref}>{t("backToTopic")}</Link>
          </Button>
        }
      />
    );
  }

  const relatedRule = rules[0]
    ? {
        title: rules[0].titleVi,
        pattern: rules[0].pattern,
        explanation: rules[0].explanationVi,
      }
    : undefined;
  const sampleExample = examples[0]
    ? {
        sentenceEn: examples[0].sentenceEn,
        sentenceVi: examples[0].sentenceVi,
      }
    : undefined;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="min-h-11 -ml-2 gap-1.5 px-2">
        <Link href={topicHref}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("backToTopic")} — {titleVi}
        </Link>
      </Button>

      <QuizRunner
        quiz={quiz}
        practiceMode
        practiceQuestionLimit={quiz.questions.length}
        hideTitle
        enableHeartbeat={false}
        redirectOnComplete={false}
        practiceWrongHint={{ relatedRule, sampleExample }}
      />
    </div>
  );
}
