import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardContinueSkeleton,
  DashboardSkillsSkeleton,
  DashboardStatSkeleton,
} from "@/features/dashboard/components/DashboardSkeletons";

export default function DashboardLoading() {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-[148px] w-full rounded-2xl" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardContinueSkeleton />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <DashboardStatSkeleton />
          <DashboardStatSkeleton />
        </div>
      </div>
      <DashboardSkillsSkeleton />
    </div>
  );
}
