"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { TOEIC_TOPICS } from "@/db/seed-data/toeic-vocabulary";
import type { ToeicTopicFilter } from "../../types";

type ToeicPracticeLauncherProps = {
  /** Preselect from the catalog's current topic filter. */
  initialTopic?: ToeicTopicFilter;
};

/**
 * Practice CTA: pick a topic (or All), then enter Match Play focus mode.
 */
export function ToeicPracticeLauncher({
  initialTopic = "all",
}: ToeicPracticeLauncherProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<ToeicTopicFilter>(initialTopic);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setTopic(initialTopic);
    }
  }

  function start() {
    const href =
      topic === "all"
        ? `/vocabulary/toeic/play?r=${Date.now()}`
        : `/vocabulary/toeic/play?topic=${topic}&r=${Date.now()}`;
    setOpen(false);
    router.push(href);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          <Gamepad2 className="size-4" aria-hidden="true" />
          Practice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Practice Match Play</DialogTitle>
          <DialogDescription>
            Choose a topic for this round — 10 words, EN → Vietnamese meanings.
          </DialogDescription>
        </DialogHeader>

        <div
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
          role="group"
          aria-label="Practice topic"
        >
          <TopicOption
            label="All topics"
            hint="Mix from every category"
            active={topic === "all"}
            onClick={() => setTopic("all")}
          />
          {TOEIC_TOPICS.map((item) => (
            <TopicOption
              key={item.id}
              label={item.labelVi}
              hint={item.label}
              active={topic === item.id}
              onClick={() => setTopic(item.id)}
            />
          ))}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={start}>
            Start round
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TopicOption({
  label,
  hint,
  active,
  onClick,
}: {
  label: string;
  hint: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-lg border px-3 py-2.5 text-left transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <span className="block text-sm font-medium text-foreground">{label}</span>
      <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span>
    </button>
  );
}
