import type { Metadata } from "next";
import { Hero } from "@/features/marketing/components/Hero";
import { Features } from "@/features/marketing/components/Features";
import { HowItWorks } from "@/features/marketing/components/HowItWorks";
import { FinalCTA } from "@/features/marketing/components/FinalCTA";
import { siteConfig } from "@/config/site";

const title = "EnglishFlow — Learn English with a system built around you.";

export const metadata: Metadata = {
  title,
  description: siteConfig.description,
  openGraph: {
    title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description: siteConfig.description,
  },
};

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
