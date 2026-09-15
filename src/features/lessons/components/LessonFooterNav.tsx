"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { completeLesson } from "../actions";

type LessonFooterNavProps = {
  lessonId: string;
  courseId: string;
  previousLessonId: string | null;
  nextLessonId: string | null;
  isCompleted: boolean;
};

/**
 * Previous / Next (or "Back to course" on the last lesson) + Mark as complete.
 */
export function LessonFooterNav({
  lessonId,
  courseId,
  previousLessonId,
  nextLessonId,
  isCompleted,
}: LessonFooterNavProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [completed, setCompleted] = useState(isCompleted);

  const onComplete = () => {
    startTransition(async () => {
      const result = await completeLesson(lessonId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setCompleted(true);
      toast.success("Lesson marked as complete.");
      router.refresh();
    });
  };

  return (
    <footer className="flex flex-col gap-4 border-t pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {previousLessonId ? (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href={`/lessons/${previousLessonId}`}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Previous lesson
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full sm:w-auto">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Previous lesson
          </Button>
        )}

        {nextLessonId ? (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href={`/lessons/${nextLessonId}`}>
              Next lesson
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href={`/courses/${courseId}`}>
              Back to course
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>

      <Button
        type="button"
        onClick={onComplete}
        disabled={pending || completed}
        className="w-full sm:w-auto sm:self-end"
      >
        <Check className="size-4" aria-hidden="true" />
        {completed ? "Completed" : pending ? "Saving…" : "Mark as complete"}
      </Button>
    </footer>
  );
}
