"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Monitor, Moon, Sun } from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", labelKey: "light", descriptionKey: "lightDescription", icon: Sun },
  { value: "dark", labelKey: "dark", descriptionKey: "darkDescription", icon: Moon },
  { value: "system", labelKey: "system", descriptionKey: "systemDescription", icon: Monitor },
] as const;

/**
 * Light / Dark / System palette picker + UI language (spec §22 Appearance).
 * Theme is stored client-side by next-themes; locale is a cookie.
 */
export function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("settings");
  const tTheme = useTranslations("theme");
  const tCommon = useTranslations("common");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? (theme ?? "light") : "light";

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title={t("appearance")} description={t("appearanceDescription")}>
        <div
          role="radiogroup"
          aria-label={t("colorTheme")}
          className="grid gap-3 sm:grid-cols-3"
        >
          {OPTIONS.map(({ value, labelKey, descriptionKey, icon: Icon }) => {
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
                  {tTheme(labelKey)}
                  {selected && <span className="sr-only">{tCommon("selected")}</span>}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {tTheme(descriptionKey)}
                </span>
              </Button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title={tCommon("language")} description={t("languageDescription")}>
        <LanguageSwitcher variant="buttons" />
      </SectionCard>
    </div>
  );
}
