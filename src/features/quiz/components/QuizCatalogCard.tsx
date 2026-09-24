import Link from "next/link";
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
  const source = quizSourceLabel(quiz.slug);
  const title = quizDisplayTitle(quiz.title, quiz.kind);
  const description = quizDisplayDescription(quiz.description, quiz.title, quiz.kind);

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
          {quiz.questionCount} {quiz.questionCount === 1 ? "question" : "questions"}
          <span aria-hidden="true"> · </span>
          Pass {quiz.passScore}%
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="min-h-11 w-full">
          <Link href={`/quiz/${quiz.id}`}>Start quiz</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
