import { Skeleton } from "@/components/ui/skeleton";

/** Filter-change fallback for the My Vocabulary Suspense boundary. */
export function VocabularyGridSkeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="h-full min-h-[17.5rem] rounded-lg border p-4">
          <div className="flex h-full flex-col space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="mt-auto flex gap-2 pt-2">
              <Skeleton className="size-9" />
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
