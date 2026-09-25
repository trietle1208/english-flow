import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { SpeechPractice } from "@/features/speaking/components/SpeechPractice";
import { getSpeakingPromptDetail, getSpeakingPromptTitle } from "@/features/speaking/queries";
import { requireUser } from "@/lib/session";

type SpeakingPromptPageProps = {
  params: Promise<{ promptId: string }>;
};

export async function generateMetadata({
  params,
}: SpeakingPromptPageProps): Promise<Metadata> {
  const { promptId } = await params;
  const [title, t] = await Promise.all([
    getSpeakingPromptTitle(promptId),
    getTranslations("speaking"),
  ]);
  return { title: title ?? t("promptFallback") };
}

export default async function SpeakingPromptPage({ params }: SpeakingPromptPageProps) {
  const user = await requireUser();
  const t = await getTranslations("speaking");
  const tCefr = await getTranslations("cefr");
  const { promptId } = await params;
  const prompt = await getSpeakingPromptDetail(promptId, user.id);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <PageHeader title={prompt.title} />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{tCefr(prompt.cefrLevel)}</Badge>
          <Badge variant="outline">{t(prompt.difficulty)}</Badge>
        </div>
      </div>

      <SpeechPractice
        promptId={prompt.id}
        promptText={prompt.promptText}
        audioUrl={prompt.audioUrl}
        lastAttempt={prompt.lastAttempt}
      />
    </div>
  );
}
