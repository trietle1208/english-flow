import { readFileSync, writeFileSync } from "node:fs";

const path = "src/db/seed-data/toeic-vocabulary.ts";
const src = readFileSync(path, "utf8");

const sectionMap: Record<string, string> = {
  "Office & administration": "office",
  "Hiring & HR": "hr",
  "Sales, finance & clients": "sales",
  "Logistics, facilities & operations": "logistics",
  "Meetings & communication": "meetings",
};

const bodyStart = src.indexOf("export const toeicVocabularySeed");
const arrStart = src.indexOf("[", bodyStart);
const arrEnd = src.lastIndexOf("];");
const arrBody = src.slice(arrStart + 1, arrEnd);

const sections = arrBody.split(/\n  \/\/ --- /).slice(1);
const parts: string[] = [];

for (const section of sections) {
  const titleEnd = section.indexOf(" ---");
  const title = section.slice(0, titleEnd).trim();
  const topic = sectionMap[title];
  if (!topic) {
    throw new Error(`Unknown section: ${title}`);
  }

  let content = section.slice(section.indexOf("\n") + 1);
  content = content.replace(
    /(difficulty: "(?:easy|medium|hard)",)\n  \}/g,
    `$1\n    topic: "${topic}",\n  }`,
  );
  parts.push(`  // --- ${title} ---\n${content.trimEnd()}`);
}

const header = `import type { VocabularySeed } from "@/db/seed-data/vocabulary";

/** Value stored on \`vocabularies.catalog_source\` for the TOEIC browse list. */
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
  return topic ? \`\${topic.labelVi} · \${topic.label}\` : "Other";
}

/**
 * Attribution for the curated lemma list (Browne & Culligan TSL 1.1).
 * Meanings / IPA / examples below are EnglishFlow originals (learner-facing VI).
 */
export const TOEIC_TSL_ATTRIBUTION = {
  name: "TOEIC Service List (TSL) 1.1",
  url: "https://www.newgeneralservicelist.org/new-general-service-list-project-20",
  licenseCode: "ATTRIBUTION_REQUIRED" as const,
  attributionText:
    "Lemma selection based on the TOEIC Service List (TSL) 1.1 by Browne, C. & Culligan, B. (2016), licensed under CC BY-SA 4.0. Cite: Browne, C., and Culligan, B. (2016). The TOEIC Service List. Retrieved from http://www.newgeneralservicelist.org. Vietnamese meanings, IPA, pronunciation spellings, and example sentences are EnglishFlow originals.",
  sourceVersion: "TSL 1.1",
};

/**
 * MVP curated subset (~70 lemmas) drawn from TSL themes (office, HR, sales,
 * logistics). Words already in \`vocabularySeed\` are intentionally omitted so
 * the catalog unique index stays clean; reseeding only touches this set.
 */
`;

const out =
  header +
  "export const toeicVocabularySeed: ToeicVocabularySeed[] = [\n" +
  parts.join("\n") +
  "\n];\n";

writeFileSync(path, out);
console.log("ok", parts.length, "sections");
