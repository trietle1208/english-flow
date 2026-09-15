import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { GrammarGridSkeleton } from "@/features/grammar/components/GrammarGridSkeleton";
import { GrammarTopicList } from "@/features/grammar/components/GrammarTopicList";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Grammar",
};

/**
 * Grammar catalog (spec §17 / Phase 10): topics grouped by CEFR level.
 */
export default async function GrammarPage() {
  const user = await requireUser();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Grammar"
        description="Learn rules, spot common mistakes, and practice with a short quiz."
      />
      <Suspense fallback={<GrammarGridSkeleton />}>
        <GrammarTopicList userId={user.id} />
      </Suspense>
    </div>
  );
}
