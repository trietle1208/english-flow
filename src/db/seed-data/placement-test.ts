import type { cefrLevelEnum, questionTypeEnum } from "@/db/schema/enums";
import type { PlacementTestOption } from "@/db/schema/placement-test";

export type PlacementTestQuestionSeed = {
  level: (typeof cefrLevelEnum.enumValues)[number];
  type: (typeof questionTypeEnum.enumValues)[number];
  prompt: string;
  options: PlacementTestOption[];
  explanation: string;
  points?: number;
};

export const placementTestSeed = {
  slug: "general-placement-test",
  title: "English Placement Test",
  description:
    "20 questions spanning A1 to C1, used to estimate your CEFR level when you first sign up (spec §8).",
};

/** Re-export so seed scripts keep a single import path. */
export { placementScoreToLevel } from "@/features/placement-test/thresholds";

export const placementTestQuestionsSeed: PlacementTestQuestionSeed[] = [
  // --- A1 ---
  {
    level: "A1",
    type: "multiple_choice",
    prompt: "She ______ a teacher.",
    options: [
      { content: "is", isCorrect: true },
      { content: "am", isCorrect: false },
      { content: "are", isCorrect: false },
      { content: "be", isCorrect: false },
    ],
    explanation: "\"She\" takes the verb \"is\" with the verb \"to be\".",
  },
  {
    level: "A1",
    type: "true_false",
    prompt: "\"I have two brother\" is a correctly written sentence.",
    options: [
      { content: "True", isCorrect: false },
      { content: "False", isCorrect: true },
    ],
    explanation: "The plural of \"brother\" is \"brothers\": \"I have two brothers.\"",
  },
  {
    level: "A1",
    type: "multiple_choice",
    prompt: "What is the plural of \"child\"?",
    options: [
      { content: "childs", isCorrect: false },
      { content: "children", isCorrect: true },
      { content: "childes", isCorrect: false },
      { content: "child's", isCorrect: false },
    ],
    explanation: "\"Child\" has an irregular plural: \"children\".",
  },
  {
    level: "A1",
    type: "fill_blank",
    prompt: "He ______ (like) pizza.",
    options: [{ content: "likes", isCorrect: true }],
    explanation: "Present simple, third person singular: add -s → \"likes\".",
  },

  // --- A2 ---
  {
    level: "A2",
    type: "multiple_choice",
    prompt: "Yesterday, I ______ to the market.",
    options: [
      { content: "went", isCorrect: true },
      { content: "goed", isCorrect: false },
      { content: "go", isCorrect: false },
      { content: "gone", isCorrect: false },
    ],
    explanation: "\"Go\" is irregular in the past simple: go → went.",
  },
  {
    level: "A2",
    type: "true_false",
    prompt: "\"She is going to the party tomorrow\" describes something that already happened.",
    options: [
      { content: "True", isCorrect: false },
      { content: "False", isCorrect: true },
    ],
    explanation: "\"Tomorrow\" is a future time — this describes a future plan, not the past.",
  },
  {
    level: "A2",
    type: "multiple_choice",
    prompt: "This bag is ______ than that one. (cheap)",
    options: [
      { content: "cheaper", isCorrect: true },
      { content: "more cheap", isCorrect: false },
      { content: "cheapest", isCorrect: false },
      { content: "cheap", isCorrect: false },
    ],
    explanation: "Short adjectives like \"cheap\" take -er in the comparative form.",
  },
  {
    level: "A2",
    type: "fill_blank",
    prompt: "There ______ (not/be) enough time to finish.",
    options: [{ content: "isn't", isCorrect: true }, { content: "wasn't", isCorrect: true }],
    explanation: "Negative form of \"to be\": \"isn't\" (present) or \"wasn't\" (past) are both acceptable here.",
  },

  // --- B1 ---
  {
    level: "B1",
    type: "multiple_choice",
    prompt: "I ______ never ______ sushi before.",
    options: [
      { content: "have / eaten", isCorrect: true },
      { content: "has / eaten", isCorrect: false },
      { content: "had / eat", isCorrect: false },
      { content: "did / eat", isCorrect: false },
    ],
    explanation: "\"Never... before\" signals the Present Perfect: \"I have never eaten sushi before.\"",
  },
  {
    level: "B1",
    type: "true_false",
    prompt: "\"If it rains, I will stay home\" is a first conditional sentence.",
    options: [
      { content: "True", isCorrect: true },
      { content: "False", isCorrect: false },
    ],
    explanation: "It describes a real future possibility: If + present simple, will + base verb.",
  },
  {
    level: "B1",
    type: "multiple_choice",
    prompt: "You ______ arrive on time; it's very important.",
    options: [
      { content: "must", isCorrect: true },
      { content: "might", isCorrect: false },
      { content: "could", isCorrect: false },
      { content: "would", isCorrect: false },
    ],
    explanation: "\"Must\" expresses strong obligation, which fits \"it's very important\".",
  },
  {
    level: "B1",
    type: "fill_blank",
    prompt: "She has lived here ______ five years.",
    options: [{ content: "for", isCorrect: true }],
    explanation: "Use \"for\" with a period of time (five years); use \"since\" with a starting point (2019).",
  },

  // --- B2 ---
  {
    level: "B2",
    type: "multiple_choice",
    prompt: "The novel ______ by Jane Austen.",
    options: [
      { content: "was written", isCorrect: true },
      { content: "wrote", isCorrect: false },
      { content: "is writing", isCorrect: false },
      { content: "has write", isCorrect: false },
    ],
    explanation: "Passive voice, past simple: was/were + past participle → \"was written\".",
  },
  {
    level: "B2",
    type: "true_false",
    prompt: "\"Despite\" and \"although\" can both be used to introduce a contrast.",
    options: [
      { content: "True", isCorrect: true },
      { content: "False", isCorrect: false },
    ],
    explanation: "Both introduce contrast, but \"despite\" is followed by a noun/-ing form, while \"although\" is followed by a clause.",
  },
  {
    level: "B2",
    type: "multiple_choice",
    prompt: "If I ______ more time, I would travel more.",
    options: [
      { content: "had", isCorrect: true },
      { content: "have", isCorrect: false },
      { content: "will have", isCorrect: false },
      { content: "would have", isCorrect: false },
    ],
    explanation: "Second conditional: If + past simple, would + base verb.",
  },
  {
    level: "B2",
    type: "fill_blank",
    prompt: "The results ______ (analyze) carefully before publishing.",
    options: [{ content: "were analyzed", isCorrect: true }],
    explanation: "Passive voice, past simple: \"were analyzed\".",
  },

  // --- C1 ---
  {
    level: "C1",
    type: "multiple_choice",
    prompt: "Choose the closest meaning to \"nevertheless\" in: \"The evidence was weak; nevertheless, the jury convicted him.\"",
    options: [
      { content: "however", isCorrect: true },
      { content: "because", isCorrect: false },
      { content: "therefore", isCorrect: false },
      { content: "meanwhile", isCorrect: false },
    ],
    explanation: "\"Nevertheless\" signals contrast, like \"however\" — despite the weak evidence, the jury still convicted him.",
  },
  {
    level: "C1",
    type: "true_false",
    prompt: "The word \"meticulous\" means careless and disorganized.",
    options: [
      { content: "True", isCorrect: false },
      { content: "False", isCorrect: true },
    ],
    explanation: "\"Meticulous\" means the opposite — extremely careful and precise about details.",
  },
  {
    level: "C1",
    type: "multiple_choice",
    prompt: "Not only ______ she a great singer, but she also writes her own songs.",
    options: [
      { content: "is", isCorrect: true },
      { content: "she is", isCorrect: false },
      { content: "does", isCorrect: false },
      { content: "was", isCorrect: false },
    ],
    explanation: "\"Not only\" at the start of a clause triggers inversion: \"Not only is she...\"",
  },
  {
    level: "C1",
    type: "fill_blank",
    prompt: "The committee's decision was met with widespread ______ (criticize) from the public.",
    options: [{ content: "criticism", isCorrect: true }],
    explanation: "The noun form of \"criticize\" is \"criticism\".",
  },
];
