import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const title = await getGrammarTopicTitle(slug);
  return { title: title ? `Luyện tập — ${title}` : "Luyện tập ngữ pháp" };
}

/**
 * `/grammar/[slug]/practice` — one question per screen (ExerciseForLearner only).
 */
export default async function GrammarPracticePage({ params }: GrammarPracticePageProps) {
  const user = await requireUser();
  const { slug } = await params;
  const topic = await getGrammarTopicDetailByParam(slug, user.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title={`Luyện tập: ${topic.titleVi}`}
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
