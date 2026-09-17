import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ListeningGridSkeleton } from "@/features/listening/components/ListeningGridSkeleton";
import { ListeningLessonList } from "@/features/listening/components/ListeningLessonList";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Listening",
};

/**
 * Listening catalog (spec §18 / Phase 10).
 */
export default async function ListeningPage() {
  const user = await requireUser();

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Listening"
        description="Practice real conversations with audio, transcripts, and comprehension checks."
      />
      <Suspense fallback={<ListeningGridSkeleton />}>
        <ListeningLessonList userId={user.id} />
      </Suspense>
    </div>
  );
}
