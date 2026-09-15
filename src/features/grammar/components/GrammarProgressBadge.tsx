import { AlertTriangle, CheckCircle2, CircleDashed, Medal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { GrammarProgressStatus } from "../types";

const STATUS_UI: Record<
  GrammarProgressStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    className: string;
  }
> = {
  not_started: {
    label: "Chưa học",
    icon: CircleDashed,
    className: "text-muted-foreground",
  },
  weak: {
    label: "Yếu",
    icon: AlertTriangle,
    className: "border-amber-500/40 text-amber-800 dark:text-amber-300",
  },
  practiced: {
    label: "Đã luyện",
    icon: CheckCircle2,
    className: "text-emerald-700 dark:text-emerald-400",
  },
  mastered: {
    label: "Thành thạo",
    icon: Medal,
    className: "border-sky-500/40 text-sky-800 dark:text-sky-300",
  },
};

type GrammarProgressBadgeProps = {
  status: GrammarProgressStatus;
  /** When set, appends best score for screen readers / tooltip context. */
  bestScore?: number | null;
  /** Hide "Not started" on dense cards if desired. */
  hideNotStarted?: boolean;
};

/**
 * Progress badge with icon + text (not colour-only) for grammar catalog cards.
 */
export function GrammarProgressBadge({
  status,
  bestScore,
  hideNotStarted = false,
}: GrammarProgressBadgeProps) {
  if (hideNotStarted && status === "not_started") {
    return null;
  }

  const ui = STATUS_UI[status];
  const Icon = ui.icon;
  const scoreSuffix =
    typeof bestScore === "number" ? ` · tốt nhất ${bestScore}%` : "";

  return (
    <Badge
      variant="outline"
      className={`gap-1 ${ui.className}`}
      title={scoreSuffix ? `${ui.label}${scoreSuffix}` : ui.label}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      <span>
        {ui.label}
        {typeof bestScore === "number" ? (
          <span className="sr-only">{` điểm tốt nhất ${bestScore} phần trăm`}</span>
        ) : null}
      </span>
    </Badge>
  );
}
