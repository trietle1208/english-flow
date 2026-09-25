"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CEFR_LEVELS } from "@/config/cefr";
import {
  GRAMMAR_CATEGORY_I18N_KEY,
  GRAMMAR_TOPIC_CATEGORIES,
} from "../categories";
import type { GrammarStatusFilter } from "../types";

const SEARCH_DEBOUNCE_MS = 300;
const ALL_VALUE = "__all__";

/**
 * Search + CEFR + category + status → URL searchParams (list stays RSC).
 */
export function GrammarFilters() {
  const t = useTranslations("grammar");
  const tCefr = useTranslations("cefr");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const statusOptions = useMemo(
    (): { value: GrammarStatusFilter; label: string }[] => [
      { value: "all", label: t("allStatuses") },
      { value: "not_started", label: t("statusNew") },
      { value: "weak", label: t("statusWeak") },
      { value: "practiced", label: t("statusPracticed") },
      { value: "mastered", label: t("statusMastered") },
    ],
    [t],
  );

  const urlSearch = searchParams.get("search") ?? "";
  const urlLevel = searchParams.get("level") ?? "";
  const urlCategory = searchParams.get("category") ?? "";
  const urlStatus = (searchParams.get("status") as GrammarStatusFilter | null) ?? "all";

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
      if (value === null || value === "" || value === "all") {
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

  const activeStatus = statusOptions.some((opt) => opt.value === urlStatus)
    ? urlStatus
    : "all";
  const hasFilters = Boolean(
    urlSearch ||
      urlLevel ||
      urlCategory ||
      (urlStatus && urlStatus !== "all"),
  );

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
      data-pending={isPending ? "" : undefined}
    >
      <div className="relative min-w-0 flex-1 sm:max-w-sm">
        <Label htmlFor="grammar-search" className="sr-only">
          {t("search")}
        </Label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="grammar-search"
          type="search"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-h-11 pl-9"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="grammar-level" className="sr-only">
          {t("filterLevel")}
        </Label>
        <Select
          value={urlLevel || ALL_VALUE}
          onValueChange={(value) =>
            updateParams({
              level: value === ALL_VALUE ? null : value,
            })
          }
        >
          <SelectTrigger id="grammar-level" className="min-h-11 w-full sm:w-[160px]">
            <SelectValue placeholder={t("allLevels")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>{t("allLevels")}</SelectItem>
            {CEFR_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {tCefr(level)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="grammar-category" className="sr-only">
          {t("filterGroup")}
        </Label>
        <Select
          value={urlCategory || ALL_VALUE}
          onValueChange={(value) =>
            updateParams({
              category: value === ALL_VALUE ? null : value,
            })
          }
        >
          <SelectTrigger id="grammar-category" className="min-h-11 w-full sm:w-[180px]">
            <SelectValue placeholder={t("allGroups")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>{t("allGroups")}</SelectItem>
            {GRAMMAR_TOPIC_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {t(`categories.${GRAMMAR_CATEGORY_I18N_KEY[category]}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="grammar-status" className="sr-only">
          {t("filterProgress")}
        </Label>
        <Select
          value={activeStatus}
          onValueChange={(value) =>
            updateParams({
              status: value === "all" ? null : value,
            })
          }
        >
          <SelectTrigger id="grammar-status" className="min-h-11 w-full sm:w-[160px]">
            <SelectValue placeholder={t("allStatuses")} />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="min-h-11 gap-1 self-start sm:self-end"
          onClick={() => {
            setSearch("");
            startTransition(() => {
              router.replace(pathname, { scroll: false });
            });
          }}
        >
          <X className="size-4" aria-hidden="true" />
          {tCommon("clearFilters")}
        </Button>
      ) : null}
    </div>
  );
}
