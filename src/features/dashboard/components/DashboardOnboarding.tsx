import Link from "next/link";
import { Compass, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Shown instead of empty zero-stats when the user has no activity yet
 * (Phase 12 acceptance: no NaN / bare "0%").
 */
export function DashboardOnboarding() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-muted">
            <Compass className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <CardTitle className="text-base">Take the placement test</CardTitle>
          <CardDescription>
            A short quiz estimates your CEFR level so courses and lessons match where you are.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/placement-test">Start placement test</Link>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-muted">
            <GraduationCap className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <CardTitle className="text-base">Start your first course</CardTitle>
          <CardDescription>
            Browse the catalog and begin Everyday English — or pick any course at your level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/courses">Browse courses</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
