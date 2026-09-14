"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { GraduationCap, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { isNavItemActive, mainNav, mobileBottomNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { logoutAction } from "@/features/auth/actions";
import type { CurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";

const mobileBottomHrefs = new Set(mobileBottomNav.map((item) => item.href));
/** Nav items not already reachable from the bottom tab bar. */
const drawerOnlyNav = mainNav.filter((item) => !mobileBottomHrefs.has(item.href));

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/**
 * Compact mobile header (<768px) — logo + avatar (spec §4). The avatar opens
 * a drawer holding the nav items that don't fit in `MobileNav`'s 4-tab bar,
 * plus Settings/Theme/Logout (the sidebar's "Bottom section" on desktop).
 */
export function AppHeader({ user }: { user: CurrentUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      const result = await logoutAction();
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      router.push("/login");
      router.refresh();
    });
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:hidden">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <GraduationCap className="size-6 text-primary" aria-hidden="true" />
        {siteConfig.name}
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu">
            <Avatar className="size-8">
              <AvatarImage src={user.image ?? undefined} alt="" />
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-72 flex-col p-0">
          <SheetHeader className="border-b p-4 text-left">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={user.image ?? undefined} alt="" />
                <AvatarFallback>{initials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </SheetHeader>

          {drawerOnlyNav.length > 0 && (
            <nav className="space-y-1 p-3" aria-label="More">
              {drawerOnlyNav.map((item) => {
                const active = isNavItemActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        active && "bg-accent font-semibold text-accent-foreground",
                      )}
                    >
                      <Icon className="size-5 shrink-0" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
          )}

          <Separator />

          <div className="mt-auto space-y-1 p-3">
            <SheetClose asChild>
              <Link
                href="/settings"
                className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Settings className="size-5 shrink-0" aria-hidden="true" />
                Settings
              </Link>
            </SheetClose>
            <div className="flex min-h-11 items-center justify-between rounded-md px-3 text-sm text-muted-foreground">
              Theme
              <ThemeToggle />
            </div>
            <button
              type="button"
              disabled={isPending}
              onClick={handleLogout}
              className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm text-destructive outline-none transition-colors hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <LogOut className="size-5 shrink-0" aria-hidden="true" />
              Logout
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
