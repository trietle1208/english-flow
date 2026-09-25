import { and, asc, count, eq, ilike, or, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "@/db";
import { courses, lessons, userProgress } from "@/db/schema";
import type { CefrLevel } from "@/config/cefr";
import type {
  CourseDetail,
  CourseLessonItem,
  CourseListFilters,
  CourseListItem,
  LessonListStatus,
} from "./types";

const PAGE_SIZE = 20;

type ListCoursesParams = CourseListFilters & {
  userId: string;
};

/**
 * Catalog query for `/courses`. Progress (`completedLessons`) is counted in
 * SQL against `user_progress` — never by loading every lesson into JS
 * (spec §32). Lesson bodies are not selected at all.
 */
export async function listCourses({
  userId,
  search,
  level,
  category,
  page = 1,
}: ListCoursesParams): Promise<{
  courses: CourseListItem[];
  page: number;
  pageSize: number;
  total: number;
}> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const where = buildCourseFilters({ search, level, category });

  // Correlated subqueries: reference the outer `courses` row with a literal
  // `courses.id`. Embedding `${courses.id}` expands to bare `"id"` and
  // becomes ambiguous once `lessons` is joined in the subquery.
  const completedLessonsSql = sql<number>`coalesce((
    select count(*)::int
    from user_progress
    inner join lessons on lessons.id = user_progress.lesson_id
    where lessons.course_id = courses.id
      and user_progress.user_id = ${userId}
      and user_progress.status = 'completed'
  ), 0)`;

  // First incomplete lesson by order — drives the Start/Continue CTA.
  const continueLessonIdSql = sql<string | null>`(
    select lessons.id
    from lessons
    left join user_progress
      on user_progress.lesson_id = lessons.id
     and user_progress.user_id = ${userId}
    where lessons.course_id = courses.id
      and (user_progress.status is null or user_progress.status <> 'completed')
    order by lessons.order_index asc
    limit 1
  )`;

  const [rows, totalRow] = await Promise.all([
    db
      .select({
        id: courses.id,
        slug: courses.slug,
        title: courses.title,
        description: courses.description,
        level: courses.level,
        category: courses.category,
        lessonCount: courses.lessonCount,
        estimatedMinutes: courses.estimatedMinutes,
        coverColor: courses.coverColor,
        completedLessons: completedLessonsSql,
        continueLessonId: continueLessonIdSql,
      })
      .from(courses)
      .where(where)
      .orderBy(asc(courses.sortOrder), asc(courses.title))
      .limit(PAGE_SIZE)
      .offset((safePage - 1) * PAGE_SIZE),
    db.select({ total: count() }).from(courses).where(where),
  ]);

  return {
    courses: rows.map((row) => {
      const completedLessons = Number(row.completedLessons);
      const lessonCount = row.lessonCount;
      return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description,
        level: row.level,
        category: row.category,
        lessonCount,
        estimatedMinutes: row.estimatedMinutes,
        coverColor: row.coverColor,
        completedLessons,
        progressPercent:
          lessonCount === 0 ? 0 : Math.round((completedLessons / lessonCount) * 100),
        continueLessonId: row.continueLessonId,
      };
    }),
    page: safePage,
    pageSize: PAGE_SIZE,
    total: totalRow[0]?.total ?? 0,
  };
}

/** Distinct categories for the filter dropdown (sorted). */
export async function listCourseCategories(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ category: courses.category })
    .from(courses)
    .orderBy(asc(courses.category));

  return rows.map((row) => row.category);
}

/**
 * Course detail + ordered lesson list with Completed / Current / Locked
 * status (spec §11). Only lesson metadata is loaded — not `content` JSONB.
 */
export async function getCourseDetail(
  courseId: string,
  userId: string,
): Promise<CourseDetail | null> {
  const [course] = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);

  if (!course) {
    return null;
  }

  const lessonRows = await db
    .select({
      id: lessons.id,
      title: lessons.title,
      skill: lessons.skill,
      estimatedMinutes: lessons.estimatedMinutes,
      orderIndex: lessons.orderIndex,
      progressStatus: userProgress.status,
    })
    .from(lessons)
    .leftJoin(
      userProgress,
      and(eq(userProgress.lessonId, lessons.id), eq(userProgress.userId, userId)),
    )
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.orderIndex));

  const resolved = resolveLessonStatuses(lessonRows);
  const completedLessons = resolved.filter((lesson) => lesson.status === "completed").length;
  const current = resolved.find((lesson) => lesson.status === "current");

  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    level: course.level,
    category: course.category,
    lessonCount: course.lessonCount,
    estimatedMinutes: course.estimatedMinutes,
    coverColor: course.coverColor,
    completedLessons,
    progressPercent:
      course.lessonCount === 0
        ? 0
        : Math.round((completedLessons / course.lessonCount) * 100),
    continueLessonId: current?.id ?? null,
    lessons: resolved,
  };
}

