import Link from "next/link";
import { BookMarked, SearchX } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { listUserVocabularies, VOCABULARY_PAGE_SIZE } from "../queries";
import {
  vocabularyFilterSchema,
  vocabularyPosSchema,
  vocabularySortSchema,
} from "../schemas";
import type { VocabularyFilter, VocabularyPosFilter, VocabularySort } from "../types";
import { VocabularyCard } from "./VocabularyCard";

type VocabularyListProps = {
  userId: string;
  search?: string;
  filter?: string;
  pos?: string;
  sort?: string;
  page?: string;
};

/**
 * Server Component that fetches the filtered/sorted/paginated personal list.
 * Wrapped in `<Suspense>` keyed by searchParams so filter changes show the
 * skeleton without client-fetching.
 */
export async function VocabularyList({
  userId,
  search,
  filter,
  pos,
  sort,
  page,
}: VocabularyListProps) {
  const t = await getTranslations("vocabulary");
  const tc = await getTranslations("common");

  const parsedFilter = parseFilter(filter);
  const parsedPos = parsePos(pos);
  const parsedSort = parseSort(sort);
  const parsedPage = page ? Number.parseInt(page, 10) : 1;

  const { items, page: currentPage, total, pageSize } = await listUserVocabularies({
    userId,
    search,
    filter: parsedFilter,
    pos: parsedPos,
    sort: parsedSort,
    page: Number.isFinite(parsedPage) ? parsedPage : 1,
  });

  const hasActiveFilters = Boolean(
    search?.trim() ||
      (parsedFilter && parsedFilter !== "all") ||
      (parsedPos && parsedPos !== "all"),
  );

  if (items.length === 0) {
    if (parsedFilter === "pinned" && parsedPos === "all" && !search?.trim()) {
      return (
        <EmptyState
          icon={BookMarked}
          title={t("emptyPinned")}
          description={t("emptyPinnedDescription")}
          action={
            <Button asChild variant="outline">
              <Link href="/vocabulary">{t("showAll")}</Link>
            </Button>
          }
        />
      );
    }

    if (parsedFilter === "manual" && parsedPos === "all" && !search?.trim()) {
      return (
        <EmptyState
          icon={BookMarked}
          title={t("emptyManual")}
          description={t("emptyManualDescription")}
          action={
            <Button asChild variant="outline">
              <Link href="/vocabulary">{t("showAll")}</Link>
            </Button>
          }
        />
      );
    }

    if (hasActiveFilters) {
      return (
        <EmptyState
          icon={SearchX}
          title={t("emptyFilters")}
          description={t("emptyFiltersDescription")}
          action={
            <Button asChild variant="outline">
              <Link href="/vocabulary">{tc("clearFilters")}</Link>
            </Button>
          }
        />
      );
    }

    return (
      <EmptyState
        icon={BookMarked}
        title={t("emptyAll")}
        description={t("emptyAllDescription")}
        action={
          <Button asChild>
            <Link href="/courses">{t("exploreLessons")}</Link>
          </Button>
        }
      />
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-col gap-6">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.id} className="h-full">
            <VocabularyCard item={item} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav
          className="flex items-center justify-between gap-3"
          aria-label={t("pagination")}
        >
          <p className="text-sm text-muted-foreground">
            {tc("pageOf", { page: currentPage, total: totalPages })}
            <span className="sr-only">
              {tc("wordsPerPage", { total, pageSize: VOCABULARY_PAGE_SIZE })}
            </span>
          </p>
          <div className="flex gap-2">
            {currentPage > 1 ? (
              <Button asChild variant="outline" size="sm">
                <Link
                  href={buildPageHref({
                    search,
                    filter: parsedFilter,
                    pos: parsedPos,
                    sort: parsedSort,
                    page: currentPage - 1,
                  })}
                >
                  {tc("previous")}
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                {tc("previous")}
              </Button>
            )}
            {currentPage < totalPages ? (
              <Button asChild variant="outline" size="sm">
                <Link
                  href={buildPageHref({
                    search,
                    filter: parsedFilter,
                    pos: parsedPos,
                    sort: parsedSort,
                    page: currentPage + 1,
                  })}
                >
                  {tc("next")}
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                {tc("next")}
              </Button>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

function parseFilter(value: string | undefined): VocabularyFilter {
  const parsed = vocabularyFilterSchema.safeParse(value ?? "all");
  return parsed.success ? parsed.data : "all";
}

function parsePos(value: string | undefined): VocabularyPosFilter {
  const parsed = vocabularyPosSchema.safeParse(value ?? "all");
  return parsed.success ? parsed.data : "all";
}

function parseSort(value: string | undefined): VocabularySort {
  const parsed = vocabularySortSchema.safeParse(value ?? "recent");
  return parsed.success ? parsed.data : "recent";
}

function buildPageHref({
  search,
  filter,
  pos,
  sort,
  page,
}: {
  search?: string;
  filter: VocabularyFilter;
  pos: VocabularyPosFilter;
  sort: VocabularySort;
  page: number;
}) {
  const params = new URLSearchParams();
  if (search?.trim()) {
    params.set("search", search.trim());
  }
  if (filter !== "all") {
    params.set("filter", filter);
  }
  if (pos !== "all") {
    params.set("pos", pos);
  }
  if (sort !== "recent") {
    params.set("sort", sort);
  }
  if (page > 1) {
    params.set("page", String(page));
  }
  const query = params.toString();
  return query ? `/vocabulary?${query}` : "/vocabulary";
}
