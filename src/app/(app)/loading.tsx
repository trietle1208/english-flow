import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown while a page under `(app)` suspends on data (spec §33 "Loading
 * state"). Shape-matches the common page layout — `PageHeader` + a card
 * grid — so it doesn't flash a jarring, unrelated layout; individual routes
 * can still add a more specific `loading.tsx` once they fetch real data.
 */
export default function AppLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
