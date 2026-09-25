export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "vi";
}
