import { GrammarFooterNav } from "./GrammarFooterNav";
import { GrammarTopicTabs } from "./GrammarTopicTabs";
import type { GrammarTopicDetail } from "../types";

type GrammarTopicContentProps = {
  topic: GrammarTopicDetail;
};

/**
 * Topic body: tabs (Lý thuyết / Ví dụ / Bài tập) + previous/next footer.
 */
export function GrammarTopicContent({ topic }: GrammarTopicContentProps) {
  return (
    <div className="flex flex-col gap-8">
      <GrammarTopicTabs topic={topic} />
      <GrammarFooterNav previousSlug={topic.previousSlug} nextSlug={topic.nextSlug} />
    </div>
  );
}
