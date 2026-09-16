"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OPTIONS = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    description: "Blue & soft gray palette",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    description: "Original dark monochrome",
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    description: "Warm green & cream palette",
  },
] as const;

/**
 * Light / Dark / System palette picker for Settings (spec §22 Appearance).
 * Theme is stored client-side by next-themes — not in the database.
 * `system` is a fixed warm-green theme (not OS preference).
 */
export function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? (theme ?? "light") : "light";

  return (
    <SectionCard
      title="Appearance"
      description="Choose a color palette for EnglishFlow on this device."
    >
      <div
        role="radiogroup"
        aria-label="Color theme"
        className="grid gap-3 sm:grid-cols-3"
      >
        {OPTIONS.map(({ value, label, icon: Icon, description }) => {
          const selected = current === value;
          return (
            <Button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              variant="outline"
              className={cn(
                "h-auto min-h-11 flex-col items-start gap-1 px-4 py-3 text-left",
                selected && "border-primary bg-primary/5 ring-1 ring-primary",
              )}
              onClick={() => setTheme(value)}
              disabled={!mounted}
            >
              <span className="flex items-center gap-2 font-medium">
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {label}
                {selected && (
                  <span className="sr-only">(selected)</span>
                )}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                {description}
              </span>
            </Button>
          );
        })}
      </div>
    </SectionCard>
  );
}
