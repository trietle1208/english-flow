"use client";

import Link from "next/link";
import { ArrowLeft, PencilLine } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { QuizRunner } from "@/features/quiz/components/QuizRunner";
import type { ExerciseForLearner } from "../learner";
import type { GrammarExampleView, GrammarRuleView } from "../types";

type GrammarPracticeRunnerProps = {
  slug: string;
  titleVi: string;
  quiz: ExerciseForLearner | null;
  rules: GrammarRuleView[];
  examples: GrammarExampleView[];
};

/**
 * Practice route client shell: ExerciseForLearner → QuizRunner (practiceMode).
 * Wrong answers show related rule + sample example (Prompt 3).
 */
export function GrammarPracticeRunner({
  slug,
  titleVi,
  quiz,
  rules,
  examples,
}: GrammarPracticeRunnerProps) {
  const topicHref = `/grammar/${slug}`;

  if (!quiz || quiz.questions.length === 0) {
    return (
      <EmptyState
        icon={PencilLine}
        title="Chưa có bài tập"
        description={`Chủ điểm “${titleVi}” chưa có câu hỏi luyện tập.`}
        action={
          <Button asChild variant="outline" className="min-h-11">
            <Link href={topicHref}>Quay lại chủ điểm</Link>
          </Button>
        }
      />
    );
  }

  const relatedRule = rules[0]
    ? {
        title: rules[0].titleVi,
        pattern: rules[0].pattern,
        explanation: rules[0].explanationVi,
      }
    : undefined;
  const sampleExample = examples[0]
    ? {
        sentenceEn: examples[0].sentenceEn,
        sentenceVi: examples[0].sentenceVi,
      }
    : undefined;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="min-h-11 -ml-2 gap-1.5 px-2">
        <Link href={topicHref}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Quay lại {titleVi}
        </Link>
      </Button>

      <QuizRunner
        quiz={quiz}
        practiceMode
        practiceQuestionLimit={quiz.questions.length}
        hideTitle
        enableHeartbeat={false}
        redirectOnComplete={false}
        practiceWrongHint={{ relatedRule, sampleExample }}
        labels={GRAMMAR_PRACTICE_LABELS}
      />
    </div>
  );
}

const GRAMMAR_PRACTICE_LABELS = {
  checkAnswer: "Kiểm tra",
  next: "Câu tiếp",
  previous: "Câu trước",
  finish: "Xem kết quả",
  submit: "Nộp bài",
  correct: "Đúng",
  incorrect: "Sai",
  correctAnswer: "Đáp án đúng: ",
  selectAnswer: "Hãy chọn hoặc nhập đáp án trước.",
  tip: "Mẹo: nhấn 1–4 để chọn, Enter để tiếp tục.",
  checking: "Đang chấm…",
  submitting: "Đang nộp…",
  practiceCompleteTitle: "Hoàn thành bài luyện",
  practiceTryAgain: "Làm lại",
  noQuestions: "Chưa có câu hỏi.",
  relatedRuleHeading: "Quy tắc liên quan",
  sampleExampleHeading: "Ví dụ mẫu",
  answerEveryQuestion: "Hãy trả lời hết các câu trước khi nộp.",
  drillCompleteBody:
    "Bài luyện này chưa ghi điểm Mastered — dùng Mini quiz trên trang chủ điểm khi muốn lưu tiến độ.",
} as const;
