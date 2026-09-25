import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/features/marketing/components/Hero";
import { Features } from "@/features/marketing/components/Features";
import { HowItWorks } from "@/features/marketing/components/HowItWorks";
import { FinalCTA } from "@/features/marketing/components/FinalCTA";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  const title = t("landingTitle");
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

/**
 * The public landing page — spec §6. Server Component all the way down; the
 * only client JS on this route comes from the mobile `Sheet` menu inside
 * `Header` (and the app-wide `ThemeProvider`/`Toaster` already mounted in
 * the root layout), so the page ships close to zero page-specific JS.
 */
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
