import type { Metadata } from "next";
import { ListChecks } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Quiz",
};

/**
 * Phase 05 placeholder so the sidebar/mobile nav has no dead link. Quizzes
 * themselves live at `/quiz/[quizId]` (started from a lesson/grammar topic/
 * listening lesson); Phase 11 builds the shared `QuizRunner` engine those
 * routes use, plus whatever this index page ends up surfacing (recent/
 * available quizzes).
 */
export default function QuizPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Quiz" description="Test what you've learned." />
      <EmptyState
        icon={ListChecks}
        title="Coming in the next phase"
        description="The quiz engine — multiple choice, true/false and fill-in-the-blank — arrives in Phase 11."
      />
    </div>
  );
}
