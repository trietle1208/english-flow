import {
  BookMarked,
  BookOpen,
  Headphones,
  LayoutDashboard,
  LineChart,
  ListChecks,
  SpellCheck,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/**
 * Desktop sidebar (full list) and the mobile drawer — spec §4 "Main
 * Navigation" desktop sidebar list, in order.
 */
export const mainNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/vocabulary", label: "Vocabulary", icon: BookMarked },
  { href: "/grammar", label: "Grammar", icon: SpellCheck },
  { href: "/listening", label: "Listening", icon: Headphones },
  { href: "/quiz", label: "Quiz", icon: ListChecks },
  { href: "/progress", label: "Progress", icon: LineChart },
];

/**
 * Mobile bottom nav (<768px) — spec §4: "Maintain easy access to Dashboard,
 * Courses, Vocabulary and Progress". Everything else in `mainNav` lives in
 * the drawer opened from the mobile header's avatar.
 */
const MOBILE_BOTTOM_NAV_HREFS = new Set(["/dashboard", "/courses", "/vocabulary", "/progress"]);

export const mobileBottomNav: NavItem[] = mainNav.filter((item) =>
  MOBILE_BOTTOM_NAV_HREFS.has(item.href),
);

/**
 * Shared active-state rule for the sidebar, drawer and bottom nav: exact
 * match, or a nested route under it (e.g. `/courses/abc` keeps "Courses"
 * active). Every nav surface uses this instead of re-deriving it so active
 * state can never drift between desktop and mobile.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
