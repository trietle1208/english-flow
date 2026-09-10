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

- [ ] Cài `better-auth`, cấu hình Drizzle adapter trỏ vào Postgres hiện có
- [ ] Generate + migrate bảng auth (`session`, `account`, `verification`), map vào bảng `users` đã có ở Phase 03
- [ ] Bật `emailAndPassword`, quy tắc mật khẩu: tối thiểu 8 ký tự, có chữ + số
- [ ] `session.ts`:
  - `getCurrentUser()` → `User | null`
  - `requireUser()` → `User`, `redirect("/login")` nếu chưa đăng nhập
  - Cache trong 1 request bằng `React.cache` để không query session nhiều lần
- [ ] `middleware.ts`: bảo vệ `/dashboard`, `/courses`, `/lessons`, `/vocabulary`, `/grammar`, `/listening`, `/quiz`, `/progress`, `/settings`, `/placement-test`; đã đăng nhập mà vào `/login`|`/register` → redirect `/dashboard`
- [ ] Zod schemas: `registerSchema` (name, email, password, confirmPassword + refine khớp nhau), `loginSchema` (email, password, rememberMe)
- [ ] Form dùng `react-hook-form` + `@hookform/resolvers/zod`, validate cả client và server (§34)
- [ ] Trang Register: 4 field, nút "Create Account", nút "Continue with Google" ở trạng thái **disabled + tooltip "Coming soon"** (placeholder theo §7)
- [ ] Trang Login: email, password, "Remember me", link "Forgot password" (trỏ tới trang tĩnh giải thích sẽ có ở phase sau — không để link chết), link "Create account"
- [ ] Trạng thái đầy đủ: loading (nút spinner + disabled), lỗi field, lỗi tổng (sai mật khẩu / email đã tồn tại), success (toast + redirect)
- [ ] Sau khi đăng ký thành công → redirect `/placement-test` (có nút "Skip for now" → `/dashboard`)
- [ ] Nút Logout (đặt tạm ở đâu đó, Phase 05 sẽ đưa vào sidebar)

## Acceptance criteria

- [ ] Đăng ký user mới → tự đăng nhập → vào được `/dashboard`
- [ ] Đăng ký trùng email → thông báo thân thiện, không lộ lỗi Postgres unique constraint
- [ ] Sai mật khẩu → thông báo chung "Email or password is incorrect" (không tiết lộ email có tồn tại hay không)
- [ ] Logout → truy cập `/dashboard` bị redirect về `/login`
- [ ] Mật khẩu trong bảng DB là hash, không phải plaintext
- [ ] Session cookie có `httpOnly` và `sameSite`
- [ ] Truy cập trực tiếp một Server Action khi chưa đăng nhập → bị chặn (không chỉ dựa vào middleware)

## Ghi chú

- **Không bao giờ** nhận `userId` từ client. Mọi action lấy user từ `requireUser()` (§34).
- Forgot password thật (gửi email) không nằm trong Phase 1 — chỉ để trang giải thích, tránh link chết.
