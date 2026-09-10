# Phase 04 — Authentication

> Spec: §7, §34 (Security), §5 (routes `/login`, `/register`)

## Mục tiêu

Đăng ký / đăng nhập / đăng xuất hoạt động thật, route trong `(app)` được bảo vệ, mọi truy vấn đều biết "user hiện tại là ai" từ phía server.

## Phụ thuộc

Phase 03.

## Deliverables

```text
src/lib/auth.ts              # better-auth server config (AD-01)
src/lib/auth-client.ts       # client helpers
src/app/api/auth/[...all]/route.ts
src/middleware.ts            # chặn route chưa đăng nhập
src/lib/session.ts           # requireUser() / getCurrentUser()
src/app/(auth)/login/page.tsx
src/app/(auth)/register/page.tsx
src/features/auth/{schemas.ts,components/}
```

## Task list

- [x] Cài `better-auth`, cấu hình Drizzle adapter trỏ vào Postgres hiện có
- [x] Generate + migrate bảng auth (`session`, `account`, `verification`), map vào bảng `users` đã có ở Phase 03
- [x] Bật `emailAndPassword`, quy tắc mật khẩu: tối thiểu 8 ký tự, có chữ + số
- [x] `session.ts`:
  - `getCurrentUser()` → `User | null`
  - `requireUser()` → `User`, `redirect("/login")` nếu chưa đăng nhập
  - Cache trong 1 request bằng `React.cache` để không query session nhiều lần
- [x] `middleware.ts`: bảo vệ `/dashboard`, `/courses`, `/lessons`, `/vocabulary`, `/grammar`, `/listening`, `/quiz`, `/progress`, `/settings`, `/placement-test`; đã đăng nhập mà vào `/login`|`/register` → redirect `/dashboard`
- [x] Zod schemas: `registerSchema` (name, email, password, confirmPassword + refine khớp nhau), `loginSchema` (email, password, rememberMe)
- [x] Form dùng `react-hook-form` + `@hookform/resolvers/zod`, validate cả client và server (§34)
- [x] Trang Register: 4 field, nút "Create Account", nút "Continue with Google" ở trạng thái **disabled + tooltip "Coming soon"** (placeholder theo §7)
- [x] Trang Login: email, password, "Remember me", link "Forgot password" (trỏ tới trang tĩnh giải thích sẽ có ở phase sau — không để link chết), link "Create account"
- [x] Trạng thái đầy đủ: loading (nút spinner + disabled), lỗi field, lỗi tổng (sai mật khẩu / email đã tồn tại), success (toast + redirect)
- [x] Sau khi đăng ký thành công → redirect `/placement-test` (có nút "Skip for now" → `/dashboard`)
- [x] Nút Logout (đặt tạm ở đâu đó, Phase 05 sẽ đưa vào sidebar)

## Acceptance criteria

- [x] Đăng ký user mới → tự đăng nhập → vào được `/dashboard`
- [x] Đăng ký trùng email → thông báo thân thiện, không lộ lỗi Postgres unique constraint
- [x] Sai mật khẩu → thông báo chung "Email or password is incorrect" (không tiết lộ email có tồn tại hay không)
- [x] Logout → truy cập `/dashboard` bị redirect về `/login`
- [x] Mật khẩu trong bảng DB là hash, không phải plaintext
- [x] Session cookie có `httpOnly` và `sameSite`
- [x] Truy cập trực tiếp một Server Action khi chưa đăng nhập → bị chặn (không chỉ dựa vào middleware)

## Ghi chú

- **Không bao giờ** nhận `userId` từ client. Mọi action lấy user từ `requireUser()` (§34).
- Forgot password thật (gửi email) không nằm trong Phase 1 — chỉ để trang giải thích, tránh link chết.

## Xác minh (2026-09-10)

Kiểm thử thật bằng cách build production (`npm run build`) rồi chạy `npm start` trỏ vào Postgres dev thật
(`localhost:5432`, cùng DB Phase 03 đã seed), sau đó gọi trực tiếp các endpoint `/api/auth/*` bằng `curl`
(không qua UI trình duyệt — sandbox của agent không có GUI):

- Đăng ký thật → row `users` + `accounts` (provider `credential`) được tạo, `accounts.password` là chuỗi
  scrypt `salt:hash`, không phải plaintext. `id` sinh ra là UUID v7 hợp lệ (AD-02).
- Đăng ký trùng email → better-auth trả `USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL` (không phải
  `USER_ALREADY_EXISTS` như tài liệu chung của better-auth gợi ý) — `registerAction` bắt cả hai code, verify
  bằng request thật chứ không đoán từ doc.
- Sai mật khẩu → `INVALID_EMAIL_OR_PASSWORD`, `loginAction` map thành "Email or password is incorrect."
- Mật khẩu yếu (đủ 8 ký tự nhưng toàn chữ) gửi thẳng vào `/api/auth/sign-up/email`, bỏ qua Server Action và
  Zod → **ban đầu lọt qua** vì better-auth chỉ có `minPasswordLength`, không có rule "chữ + số". Đã vá bằng
  hook `emailAndPassword.password.hash` trong `src/lib/auth.ts` (dùng `isPasswordComplexEnough` từ
  `src/lib/password.ts`) — verify lại bằng cùng request, giờ trả 400 với thông báo thân thiện.
- `Set-Cookie: better-auth.session_token=...; HttpOnly; SameSite=Lax` — đúng acceptance criterion.
- Sign-out rồi gọi lại `/dashboard` bằng cookie cũ (chưa hết hạn theo trình duyệt) → vẫn bị redirect `/login`,
  vì `requireUser()` trong `src/app/(app)/layout.tsx` query session thật trong DB (đã bị xoá), không chỉ dựa
  vào việc cookie có tồn tại hay không — đây chính là bằng chứng cho acceptance criterion "chặn truy cập
  trực tiếp, không chỉ dựa vào middleware" (middleware chỉ thấy cookie vẫn còn nên cho qua; `requireUser()`
  mới là chỗ thực sự chặn).
- Một lỗi khác chỉ lộ ra khi chạy thật (không thấy ở `tsc`/`build`): `drizzleAdapter({ usePlural: true,
  schema: { user: users, ... } })` với key số ít khiến better-auth's `validateSchema` check (chạy trên mọi
  request, không chỉ lúc khởi động) throw "missing table" giả — vì check đó so khớp theo *key của object*
  chứ không phải tên bảng SQL thật. Đã vá bằng cách thêm alias số nhiều (`users, sessions, accounts,
  verifications`) trỏ cùng bảng vào `schema` — xem comment trong `src/lib/auth.ts`.
- User test tạo trong lúc kiểm thử đã được xoá khỏi DB dev sau khi xong (không để lại rác trong seed data).
- Không tự động hoá được (Playwright/Vitest chưa được cài ở repo này — pre-existing gap từ Phase 01-03,
  không thuộc phạm vi Phase 04): `npm run test` hiện chưa có script. Nút "Skip for now" trên
  `/placement-test` và tooltip "Coming soon" trên nút Google chỉ được xác minh bằng đọc code, không phải
  click thật trong trình duyệt.
