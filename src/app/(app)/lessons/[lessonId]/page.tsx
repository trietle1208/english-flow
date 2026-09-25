import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LessonBlockRenderer } from "@/features/lessons/components/LessonBlockRenderer";
import { LessonFooterNav } from "@/features/lessons/components/LessonFooterNav";
import { LessonHeader } from "@/features/lessons/components/LessonHeader";
import { LessonStudySession } from "@/features/lessons/components/LessonStudySession";
import { markLessonInProgress } from "@/features/lessons/progress";
import { getLessonAccess, getLessonDetail, getLessonTitle } from "@/features/lessons/queries";
import { logger } from "@/lib/logger";
import { requireUser } from "@/lib/session";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const title = await getLessonTitle(lessonId);

  if (!title) {
    const t = await getTranslations("lessons");
    return { title: t("notFound") };
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

  // Independent after the gate: marking `in_progress` never touches a
  // `completed` row, so it can't change the `isCompleted` read below. A
  // failed progress write must not break the page — log it and render.
  const [lesson] = await Promise.all([
    getLessonDetail(lessonId, user.id),
    markLessonInProgress(user.id, lessonId).catch((error: unknown) => {
      logger.error("markLessonInProgress failed:", error);
    }),
  ]);
  if (!lesson) {
    notFound();
  }

  const isCompleted = lesson.progressStatus === "completed";

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
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
          savedVocabularyIds={lesson.savedVocabularyIds}
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
