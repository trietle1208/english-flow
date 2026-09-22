import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import { isToeicTopicId } from "@/db/seed-data/toeic-vocabulary";
import { ToeicMatchPlay } from "@/features/vocabulary/components/toeic-play/ToeicMatchPlay";
import { listToeicPlayDeck } from "@/features/vocabulary/queries";
import type { ToeicTopicFilter } from "@/features/vocabulary/types";

export const metadata: Metadata = {
  title: "TOEIC Match Play",
};

/** Fresh random deck on every visit / Play again. */
export const dynamic = "force-dynamic";

type ToeicPlayPageProps = {
  searchParams: Promise<{
    topic?: string;
  }>;
};

/**
 * Arcade EN→VI match session in focus mode (covers AppShell chrome).
 */
export default async function ToeicPlayPage({ searchParams }: ToeicPlayPageProps) {
  const user = await requireUser();
  const params = await searchParams;
  const topic: ToeicTopicFilter =
    params.topic && isToeicTopicId(params.topic) ? params.topic : "all";

  const deck = await listToeicPlayDeck({
    userId: user.id,
    topic,
  });

  return <ToeicMatchPlay deck={deck} />;
}
