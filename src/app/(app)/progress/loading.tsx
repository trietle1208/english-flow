import { Skeleton } from "@/components/ui/skeleton";

export default function ProgressLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[112px] w-full rounded-xl" />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="h-[280px] w-full rounded-xl" />
        <Skeleton className="h-[280px] w-full rounded-xl" />
      </div>
    </div>
  );
}
