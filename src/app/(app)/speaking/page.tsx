import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { SpeakingGridSkeleton } from "@/features/speaking/components/SpeakingGridSkeleton";
import { SpeakingPromptList } from "@/features/speaking/components/SpeakingPromptList";
import { requireUser } from "@/lib/session";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("speaking");
  return { title: t("title") };
}

export default async function SpeakingPage() {
  const user = await requireUser();
  const t = await getTranslations("speaking");

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title={t("title")} description={t("description")} />
      <Suspense fallback={<SpeakingGridSkeleton />}>
        <SpeakingPromptList userId={user.id} />
      </Suspense>
    </div>
  );
}
