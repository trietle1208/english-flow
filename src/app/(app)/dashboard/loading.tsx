import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardContinueSkeleton,
  DashboardSkillsSkeleton,
  DashboardStatSkeleton,
} from "@/features/dashboard/components/DashboardSkeletons";

export default function DashboardLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <DashboardStatSkeleton />
        <DashboardStatSkeleton />
      </div>
      <DashboardContinueSkeleton />
      <DashboardSkillsSkeleton />
    </div>
  );
}
