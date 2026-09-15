# features/courses

Course catalog and detail (Phase 07).

- `queries.ts` — `listCourses` (SQL progress aggregation), `getCourseDetail`, `getLessonAccess` (sequential unlock gate)
- `components/CourseCard.tsx` — catalog card with Start / Continue
- `components/CourseFilters.tsx` — search (debounced) + level + category via URL searchParams
- `components/LessonListItem.tsx` — Completed / Current / Locked rows on course detail
