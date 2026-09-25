"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavItemActive, mobileBottomNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

/**
 * Fixed bottom tab bar, mobile only (<768px) — spec §4 "Maintain easy
 * access to Dashboard, Courses, Vocabulary and Progress". Each tab is a
 * full-height flex cell so the touch target clears the 44px minimum (spec
 * §31) even though the icon+label content is smaller.
 */
export function MobileNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav
      aria-label={t("main")}
      className="fixed inset-x-0 bottom-0 z-30 flex h-16 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {mobileBottomNav.map((item) => {
        const active = isNavItemActive(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1 text-xs text-muted-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              active && "font-semibold text-foreground",
            )}
          >
            <Icon className={cn("size-5 shrink-0", active && "text-primary")} aria-hidden="true" />
            <span className="max-w-full truncate leading-tight">{t(item.labelKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
