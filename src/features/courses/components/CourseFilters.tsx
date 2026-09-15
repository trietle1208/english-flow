"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CEFR_LEVELS, CEFR_LEVEL_LABELS, type CefrLevel } from "@/config/cefr";

const SEARCH_DEBOUNCE_MS = 300;
const ALL_VALUE = "__all__";

type CourseFiltersProps = {
  categories: string[];
};

/**
 * Search + level + category controls. Writes filters into the URL
 * searchParams so links are shareable and F5 preserves results (Phase 07).
 * Debounces only the search box; the course list stays a Server Component.
 */
export function CourseFilters({ categories }: CourseFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlSearch = searchParams.get("search") ?? "";
  const urlLevel = searchParams.get("level") ?? "";
  const urlCategory = searchParams.get("category") ?? "";

  const [search, setSearch] = useState(urlSearch);

  // Keep local input in sync when the URL changes externally (Clear filters, back).
  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  // Debounce typing → URL. Level/category update the URL immediately.
  useEffect(() => {
    if (search === urlSearch) {
      return;
    }

    const handle = window.setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString());
      const trimmed = search.trim();
      if (trimmed) {
        next.set("search", trimmed);
      } else {
        next.delete("search");
      }
      next.delete("page");

      const query = next.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(handle);
  }, [search, urlSearch, pathname, router, searchParams, startTransition]);

  function updateParams(patch: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }

    const query = next.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }

  const hasFilters = Boolean(urlSearch || urlLevel || urlCategory);

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
      data-pending={isPending ? "" : undefined}
    >
      <div className="relative min-w-0 flex-1 sm:max-w-sm">
        <Label htmlFor="course-search" className="sr-only">
          Search courses
        </Label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="course-search"
          type="search"
          placeholder="Search courses…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-9"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="course-level" className="sr-only">
          Level
        </Label>
        <Select
          value={urlLevel || ALL_VALUE}
          onValueChange={(value) =>
            updateParams({
              level: value === ALL_VALUE ? null : value,
              page: null,
            })
          }
        >
          <SelectTrigger id="course-level" className="w-full sm:w-[220px]">
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All levels</SelectItem>
            {CEFR_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {CEFR_LEVEL_LABELS[level as CefrLevel]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="course-category" className="sr-only">
          Category
        </Label>
        <Select
          value={urlCategory || ALL_VALUE}
          onValueChange={(value) =>
            updateParams({
              category: value === ALL_VALUE ? null : value,
              page: null,
            })
          }
        >
          <SelectTrigger id="course-category" className="w-full sm:w-[200px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="self-start sm:self-auto"
          onClick={() => {
            setSearch("");
            startTransition(() => {
              router.replace(pathname, { scroll: false });
            });
          }}
        >
          <X className="size-4" aria-hidden="true" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
