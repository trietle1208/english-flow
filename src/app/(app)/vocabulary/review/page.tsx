import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { FlashcardSession } from "@/features/vocabulary/components/FlashcardSession";
import { getFlashcardDueInfo, listFlashcardSession } from "@/features/vocabulary/queries";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Flashcards",
};

/**
 * Vocabulary flashcard study session (v2 light SRS). Due cards only —
 * Again reschedules now; Good steps 1 → 3 → 7 days.
 */
export default async function VocabularyReviewPage() {
  const user = await requireUser();
  const [cards, dueInfo] = await Promise.all([
    listFlashcardSession(user.id),
    getFlashcardDueInfo(user.id),
  ]);
  const sessionKey = cards.map((card) => card.id).join("-") || "empty";

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Flashcards"
        description="Flip each card, then tap Again (due now) or Good (1 → 3 → 7 days). Up to 20 due words per round."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/vocabulary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              My Vocabulary
            </Link>
          </Button>
        }
      />

      <FlashcardSession key={sessionKey} cards={cards} dueInfo={dueInfo} />
    </div>
  );
}
