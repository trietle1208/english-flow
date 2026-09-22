import Link from "next/link";
import { BookMarked, CheckCircle2, ClipboardList } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import type { RecentActivityItem } from "@/features/progress/types";

type RecentActivityProps = {
  items: RecentActivityItem[];
};

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.round((then - now) / 1000);
  const abs = Math.abs(diffSec);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (abs < 60) return rtf.format(diffSec, "second");
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  return rtf.format(diffDay, "day");
}

const KIND_META = {
  lesson: {
    Icon: CheckCircle2,
    wrap: "bg-success/10 text-success",
  },
  quiz: {
    Icon: ClipboardList,
    wrap: "bg-primary/10 text-primary",
  },
  vocabulary: {
    Icon: BookMarked,
    wrap: "bg-skill-vocabulary/10 text-skill-vocabulary",
  },
} as const;

/** Merged feed: completed lessons, quiz results, saved words (spec §9). */
export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <SectionCard
      title="Recent Activity"
      description="Your latest learning actions."
      className="h-full"
      contentClassName="pt-2"
    >
      {items.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No activity yet"
          description="Complete a lesson, save a word, or take a quiz to see it here."
          className="py-10"
        />
      ) : (
        <ul className="space-y-1">
          {items.map((item) => {
            const meta = KIND_META[item.kind];
            const Icon = meta.Icon;
            const label =
              item.kind === "lesson"
                ? `Completed lesson: ${item.title}`
                : item.kind === "quiz"
                  ? `Quiz “${item.title}” — ${item.score}%`
                  : `Saved word: ${item.title}`;

            return (
              <li key={`${item.kind}-${item.id}`}>
                <Link
                  href={item.href}
                  className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
                      meta.wrap,
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{relativeTime(item.at)}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
