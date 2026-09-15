import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { CEFR_LEVEL_LABELS } from "@/config/cefr";
import { GrammarTopicContent } from "@/features/grammar/components/GrammarTopicContent";
import { getGrammarTopicDetail, getGrammarTopicTitle } from "@/features/grammar/queries";
import { requireUser } from "@/lib/session";

type GrammarTopicPageProps = {
  params: Promise<{ topicId: string }>;
};

export async function generateMetadata({
  params,
}: GrammarTopicPageProps): Promise<Metadata> {
  const { topicId } = await params;
  const title = await getGrammarTopicTitle(topicId);
  return { title: title ?? "Grammar topic" };
}

/**
 * Grammar topic detail (spec §17): explanation, rules, examples, mistakes, quiz.
 */
export default async function GrammarTopicPage({ params }: GrammarTopicPageProps) {
  const user = await requireUser();
  const { topicId } = await params;
  const topic = await getGrammarTopicDetail(topicId, user.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <PageHeader title={topic.title} description={topic.summary} />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{CEFR_LEVEL_LABELS[topic.level]}</Badge>
          {topic.isCompleted ? (
            <Badge variant="outline" className="gap-1 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              Practiced
            </Badge>
          ) : null}
        </div>
      </div>

      <GrammarTopicContent topic={topic} />
    </div>
  );
}
