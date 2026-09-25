# 00 — Architecture Decisions

Các quyết định kỹ thuật cần chốt **trước khi code**, vì thay đổi sau sẽ tốn kém. Spec để mở nhiều điểm; đây là lựa chọn đề xuất kèm lý do.

---

## AD-01 — Authentication: `better-auth`

**Chọn**: [better-auth](https://better-auth.com) với Drizzle adapter, email + password, session lưu DB.

**Lý do**:

- Spec §7 nói "Do not store passwords manually" → better-auth tự hash (scrypt) và quản lý session/cookie.
- Có sẵn Drizzle adapter → dùng chung 1 Postgres, không thêm service.
- Thêm Google OAuth sau này = vài dòng config (spec §7 có placeholder "Continue with Google").
- Self-hostable 100%, không vendor lock-in (spec §2).

**Phương án dự phòng**: Auth.js v5 (NextAuth) + Credentials provider + `bcryptjs`. Chỉ chọn nếu better-auth gây vấn đề với phiên bản Next.js đang dùng.

**Hệ quả**: bảng `user`, `session`, `account`, `verification` do better-auth sinh ra; bảng `users` nghiệp vụ trong spec §23 sẽ **map trực tiếp vào bảng `user`** của better-auth (thêm cột custom: `cefr_level`, `daily_goal_minutes`, `preferred_learning_time`, `onboarded_at`) thay vì tạo bảng thứ hai.

**Cập nhật 2026-09-25 — session cookie cache**: bật `session.cookieCache` (5 phút) để `requireUser()` không phải query `sessions` + `users` ở mỗi request. Cookie được ký bằng `BETTER_AUTH_SECRET` nên client không giả mạo được. Đánh đổi: (1) session bị xoá trong DB vẫn dùng được tối đa 5 phút nếu ai đó giữ cả hai cookie (đăng xuất vẫn xoá cookie ở trình duyệt ngay); (2) cache chứa luôn user row → Server Action nào update bảng `users` phải gọi `refreshSessionCache()` (`src/lib/session.ts`) ngay sau đó, như `updateSettings` và `submitPlacementTest`.

---

## AD-02 — ID strategy: UUID v7 (`uuidv7`) sinh phía app

**Chọn**: cột `id uuid primary key`, giá trị sinh ở tầng app bằng `uuidv7()`.

**Lý do**: UUID v7 sắp xếp theo thời gian → index B-tree không bị phân mảnh như UUID v4, vẫn giữ được tính không đoán được của UUID. Sinh ở app cho phép biết id trước khi insert (tiện cho optimistic UI khi save vocabulary).

**Quy ước**: mọi bảng đều có `created_at timestamptz not null default now()` và `updated_at timestamptz not null default now()`.

---

## AD-03 — Lesson content: block-based JSONB

**Chọn**: `lessons.content jsonb` chứa mảng block đã được validate bằng Zod:

```ts
type LessonBlock =
  | { type: "objective"; text: string }
  | { type: "explanation"; markdown: string }
  | { type: "vocabulary"; vocabularyIds: string[] }
  | { type: "examples"; items: { en: string; vi: string }[] }
  | { type: "exercise"; quizId: string }
  | { type: "audio"; listeningLessonId: string };
```

**Lý do**: nội dung bài học có cấu trúc không đồng nhất (§12). Nếu normalize thành bảng `lesson_blocks` sẽ over-normalize (spec §23 cấm). JSONB + Zod cho phép thêm loại block mới (ví dụ `ai-tutor` ở phase sau) mà không cần migration.

**Ràng buộc**: block chỉ **tham chiếu id**, không copy nội dung vocabulary/quiz vào JSON → giữ single source of truth.

---

## AD-04 — Audio phát âm: file tĩnh + Web Speech API fallback

**Chọn**:

- `vocabularies.audio_url` trỏ tới file trong `public/audio/vocab/*.mp3` nếu có.
- Nếu `audio_url` null → client dùng `SpeechSynthesisUtterance` (Web Speech API, có sẵn trong trình duyệt, miễn phí, không cần key).
- Listening lessons dùng file mp3 tĩnh trong `public/audio/listening/`.

**Lý do**: không có budget cho TTS API ở Phase 1, không được thêm vendor lock-in. Cột `audio_url` giữ nguyên nên sau này thay bằng CDN/S3 chỉ cần đổi giá trị.

---

## AD-05 — Charts: Recharts qua shadcn `chart`

**Chọn**: `recharts` + wrapper `chart` của shadcn/ui cho trang Progress.

**Lý do**: đã nằm trong hệ sinh thái shadcn (spec §2 đã chốt shadcn), theme-aware sẵn, MIT. Không thêm thư viện chart thứ hai.

---

## AD-06 — Mutations: Server Actions là mặc định

**Chọn**: Server Actions cho mọi thao tác ghi (save vocab, submit quiz, complete lesson). Route Handlers (`/api/*`) chỉ dùng cho: auth callback của better-auth, và endpoint cần gọi từ ngoài React (nếu có).

**Lý do**: spec §2 ưu tiên Server Actions. Giảm boilerplate, dùng chung Zod schema cho validate.

**Quy ước bắt buộc cho mọi Server Action**:

1. `const user = await requireUser()` — lấy user từ session, ném lỗi nếu chưa đăng nhập.
2. Validate input bằng Zod.
3. Kiểm tra ownership trước khi update/delete (spec §34).
4. Trả về `{ ok: true, data }` hoặc `{ ok: false, error: <thông báo thân thiện> }`.
5. `revalidatePath`/`revalidateTag` đúng phạm vi, không revalidate toàn app.

---

## AD-07 — Cấu trúc thư mục

```text
src/
├── app/
│   ├── (marketing)/          # landing
│   ├── (auth)/               # login, register
│   ├── (app)/                # mọi route cần đăng nhập, dùng chung AppShell
│   └── api/
├── features/
│   ├── auth/ courses/ lessons/ vocabulary/ grammar/
│   ├── listening/ quiz/ progress/ placement-test/
│   └── future/               # để trống, chỉ có README ghi chú
├── components/
│   ├── ui/                   # shadcn primitives
│   └── shared/               # EmptyState, PageHeader, StatCard, AudioButton...
├── db/
│   ├── index.ts  schema/  seed.ts
├── lib/                      # utils, session, format, constants
└── config/                   # nav items, CEFR levels, achievements
```

Mỗi feature folder có thể chứa: `queries.ts` (đọc, server-only), `actions.ts` (Server Actions), `schemas.ts` (Zod), `components/`, `types.ts`.

---

## AD-08 — Đo thời gian học (learning time)

**Chọn**: ghi nhận theo **phiên học** — khi mở lesson/listening/quiz, client gửi heartbeat mỗi 60s (chỉ khi tab active) tới một Server Action `recordStudyTime`. Cộng dồn vào `user_daily_activity.minutes`.

**Lý do**: Daily Goal và Streak (§9, §21) cần số liệu thật, không được hardcode. Heartbeat 60s là đủ chính xác mà không spam DB.

**Chống lạm dụng**: server chặn cộng quá 2 phút cho mỗi heartbeat, dựa trên timestamp lần ghi trước.

---

## AD-09 — Streak

Tính từ bảng `user_daily_activity` (1 dòng / user / ngày, có unique index `(user_id, activity_date)`). Một ngày được tính là "active" khi `minutes >= 1` hoặc có ít nhất 1 hoạt động (lesson/quiz/vocab). Timezone: lưu `users.timezone`, mặc định `Asia/Ho_Chi_Minh`, mọi phép tính ngày dùng timezone của user chứ không dùng UTC.

---

## AD-10 — Validate env

Dùng `zod` trong `src/env.ts`, parse `process.env` lúc khởi động (import từ `next.config.ts` để fail sớm ở build time). Không đọc `process.env` rải rác trong code.
