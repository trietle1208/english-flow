"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale, LOCALE_COOKIE, type Locale } from "./config";

type SetLocaleResult = { ok: true; locale: Locale } | { ok: false };

/**
 * Persist the UI locale in a cookie and refresh the tree so Server
 * Components pick up the new catalog. No userId from the client — cookie
 * only, same device as the theme preference.
 */
export async function setLocale(nextLocale: string): Promise<SetLocaleResult> {
  if (!isLocale(nextLocale)) {
    return { ok: false };
  }

  const store = await cookies();
  store.set(LOCALE_COOKIE, nextLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
  return { ok: true, locale: nextLocale };
}
