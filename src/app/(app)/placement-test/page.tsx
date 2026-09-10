import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Placement test",
};

/**
 * Phase 04 placeholder, landed on right after registration. The real 20-
 * question CEFR placement test (spec §8) is built in Phase 11 — for now this
 * just gives the "Skip for now" escape hatch the task list asks for so
 * onboarding isn't a dead end.
 */
export default function PlacementTestPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Find your level</CardTitle>
          <CardDescription>
            A short placement test to set your starting CEFR level is coming in a later phase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">Skip for now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
