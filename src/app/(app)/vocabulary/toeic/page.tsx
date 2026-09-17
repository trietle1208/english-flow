import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/session";
import { ToeicVocabularyCatalog } from "@/features/vocabulary/components/ToeicVocabularyCatalog";
import { ToeicVocabularySearch } from "@/features/vocabulary/components/ToeicVocabularySearch";

export const metadata: Metadata = {
  title: "Từ vựng TOEIC",
};

type ToeicVocabularyPageProps = {
  searchParams: Promise<{
    search?: string;
    topic?: string;
    page?: string;
  }>;
};

/**
 * Curated TOEIC catalog browse (MVP subset of TSL 1.1 lemmas with
 * EnglishFlow VI meanings / IPA / examples). Saving adds to My Vocabulary.
 */
export default async function ToeicVocabularyPage({ searchParams }: ToeicVocabularyPageProps) {
  const user = await requireUser();
  const params = await searchParams;

  const suspenseKey = `${params.search ?? ""}|${params.topic ?? "all"}|${params.page ?? "1"}`;

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Từ vựng TOEIC"
        description="Curated business English lemmas for TOEIC study — browse by topic and save into My Vocabulary."
        actions={
          <Button asChild variant="outline">
            <Link href="/vocabulary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              My Vocabulary
            </Link>
          </Button>
        }
      />

      <Suspense
        fallback={<div className="h-9 w-full rounded-md bg-muted sm:max-w-sm" aria-hidden="true" />}
      >
        <ToeicVocabularySearch />
      </Suspense>

      <Suspense
        key={suspenseKey}
        fallback={
          <div className="flex flex-col gap-3" aria-hidden="true">
            <div className="h-28 rounded-lg bg-muted" />
            <div className="h-28 rounded-lg bg-muted" />
            <div className="h-28 rounded-lg bg-muted" />
          </div>
        }
      >
        <ToeicVocabularyCatalog
          userId={user.id}
          search={params.search}
          topic={params.topic}
          page={params.page}
        />
      </Suspense>
    </div>
  );
}
