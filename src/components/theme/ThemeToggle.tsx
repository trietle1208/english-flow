"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

const OPTIONS = [
  { value: "light", labelKey: "light", icon: Sun },
  { value: "dark", labelKey: "dark", icon: Moon },
  { value: "system", labelKey: "system", icon: Monitor },
] as const;

/**
 * Light (blue) / Dark (mono) / System (warm green) toggle.
 * `system` is a fixed palette class, not OS preference.
 */
export function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();
  // Avoid a hydration mismatch: the resolved theme is only known client-side
  // after next-themes reads localStorage/system preference.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = OPTIONS.find((option) => option.value === theme) ?? OPTIONS[0];
  const CurrentIcon = current.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("toggle")}>
          {mounted ? <CurrentIcon /> : <Sun className="opacity-0" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.map(({ value, labelKey, icon: Icon }) => (
          <DropdownMenuItem key={value} onSelect={() => setTheme(value)}>
            <Icon />
            {t(labelKey)}
            {mounted && theme === value && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
