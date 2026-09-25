"use client";

import { useTranslations } from "next-intl";
import { MessageSquarePlus } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionCard } from "@/components/shared/SectionCard";
import { Badge } from "@/components/ui/badge";
import type { FeedbackStatus } from "@/features/feedback/constants";
import {
  feedbackCategoryMessageKey,
  feedbackStatusMessageKey,
} from "@/features/feedback/i18n-keys";
import { formatFeedbackDate } from "@/features/feedback/format";
import type { FeedbackItem } from "@/features/feedback/types";
import { RatingStars } from "./RatingStars";

const STATUS_VARIANT: Record<
  FeedbackStatus,
  "secondary" | "warning" | "default" | "success" | "outline"
> = {
  new: "secondary",
  reviewing: "warning",
  planned: "default",
  resolved: "success",
  declined: "outline",
};

type FeedbackListProps = {
  items: FeedbackItem[];
};

/** The signed-in user's own feedback history. */
export function FeedbackList({ items }: FeedbackListProps) {
  const t = useTranslations("feedback");

  return (
    <SectionCard title={t("yourFeedback")} description={t("statusHint")}>
      {items.length === 0 ? (
        <EmptyState
          icon={MessageSquarePlus}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          className="py-10"
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border bg-card px-4 py-3 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 space-y-1">
                  <p className="font-medium leading-snug">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {t(feedbackCategoryMessageKey(item.category))} ·{" "}
                    {formatFeedbackDate(item.createdAt)}
                    {item.isPublic ? t("publicBadge") : ""}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANT[item.status]}>
                  {t(feedbackStatusMessageKey(item.status))}
                </Badge>
              </div>
              {item.rating != null && (
                <div className="mt-2">
                  <RatingStars value={item.rating} readOnly size="sm" />
                </div>
              )}
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
