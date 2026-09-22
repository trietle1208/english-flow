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
      <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/[0.08] via-card to-card">
        <CardHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Compass className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-lg">Take the placement test</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            A short quiz estimates your CEFR level so courses and lessons match where you are.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/placement-test">Start placement test</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="overflow-hidden border-secondary bg-gradient-to-br from-secondary/70 via-card to-card">
        <CardHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-lg">Start your first course</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
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
