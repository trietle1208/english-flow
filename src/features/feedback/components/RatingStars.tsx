"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  value: number | null;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md";
};

/**
 * 1–5 star rating. Interactive for the form; read-only on lists.
 */
export function RatingStars({
  value,
  onChange,
  readOnly = false,
  size = "md",
}: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5] as const;
  const iconClass = size === "sm" ? "size-4" : "size-5";
  const filledCount = value ?? 0;

  if (readOnly) {
    return (
      <div
        className="flex items-center gap-0.5"
        aria-label={value ? `${value} out of 5 stars` : "No rating"}
      >
        {stars.map((n) => (
          <Star
            key={n}
            className={cn(
              iconClass,
              n <= filledCount
                ? "fill-warning text-warning"
                : "text-muted-foreground/35",
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label="Rating" className="flex items-center gap-0.5">
      {stars.map((n) => {
        const selected = value === n;
        const filled = n <= filledCount;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            className="rounded-md p-1.5 outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => onChange?.(n)}
          >
            <Star
              className={cn(
                iconClass,
                filled ? "fill-warning text-warning" : "text-muted-foreground/35",
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
