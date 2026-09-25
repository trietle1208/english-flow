import Link from "next/link";
import { GraduationCap, Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";

/** Anonymous visitors: in-page anchors (avoid auth bounce). Signed-in: real app routes. */
const ANON_SECTION_NAV = [
  { href: "#features", labelKey: "features" },
  { href: "#courses", labelKey: "courses" },
  { href: "#vocabulary", labelKey: "vocabulary" },
  { href: "#progress", labelKey: "progress" },
] as const;

const AUTH_SECTION_NAV = [
  { href: "/dashboard", labelKey: "dashboard" },
  { href: "/courses", labelKey: "courses" },
  { href: "/vocabulary", labelKey: "vocabulary" },
  { href: "/progress", labelKey: "progress" },
] as const;

/**
 * Public header for `/` — spec §6. Anonymous visitors get in-page anchors
 * into `Features` (those app routes require auth). Signed-in visitors get
 * real app links so the menu actually navigates. Stays a Server Component:
 * `Sheet` (mobile menu) carries its own "use client" boundary internally.
 */
export async function Header() {
  const user = await getCurrentUser();
  const sectionNav = user ? AUTH_SECTION_NAV : ANON_SECTION_NAV;
  const tNav = await getTranslations("nav");
  const t = await getTranslations("marketing");

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold">
          <GraduationCap className="size-6 text-primary" aria-hidden="true" />
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label={tNav("sections")}>
          {sectionNav.map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {tNav(item.labelKey)}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {tNav(item.labelKey)}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          {user ? (
            <Button asChild>
              <Link href="/dashboard">{t("goToDashboard")}</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">{t("signIn")}</Link>
              </Button>
              <Button asChild>
                <Link href="/register">{t("getStarted")}</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={tNav("openMenu")}>
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-72 flex-col p-0">
              <SheetHeader className="border-b p-4 text-left">
                <SheetTitle className="flex items-center gap-2 text-base">
                  <GraduationCap className="size-5 text-primary" aria-hidden="true" />
                  {siteConfig.name}
                </SheetTitle>
              </SheetHeader>

              <nav className="space-y-1 p-3" aria-label={tNav("sections")}>
                {sectionNav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className="flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {tNav(item.labelKey)}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {tNav(item.labelKey)}
                      </Link>
                    )}
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto space-y-2 border-t p-3">
                {user ? (
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/dashboard">{t("goToDashboard")}</Link>
                    </Button>
                  </SheetClose>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login">{t("signIn")}</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/register">{t("getStarted")}</Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
