import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Layers } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/session";
import { VocabularyFilters } from "@/features/vocabulary/components/VocabularyFilters";
import { VocabularyGridSkeleton } from "@/features/vocabulary/components/VocabularyGridSkeleton";
import { VocabularyList } from "@/features/vocabulary/components/VocabularyList";
import { VocabularyStats } from "@/features/vocabulary/components/VocabularyStats";
import { translateReviewDueLabel } from "@/features/vocabulary/translateReviewDue";
import { getFlashcardDueInfo, getVocabularyStats } from "@/features/vocabulary/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("vocabulary");
  return { title: t("title") };
}

type VocabularyPageProps = {
  searchParams: Promise<{
    search?: string;
    filter?: string;
    pos?: string;
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
  const t = await getTranslations("vocabulary");
  const params = await searchParams;
  const [stats, dueInfo] = await Promise.all([
    getVocabularyStats(user.id),
    getFlashcardDueInfo(user.id),
  ]);

  const suspenseKey = [
    params.search ?? "",
    params.filter ?? "all",
    params.pos ?? "all",
    params.sort ?? "recent",
    params.page ?? "1",
  ].join("|");

  const flashcardAction =
    dueInfo.totalSaved === 0 ? null : dueInfo.dueCount > 0 ? (
      <Button asChild className="w-full sm:w-auto">
        <Link href="/vocabulary/review">
          <Layers className="size-4" aria-hidden="true" />
          {t("studyFlashcards", { count: dueInfo.dueCount })}
        </Link>
      </Button>
    ) : (
      <Button asChild variant="outline" className="w-full sm:w-auto">
        <Link href="/vocabulary/review">
          <Layers className="size-4" aria-hidden="true" />
          {dueInfo.nextReviewAt
            ? t("caughtUpDue", {
                label: translateReviewDueLabel(dueInfo.nextReviewAt, t),
              })
            : t("caughtUp")}
        </Link>
      </Button>
    );

  const headerActions = (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
      <Button asChild variant="outline" className="w-full sm:w-auto">
        <Link href="/vocabulary/toeic">
          <Briefcase className="size-4" aria-hidden="true" />
          {t("toeic")}
        </Link>
      </Button>
      {flashcardAction}
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title={t("title")}
        description={t("description")}
        actions={headerActions}
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
          pos={params.pos}
          sort={params.sort}
          page={params.page}
        />
      </Suspense>
    </div>
  );
}
