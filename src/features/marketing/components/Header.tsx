import Link from "next/link";
import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";

const SECTION_NAV = [
  { href: "#features", label: "Features" },
  { href: "#courses", label: "Courses" },
  { href: "#vocabulary", label: "Vocabulary" },
  { href: "#progress", label: "Progress" },
];

/**
 * Public header for `/` — spec §6. In-page anchors (not `/courses` etc.
 * directly) because those routes require auth; an anchored visitor scrolls
 * to the matching feature card in `Features` instead of hitting the
 * login-redirect. Stays a Server Component: `Sheet` (mobile menu) carries
 * its own "use client" boundary internally, so this file needs none.
 */
export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold">
          <GraduationCap className="size-6 text-primary" aria-hidden="true" />
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Sections">
          {SECTION_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
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

            <nav className="space-y-1 p-3" aria-label="Sections">
              {SECTION_NAV.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    href={item.href}
                    className="flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto space-y-2 border-t p-3">
              {user ? (
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </SheetClose>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
