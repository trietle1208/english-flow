import Link from "next/link";
import { CheckCircle2, SpellCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CEFR_LEVEL_LABELS } from "@/config/cefr";
import type { GrammarTopicListItem } from "../types";

type GrammarTopicCardProps = {
  topic: GrammarTopicListItem;
};

/**
 * One grammar topic on `/grammar`: title, summary, CEFR badge, learned state.
 */
export function GrammarTopicCard({ topic }: GrammarTopicCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{CEFR_LEVEL_LABELS[topic.level]}</Badge>
          {topic.isCompleted ? (
            <Badge variant="outline" className="gap-1 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              Practiced
            </Badge>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-base">
            <Link href={`/grammar/${topic.id}`} className="hover:underline">
              {topic.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2">{topic.summary}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <SpellCheck className="size-3.5" aria-hidden="true" />
          Rules, examples & mini quiz
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={topic.isCompleted ? "outline" : "default"}>
          <Link href={`/grammar/${topic.id}`}>
            {topic.isCompleted ? "Review" : "Study"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
