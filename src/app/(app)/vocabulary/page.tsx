import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { requireUser } from "@/lib/session";
import { VocabularyFilters } from "@/features/vocabulary/components/VocabularyFilters";
import { VocabularyGridSkeleton } from "@/features/vocabulary/components/VocabularyGridSkeleton";
import { VocabularyList } from "@/features/vocabulary/components/VocabularyList";
import { VocabularyStats } from "@/features/vocabulary/components/VocabularyStats";
import { getVocabularyStats } from "@/features/vocabulary/queries";

export const metadata: Metadata = {
  title: "My Vocabulary",
};

type VocabularyPageProps = {
  searchParams: Promise<{
    search?: string;
    filter?: string;
    sort?: string;
    page?: string;
  }>;
};

/**
 * Personal vocabulary hub (spec §14 / Phase 09). Stats load eagerly; the
 * filtered list suspends behind a searchParams-keyed boundary.
 */
export default async function VocabularyPage({ searchParams }: VocabularyPageProps) {
  const user = await requireUser();
  const params = await searchParams;
  const stats = await getVocabularyStats(user.id);

  const suspenseKey = [
    params.search ?? "",
    params.filter ?? "all",
    params.sort ?? "recent",
    params.page ?? "1",
  ].join("|");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="My Vocabulary"
        description="Words you've saved from lessons or added yourself — search, filter, and mark as learned."
      />

      <VocabularyStats stats={stats} />

      <Suspense
        fallback={
          <div className="flex flex-col gap-4" aria-hidden="true">
            <div className="h-9 w-full rounded-md bg-muted sm:max-w-sm" />
            <div className="h-9 w-48 rounded-md bg-muted" />
          </div>
        }
      >
        <VocabularyFilters />
      </Suspense>

      <Suspense key={suspenseKey} fallback={<VocabularyGridSkeleton />}>
        <VocabularyList
          userId={user.id}
          search={params.search}
          filter={params.filter}
          sort={params.sort}
          page={params.page}
        />
      </Suspense>
    </div>
  );
}
