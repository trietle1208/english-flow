"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2, CircleDashed, Medal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { GrammarProgressStatus } from "../types";

const STATUS_UI: Record<
  GrammarProgressStatus,
  {
    labelKey: "statusNew" | "statusWeak" | "statusPracticed" | "statusMastered";
    icon: typeof CheckCircle2;
    className: string;
  }
> = {
  not_started: {
    labelKey: "statusNew",
    icon: CircleDashed,
    className: "text-muted-foreground",
  },
  weak: {
    labelKey: "statusWeak",
    icon: AlertTriangle,
    className: "border-amber-500/40 text-amber-800 dark:text-amber-300",
  },
  practiced: {
    labelKey: "statusPracticed",
    icon: CheckCircle2,
    className: "text-emerald-700 dark:text-emerald-400",
  },
  mastered: {
    labelKey: "statusMastered",
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
  const t = useTranslations("grammar");

  if (hideNotStarted && status === "not_started") {
    return null;
  }

  const ui = STATUS_UI[status];
  const Icon = ui.icon;
  const label = t(ui.labelKey);
  const scoreSuffix =
    typeof bestScore === "number" ? t("bestScore", { score: bestScore }) : "";

  return (
    <Badge
      variant="outline"
      className={`gap-1 ${ui.className}`}
      title={scoreSuffix ? `${label}${scoreSuffix}` : label}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      <span>
        {label}
        {typeof bestScore === "number" ? (
          <span className="sr-only">{t("bestScoreAria", { score: bestScore })}</span>
        ) : null}
      </span>
    </Badge>
  );
}
