"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UserMenu } from "@/components/layout/UserMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { isNavItemActive, mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { CurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";

/**
 * Desktop (≥1024px) and tablet (768–1023px) navigation — spec §4. One
 * component covers both: `lg:` classes swap it from icon-only (tablet, with
 * a tooltip standing in for the hidden label) to icon+label (desktop).
 * Hidden entirely below 768px — `AppHeader`/`MobileNav` take over there.
 */
export function Sidebar({ user }: { user: CurrentUser }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[72px] flex-col border-r bg-sidebar text-sidebar-foreground md:flex lg:w-64">
      <div className="flex h-14 items-center gap-2 border-b px-3 lg:px-4">
        <GraduationCap className="size-6 shrink-0 text-primary" aria-hidden="true" />
        <span className="hidden truncate text-base font-semibold lg:inline">{siteConfig.name}</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Main">
        {mainNav.map((item) => {
          const active = isNavItemActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-11 items-center justify-center gap-3 rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:justify-start",
                    active && "bg-sidebar-accent font-semibold text-sidebar-accent-foreground",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                    />
                  )}
                  <Icon className="size-5 shrink-0" aria-hidden="true" />
                  <span className="hidden truncate lg:inline">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="lg:hidden">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="flex items-center gap-1 border-t p-2 lg:flex-row-reverse lg:justify-between">
        <ThemeToggle />
        <UserMenu user={user} collapsed className="lg:hidden" />
        <UserMenu user={user} className="hidden lg:flex" />
      </div>
    </aside>
  );
}
