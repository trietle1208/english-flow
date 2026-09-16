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

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

/**
 * Light (blue) / Dark (mono) / System (warm green) toggle.
 * `system` is a fixed palette class, not OS preference.
 */
export function ThemeToggle() {
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
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {mounted ? <CurrentIcon /> : <Sun className="opacity-0" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem key={value} onSelect={() => setTheme(value)}>
            <Icon />
            {label}
            {mounted && theme === value && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
