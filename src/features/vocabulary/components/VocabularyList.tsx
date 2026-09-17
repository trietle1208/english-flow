import Link from "next/link";
import { BookMarked, SearchX } from "lucide-react";
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
          title="No pinned words yet."
          description="Pin words you want to prioritize — they'll show up here and float to the top of Recently added."
          action={
            <Button asChild variant="outline">
              <Link href="/vocabulary">Show all vocabulary</Link>
            </Button>
          }
        />
      );
    }

    if (parsedFilter === "manual" && parsedPos === "all" && !search?.trim()) {
      return (
        <EmptyState
          icon={BookMarked}
          title="You haven't added any words yourself yet."
          description="Use the + button to add a word you learned outside lessons."
          action={
            <Button asChild variant="outline">
              <Link href="/vocabulary">Show all vocabulary</Link>
            </Button>
          }
        />
      );
    }

    if (hasActiveFilters) {
      return (
        <EmptyState
          icon={SearchX}
          title="No vocabulary matches your filters."
          description="Try a different word, meaning, part of speech, or clear the filters."
          action={
            <Button asChild variant="outline">
              <Link href="/vocabulary">Clear filters</Link>
            </Button>
          }
        />
      );
    }

    return (
      <EmptyState
        icon={BookMarked}
        title="You haven't saved any vocabulary yet."
        description="Save words from lessons or add your own with the + button."
        action={
          <Button asChild>
            <Link href="/courses">Explore Lessons</Link>
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
          aria-label="Vocabulary pagination"
        >
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
            <span className="sr-only">
              ({total} words, {VOCABULARY_PAGE_SIZE} per page)
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
                  Previous
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                Previous
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
                  Next
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                Next
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
