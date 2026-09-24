import { ListChecks } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  QUIZ_CATALOG_KIND_BLURBS,
  QUIZ_CATALOG_KIND_LABELS,
  groupQuizzesByKind,
} from "../catalog";
import type { QuizCatalogKind, QuizListItem } from "../types";
import { QuizCatalogCard } from "./QuizCatalogCard";

type QuizCatalogProps = {
  quizzes: QuizListItem[];
  filtered: boolean;
};

export function QuizCatalog({ quizzes, filtered }: QuizCatalogProps) {
  if (quizzes.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title={filtered ? "No quizzes in this group" : "No quizzes yet"}
        description={
          filtered
            ? "Try another skill filter, or clear it to see the full catalog."
            : "Quizzes appear here once content is seeded."
        }
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
  return (
    <section aria-labelledby={`quiz-kind-${kind}`} className="space-y-4">
      <div className="space-y-1">
        <h2
          id={`quiz-kind-${kind}`}
          className="text-sm font-semibold tracking-tight text-muted-foreground"
        >
          {QUIZ_CATALOG_KIND_LABELS[kind]}
          <span className="font-normal"> · {items.length}</span>
        </h2>
        <p className="text-sm text-muted-foreground">{QUIZ_CATALOG_KIND_BLURBS[kind]}</p>
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
