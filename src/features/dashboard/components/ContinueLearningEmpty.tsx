import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** When the learner has activity but nothing left to continue. */
export function ContinueLearningEmpty() {
  return (
    <Card className="overflow-hidden border-primary/10 bg-gradient-to-br from-primary/[0.06] via-card to-card">
      <CardHeader className="pb-3">
        <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <GraduationCap className="size-5" aria-hidden="true" />
        </div>
        <CardTitle className="text-lg">You&apos;re all caught up</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          No lesson in progress. Browse courses to start the next one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/courses">Browse courses</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
