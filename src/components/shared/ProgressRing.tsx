import { cn } from "@/lib/utils";

type ProgressRingProps = {
  /** 0-100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
  /** Track/indicator color — defaults to the primary token; pass a
   * `--skill-*` token (see `docs/design-system.md`) for skill breakdowns. */
  colorClassName?: string;
};

/**
 * Circular progress indicator — CEFR/skill completion rings on the
 * Dashboard and Progress pages (spec §10 "Skill Overview", §28 "Skill
 * Performance"). Pure SVG, no chart library, so it stays cheap for the many
 * small rings a skill-breakdown grid needs.
 */
export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 6,
  label,
  className,
  colorClassName = "text-primary",
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-secondary"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("fill-none stroke-current transition-[stroke-dashoffset]", colorClassName)}
        />
      </svg>
      <span className="absolute text-sm font-semibold tabular-nums">{Math.round(clamped)}%</span>
    </div>
  );
}
