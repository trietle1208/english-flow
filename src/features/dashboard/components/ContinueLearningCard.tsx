import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDuration, formatLessonNumber } from "@/lib/format";
import type { ContinueLearningData } from "@/features/progress/types";

const SKILL_LABEL: Record<ContinueLearningData["skill"], string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  listening: "Listening",
  reading: "Reading",
  speaking: "Speaking",
};

type ContinueLearningCardProps = {
  data: ContinueLearningData;
};

/** Large Continue card pointing at the in-progress (or next) lesson (spec §9). */
export function ContinueLearningCard({ data }: ContinueLearningCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-2">
        <p className="text-sm text-muted-foreground">{data.courseTitle}</p>
        <CardTitle className="text-xl">
          Lesson {formatLessonNumber(data.lessonNumber - 1)} — {data.lessonTitle}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{SKILL_LABEL[data.skill]}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" />
            {formatDuration(data.estimatedMinutes)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Lesson progress</span>
          <span className="font-medium tabular-nums">{data.progressPercent}%</span>
        </div>
        <Progress
          value={data.progressPercent}
          aria-label={`Lesson ${data.progressPercent}% complete`}
        />
      </CardContent>
      <CardFooter>
        <Button asChild className="gap-2">
          <Link href={`/lessons/${data.lessonId}`}>
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
