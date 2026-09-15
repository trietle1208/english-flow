"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { TranscriptPanel } from "./TranscriptPanel";

const AudioPlayer = dynamic(
  () => import("./AudioPlayer").then((m) => m.AudioPlayer),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[140px] w-full rounded-xl" />,
  },
);

type ListeningStudySessionProps = {
  title: string;
  audioUrl: string;
  transcript: string;
  children?: ReactNode;
};

/**
 * Client shell that keeps player time in sync with the transcript panel.
 * Quiz UI is passed as `children` from the Server Component page.
 * AudioPlayer is code-split (Phase 13 / §32) — heavy and only needed here.
 */
export function ListeningStudySession({
  title,
  audioUrl,
  transcript,
  children,
}: ListeningStudySessionProps) {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <AudioPlayer src={audioUrl} title={title} onTimeUpdate={setCurrentTime} />
      <TranscriptPanel transcript={transcript} currentTime={currentTime} />
      {children}
    </div>
  );
}
