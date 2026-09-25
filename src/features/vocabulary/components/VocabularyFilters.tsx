"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
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

const FILTER_TABS: VocabularyFilter[] = [
  "all",
  "recent",
  "pinned",
  "manual",
  "learned",
  "not_learned",
];

const POS_CHIPS: VocabularyPosFilter[] = [
  "all",
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
  "phrase",
  "phrasal_verb",
];

const SORT_OPTIONS: VocabularySort[] = [
  "recent",
  "alphabetical",
  "most_reviewed",
  "difficulty",
  "difficulty_desc",
];

/**
 * Search + filter tabs + POS chips + sort. Writes to URL searchParams so the
 * list stays a Server Component and F5 preserves the view.
 */
export function VocabularyFilters() {
  const t = useTranslations("vocabulary");
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

  const activeFilter = FILTER_TABS.includes(urlFilter) ? urlFilter : "all";
  const activePos = POS_CHIPS.includes(urlPos) ? urlPos : "all";
  const activeSort = SORT_OPTIONS.includes(urlSort) ? urlSort : "recent";

  function filterLabel(value: VocabularyFilter) {
    switch (value) {
      case "all":
        return t("tabAll");
      case "recent":
        return t("tabRecent");
      case "pinned":
        return t("tabPinned");
      case "manual":
        return t("tabManual");
      case "learned":
        return t("tabLearned");
      case "not_learned":
        return t("tabNotLearned");
    }
  }

  function posLabel(value: VocabularyPosFilter) {
    if (value === "all") {
      return t("allPos");
    }
    return t(`pos.${value}`);
  }

  function sortLabel(value: VocabularySort) {
    switch (value) {
      case "recent":
        return t("sortRecent");
      case "alphabetical":
        return t("sortAlpha");
      case "most_reviewed":
        return t("sortReviewed");
      case "difficulty":
        return t("sortEasy");
      case "difficulty_desc":
        return t("sortHard");
    }
  }

  return (
    <div className="flex flex-col gap-4" data-pending={isPending ? "" : undefined}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Label htmlFor="vocabulary-search" className="sr-only">
            {t("search")}
          </Label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="vocabulary-search"
            type="search"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vocabulary-sort" className="sr-only">
            {t("sort")}
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
              <SelectValue placeholder={t("sortPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {sortLabel(option)}
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
            <TabsTrigger key={tab} value={tab} className="px-3">
              {filterLabel(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">{t("partOfSpeech")}</p>
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
              <TabsTrigger key={chip} value={chip} className="px-3">
                {posLabel(chip)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
