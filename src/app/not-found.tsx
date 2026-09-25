"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";

/**
 * Global 404 — matches any URL with no route. Kept as a client component so
 * it can read the locale from `NextIntlClientProvider` (the root
 * `not-found.tsx` cannot call `cookies()` / `getTranslations()` — Next.js
 * statically optimizes it for unmatched URLs).
 */
export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <EmptyState
        icon={Compass}
        title={t("pageNotFound")}
        description={t("pageNotFoundDescription")}
        action={
          <Button asChild>
            <Link href="/">{t("goHome")}</Link>
          </Button>
        }
      />
    </div>
  );
}
