import type { Metadata } from "next";
import { Headphones } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Listening",
};

/**
 * Phase 05 placeholder so the sidebar/mobile nav has no dead link. Phase 10
 * builds the real listening lessons, audio player and comprehension quizzes.
 */
export default function ListeningPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Listening"
        description="Practice listening comprehension with real audio and transcripts."
      />
      <EmptyState
        icon={Headphones}
        title="Coming in the next phase"
        description="Listening lessons, the audio player and comprehension questions arrive in Phase 10."
      />
    </div>
  );
}
