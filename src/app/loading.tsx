import { Skeleton } from "@/components/ui/skeleton";

/**
 * Root-level fallback while a page outside `(app)` (e.g. `(marketing)`,
 * `(auth)`) suspends on data. `(app)/loading.tsx` covers the authenticated
 * shell with a richer, shape-matched skeleton.
 */
export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Skeleton className="h-8 w-40" />
    </div>
  );
}
