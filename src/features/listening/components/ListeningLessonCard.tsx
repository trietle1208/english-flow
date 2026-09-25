"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CheckCircle2, Clock, Headphones } from "lucide-react";
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
import { formatSecondsDuration } from "@/lib/format";
import type { ListeningLessonListItem } from "../types";

type ListeningLessonCardProps = {
  lesson: ListeningLessonListItem;
};

export function ListeningLessonCard({ lesson }: ListeningLessonCardProps) {
  const t = useTranslations("listening");
  const tCommon = useTranslations("common");

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{t(lesson.difficulty)}</Badge>
          {lesson.isCompleted ? (
            <Badge variant="outline" className="gap-1 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              {t("completed")}
            </Badge>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-base">
            <Link href={`/listening/${lesson.id}`} className="hover:underline">
              {lesson.title}
            </Link>
          </CardTitle>
          <CardDescription className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {formatSecondsDuration(lesson.durationSeconds)}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Headphones className="size-3.5" aria-hidden="true" />
          {t("audioAndQuiz")}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={lesson.isCompleted ? "outline" : "default"}>
          <Link href={`/listening/${lesson.id}`}>
            {lesson.isCompleted ? tCommon("review") : t("startListening")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
