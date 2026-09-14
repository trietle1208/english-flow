"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * Wraps `next-themes` so the app can toggle Light / Dark / System (spec §29,
 * reused by the `/settings` theme control in Phase 13). `attribute="class"`
 * matches `tailwind.config.ts`'s `darkMode: "class"` and the `.dark`
 * selector in `globals.css`.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
