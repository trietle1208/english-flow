import type { CefrLevel } from "@/config/cefr";
import type { skillEnum } from "@/db/schema/enums";

export type Skill = (typeof skillEnum.enumValues)[number];

/** Progress status shown on a lesson row in course detail (spec §11). */
export type LessonListStatus = "completed" | "current" | "locked";

export type CourseListItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: CefrLevel;
  category: string;
  lessonCount: number;
  estimatedMinutes: number;
  coverColor: string;
  /** Completed lesson count — aggregated in SQL, not in JS (Phase 07). */
  completedLessons: number;
  progressPercent: number;
  /** First incomplete lesson (by order), or `null` when the course is fully done. */
  continueLessonId: string | null;
};

export type CourseLessonItem = {
  id: string;
  title: string;
  skill: Skill;
  estimatedMinutes: number;
  orderIndex: number;
  status: LessonListStatus;
};

export type CourseDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: CefrLevel;
  category: string;
  lessonCount: number;
  estimatedMinutes: number;
  coverColor: string;
  completedLessons: number;
  progressPercent: number;
  continueLessonId: string | null;
  lessons: CourseLessonItem[];
};

export type CourseListFilters = {
  search?: string;
  level?: CefrLevel;
  category?: string;
  page?: number;
};
