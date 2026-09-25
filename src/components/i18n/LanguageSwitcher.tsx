"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Check, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { setLocale } from "@/i18n/actions";
import { localeNames, locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  variant?: "compact" | "buttons";
  className?: string;
};

/**
 * Cookie-backed locale switcher (en / vi). Compact is an icon dropdown for
 * chrome; buttons is the Settings Appearance picker.
 */
export function LanguageSwitcher({
  variant = "compact",
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function choose(next: Locale) {
    if (next === locale) return;
    startTransition(async () => {
      const result = await setLocale(next);
      if (result.ok) {
        router.refresh();
      }
    });
  }

  if (variant === "buttons") {
    return (
      <div
        role="radiogroup"
        aria-label={t("language")}
        className={cn("grid gap-3 sm:grid-cols-2", className)}
      >
        {locales.map((value) => {
          const selected = locale === value;
          return (
            <Button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              variant="outline"
              disabled={isPending}
              className={cn(
                "h-auto min-h-11 justify-start gap-2 px-4 py-3 text-left",
                selected && "border-primary bg-primary/5 ring-1 ring-primary",
              )}
              onClick={() => choose(value)}
            >
              <span className="font-medium">{localeNames[value]}</span>
              {selected && <span className="sr-only">{t("selected")}</span>}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          aria-label={t("language")}
          className={className}
        >
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((value) => (
          <DropdownMenuItem
            key={value}
            disabled={isPending}
            onSelect={() => choose(value)}
          >
            {localeNames[value]}
            {locale === value && (
              <Check className="ml-auto size-4" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
