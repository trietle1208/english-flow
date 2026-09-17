"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VocabularyFilter, VocabularyPosFilter, VocabularySort } from "../types";

const SEARCH_DEBOUNCE_MS = 300;

const FILTER_TABS: { value: VocabularyFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "recent", label: "Recently Added" },
  { value: "pinned", label: "Pinned" },
  { value: "manual", label: "Added by you" },
  { value: "learned", label: "Learned" },
  { value: "not_learned", label: "Not Learned" },
];

const POS_CHIPS: { value: VocabularyPosFilter; label: string }[] = [
  { value: "all", label: "All POS" },
  { value: "noun", label: "Noun" },
  { value: "verb", label: "Verb" },
  { value: "adjective", label: "Adjective" },
  { value: "adverb", label: "Adverb" },
  { value: "pronoun", label: "Pronoun" },
  { value: "preposition", label: "Preposition" },
  { value: "conjunction", label: "Conjunction" },
  { value: "interjection", label: "Interjection" },
  { value: "phrase", label: "Phrase" },
  { value: "phrasal_verb", label: "Phrasal verb" },
];

const SORT_OPTIONS: { value: VocabularySort; label: string }[] = [
  { value: "recent", label: "Recently added" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "most_reviewed", label: "Most reviewed" },
  { value: "difficulty", label: "Difficulty (easy first)" },
  { value: "difficulty_desc", label: "Difficulty (hard first)" },
];

/**
 * Search + filter tabs + POS chips + sort. Writes to URL searchParams so the
 * list stays a Server Component and F5 preserves the view.
 */
export function VocabularyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlSearch = searchParams.get("search") ?? "";
  const urlFilter = (searchParams.get("filter") as VocabularyFilter | null) ?? "all";
  const urlPos = (searchParams.get("pos") as VocabularyPosFilter | null) ?? "all";
  const urlSort = (searchParams.get("sort") as VocabularySort | null) ?? "recent";

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

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
      if (
        value === null ||
        value === "" ||
        (key === "filter" && value === "all") ||
        (key === "pos" && value === "all") ||
        (key === "sort" && value === "recent")
      ) {
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

  const activeFilter = FILTER_TABS.some((tab) => tab.value === urlFilter) ? urlFilter : "all";
  const activePos = POS_CHIPS.some((chip) => chip.value === urlPos) ? urlPos : "all";
  const activeSort = SORT_OPTIONS.some((opt) => opt.value === urlSort) ? urlSort : "recent";

  return (
    <div className="flex flex-col gap-4" data-pending={isPending ? "" : undefined}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Label htmlFor="vocabulary-search" className="sr-only">
            Search vocabulary
          </Label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="vocabulary-search"
            type="search"
            placeholder="Search vocabulary..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vocabulary-sort" className="sr-only">
            Sort vocabulary
          </Label>
          <Select
            value={activeSort}
            onValueChange={(value) =>
              updateParams({
                sort: value,
                page: null,
              })
            }
          >
            <SelectTrigger id="vocabulary-sort" className="w-full sm:w-[220px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        value={activeFilter}
        onValueChange={(value) =>
          updateParams({
            filter: value,
            page: null,
          })
        }
      >
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:w-fit">
          {FILTER_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="px-3">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">Part of speech</p>
        <Tabs
          value={activePos}
          onValueChange={(value) =>
            updateParams({
              pos: value,
              page: null,
            })
          }
        >
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1">
            {POS_CHIPS.map((chip) => (
              <TabsTrigger key={chip.value} value={chip.value} className="px-3">
                {chip.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
