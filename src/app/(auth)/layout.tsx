import type { ReactNode } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { siteConfig } from "@/config/site";

/**
 * Shared centered-card frame for `/login`, `/register`, `/forgot-password`.
 * Phase 06 gives the marketing shell its own design pass — this stays
 * minimal on purpose.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-muted/30 px-4 py-12">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