/** Lightweight metadata lookup for `generateMetadata` (no progress join). */
export async function getCourseTitle(courseId: string): Promise<string | null> {
  const [row] = await db
    .select({ title: courses.title })
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  return row?.title ?? null;
}

/**
 * Server-side unlock gate (spec §34 / Phase 07 acceptance): lesson `n` is
 * open when lesson `n-1` is completed; lesson 1 (`orderIndex === 0`) is
 * always open. Used by `/lessons/[lessonId]` so a locked URL cannot be
 * forced open from the address bar.
 *
 * One query: the previous lesson (unique on `course_id, order_index`) and
 * the learner's progress on it are left-joined onto the requested lesson, so
 * the gate costs a single DB round trip instead of two sequential ones.
 */
export async function getLessonAccess(
  lessonId: string,
  userId: string,
): Promise<
  | { kind: "not_found" }
  | { kind: "locked"; courseId: string; title: string }
  | { kind: "allowed"; courseId: string; title: string }
> {
  const previousLesson = alias(lessons, "previous_lesson");

  const [lesson] = await db
    .select({
      title: lessons.title,
      courseId: lessons.courseId,
      orderIndex: lessons.orderIndex,
      previousStatus: userProgress.status,
    })
    .from(lessons)
    .leftJoin(
      previousLesson,
      and(
        eq(previousLesson.courseId, lessons.courseId),
        eq(previousLesson.orderIndex, sql`${lessons.orderIndex} - 1`),
      ),
    )
    .leftJoin(
      userProgress,
      and(eq(userProgress.lessonId, previousLesson.id), eq(userProgress.userId, userId)),
    )
    .where(eq(lessons.id, lessonId))
    .limit(1);

  if (!lesson) {
    return { kind: "not_found" };
  }

  if (lesson.orderIndex === 0 || lesson.previousStatus === "completed") {
    return { kind: "allowed", courseId: lesson.courseId, title: lesson.title };
  }

  return { kind: "locked", courseId: lesson.courseId, title: lesson.title };
}

function buildCourseFilters({
  search,
  level,
  category,
}: {
  search?: string;
  level?: CefrLevel;
  category?: string;
}) {
  const conditions = [];

  const trimmed = search?.trim();
  if (trimmed) {
    const pattern = `%${trimmed}%`;
    conditions.push(or(ilike(courses.title, pattern), ilike(courses.description, pattern)));
  }

  if (level) {
    conditions.push(eq(courses.level, level));
  }

  if (category) {
    conditions.push(eq(courses.category, category));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

type RawLessonRow = {
  id: string;
  title: string;
  skill: CourseLessonItem["skill"];
  estimatedMinutes: number;
  orderIndex: number;
  progressStatus: "not_started" | "in_progress" | "completed" | null;
};

/**
 * Sequential unlock: lesson `n` opens when `n-1` is completed. The first
 * incomplete unlocked lesson is "Current"; everything after stays Locked.
 */
function resolveLessonStatuses(rows: RawLessonRow[]): CourseLessonItem[] {
  let previousCompleted = true;
  let foundCurrent = false;

  return rows.map((row) => {
    const isCompleted = row.progressStatus === "completed";
    const isUnlocked = previousCompleted;

    let status: LessonListStatus;
    if (isCompleted) {
      status = "completed";
    } else if (!isUnlocked) {
      status = "locked";
    } else if (!foundCurrent) {
      status = "current";
      foundCurrent = true;
    } else {
      // Shouldn't happen under sequential unlock; treat as locked.
      status = "locked";
    }

    previousCompleted = isCompleted;

    return {
      id: row.id,
      title: row.title,
      skill: row.skill,
      estimatedMinutes: row.estimatedMinutes,
      orderIndex: row.orderIndex,
      status,
    };
  });
}
