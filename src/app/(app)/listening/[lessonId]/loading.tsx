import { Skeleton } from "@/components/ui/skeleton";

export default function ListeningLessonLoading() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-6 w-40" />
      </div>
      <Skeleton className="h-36 w-full rounded-xl" />
      <Skeleton className="h-11 w-40" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
