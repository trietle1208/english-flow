import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  QUIZ_CATALOG_KIND_LABELS,
  QUIZ_CATALOG_KINDS,
  type QuizCatalogKind,
} from "../catalog";

type QuizCatalogFiltersProps = {
  activeKind: QuizCatalogKind | "all";
  counts: Record<QuizCatalogKind | "all", number>;
};

export function QuizCatalogFilters({ activeKind, counts }: QuizCatalogFiltersProps) {
  const items: { kind: QuizCatalogKind | "all"; label: string }[] = [
    { kind: "all", label: "All" },
    ...QUIZ_CATALOG_KINDS.map((kind) => ({
      kind,
      label: QUIZ_CATALOG_KIND_LABELS[kind],
    })),
  ];

  return (
    <nav aria-label="Filter quizzes by skill" className="flex flex-wrap gap-2">
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
