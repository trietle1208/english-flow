import Link from "next/link";
import { GraduationCap, Github } from "lucide-react";
import { siteConfig } from "@/config/site";

/** spec §6 "Footer gọn": logo, year, GitHub/README links — nothing else. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="size-5 text-primary" aria-hidden="true" />
          <span>
            {siteConfig.name} © {year}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/feedback"
            className="outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            Góp Ý
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
