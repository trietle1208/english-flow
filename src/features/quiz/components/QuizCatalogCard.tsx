"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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
import {
  quizDisplayDescription,
  quizDisplayTitle,
  quizSourceLabel,
} from "../catalog";
import type { QuizListItem } from "../types";

type QuizCatalogCardProps = {
  quiz: QuizListItem;
};

export function QuizCatalogCard({ quiz }: QuizCatalogCardProps) {
  const t = useTranslations("quiz");
  const sourceKey = quizSourceLabel(quiz.slug);
  const source =
    sourceKey === "Practice set"
      ? t("practiceSet")
      : sourceKey === "Course"
        ? t("course")
        : null;
  const title = quizDisplayTitle(quiz.title, quiz.kind);
  const rawDescription = quizDisplayDescription(quiz.description, quiz.title, quiz.kind);
  const description = /^Practice words in /.test(rawDescription)
    ? t("practiceIn", { title: quizDisplayTitle(quiz.title, quiz.kind) })
    : rawDescription;

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-2">
        {source ? (
          <Badge variant="outline" className="w-fit">
            {source}
          </Badge>
        ) : null}
        <div className="space-y-1.5">
          <CardTitle className="text-base leading-snug">
            <Link href={`/quiz/${quiz.id}`} className="hover:underline">
              {title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="text-xs text-muted-foreground">
          {t("questionCount", { count: quiz.questionCount })}
          <span aria-hidden="true"> · </span>
          {t("passScore", { score: quiz.passScore })}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="min-h-11 w-full">
          <Link href={`/quiz/${quiz.id}`}>{t("startQuiz")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
