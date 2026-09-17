import { Skeleton } from "@/components/ui/skeleton";

export default function GrammarPracticeLoading() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="space-y-4" aria-hidden="true">
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
