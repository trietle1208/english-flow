import { Skeleton } from "@/components/ui/skeleton";
import { ListeningGridSkeleton } from "@/features/listening/components/ListeningGridSkeleton";

export default function ListeningLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-80" />
      </div>
      <ListeningGridSkeleton />
    </div>
  );
}
