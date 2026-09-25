"use client";

import { useTranslations } from "next-intl";
import { ListChecks } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { groupQuizzesByKind } from "../catalog";
import type { QuizCatalogKind, QuizListItem } from "../types";
import { QuizCatalogCard } from "./QuizCatalogCard";

type QuizCatalogProps = {
  quizzes: QuizListItem[];
  filtered: boolean;
};

const KIND_LABEL_KEYS: Record<QuizCatalogKind, "kindVocabulary" | "kindToeic" | "kindGrammar" | "kindListening"> = {
  vocabulary: "kindVocabulary",
  toeic: "kindToeic",
  grammar: "kindGrammar",
  listening: "kindListening",
};

const KIND_BLURB_KEYS: Record<QuizCatalogKind, "blurbVocabulary" | "blurbToeic" | "blurbGrammar" | "blurbListening"> = {
  vocabulary: "blurbVocabulary",
  toeic: "blurbToeic",
  grammar: "blurbGrammar",
  listening: "blurbListening",
};

export function QuizCatalog({ quizzes, filtered }: QuizCatalogProps) {
  const t = useTranslations("quiz");

  if (quizzes.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title={filtered ? t("emptyFilter") : t("emptyAll")}
        description={filtered ? t("emptyFilterDescription") : t("emptyAllDescription")}
      />
    );
  }

  const groups = groupQuizzesByKind(quizzes);

  return (
    <div className="flex flex-col gap-10">
      {groups.map(({ kind, items }) => (
        <QuizCatalogSection key={kind} kind={kind} items={items} />
      ))}
    </div>
  );
}

function QuizCatalogSection({
  kind,
  items,
}: {
  kind: QuizCatalogKind;
  items: QuizListItem[];
}) {
  const t = useTranslations("quiz");

  return (
    <section aria-labelledby={`quiz-kind-${kind}`} className="space-y-4">
      <div className="space-y-1">
        <h2
          id={`quiz-kind-${kind}`}
          className="text-sm font-semibold tracking-tight text-muted-foreground"
        >
          {t(KIND_LABEL_KEYS[kind])}
          <span className="font-normal"> · {items.length}</span>
        </h2>
        <p className="text-sm text-muted-foreground">{t(KIND_BLURB_KEYS[kind])}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((quiz) => (
          <li key={quiz.id}>
            <QuizCatalogCard quiz={quiz} />
          </li>
        ))}
      </ul>
    </section>
  );
}
