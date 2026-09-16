"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * Wraps `next-themes` for Light / Dark / System palettes (spec §29,
 * reused by `/settings` Appearance). `attribute="class"` matches
 * `tailwind.config.ts` `darkMode: "class"` and `.light` / `.dark` / `.system`
 * in `globals.css`. `system` here is a fixed warm-green theme — not OS-follow.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
