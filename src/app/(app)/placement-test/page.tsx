import type { Metadata } from "next";
import { PlacementTestSession } from "@/features/placement-test/components/PlacementTestSession";
import { getPlacementTestForAttempt } from "@/features/placement-test/queries";
import { isCefrLevel, type CefrLevel } from "@/config/cefr";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Placement test",
};

/**
 * Optional CEFR placement test after registration (spec §8 / Phase 11).
 */
export default async function PlacementTestPage() {
  const user = await requireUser();
  const test = await getPlacementTestForAttempt();

  if (!test) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Placement test unavailable</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The placement test hasn&apos;t been seeded yet. You can skip and browse courses.
        </p>
      </div>
    );
  }

  const previousLevel: CefrLevel | null =
    typeof user.cefrLevel === "string" && isCefrLevel(user.cefrLevel)
      ? user.cefrLevel
      : null;

  return (
    <div className="flex w-full flex-col px-4 py-8 sm:px-6 lg:px-8">
      <PlacementTestSession test={test} previousLevel={previousLevel} />
    </div>
  );
}
