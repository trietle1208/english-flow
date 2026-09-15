import type { questionTypeEnum, revealModeEnum } from "@/db/schema/enums";

export type QuizAnswerSeed = { content: string; isCorrect: boolean };

export type QuizQuestionSeed = {
  type: (typeof questionTypeEnum.enumValues)[number];
  prompt: string;
  explanation: string;
  points?: number;
  answers: QuizAnswerSeed[];
};

export type QuizSeed = {
  slug: string;
  title: string;
  description: string;
  revealMode?: (typeof revealModeEnum.enumValues)[number];
  passScore?: number;
  timeLimitSeconds?: number | null;
  questions: QuizQuestionSeed[];
};

/**
 * Standalone vocabulary-practice quizzes — one per non-grammar course,
 * reused by that course's lessons as their `exercise` content block.
 * Grammar topics carry their own mini quiz instead (see `grammar.ts`);
 * listening lessons carry their own comprehension quiz (see `listening.ts`).
 *
 * `grammarCourseOnlyQuizzes` below keep Essential Grammar course lessons
 * working after Phase 16 pruned the catalog to 3 topics — those quizzes are
 * not linked from `/grammar` topics.
 */
export const coursePracticeQuizzes: QuizSeed[] = [
  {
    slug: "everyday-english-practice",
    title: "Everyday English — Vocabulary Practice",
    description: "Check what you remember about daily routines, home and food.",
    questions: [
      {
        type: "multiple_choice",
        prompt: "Which word means \"a small job you do at home, like washing dishes\"?",
        explanation: "\"Chore\" is a small routine task at home, e.g. washing dishes or taking out the trash.",
        answers: [
          { content: "chore", isCorrect: true },
          { content: "nap", isCorrect: false },
          { content: "errand", isCorrect: false },
          { content: "routine", isCorrect: false },
        ],
      },
      {
        type: "true_false",
        prompt: "\"Wake up\" and \"get up\" mean exactly the same thing.",
        explanation: "\"Wake up\" means your sleep ends; \"get up\" means you leave the bed. You can wake up and stay in bed for a while before getting up.",
        answers: [
          { content: "True", isCorrect: false },
          { content: "False", isCorrect: true },
        ],
      },
      {
        type: "fill_blank",
        prompt: "The person who owns the apartment you rent is called your ______.",
        explanation: "A landlord is the owner who rents property to tenants.",
        answers: [
          { content: "landlord", isCorrect: true },
        ],
      },
      {
        type: "multiple_choice",
        prompt: "\"This soup is delicious\" means the soup is...",
        explanation: "\"Delicious\" describes food that tastes very good.",
        answers: [
          { content: "very tasty", isCorrect: true },
          { content: "too spicy", isCorrect: false },
          { content: "cold", isCorrect: false },
          { content: "expensive", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "english-conversation-practice",
    title: "English Conversation — Vocabulary Practice",
    description: "Practice words for sharing opinions and talking about feelings.",
    questions: [
      {
        type: "multiple_choice",
        prompt: "\"I disagree with you\" means you...",
        explanation: "\"Disagree\" means you have a different opinion from someone else.",
        answers: [
          { content: "have a different opinion", isCorrect: true },
          { content: "have the same opinion", isCorrect: false },
          { content: "don't understand", isCorrect: false },
          { content: "are angry", isCorrect: false },
        ],
      },
      {
        type: "true_false",
        prompt: "If you feel \"relieved\", you feel worried and stressed.",
        explanation: "\"Relieved\" is the opposite — it means a worry has gone away and you feel better.",
        answers: [
          { content: "True", isCorrect: false },
          { content: "False", isCorrect: true },
        ],
      },
      {
        type: "fill_blank",
        prompt: "\"Sorry to ______, but you have a phone call\" — the missing word means to break into a conversation.",
        explanation: "\"Interrupt\" means to break into someone's speech or activity.",
        answers: [
          { content: "interrupt", isCorrect: true },
        ],
      },
      {
        type: "multiple_choice",
        prompt: "Which adjective describes someone who is not sure of themselves before a big test?",
        explanation: "\"Nervous\" describes worry or fear before something important.",
        answers: [
          { content: "nervous", isCorrect: true },
          { content: "confident", isCorrect: false },
          { content: "curious", isCorrect: false },
          { content: "generous", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "english-for-travel-practice",
    title: "English for Travel — Vocabulary Practice",
    description: "Practice words you'll need at the airport and hotel.",
    questions: [
      {
        type: "multiple_choice",
        prompt: "You must show this document before boarding your flight.",
        explanation: "A boarding pass is required to get on the plane.",
        answers: [
          { content: "boarding pass", isCorrect: true },
          { content: "receipt", isCorrect: false },
          { content: "itinerary", isCorrect: false },
          { content: "currency", isCorrect: false },
        ],
      },
      {
        type: "true_false",
        prompt: "\"Vacancy\" at a hotel means all rooms are full.",
        explanation: "\"Vacancy\" actually means an available room. \"No vacancy\" means fully booked.",
        answers: [
          { content: "True", isCorrect: false },
          { content: "False", isCorrect: true },
        ],
      },
      {
        type: "fill_blank",
        prompt: "You have to pass through ______ when entering a foreign country with your luggage.",
        explanation: "\"Customs\" is the airport checkpoint that inspects goods entering a country.",
        answers: [
          { content: "customs", isCorrect: true },
        ],
      },
      {
        type: "multiple_choice",
        prompt: "A ticket that covers going and coming back is called a...",
        explanation: "\"Roundtrip\" ticket covers both the outbound and return journey.",
        answers: [
          { content: "roundtrip ticket", isCorrect: true },
          { content: "one-way ticket", isCorrect: false },
          { content: "boarding pass", isCorrect: false },
          { content: "platform ticket", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "academic-english-practice",
    title: "Academic English — Vocabulary Practice",
    description: "Practice formal vocabulary used in essays and research.",
    questions: [
      {
        type: "multiple_choice",
        prompt: "Which word means \"an idea that has not yet been proven, but can be tested\"?",
        explanation: "A \"hypothesis\" is a testable prediction made before research.",
        answers: [
          { content: "hypothesis", isCorrect: true },
          { content: "outcome", isCorrect: false },
          { content: "criteria", isCorrect: false },
          { content: "assessment", isCorrect: false },
        ],
      },
      {
        type: "true_false",
        prompt: "\"Furthermore\" is used to add another point to what you already said.",
        explanation: "\"Furthermore\" introduces an additional supporting point, similar to \"in addition\".",
        answers: [
          { content: "True", isCorrect: true },
          { content: "False", isCorrect: false },
        ],
      },
      {
        type: "fill_blank",
        prompt: "Researchers ______ the data to find patterns before writing their report.",
        explanation: "\"Analyze\" means to examine something in detail.",
        answers: [
          { content: "analyze", isCorrect: true },
          { content: "analyzed", isCorrect: true },
        ],
      },
      {
        type: "multiple_choice",
        prompt: "\"The results significantly improved\" means the improvement was...",
        explanation: "\"Significant\" means large or important enough to be noticeable.",
        answers: [
          { content: "large and noticeable", isCorrect: true },
          { content: "very small", isCorrect: false },
          { content: "temporary", isCorrect: false },
          { content: "impossible to measure", isCorrect: false },
        ],
      },
    ],
  },
];

/**
 * Quizzes referenced by Essential Grammar course lessons whose full topics
 * are not in the Phase 16 MVP catalog (3 topics). Seeded for lesson FKs only.
 */
export const grammarCourseOnlyQuizzes: QuizSeed[] = [
  {
    slug: "present-continuous-quiz",
    title: "Present Continuous — Mini Quiz",
    description: "Actions happening now or around now.",
    questions: [
      {
        type: "multiple_choice",
        prompt: "Look! It ______ outside.",
        explanation: "An action happening right now uses the present continuous: \"is raining\".",
        answers: [
          { content: "is raining", isCorrect: true },
          { content: "rains", isCorrect: false },
          { content: "rained", isCorrect: false },
          { content: "rain", isCorrect: false },
        ],
      },
      {
        type: "true_false",
        prompt: "\"I am wanting a coffee\" is grammatically correct.",
        explanation:
          "\"Want\" is a stative verb and isn't normally used in the continuous form. Say \"I want a coffee.\"",
        answers: [
          { content: "True", isCorrect: false },
          { content: "False", isCorrect: true },
        ],
      },
      {
        type: "fill_blank",
        prompt: "We ______ (have) dinner right now, can I call you back?",
        explanation: "An action in progress right now: \"are having\".",
        answers: [{ content: "are having", isCorrect: true }],
      },
    ],
  },
  {
    slug: "comparatives-quiz",
    title: "Comparatives — Mini Quiz",
    description: "Comparing people and things.",
    questions: [
      {
        type: "multiple_choice",
        prompt: "This book is ______ than that one.",
        explanation: "One-syllable adjectives take -er: \"cheaper\".",
        answers: [
          { content: "cheaper", isCorrect: true },
          { content: "more cheap", isCorrect: false },
          { content: "cheapest", isCorrect: false },
          { content: "cheap", isCorrect: false },
        ],
      },
      {
        type: "fill_blank",
        prompt: "She is the ______ (tall) student in the class.",
        explanation: "Superlative of tall: \"tallest\".",
        answers: [{ content: "tallest", isCorrect: true }],
      },
      {
        type: "true_false",
        prompt: "\"Gooder\" is the comparative of \"good\".",
        explanation: "The irregular comparative is \"better\", not \"gooder\".",
        answers: [
          { content: "True", isCorrect: false },
          { content: "False", isCorrect: true },
        ],
      },
    ],
  },
  {
    slug: "modal-verbs-quiz",
    title: "Modal Verbs — Mini Quiz",
    description: "should / must / can for advice and obligation.",
    questions: [
      {
        type: "multiple_choice",
        prompt: "You ______ drink more water.",
        explanation: "\"Should\" is the usual modal for advice.",
        answers: [
          { content: "should", isCorrect: true },
          { content: "should to", isCorrect: false },
          { content: "must to", isCorrect: false },
          { content: "can to", isCorrect: false },
        ],
      },
      {
        type: "true_false",
        prompt: "After a modal verb you use \"to\" + verb (\"must to go\").",
        explanation: "Modals take the base verb with no \"to\": \"must go\".",
        answers: [
          { content: "True", isCorrect: false },
          { content: "False", isCorrect: true },
        ],
      },
      {
        type: "fill_blank",
        prompt: "______ I open the window?",
        explanation: "Asking permission politely: \"Can\" or \"May\". Accepted: \"Can\".",
        answers: [{ content: "Can", isCorrect: true }],
      },
    ],
  },
];
