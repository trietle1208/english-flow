import type { VocabularySeed } from "@/db/seed-data/vocabulary";

/** Value stored on `vocabularies.catalog_source` for the TOEIC browse list. */
export const TOEIC_CATALOG_SOURCE = "toeic" as const;

export const TOEIC_TOPICS = [
  { id: "office", label: "Office & admin", labelVi: "Văn phòng" },
  { id: "hr", label: "Hiring & HR", labelVi: "Nhân sự" },
  { id: "sales", label: "Sales & finance", labelVi: "Kinh doanh" },
  { id: "logistics", label: "Logistics & ops", labelVi: "Vận hành" },
  { id: "meetings", label: "Meetings & comms", labelVi: "Họp & giao tiếp" },
] as const;

export type ToeicTopicId = (typeof TOEIC_TOPICS)[number]["id"];

export type ToeicVocabularySeed = VocabularySeed & { topic: ToeicTopicId };

export function isToeicTopicId(value: string): value is ToeicTopicId {
  return TOEIC_TOPICS.some((topic) => topic.id === value);
}

export function toeicTopicLabel(topicId: string | null | undefined): string {
  const topic = TOEIC_TOPICS.find((item) => item.id === topicId);
  return topic ? `${topic.labelVi} · ${topic.label}` : "Other";
}

/**
 * Lemma-list provenance: TSL 1.1 is the curated core; catalog is expanded with
 * a learner-safe subset from the EN–VI dictionary (not the full ~104k lexicon).
 */
export const TOEIC_TSL_ATTRIBUTION = {
  name: "TOEIC Service List (TSL) 1.1",
  url: "https://www.newgeneralservicelist.org/new-general-service-list-project-20",
  licenseCode: "ATTRIBUTION_REQUIRED" as const,
  attributionText:
    "Core headwords from the TOEIC Service List (TSL) 1.1 by Browne, C. & Culligan, B. (2016), CC BY-SA 4.0. Catalog expanded to ~5000 entries with a curated learner-safe subset from the English–Vietnamese Dictionary (Skypedia / MinhQND), also CC BY-SA 4.0 — Vietnamese definitions, IPA, and examples. Not a dump of the full dictionary.",
  sourceVersion: "TSL 1.1 + en-vi curated ~5000",
};

/**
 * Lexical-content provenance for definitions / IPA / examples.
 */
export const TOEIC_DICT_ATTRIBUTION = {
  name: "English–Vietnamese Dictionary (Skypedia)",
  url: "https://github.com/skypediacode/english-vietnamese-dictionary",
  licenseCode: "ATTRIBUTION_REQUIRED" as const,
  attributionText:
    "SQLite EN–VI dictionary by Skypedia (based on MinhQND Dictionary; Wiktionary and other open sources). Licensed under CC BY-SA 4.0. See ATTRIBUTION.md in that repository.",
  sourceVersion: "dictionary_en_vi.db ~42MB",
};
