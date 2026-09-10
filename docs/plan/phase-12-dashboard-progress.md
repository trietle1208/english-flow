# Phase 12 — Dashboard & Progress

> Spec: §9 (Dashboard), §21 (Progress), §42 (Core loop)

## Mục tiêu

Trả lời được 6 câu hỏi ở §42 bằng **dữ liệu thật**, không một con số nào được hardcode.

## Phụ thuộc

Phase 08, 09, 11 (phải có dữ liệu thật để hiển thị).

## Deliverables

```text
src/app/(app)/dashboard/page.tsx
src/app/(app)/progress/page.tsx
src/features/progress/{queries.ts,streak.ts,achievements.ts,actions.ts}
src/features/dashboard/components/{DailyGoalCard,StreakCard,ContinueLearningCard,SkillOverview,RecentActivity,RecommendedLessons}.tsx
src/features/progress/components/{OverallStats,SkillPerformanceChart,WeeklyActivityChart,StreakCalendar,AchievementList}.tsx
```

## Task list — Dashboard

- [ ] Lời chào theo giờ trong timezone của user: "Good morning / afternoon / evening, [Name] 👋"
- [ ] **Daily Goal**: mục tiêu (từ `users.daily_goal_minutes`), số phút đã học hôm nay, progress bar. Ví dụ "15 / 20 min"
- [ ] **Streak**: 🔥 số ngày liên tiếp + 7 ô hoạt động trong tuần (AD-09)
- [ ] **Continue Learning** (card lớn): course, "Lesson 12", tiêu đề lesson, skill, thời lượng, % hoàn thành, nút Continue → thẳng tới lesson đang dở
- [ ] **Skill Overview**: 4 card Vocabulary / Grammar / Listening / Reading — % + progress bar + số item đã hoàn thành
- [ ] **Recent Activity**: lesson đã hoàn thành, kết quả quiz, từ vựng vừa lưu — gộp và sắp xếp theo thời gian, tối đa 8 dòng
- [ ] **Recommended Lessons**: 3–4 lesson gợi ý theo `users.cefr_level` + kỹ năng yếu nhất
- [ ] Empty state cho user hoàn toàn mới: card onboarding "Take the placement test" / "Start your first course" thay vì các số 0 vô nghĩa
- [ ] Mỗi khối bọc `Suspense` riêng + skeleton → khối chậm không chặn cả trang (§32)

## Task list — `/progress`

- [ ] Overall: lessons completed, learning time, vocabulary saved, vocabulary learned, quiz accuracy
- [ ] Skill Performance: chart 4 kỹ năng (Recharts — AD-05), theme-aware
- [ ] Weekly Activity: 7 ngày gần nhất (phút học/ngày)
- [ ] Streak: current streak, longest streak, lịch tuần
- [ ] Achievements: First Lesson, 10 Lessons Completed, 50 Words Saved, 100 Words Saved, 7 Day Streak — hiện cả cái chưa đạt (dạng mờ + tiến độ), giữ vai trò thứ yếu, không phô trương (§21)
- [ ] `achievements.ts`: định nghĩa dạng dữ liệu `{ key, title, description, check(stats) }`; kiểm tra và ghi `user_achievements` khi hoàn thành lesson / lưu từ / nộp quiz
- [ ] Chart có bảng số liệu tương đương cho screen reader hoặc `aria-label` mô tả (§31)

## Task list — Query & performance

- [ ] Gom truy vấn dashboard thành ít query nhất có thể (aggregate ở SQL, không N+1)
- [ ] Đảm bảo index phục vụ: `user_progress(user_id, status)`, `user_daily_activity(user_id, activity_date)`, `user_vocabularies(user_id, is_learned)`, `quiz_attempts(user_id, completed_at)`
- [ ] `EXPLAIN ANALYZE` các query dashboard, không có Seq Scan trên bảng lớn

## Acceptance criteria

- [ ] Hoàn thành 1 lesson → Dashboard đổi số ngay ở lần load kế tiếp
- [ ] Lưu 1 từ → "Vocabulary saved" trên Progress tăng 1
- [ ] Nộp 1 quiz → quiz accuracy được tính lại đúng
- [ ] Học 2 ngày liên tiếp → streak = 2; bỏ 1 ngày → streak reset, longest streak giữ nguyên
- [ ] Continue Learning trỏ đúng lesson đang dở
- [ ] User mới toanh: không có NaN, không có "0%" trần trụi — hiện onboarding
- [ ] Không còn bất kỳ số liệu hardcode nào trong code dashboard/progress

## Ghi chú

- Đây là phase kiểm chứng rằng core loop §42 đã khép kín: Dashboard → Lesson → Save vocab → Quiz → Progress → Dashboard.
