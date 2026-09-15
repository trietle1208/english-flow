import { CoursesGridSkeleton } from "@/features/courses/components/CoursesGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route-level loading UI while `/courses` suspends on data (filter changes
 * and first paint). Mirrors the catalog layout so the transition stays calm.
 */
export default function CoursesLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-9 w-full sm:max-w-sm" />
        <Skeleton className="h-9 w-full sm:w-[220px]" />
        <Skeleton className="h-9 w-full sm:w-[200px]" />
      </div>
      <CoursesGridSkeleton />
    </div>
  );
}
