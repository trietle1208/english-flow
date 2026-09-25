"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { BookmarkPlus, Loader2, RotateCcw, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { saveVocabulary } from "../../actions";
import type { ToeicPlayCard, ToeicTopicFilter } from "../../types";

type PlayResultsProps = {
  score: number;
  bestStreak: number;
  correctCount: number;
  total: number;
  missed: ToeicPlayCard[];
  topic: ToeicTopicFilter;
  catalogHref: string;
};

/**
 * End-of-round summary with optional batch-save for missed words.
 */
export function PlayResults({
  score,
  bestStreak,
  correctCount,
  total,
  missed,
  topic,
  catalogHref,
}: PlayResultsProps) {
  const t = useTranslations("vocabulary");
  const tc = useTranslations("common");
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [isPending, startTransition] = useTransition();
  const [savedIds, setSavedIds] = useState<Set<string>>(
    () => new Set(missed.filter((card) => card.isSaved).map((card) => card.id)),
  );

  const unsavedMissed = missed.filter((card) => !savedIds.has(card.id));
  const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  function playAgainHref() {
    const stamp = Date.now();
    return topic === "all"
      ? `/vocabulary/toeic/play?r=${stamp}`
      : `/vocabulary/toeic/play?topic=${topic}&r=${stamp}`;
  }

  function handleSaveMissed() {
    if (unsavedMissed.length === 0 || isPending) {
      return;
    }

    startTransition(async () => {
      const next = new Set(savedIds);
      let okCount = 0;
      let failCount = 0;

      for (const card of unsavedMissed) {
        const result = await saveVocabulary(card.id);
        if (result.ok) {
          next.add(card.id);
          okCount += 1;
        } else {
          failCount += 1;
        }
      }

      setSavedIds(next);

      if (failCount === 0) {
        toast.success(
          okCount === 1 ? t("toastSavedOne") : t("toastSavedMany", { count: okCount }),
        );
        router.refresh();
      } else if (okCount > 0) {
        toast.error(t("toastPartial", { ok: okCount, fail: failCount }));
      } else {
        toast.error(tc("genericError"));
      }
    });
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="mx-auto flex w-full max-w-md flex-col gap-6"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="flex size-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "color-mix(in oklch, var(--skill-vocabulary) 22%, transparent)" }}
        >
          <Trophy className="size-7 text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("roundComplete")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("roundSummary", { correct: correctCount, total, accuracy })}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3">
        <Stat label={t("score")} value={String(score)} />
        <Stat label={t("bestStreak")} value={String(bestStreak)} />
      </dl>

      {missed.length > 0 ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-4">
          <p className="text-sm font-medium">{t("missedWords")}</p>
          <ul className="flex flex-col gap-2">
            {missed.map((card) => (
              <li key={card.id} className="flex flex-col gap-0.5 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                <span className="font-medium">{card.word}</span>
                <span className="text-sm text-muted-foreground">{card.meaning}</span>
              </li>
            ))}
          </ul>
          {unsavedMissed.length > 0 ? (
            <Button type="button" onClick={handleSaveMissed} disabled={isPending}>
              {isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <BookmarkPlus className="size-4" aria-hidden="true" />
              )}
              {t("saveMissed", { count: unsavedMissed.length })}
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">{t("allMissedSaved")}</p>
          )}
        </div>
      ) : (
        <p className="rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-center text-sm text-foreground">
          {t("perfectRun")}
        </p>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href={playAgainHref()}>
            <RotateCcw className="size-4" aria-hidden="true" />
            {t("playAgain")}
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href={catalogHref}>{t("backToCatalog")}</Link>
        </Button>
      </div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/80 px-4 py-3 text-center">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
