import type { QuizCatalogKind, QuizListItem } from "./types";

export const QUIZ_CATALOG_KINDS = [
  "vocabulary",
  "toeic",
  "grammar",
  "listening",
] as const satisfies readonly QuizCatalogKind[];

export const QUIZ_CATALOG_KIND_LABELS: Record<QuizCatalogKind, string> = {
  vocabulary: "Vocabulary",
  toeic: "TOEIC",
  grammar: "Grammar",
  listening: "Listening",
};

export const QUIZ_CATALOG_KIND_BLURBS: Record<QuizCatalogKind, string> = {
  vocabulary: "Words from courses and the personal catalog.",
  toeic: "Business vocabulary from the TOEIC list.",
  grammar: "Mini quizzes attached to grammar topics.",
  listening: "Comprehension checks after an audio lesson.",
};

export function isQuizCatalogKind(value: string): value is QuizCatalogKind {
  return (QUIZ_CATALOG_KINDS as readonly string[]).includes(value);
}

export function classifyQuizKind(
  slug: string,
  links: { grammar: boolean; listening: boolean },
): QuizCatalogKind {
  if (links.listening) return "listening";
  if (links.grammar) return "grammar";
  if (slug.startsWith("vocab-generated-toeic-")) return "toeic";
  if (slug.startsWith("vocab-generated-") || slug.endsWith("-practice")) {
    return "vocabulary";
  }
  return "grammar";
}

/** Strip catalog suffixes so grouped cards show the topic, not the template. */
export function quizDisplayTitle(title: string, kind?: QuizCatalogKind): string {
  let cleaned = title
    .replace(/\s+[—–-]\s+Vocabulary Practice$/i, "")
    .replace(/\s+[—–-]\s+Mini Quiz$/i, "")
    .replace(/\s+[—–-]\s+Comprehension Quiz$/i, "")
    .trim();
  if (kind === "toeic") {
    cleaned = cleaned.replace(/^TOEIC\s*[·•]\s*/i, "").trim();
  }
  return cleaned;
}

/** Drop seed/license footnotes from the card; keep the first learner sentence. */
export function quizDisplayDescription(
  description: string,
  title: string,
  kind?: QuizCatalogKind,
): string {
  const first = description
    .split(/(?:Generated locally|Headwords from|EnglishFlow original)/)[0]
    ?.trim();
  const cleaned = (first || description).replace(/\s+/g, " ").replace(/[.]+$/, ".");
  if (/^Practice \d+ words from this topic\.?$/i.test(cleaned)) {
    return `Practice words in ${quizDisplayTitle(title, kind)}.`;
  }
  return cleaned;
}

export function quizSourceLabel(slug: string): string | null {
  if (slug.startsWith("vocab-generated-")) return "Practice set";
  if (slug.endsWith("-practice")) return "Course";
  return null;
}

export function groupQuizzesByKind(
  quizzes: QuizListItem[],
): { kind: QuizCatalogKind; items: QuizListItem[] }[] {
  const buckets = new Map<QuizCatalogKind, QuizListItem[]>();
  for (const kind of QUIZ_CATALOG_KINDS) {
    buckets.set(kind, []);
  }
  for (const quiz of quizzes) {
    buckets.get(quiz.kind)?.push(quiz);
  }
  return QUIZ_CATALOG_KINDS.flatMap((kind) => {
    const items = buckets.get(kind) ?? [];
    return items.length === 0 ? [] : [{ kind, items }];
  });
}
