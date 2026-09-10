# Phase 01 — Foundation

> Spec: §2 (Tech stack), §29 (Design system), §36 (Code quality), §38 (Git)

## Mục tiêu

Dựng bộ khung dự án chạy được, gõ lệnh nào cũng xanh, để mọi phase sau chỉ việc thêm feature.

## Phụ thuộc

Không có. Đây là phase đầu tiên.

## Deliverables

```text
package.json  tsconfig.json  next.config.ts  eslint.config.mjs  .prettierrc
tailwind + globals.css (design tokens)
components.json (shadcn)
src/{app,features,components,db,lib,config}/
.gitignore  .env.example  README.md (bản nháp)
```

## Task list

- [x] `npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir --import-alias "@/*"` (dùng `create-next-app@15`, xem Ghi chú về Node)
- [x] Bật TypeScript strict tối đa: `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `verbatimModuleSyntax`
- [x] Prettier + `prettier-plugin-tailwindcss`; script `format` và `format:check`
- [x] ESLint: cấm `any` không cần thiết (`@typescript-eslint/no-explicit-any` = warn→error), cấm import vòng
- [x] `npx shadcn@latest init` — chọn base color neutral, CSS variables = true (dùng `shadcn@2.6.0`, xem Ghi chú)
- [x] Cài font Inter qua `next/font/google`, gán vào `<body>` bằng CSS variable
- [x] Định nghĩa design tokens trong `globals.css`: màu primary/success/warning/destructive, màu riêng cho progress theo skill, radius, spacing scale (xem Phase 05 để mở rộng)
- [x] Tạo cây thư mục theo AD-07, mỗi thư mục có `.gitkeep` hoặc `README.md` ngắn
- [x] `src/lib/utils.ts` (cn helper), `src/config/site.ts` (tên app "EnglishFlow", mô tả, url)
- [x] `.env.example` với `DATABASE_URL`, `NEXT_PUBLIC_APP_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
- [x] `.gitignore`: `.env`, `.env.local`, `node_modules`, `.next`, `drizzle/meta` giữ lại, `playwright-report`
- [x] `git init` + commit `feat: initialize project`

## Acceptance criteria

- [x] `npm run dev` → `http://localhost:3000` render trang mặc định không lỗi console
- [x] `npx tsc --noEmit` sạch
- [x] `npm run lint` sạch
- [x] `npm run build` thành công
- [x] `git log` có commit đầu tiên, `.env` **không** nằm trong repo

## Ghi chú

- Không cài thư viện nào chưa dùng tới (spec §36: "No unnecessary dependencies"). Recharts, Playwright, Vitest... để đúng phase của nó.
- README ở phase này chỉ là bản nháp, sẽ hoàn thiện ở Phase 14.
- **Ràng buộc Node.js của môi trường hiện tại**: máy dev đang chạy Node `18.19.1`. `create-next-app@latest`/`tailwindcss@latest` (v4, native `@tailwindcss/oxide` binding) và `shadcn@latest` CLI đều yêu cầu Node ≥20 và lỗi ngay khi build/chạy trên Node 18. Đã hạ xuống `tailwindcss@^3` (PostCSS thuần JS, không cần native binding) và `shadcn@2.6.0` để tương thích. Khi nâng Node lên ≥20, có thể cân nhắc migrate lên Tailwind v4 + shadcn CLI mới nhất (không bắt buộc cho Phase 1).
