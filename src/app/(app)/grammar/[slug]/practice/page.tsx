import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { GrammarPracticeRunner } from "@/features/grammar/components/GrammarPracticeRunner";
import {
  getGrammarTopicDetailByParam,
  getGrammarTopicTitle,
} from "@/features/grammar/queries";
import { requireUser } from "@/lib/session";

type GrammarPracticePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: GrammarPracticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const [title, t] = await Promise.all([
    getGrammarTopicTitle(slug),
    getTranslations("grammar"),
  ]);
  return {
    title: title ? t("practiceMeta", { title }) : t("practiceFallback"),
  };
}

/**
 * `/grammar/[slug]/practice` — one question per screen (ExerciseForLearner only).
 */
export default async function GrammarPracticePage({ params }: GrammarPracticePageProps) {
  const user = await requireUser();
  const t = await getTranslations("grammar");
  const { slug } = await params;
  const topic = await getGrammarTopicDetailByParam(slug, user.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title={t("practiceTitle", { title: topic.titleVi })}
        description={topic.titleEn}
      />
      <GrammarPracticeRunner
        slug={topic.slug}
        titleVi={topic.titleVi}
        quiz={topic.quiz}
        rules={topic.rules}
        examples={topic.examples}
      />
    </div>
  );
}
