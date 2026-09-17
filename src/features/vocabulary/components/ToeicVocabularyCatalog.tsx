import Link from "next/link";
import { BookMarked } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { VocabularyItem } from "@/features/vocabulary/components/VocabularyItem";
import { SaveVocabularyButton } from "@/features/vocabulary/components/SaveVocabularyButton";
import { listToeicCatalog, VOCABULARY_PAGE_SIZE } from "@/features/vocabulary/queries";
import {
  TOEIC_TSL_ATTRIBUTION,
  isToeicTopicId,
  toeicTopicLabel,
} from "@/db/seed-data/toeic-vocabulary";
import type { ToeicCatalogItem, ToeicTopicFilter } from "../types";

type ToeicVocabularyCatalogProps = {
  userId: string;
  search?: string;
  topic?: string;
  page?: string;
};

/**
 * Browseable TOEIC catalog (curated TSL subset), grouped by topic.
 * Save toggles reuse personal vocabulary actions.
 */
export async function ToeicVocabularyCatalog({
  userId,
  search,
  topic,
  page,
}: ToeicVocabularyCatalogProps) {
  const parsedPage = page ? Number.parseInt(page, 10) : 1;
  const topicFilter: ToeicTopicFilter =
    topic && isToeicTopicId(topic) ? topic : "all";

  const { items, page: currentPage, total, pageSize } = await listToeicCatalog({
    userId,
    search,
    topic: topicFilter,
    page: Number.isFinite(parsedPage) ? parsedPage : 1,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const trimmedSearch = search?.trim() ?? "";
  const groups = groupByTopic(items);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={BookMarked}
        title={
          trimmedSearch || topicFilter !== "all"
            ? "No matching TOEIC words"
            : "TOEIC catalog is empty"
        }
        description={
          trimmedSearch || topicFilter !== "all"
            ? "Try a different search or topic."
            : "Run the database seed to load the curated TOEIC vocabulary list."
        }
      />
    );
  }

  function pageHref(nextPage: number) {
    const params = new URLSearchParams();
    if (trimmedSearch) params.set("search", trimmedSearch);
    if (topicFilter !== "all") params.set("topic", topicFilter);
    if (nextPage > 1) params.set("page", String(nextPage));
    const qs = params.toString();
    return qs ? `/vocabulary/toeic?${qs}` : "/vocabulary/toeic";
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        {total} word{total === 1 ? "" : "s"}
        {topicFilter !== "all" ? ` · ${toeicTopicLabel(topicFilter)}` : ""}
        {trimmedSearch ? ` matching “${trimmedSearch}”` : ""} · page {currentPage} of{" "}
        {totalPages}
      </p>

      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <section key={group.topicKey} className="space-y-3" aria-labelledby={`toeic-topic-${group.topicKey}`}>
            <h2
              id={`toeic-topic-${group.topicKey}`}
              className="text-sm font-semibold tracking-tight"
            >
              {group.label}
              <span className="ml-2 font-normal text-muted-foreground">
                ({group.items.length})
              </span>
            </h2>
            <ul className="flex flex-col gap-3">
              {group.items.map((item) => (
                <li key={item.id}>
                  <VocabularyItem
                    vocabulary={item}
                    actions={
                      <SaveVocabularyButton
                        vocabularyId={item.id}
                        isSaved={item.isSaved}
                      />
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          className="flex items-center justify-between gap-3"
          aria-label="TOEIC vocabulary pages"
        >
          {currentPage > 1 ? (
            <Button asChild variant="outline" size="sm">
              <Link href={pageHref(currentPage - 1)}>Previous</Link>
            </Button>
          ) : (
            <span />
          )}
          {currentPage < totalPages ? (
            <Button asChild variant="outline" size="sm">
              <Link href={pageHref(currentPage + 1)}>Next</Link>
            </Button>
          ) : (
            <span />
          )}
        </nav>
      ) : null}

      <aside className="rounded-lg border bg-muted/40 p-4 text-xs leading-relaxed text-muted-foreground">
        <p className="font-medium text-foreground">Source</p>
        <p className="mt-1">{TOEIC_TSL_ATTRIBUTION.attributionText}</p>
        <p className="mt-2">
          <a
            href={TOEIC_TSL_ATTRIBUTION.url}
            className="underline underline-offset-2 hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            {TOEIC_TSL_ATTRIBUTION.name}
          </a>
          {" · "}
          CC BY-SA 4.0 · {VOCABULARY_PAGE_SIZE} per page
        </p>
      </aside>
    </div>
  );
}

function groupByTopic(items: ToeicCatalogItem[]) {
  const groups: { topicKey: string; label: string; items: ToeicCatalogItem[] }[] = [];

  for (const item of items) {
    const topicKey = item.topic ?? "other";
    const last = groups[groups.length - 1];
    if (last && last.topicKey === topicKey) {
      last.items.push(item);
      continue;
    }
    groups.push({
      topicKey,
      label: toeicTopicLabel(item.topic),
      items: [item],
    });
  }

  return groups;
}
