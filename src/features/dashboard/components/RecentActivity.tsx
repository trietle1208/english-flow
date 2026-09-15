import Link from "next/link";
import { BookMarked, CheckCircle2, ClipboardList } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { EmptyState } from "@/components/shared/EmptyState";
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

/** Merged feed: completed lessons, quiz results, saved words (spec §9). */
export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <SectionCard title="Recent Activity" description="Your latest learning actions.">
      {items.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No activity yet"
          description="Complete a lesson, save a word, or take a quiz to see it here."
          className="py-10"
        />
      ) : (
        <ul className="divide-y">
          {items.map((item) => {
            const Icon =
              item.kind === "lesson"
                ? CheckCircle2
                : item.kind === "quiz"
                  ? ClipboardList
                  : BookMarked;
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
                  className="flex items-start gap-3 py-3 transition-colors hover:bg-muted/40"
                >
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
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
