import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route-level loading UI while `/vocabulary/review` loads the deck.
 */
export default function VocabularyReviewLoading() {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="min-h-[18rem] w-full rounded-xl" />
        <Skeleton className="mx-auto h-4 w-56" />
      </div>
    </div>
  );
}
