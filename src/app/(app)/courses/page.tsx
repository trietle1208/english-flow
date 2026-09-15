import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { isCefrLevel, type CefrLevel } from "@/config/cefr";
import { requireUser } from "@/lib/session";
import { CourseFilters } from "@/features/courses/components/CourseFilters";
import { CourseList } from "@/features/courses/components/CourseList";
import { CoursesGridSkeleton } from "@/features/courses/components/CoursesGridSkeleton";
import { listCourseCategories } from "@/features/courses/queries";

export const metadata: Metadata = {
  title: "Courses",
};

type CoursesPageProps = {
  searchParams: Promise<{
    search?: string;
    level?: string;
    category?: string;
    page?: string;
  }>;
};

/**
 * Course catalog (spec §10 / Phase 07). Filters live in the URL; the list is
 * a Server Component suspended behind a searchParams-keyed boundary so
 * changing filters shows the skeleton without client-fetching the catalog.
 * Phase 11: recommends courses matching `users.cefr_level` from placement.
 */
export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const user = await requireUser();
  const params = await searchParams;
  const categories = await listCourseCategories();

  const recommendedLevel: CefrLevel | null =
    typeof user.cefrLevel === "string" && isCefrLevel(user.cefrLevel)
      ? user.cefrLevel
      : null;

  const suspenseKey = [
    params.search ?? "",
    params.level ?? "",
    params.category ?? "",
    params.page ?? "1",
  ].join("|");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Courses"
        description="Browse courses by CEFR level and pick up where you left off."
      />

      <Suspense
        fallback={
          <div className="flex flex-col gap-3 sm:flex-row" aria-hidden="true">
            <div className="h-9 w-full rounded-md bg-muted sm:max-w-sm" />
            <div className="h-9 w-full rounded-md bg-muted sm:w-[220px]" />
            <div className="h-9 w-full rounded-md bg-muted sm:w-[200px]" />
          </div>
        }
      >
        <CourseFilters categories={categories} />
      </Suspense>

      <Suspense key={suspenseKey} fallback={<CoursesGridSkeleton />}>
        <CourseList
          userId={user.id}
          search={params.search}
          level={params.level}
          category={params.category}
          page={params.page}
          recommendedLevel={recommendedLevel}
        />
      </Suspense>
    </div>
  );
}
