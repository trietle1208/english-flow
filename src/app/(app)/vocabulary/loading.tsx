import { Skeleton } from "@/components/ui/skeleton";
import { VocabularyGridSkeleton } from "@/features/vocabulary/components/VocabularyGridSkeleton";

/**
 * Route-level loading UI while `/vocabulary` suspends on data.
 */
export default function VocabularyLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-9 w-full sm:max-w-sm" />
        <Skeleton className="h-9 w-full sm:w-[200px]" />
      </div>
      <VocabularyGridSkeleton />
    </div>
  );
}
