"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TOEIC_TOPICS } from "@/db/seed-data/toeic-vocabulary";
import type { ToeicTopicFilter } from "../types";

const DEBOUNCE_MS = 300;

/**
 * Debounced search + topic chips for `/vocabulary/toeic`.
 * Syncs `?search=` / `?topic=` and resets page.
 */
export function ToeicVocabularySearch() {
  const t = useTranslations("vocabulary");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  const [, startTransition] = useTransition();

  const urlTopic = (searchParams.get("topic") as ToeicTopicFilter | null) ?? "all";

  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const current = searchParams.get("search") ?? "";
    if (value.trim() === current.trim()) {
      return;
    }

    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();
      if (trimmed) {
        params.set("search", trimmed);
      } else {
        params.delete("search");
      }
      params.delete("page");
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname);
      });
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [value, pathname, router, searchParams, startTransition]);

  function setTopic(next: ToeicTopicFilter) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") {
      params.delete("topic");
    } else {
      params.set("topic", next);
    }
    params.delete("page");
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full sm:max-w-sm">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t("searchToeic")}
          className="pl-9"
          aria-label={t("searchToeicAria")}
        />
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t("filterTopic")}
      >
        <TopicChip
          label={t("allTopics")}
          active={urlTopic === "all"}
          onClick={() => setTopic("all")}
        />
        {TOEIC_TOPICS.map((topic) => (
          <TopicChip
            key={topic.id}
            label={`${topic.labelVi}`}
            active={urlTopic === topic.id}
            onClick={() => setTopic(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}

function TopicChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
