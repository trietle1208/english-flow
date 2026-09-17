import { Skeleton } from "@/components/ui/skeleton";
import { GrammarGridSkeleton } from "@/features/grammar/components/GrammarGridSkeleton";

export default function GrammarLoading() {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-80" />
      </div>
      <GrammarGridSkeleton />
    </div>
  );
}
