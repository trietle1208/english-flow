import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { isCefrLevel } from "@/config/cefr";
import { isGrammarTopicCategory } from "@/features/grammar/categories";
import { GrammarFilters } from "@/features/grammar/components/GrammarFilters";
import { GrammarGridSkeleton } from "@/features/grammar/components/GrammarGridSkeleton";
import { GrammarRecommendations } from "@/features/grammar/components/GrammarRecommendations";
import { GrammarTopicList } from "@/features/grammar/components/GrammarTopicList";
import {
  isGrammarStatusFilter,
  type GrammarListFilters,
} from "@/features/grammar/types";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Ngữ pháp",
};

type GrammarPageProps = {
  searchParams: Promise<{
    search?: string;
    level?: string;
    status?: string;
    category?: string;
  }>;
};

/**
 * Grammar catalog (Prompt 3): CEFR / category / search via URL searchParams.
 */
export default async function GrammarPage({ searchParams }: GrammarPageProps) {
  const user = await requireUser();
  const params = await searchParams;

  const filters: GrammarListFilters = {
    search: params.search,
    level:
      typeof params.level === "string" && isCefrLevel(params.level)
        ? params.level
        : "all",
    status:
      typeof params.status === "string" && isGrammarStatusFilter(params.status)
        ? params.status
        : "all",
    category:
      typeof params.category === "string" && isGrammarTopicCategory(params.category)
        ? params.category
        : "all",
  };

  const suspenseKey = [
    filters.search ?? "",
    filters.level ?? "all",
    filters.status ?? "all",
    filters.category ?? "all",
  ].join("|");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Ngữ pháp"
        description="Học quy tắc, xem ví dụ và luyện tập từng câu — tiến độ lưu theo từng chủ điểm."
      />

      <Suspense
        fallback={
          <div className="h-40 animate-pulse rounded-lg bg-muted" aria-hidden="true" />
        }
      >
        <GrammarRecommendations userId={user.id} userCefrLevel={user.cefrLevel} />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex flex-col gap-3 sm:flex-row" aria-hidden="true">
            <div className="h-11 w-full rounded-md bg-muted sm:max-w-sm" />
            <div className="h-11 w-full rounded-md bg-muted sm:w-[160px]" />
            <div className="h-11 w-full rounded-md bg-muted sm:w-[180px]" />
            <div className="h-11 w-full rounded-md bg-muted sm:w-[160px]" />
          </div>
        }
      >
        <GrammarFilters />
      </Suspense>

      <Suspense key={suspenseKey} fallback={<GrammarGridSkeleton />}>
        <GrammarTopicList userId={user.id} filters={filters} />
      </Suspense>
    </div>
  );
}
