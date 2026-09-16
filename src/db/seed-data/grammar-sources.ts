/**
 * Provenance rows for grammar seed (Phase 17).
 * License codes follow docs/research/grammar-dataset-license-research.md.
 */

export type GrammarContentSourceSeed = {
  /** Stable key used by example seeds (`sourceKey`). */
  key: "englishflow" | "cefrj" | "tatoeba" | "talpco";
  name: string;
  url: string | null;
  licenseCode: "PRODUCTION_ALLOWED" | "ATTRIBUTION_REQUIRED";
  attributionText: string | null;
  sourceVersion: string;
};

export const ENGLISHFLOW_ORIGINAL_SOURCE = {
  key: "englishflow",
  name: "EnglishFlow original",
  url: null as string | null,
  licenseCode: "PRODUCTION_ALLOWED" as const,
  attributionText: null as string | null,
  sourceVersion: "phase-17",
} satisfies GrammarContentSourceSeed;

export const grammarContentSourcesSeed: GrammarContentSourceSeed[] = [
  ENGLISHFLOW_ORIGINAL_SOURCE,
  {
    key: "cefrj",
    name: "CEFR-J Grammar Profile",
    url: "https://www.cefr-j.org/download.html",
    licenseCode: "ATTRIBUTION_REQUIRED",
    attributionText:
      "Curriculum map / CEFR levels informed by the CEFR-J Grammar Profile (Tono Lab, Tokyo University of Foreign Studies; also Open Language Profiles olp-en-cefrj). Research and commercial use permitted with proper citation. https://www.cefr-j.org/download.html",
    sourceVersion: "CEFR-J Grammar Profile (OLP mirror)",
  },
  {
    key: "tatoeba",
    name: "Tatoeba",
    url: "https://tatoeba.org/en/downloads",
    licenseCode: "ATTRIBUTION_REQUIRED",
    attributionText:
      "Example sentence text from Tatoeba (https://tatoeba.org), licensed under CC BY 2.0 FR. Audio not used.",
    sourceVersion: "text-only CC BY 2.0 FR",
  },
  {
    key: "talpco",
    name: "TALPCo",
    url: "https://github.com/matbahasa/TALPCo",
    licenseCode: "ATTRIBUTION_REQUIRED",
    attributionText:
      "Example sentence pairs from TALPCo (TUFS Asian Language Parallel Corpus), licensed under CC BY 4.0. Nomoto et al. https://github.com/matbahasa/TALPCo",
    sourceVersion: "CC BY 4.0",
  },
];
