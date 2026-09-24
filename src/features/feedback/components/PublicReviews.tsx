import { MessageCircle } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionCard } from "@/components/shared/SectionCard";
import { FEEDBACK_CATEGORY_LABELS } from "@/features/feedback/constants";
import { formatFeedbackDate } from "@/features/feedback/format";
import type { PublicReview } from "@/features/feedback/types";
import { RatingStars } from "./RatingStars";

type PublicReviewsProps = {
  items: PublicReview[];
};

/** Shared reviews — names only, never emails. */
export function PublicReviews({ items }: PublicReviewsProps) {
  return (
    <SectionCard
      title="Đánh giá từ học viên"
      description="Những góp ý mà người học chọn chia sẻ công khai."
    >
      {items.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title="Chưa có đánh giá công khai"
          description="Đánh dấu “Chia sẻ công khai” khi gửi để học viên khác cũng thấy."
          className="py-10"
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border bg-card px-4 py-3 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="truncate text-sm font-medium">{item.authorName}</p>
                {item.rating != null && (
                  <RatingStars value={item.rating} size="sm" />
                )}
              </div>
              <p className="mt-2 font-medium leading-snug">{item.title}</p>
              <p className="mt-1 line-clamp-4 text-sm text-muted-foreground">
                {item.message}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {FEEDBACK_CATEGORY_LABELS[item.category]} ·{" "}
                {formatFeedbackDate(item.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
