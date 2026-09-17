import { Skeleton } from "@/components/ui/skeleton";

export default function QuizLoading() {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <Skeleton className="h-2 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  );
}
