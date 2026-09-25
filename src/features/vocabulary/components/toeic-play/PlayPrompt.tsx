"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { AudioButton } from "@/components/shared/AudioButton";
import type { ToeicPlayCard } from "../../types";

type PlayPromptProps = {
  card: ToeicPlayCard;
  floatPoints: number | null;
};

/**
 * Large EN lemma prompt with IPA, audio, and floating score feedback.
 */
export function PlayPrompt({ card, floatPoints }: PlayPromptProps) {
  const t = useTranslations("vocabulary");
  const reduceMotion = useReducedMotion();
  const ipa = card.phonetic.trim() || card.pronunciation.trim();

  return (
    <div className="relative w-full">
      <motion.div
        key={card.id}
        initial={reduceMotion ? false : { y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card/90 px-6 py-8 text-center shadow-md backdrop-blur-sm"
      >
        <p className="text-xs font-medium text-muted-foreground">{t("whatDoesThisMean")}</p>
        <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {card.word}
        </p>
        {ipa ? (
          <p className="font-mono text-sm text-muted-foreground">/{ipa.replaceAll("/", "")}/</p>
        ) : null}
        <AudioButton word={card.word} audioUrl={card.audioUrl} />
      </motion.div>

      {floatPoints != null && floatPoints > 0 ? (
        <motion.p
          key={`pts-${card.id}-${floatPoints}`}
          initial={reduceMotion ? { opacity: 1 } : { y: 8, opacity: 0, scale: 0.8 }}
          animate={reduceMotion ? { opacity: 1 } : { y: -36, opacity: [0, 1, 1, 0], scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 top-2 text-center text-2xl font-bold text-success"
          aria-live="polite"
        >
          +{floatPoints}
        </motion.p>
      ) : null}
    </div>
  );
}
