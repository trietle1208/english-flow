import Link from "next/link";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { CEFR_LEVEL_LABELS, isCefrLevel, type CefrLevel } from "@/config/cefr";
import { listCourses } from "../queries";
import { CourseCard } from "./CourseCard";

type CourseListProps = {
  userId: string;
  search?: string;
  level?: string;
  category?: string;
  page?: string;
  /** From placement test / profile — surfaces a recommendation banner. */
  recommendedLevel?: CefrLevel | null;
};

/**
 * Server Component that fetches the filtered catalog. Wrapped in `<Suspense>`
 * with a key derived from searchParams so filter changes show the skeleton.
 */
export async function CourseList({
  userId,
  search,
  level,
  category,
  page,
  recommendedLevel,
}: CourseListProps) {
  const parsedLevel = level && isCefrLevel(level) ? level : undefined;
  const parsedPage = page ? Number.parseInt(page, 10) : 1;

  const { courses } = await listCourses({
    userId,
    search,
    level: parsedLevel,
    category: category || undefined,
    page: Number.isFinite(parsedPage) ? parsedPage : 1,
  });

  const showRecommendation =
    recommendedLevel && !parsedLevel && !search && !category;

  // When recommending, put matching-level courses first without hiding others.
  const ordered =
    showRecommendation
      ? [
          ...courses.filter((c) => c.level === recommendedLevel),
          ...courses.filter((c) => c.level !== recommendedLevel),
        ]
      : courses;

  if (courses.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No courses match your filters."
        description="Try a different search, level, or category."
        action={
          <Button asChild variant="outline">
            <Link href="/courses">Clear filters</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {showRecommendation ? (
        <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
          <p>
            Recommended for your level{" "}
            <span className="font-medium">
              {recommendedLevel} ({CEFR_LEVEL_LABELS[recommendedLevel]})
            </span>
            .{" "}
            <Link
              href={`/courses?level=${recommendedLevel}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Show {recommendedLevel} courses only
            </Link>
          </p>
        </div>
      ) : null}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </div>
  );
}
