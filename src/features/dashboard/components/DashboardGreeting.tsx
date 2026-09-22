import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type DashboardGreetingProps = {
  greeting: string;
  firstName: string;
  /** IANA timezone used for the date line (e.g. Asia/Ho_Chi_Minh). */
  timezone: string;
};

/**
 * Soft brand-washed hero for the dashboard — greeting + date + shortcut to
 * Progress. Keeps PageHeader's role (title + description) without looking
 * like every other app page.
 */
export function DashboardGreeting({
  greeting,
  firstName,
  timezone,
}: DashboardGreetingProps) {
  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: timezone,
  }).format(new Date());

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.16] via-secondary/40 to-background px-5 py-6 sm:px-7 sm:py-7 dark:from-primary/20 dark:via-primary/5 dark:to-card"
      aria-labelledby="dashboard-greeting"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/3 size-48 rounded-full bg-secondary blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{dateLabel}</p>
          <h1
            id="dashboard-greeting"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {greeting}, {firstName}
          </h1>
          <p className="max-w-md text-sm text-muted-foreground sm:text-base">
            Pick up where you left off and keep your streak going.
          </p>
        </div>

        <Button asChild variant="outline" className="w-fit gap-1.5 bg-card/70 backdrop-blur-sm">
          <Link href="/progress">
            View progress
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
