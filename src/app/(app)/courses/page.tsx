import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Courses",
};

/**
 * Phase 05 placeholder so the sidebar/mobile nav has no dead link. Phase 07
 * builds the real catalog (search, CEFR-level filter, per-course progress).
 */
export default function CoursesPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Courses"
        description="Browse courses by CEFR level and pick up where you left off."
      />
      <EmptyState
        icon={BookOpen}
        title="Coming in the next phase"
        description="Course listing, level filtering and per-course progress arrive in Phase 07."
      />
    </div>
  );
}
