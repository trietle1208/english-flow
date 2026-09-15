import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { CEFR_LEVEL_LABELS } from "@/config/cefr";
import { GrammarProgressBadge } from "@/features/grammar/components/GrammarProgressBadge";
import { GrammarTopicContent } from "@/features/grammar/components/GrammarTopicContent";
import {
  getGrammarTopicDetailByParam,
  getGrammarTopicTitle,
} from "@/features/grammar/queries";
import { requireUser } from "@/lib/session";

type GrammarTopicPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: GrammarTopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = await getGrammarTopicTitle(slug);
  return { title: title ?? "Chủ điểm ngữ pháp" };
}

/**
 * Grammar topic detail (Prompt 3): tabs Lý thuyết | Ví dụ | Bài tập.
 * Param accepts slug or legacy UUID.
 */
export default async function GrammarTopicPage({ params }: GrammarTopicPageProps) {
  const user = await requireUser();
  const { slug } = await params;
  const topic = await getGrammarTopicDetailByParam(slug, user.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <PageHeader title={topic.titleVi} description={topic.summary} />
        <p className="text-sm text-muted-foreground">{topic.titleEn}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{CEFR_LEVEL_LABELS[topic.level]}</Badge>
          <GrammarProgressBadge status={topic.status} bestScore={topic.bestScore} />
        </div>
      </div>

      <GrammarTopicContent topic={topic} />
    </div>
  );
}
