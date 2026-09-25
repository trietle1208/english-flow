"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { QUIZ_CATALOG_KINDS, type QuizCatalogKind } from "../catalog";

type QuizCatalogFiltersProps = {
  activeKind: QuizCatalogKind | "all";
  counts: Record<QuizCatalogKind | "all", number>;
};

const KIND_LABEL_KEYS: Record<QuizCatalogKind, "kindVocabulary" | "kindToeic" | "kindGrammar" | "kindListening"> = {
  vocabulary: "kindVocabulary",
  toeic: "kindToeic",
  grammar: "kindGrammar",
  listening: "kindListening",
};

export function QuizCatalogFilters({ activeKind, counts }: QuizCatalogFiltersProps) {
  const t = useTranslations("quiz");
  const tCommon = useTranslations("common");

  const items: { kind: QuizCatalogKind | "all"; label: string }[] = [
    { kind: "all", label: tCommon("all") },
    ...QUIZ_CATALOG_KINDS.map((kind) => ({
      kind,
      label: t(KIND_LABEL_KEYS[kind]),
    })),
  ];

  return (
    <nav aria-label={t("filterAria")} className="flex flex-wrap gap-2">
      {items.map((item) => {
        const count = counts[item.kind];
        if (item.kind !== "all" && count === 0) {
          return null;
        }
        const href = item.kind === "all" ? "/quiz" : `/quiz?kind=${item.kind}`;
        const isActive = activeKind === item.kind;

        return (
          <Link
            key={item.kind}
            href={href}
            scroll={false}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:bg-muted",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
            <span
              className={cn(
                "tabular-nums",
                isActive ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              {count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
