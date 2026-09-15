"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useStudyHeartbeat } from "@/features/study-time/useStudyHeartbeat";
import { updateLessonProgress } from "../actions";

type LessonStudySessionProps = {
  lessonId: string;
  /** Skip progress writes once the lesson is already done. */
  isCompleted: boolean;
  children: ReactNode;
};

/**
 * Client island around lesson body: study-time heartbeat (AD-08) + scroll-based
 * `updateLessonProgress` while the learner reads.
 */
export function LessonStudySession({
  lessonId,
  isCompleted,
  children,
}: LessonStudySessionProps) {
  useStudyHeartbeat(true);
  const lastSentPercent = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCompleted) {
      return;
    }

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = el.offsetHeight;
      if (total <= 0) {
        return;
      }

      // How far through the lesson body we've scrolled (0–100).
      const scrolled = Math.min(
        100,
        Math.max(0, Math.round(((viewport - rect.top) / (total + viewport)) * 100)),
      );

      // Throttle writes: only when percent jumps by ≥10.
      if (scrolled >= lastSentPercent.current + 10) {
        lastSentPercent.current = scrolled;
        void updateLessonProgress(lessonId, Math.min(99, scrolled));
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lessonId, isCompleted]);

  return <div ref={containerRef}>{children}</div>;
}
