import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStatSkeleton() {
  return <Skeleton className="h-[220px] w-full rounded-xl" />;
}

export function DashboardContinueSkeleton() {
  return <Skeleton className="h-[280px] w-full rounded-xl" />;
}

export function DashboardSkillsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
      ))}
    </div>
  );
}

export function DashboardSectionSkeleton() {
  return <Skeleton className="h-[280px] w-full rounded-xl" />;
}
