import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Badge } from "@/components/ui/badge";
import { ListeningStudySession } from "@/features/listening/components/ListeningStudySession";
import {
  getListeningLessonDetail,
  getListeningLessonTitle,
} from "@/features/listening/queries";
import { QuizRunner } from "@/features/quiz/components/QuizRunner";
import { formatSecondsDuration } from "@/lib/format";
import { requireUser } from "@/lib/session";

type ListeningLessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

const DIFFICULTY_LABEL = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
} as const;

export async function generateMetadata({
  params,
}: ListeningLessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const title = await getListeningLessonTitle(lessonId);
  return { title: title ?? "Listening lesson" };
}

/**
 * Listening lesson detail (spec §18): header, player, transcript, questions.
 */
export default async function ListeningLessonPage({ params }: ListeningLessonPageProps) {
  const user = await requireUser();
  const { lessonId } = await params;
  const lesson = await getListeningLessonDetail(lessonId, user.id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <PageHeader title={lesson.title} />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{DIFFICULTY_LABEL[lesson.difficulty]}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" />
            {formatSecondsDuration(lesson.durationSeconds)}
          </span>
          {lesson.isCompleted ? (
            <Badge variant="outline" className="gap-1 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              Completed
            </Badge>
          ) : null}
        </div>
      </div>

      <ListeningStudySession
        title={lesson.title}
        audioUrl={lesson.audioUrl}
        transcript={lesson.transcript}
      >
        {lesson.quiz ? (
          <SectionCard title="Comprehension questions" description={lesson.quiz.title}>
            <QuizRunner
              quiz={lesson.quiz}
              returnTo={`/listening/${lesson.id}`}
              revalidatePaths={[`/listening/${lesson.id}`, "/listening"]}
            />
          </SectionCard>
        ) : (
          <SectionCard title="Comprehension questions">
            <p className="text-sm text-muted-foreground">
              Questions for this lesson are not available yet.
            </p>
          </SectionCard>
        )}
      </ListeningStudySession>
    </div>
  );
}
