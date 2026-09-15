import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { startLessonProgress } from "@/features/lessons/actions";
import { LessonBlockRenderer } from "@/features/lessons/components/LessonBlockRenderer";
import { LessonFooterNav } from "@/features/lessons/components/LessonFooterNav";
import { LessonHeader } from "@/features/lessons/components/LessonHeader";
import { LessonStudySession } from "@/features/lessons/components/LessonStudySession";
import { getLessonAccess, getLessonDetail, getLessonTitle } from "@/features/lessons/queries";
import { getSavedVocabularyIds } from "@/features/vocabulary/queries";
import { requireUser } from "@/lib/session";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const title = await getLessonTitle(lessonId);

  if (!title) {
    return { title: "Lesson not found" };
  }

  return { title };
}

/**
 * Lesson experience (spec §12 / Phase 08): unlock gate, block content,
 * progress + study-time heartbeat, mark complete.
 */
export default async function LessonPage({ params }: LessonPageProps) {
  const user = await requireUser();
  const { lessonId } = await params;
  const access = await getLessonAccess(lessonId, user.id);

  if (access.kind === "not_found") {
    notFound();
  }

  if (access.kind === "locked") {
    redirect(`/courses/${access.courseId}`);
  }

  await startLessonProgress(lessonId);

  const lesson = await getLessonDetail(lessonId, user.id);
  if (!lesson) {
    notFound();
  }

  const savedVocabularyIds = await getSavedVocabularyIds(
    user.id,
    Object.keys(lesson.vocabulariesById),
  );

  const isCompleted = lesson.progressStatus === "completed";

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <LessonHeader
        courseId={lesson.courseId}
        courseTitle={lesson.courseTitle}
        lessonTitle={lesson.title}
        lessonNumber={lesson.lessonNumber}
        lessonCount={lesson.lessonCount}
      />

      <LessonStudySession lessonId={lesson.id} isCompleted={isCompleted}>
        <LessonBlockRenderer
          blocks={lesson.blocks}
          vocabulariesById={lesson.vocabulariesById}
          listeningTitlesById={lesson.listeningTitlesById}
          savedVocabularyIds={savedVocabularyIds}
          lessonPath={`/lessons/${lesson.id}`}
        />
      </LessonStudySession>

      <LessonFooterNav
        lessonId={lesson.id}
        courseId={lesson.courseId}
        previousLessonId={lesson.previousLessonId}
        nextLessonId={lesson.nextLessonId}
        isCompleted={isCompleted}
      />
    </div>
  );
}
