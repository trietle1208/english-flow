import { Skeleton } from "@/components/ui/skeleton";

export default function LessonLoading() {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-2 w-full" />
      </div>
      <Skeleton className="h-24 w-full rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-between">
        <Skeleton className="h-9 w-full sm:w-40" />
        <Skeleton className="h-9 w-full sm:w-36" />
      </div>
    </div>
  );
}
