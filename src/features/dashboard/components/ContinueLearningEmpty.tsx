import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** When the learner has activity but nothing left to continue. */
export function ContinueLearningEmpty() {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-muted">
          <GraduationCap className="size-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <CardTitle className="text-base">You&apos;re all caught up</CardTitle>
        <CardDescription>
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
