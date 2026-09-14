import type { ReactNode } from "react";
import { Header } from "@/features/marketing/components/Header";
import { Footer } from "@/features/marketing/components/Footer";

/**
 * Shared frame for public marketing routes — spec §6. Currently just `/`,
 * but the header/footer live here (not in `page.tsx`) so any later public
 * page (e.g. a future `/pricing`) gets the same chrome for free.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
