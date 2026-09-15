import type { LessonBlock } from "@/db/schema/lesson-content";
import type { VocabularySummary } from "../types";
import { AudioBlock } from "./AudioBlock";
import { ExampleBlock } from "./ExampleBlock";
import { ExerciseBlock } from "./ExerciseBlock";
import { ExplanationBlock } from "./ExplanationBlock";
import { ObjectiveBlock } from "./ObjectiveBlock";
import { VocabularyBlock } from "./VocabularyBlock";

type LessonBlockRendererProps = {
  blocks: LessonBlock[];
  vocabulariesById: Record<string, VocabularySummary>;
  listeningTitlesById: Record<string, string>;
  savedVocabularyIds: Set<string>;
  /** Used so exercise QuizRunner can return the learner to this lesson. */
  lessonPath?: string;
};

/**
 * Maps AD-03 `type` → component. Unknown types are already filtered by
 * `parseLessonBlocks`; this switch is exhaustive for the known union.
 */
export async function LessonBlockRenderer({
  blocks,
  vocabulariesById,
  listeningTitlesById,
  savedVocabularyIds,
  lessonPath,
}: LessonBlockRendererProps) {
  const nodes = await Promise.all(
    blocks.map(async (block, index) => {
      const key = `${block.type}-${index}`;

      switch (block.type) {
        case "objective":
          return <ObjectiveBlock key={key} text={block.text} />;
        case "explanation":
          return <ExplanationBlock key={key} markdown={block.markdown} />;
        case "vocabulary":
          return (
            <VocabularyBlock
              key={key}
              vocabularyIds={block.vocabularyIds}
              vocabulariesById={vocabulariesById}
              savedVocabularyIds={savedVocabularyIds}
            />
          );
        case "examples":
          return <ExampleBlock key={key} items={block.items} />;
        case "exercise":
          return (
            <ExerciseBlock key={key} quizId={block.quizId} returnTo={lessonPath} />
          );
        case "audio":
          return (
            <AudioBlock
              key={key}
              listeningLessonId={block.listeningLessonId}
              title={listeningTitlesById[block.listeningLessonId]}
            />
          );
        default: {
          const _exhaustive: never = block;
          void _exhaustive;
          return null;
        }
      }
    }),
  );

  return <div className="flex flex-col gap-8">{nodes}</div>;
}
