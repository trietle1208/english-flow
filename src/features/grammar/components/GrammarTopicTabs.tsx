"use client";

import Link from "next/link";
import { BookOpen, ListChecks, PencilLine } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizRunner } from "@/features/quiz/components/QuizRunner";
import type { GrammarTopicDetail } from "../types";
import { GrammarExamples } from "./GrammarExamples";
import { GrammarTheoryPanel } from "./GrammarTheoryPanel";

type GrammarTopicTabsProps = {
  topic: GrammarTopicDetail;
};

/**
 * Detail tabs: Lý thuyết | Ví dụ | Bài tập (Prompt 3).
 * Practice runs on `/grammar/[slug]/practice`; scored mini quiz stays here.
 */
export function GrammarTopicTabs({ topic }: GrammarTopicTabsProps) {
  const practiceHref = `/grammar/${topic.slug}/practice`;
  const returnTo = `/grammar/${topic.slug}`;
  const hasQuiz = Boolean(topic.quiz && topic.quiz.questions.length > 0);
  const confused = topic.related.filter((row) => row.relationType === "confused_with");

  return (
    <Tabs defaultValue="theory" className="gap-6">
      <TabsList className="grid h-auto w-full grid-cols-3 gap-1 sm:w-fit sm:grid-cols-none">
        <TabsTrigger value="theory" className="min-h-11 gap-1.5 px-3">
          <BookOpen className="size-4" aria-hidden="true" />
          Lý thuyết
        </TabsTrigger>
        <TabsTrigger value="examples" className="min-h-11 gap-1.5 px-3">
          <ListChecks className="size-4" aria-hidden="true" />
          Ví dụ
        </TabsTrigger>
        <TabsTrigger value="exercises" className="min-h-11 gap-1.5 px-3">
          <PencilLine className="size-4" aria-hidden="true" />
          Bài tập
        </TabsTrigger>
      </TabsList>

      <TabsContent value="theory" className="space-y-8">
        <GrammarTheoryPanel
          summary={topic.summary}
          lesson={topic.lesson}
          rules={topic.rules}
          mistakes={topic.mistakes}
        />

        {confused.length > 0 ? (
          <section aria-labelledby="grammar-confused-heading" className="space-y-2">
            <h2
              id="grammar-confused-heading"
              className="text-sm font-semibold tracking-tight"
            >
              Dễ nhầm với
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {confused.map((row) => (
                <li key={`${row.id}-${row.relationType}`}>
                  <Link
                    href={`/grammar/${row.slug}`}
                    className="font-medium text-foreground hover:underline"
                  >
                    {row.titleVi}
                  </Link>
                  <span className="ml-1 text-muted-foreground">({row.titleEn})</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </TabsContent>

      <TabsContent value="examples">
        <GrammarExamples items={topic.examples} />
      </TabsContent>

      <TabsContent value="exercises" className="space-y-6">
        {hasQuiz ? (
          <>
            <SectionCard
              title="Luyện tập từng câu"
              description="Một câu một màn hình, hiện đúng/sai ngay kèm giải thích tiếng Việt."
            >
              <Button asChild className="min-h-11 w-full sm:w-auto">
                <Link href={practiceHref}>Bắt đầu làm bài</Link>
              </Button>
            </SectionCard>

            <SectionCard
              title="Mini quiz (ghi điểm)"
              description={`${topic.quiz!.title} — lần nộp này cập nhật tiến độ Mastered.`}
            >
              <QuizRunner
                quiz={topic.quiz!}
                returnTo={returnTo}
                revalidatePaths={[returnTo, "/grammar", "/dashboard"]}
              />
            </SectionCard>
          </>
        ) : (
          <EmptyState
            icon={PencilLine}
            title="Chưa có bài tập"
            description="Chủ điểm này chưa có bài luyện. Quay lại sau hoặc chọn chủ điểm khác."
            action={
              <Button asChild variant="outline">
                <Link href="/grammar">Về danh sách ngữ pháp</Link>
              </Button>
            }
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
