import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CEFR_LEVEL_LABELS } from "@/config/cefr";
import { LessonListItem } from "@/features/courses/components/LessonListItem";
import { getCourseDetail, getCourseTitle } from "@/features/courses/queries";
import { formatDuration } from "@/lib/format";
import { requireUser } from "@/lib/session";

type CourseDetailPageProps = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { courseId } = await params;
  const title = await getCourseTitle(courseId);

  if (!title) {
    return { title: "Course not found" };
  }

  return { title };
}

/**
 * Course detail (spec §11): header with overall progress, Continue CTA, and
 * the numbered lesson list with Completed / Current / Locked states.
 */
export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const user = await requireUser();
  const { courseId } = await params;
  const course = await getCourseDetail(courseId, user.id);

  if (!course) {
    notFound();
  }

  const isComplete =
    course.lessonCount > 0 && course.completedLessons >= course.lessonCount;

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <PageHeader
          title={course.title}
          description={course.description}
          actions={
            course.continueLessonId ? (
              <Button asChild>
                <Link href={`/lessons/${course.continueLessonId}`}>
                  Continue
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : isComplete ? (
              <Button asChild variant="outline">
                <Link href={`/lessons/${course.lessons[0]?.id}`}>Review first lesson</Link>
              </Button>
            ) : null
          }
        />

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{CEFR_LEVEL_LABELS[course.level]}</Badge>
          <Badge variant="outline">{course.category}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="size-3.5" aria-hidden="true" />
            {course.lessonCount} {course.lessonCount === 1 ? "lesson" : "lessons"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" />
            {formatDuration(course.estimatedMinutes)}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall progress</span>
            <span className="font-medium tabular-nums">
              {course.completedLessons}/{course.lessonCount} · {course.progressPercent}%
            </span>
          </div>
          <Progress
            value={course.progressPercent}
            aria-label={`${course.progressPercent}% of course complete`}
          />
        </div>
      </div>

      <section className="space-y-3" aria-labelledby="lessons-heading">
        <h2 id="lessons-heading" className="text-sm font-semibold tracking-tight">
          Lessons
        </h2>
        <ul className="flex flex-col gap-2">
          {course.lessons.map((lesson) => (
            <li key={lesson.id}>
              <LessonListItem lesson={lesson} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
