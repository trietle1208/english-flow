"use server";

import { requireUser } from "@/lib/session";
import {
  getGrammarTopicDetailBySlug,
  getGrammarTopicExercisesForLearner,
  listGrammarTopicExamples,
  listGrammarTopicsPage,
  listUserGrammarProgress,
  searchGrammarTopics,
  type GrammarProgressRow,
  type GrammarSearchHit,
} from "./queries";
import { learnerPayloadContainsAnswerLeak, type ExerciseForLearner } from "./learner";
import type { GrammarExampleView, GrammarTopicDetail, GrammarTopicListItem } from "./types";

type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Prompt 2 data-layer entry points as Server Actions (AD-06).
 * Reads are also available as plain query functions for RSC pages.
 */

export async function listGrammarTopicsAction(
  rawQuery: unknown = {},
): Promise<ActionResult<{
  items: GrammarTopicListItem[];
  page: number;
  pageSize: number;
  total: number;
}>> {
  try {
    const user = await requireUser();
    const data = await listGrammarTopicsPage(user.id, rawQuery);
    return { ok: true, data };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function getGrammarTopicBySlugAction(
  slug: string,
): Promise<ActionResult<GrammarTopicDetail>> {
  try {
    const user = await requireUser();
    const topic = await getGrammarTopicDetailBySlug(slug, user.id);
    if (!topic) {
      return { ok: false, error: "Topic not found." };
    }
    if (topic.quiz && learnerPayloadContainsAnswerLeak(topic.quiz)) {
      return { ok: false, error: GENERIC_ERROR };
    }
    return { ok: true, data: topic };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function listGrammarExamplesAction(
  rawQuery: unknown,
): Promise<ActionResult<GrammarExampleView[]>> {
  try {
    await requireUser();
    const data = await listGrammarTopicExamples(rawQuery);
    return { ok: true, data };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function getGrammarExercisesAction(
  rawQuery: unknown,
): Promise<ActionResult<ExerciseForLearner | null>> {
  try {
    const user = await requireUser();
    const data = await getGrammarTopicExercisesForLearner(user.id, rawQuery);
    if (data && learnerPayloadContainsAnswerLeak(data)) {
      return { ok: false, error: GENERIC_ERROR };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function searchGrammarAction(
  rawQuery: unknown,
): Promise<ActionResult<GrammarSearchHit[]>> {
  try {
    await requireUser();
    const data = await searchGrammarTopics(rawQuery);
    return { ok: true, data };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function getGrammarProgressAction(): Promise<
  ActionResult<GrammarProgressRow[]>
> {
  try {
    const user = await requireUser();
    const data = await listUserGrammarProgress(user.id);
    return { ok: true, data };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}
