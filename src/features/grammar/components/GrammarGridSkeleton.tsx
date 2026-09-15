import { Skeleton } from "@/components/ui/skeleton";

export function GrammarGridSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-hidden="true">
      {[0, 1].map((section) => (
        <div key={section} className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
