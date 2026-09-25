import Link from "next/link";
import { GraduationCap, Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

/** spec §6 "Footer gọn": logo, year, GitHub/README links — nothing else. */
export async function Footer() {
  const year = new Date().getFullYear();
  const t = await getTranslations("marketing");
  const tCommon = await getTranslations("common");

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:py-8 sm:text-left sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="size-5 text-primary" aria-hidden="true" />
          <span>{t("copyright", { name: siteConfig.name, year })}</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/feedback"
            className="outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            {tCommon("feedback")}
          </Link>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            <Github className="size-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href={`${siteConfig.githubUrl}#readme`}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            README
          </a>
        </div>
      </div>
    </footer>
  );
}
