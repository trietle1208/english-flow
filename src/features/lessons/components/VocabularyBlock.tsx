import { getTranslations } from "next-intl/server";
import { VocabularyItem } from "@/features/vocabulary/components/VocabularyItem";
import { SaveVocabularyButton } from "@/features/vocabulary/components/SaveVocabularyButton";
import type { VocabularySummary } from "../types";

type VocabularyBlockProps = {
  vocabularyIds: string[];
  vocabulariesById: Record<string, VocabularySummary>;
  /** Vocabulary ids the current user has already saved. */
  savedVocabularyIds: Set<string>;
};

export async function VocabularyBlock({
  vocabularyIds,
  vocabulariesById,
  savedVocabularyIds,
}: VocabularyBlockProps) {
  const t = await getTranslations("lessons");

  const items = vocabularyIds
    .map((id) => vocabulariesById[id])
    .filter((item): item is VocabularySummary => Boolean(item));

  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="lesson-vocabulary-heading" className="space-y-3">
      <h2 id="lesson-vocabulary-heading" className="text-sm font-semibold tracking-tight">
        {t("vocabulary")}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((vocabulary) => (
          <li key={vocabulary.id}>
            <VocabularyItem
              vocabulary={vocabulary}
              actions={
                <SaveVocabularyButton
                  vocabularyId={vocabulary.id}
                  isSaved={savedVocabularyIds.has(vocabulary.id)}
                />
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
