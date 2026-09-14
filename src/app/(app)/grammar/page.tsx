import type { Metadata } from "next";
import { SpellCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Grammar",
};

/**
 * Phase 05 placeholder so the sidebar/mobile nav has no dead link. Phase 10
 * builds the real grammar topic list, explanations and practice exercises.
 */
export default function GrammarPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Grammar" description="Grammar topics with explanations and practice." />
      <EmptyState
        icon={SpellCheck}
        title="Coming in the next phase"
        description="Grammar topics, explanations and practice exercises arrive in Phase 10."
      />
    </div>
  );
}
