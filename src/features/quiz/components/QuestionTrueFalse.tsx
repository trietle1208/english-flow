"use client";

import { QuestionMultipleChoice, type AnswerVisualState } from "./QuestionMultipleChoice";
import type { QuizAnswerOption } from "../types";

type QuestionTrueFalseProps = {
  questionId: string;
  prompt: string;
  answers: QuizAnswerOption[];
  selectedId: string | null;
  optionState?: (answerId: string) => AnswerVisualState;
  disabled?: boolean;
  onSelect: (answerId: string) => void;
};

/** True/False is the same interaction as multiple choice (two options). */
export function QuestionTrueFalse(props: QuestionTrueFalseProps) {
  return <QuestionMultipleChoice {...props} />;
}
