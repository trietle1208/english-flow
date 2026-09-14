import type { Metadata } from "next";
import { BookMarked } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Vocabulary",
};

/**
 * Phase 05 placeholder so the sidebar/mobile nav has no dead link. Phase 09
 * builds save/remove/learned actions plus search/filter/sort here.
 */
export default function VocabularyPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Vocabulary"
        description="Words you've saved from lessons, with search, filter and sort."
      />
      <EmptyState
        icon={BookMarked}
        title="Coming in the next phase"
        description="Your personal vocabulary list — save, mark as learned, search and filter — arrives in Phase 09."
      />
    </div>
  );
}
