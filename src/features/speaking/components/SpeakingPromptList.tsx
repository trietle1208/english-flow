import { getTranslations } from "next-intl/server";
import { Mic } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { listSpeakingPrompts } from "../queries";
import { SpeakingPromptCard } from "./SpeakingPromptCard";

type SpeakingPromptListProps = {
  userId: string;
};

export async function SpeakingPromptList({ userId }: SpeakingPromptListProps) {
  const t = await getTranslations("speaking");
  const prompts = await listSpeakingPrompts(userId);

  if (prompts.length === 0) {
    return (
      <EmptyState icon={Mic} title={t("emptyTitle")} description={t("emptyDescription")} />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt) => (
        <SpeakingPromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}
