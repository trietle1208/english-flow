import { createHash } from "node:crypto";
import type { cefrLevelEnum } from "@/db/schema/enums";
import type {
  GrammarErrorType,
  GrammarExampleHighlight,
  GrammarLessonBody,
  GrammarTopicCategory,
} from "@/db/schema/grammar";
import type { QuizSeed } from "./quizzes";

type CefrLevel = (typeof cefrLevelEnum.enumValues)[number];

export type GrammarRuleSeed = {
  /** Stable key within the topic for idempotent upserts. */
  key: string;
  titleEn: string;
  titleVi: string;
  pattern: string;
  explanationVi: string;
  orderIndex: number;
};

export type GrammarExampleSeed = {
  sentenceEn: string;
  sentenceVi: string;
  highlights: GrammarExampleHighlight[];
  level: CefrLevel;
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Optional rule `key` within the same topic. */
  ruleKey?: string;
};

export type GrammarMistakeSeed = {
  incorrectSentence: string;
  correctSentence: string;
  errorType: GrammarErrorType;
  explanationVi: string;
  severity: 1 | 2 | 3;
  level: CefrLevel;
};

export type GrammarTopicSeed = {
  slug: string;
  titleEn: string;
  titleVi: string;
  level: CefrLevel;
  category: GrammarTopicCategory;
  orderIndex: number;
  summaryVi: string;
  lesson: GrammarLessonBody;
  rules: GrammarRuleSeed[];
  examples: GrammarExampleSeed[];
  mistakes: GrammarMistakeSeed[];
  quiz: QuizSeed;
};

/** Internal provenance row — original EnglishFlow content, commercial OK. */
export const ENGLISHFLOW_ORIGINAL_SOURCE = {
  name: "EnglishFlow original",
  url: null as string | null,
  licenseCode: "PRODUCTION_ALLOWED" as const,
  attributionText: null as string | null,
  sourceVersion: "phase-16-v3",
};

/** Deterministic hash for example dedupe (normalized lowercase EN sentence). */
export function grammarExampleHash(sentenceEn: string): string {
  const normalized = sentenceEn.trim().toLowerCase().replace(/\s+/g, " ");
  return createHash("sha256").update(normalized).digest("hex");
}

/**
 * Phase 16 / Prompt 1 MVP: 3 topics, normalized content + shared quiz engine.
 * Course lessons still reference `present-simple-quiz` and `past-simple-quiz`.
 */
export const grammarTopicsSeed: GrammarTopicSeed[] = [
  {
    slug: "present-simple",
    titleEn: "Present Simple",
    titleVi: "Thì hiện tại đơn",
    level: "A1",
    category: "verb_tenses",
    orderIndex: 1,
    summaryVi:
      "Dùng thì hiện tại đơn để nói về thói quen, lịch trình cố định và sự thật luôn đúng.",
    lesson: {
      when_to_use:
        "Khi nói về thói quen hàng ngày, lịch trình lặp lại, hoặc sự thật khoa học / luôn đúng.",
      when_not_to_use:
        "Không dùng cho hành động đang xảy ra ngay lúc nói (dùng Present Continuous), cũng không dùng cho trải nghiệm gắn với hiện tại (Present Perfect).",
      formation: {
        affirmative: "I/you/we/they + V · he/she/it + V(s/es)",
        negative: "do/does + not + V (nguyên mẫu)",
        question: "Do/Does + subject + V (nguyên mẫu)?",
      },
      signal_words: ["always", "usually", "often", "sometimes", "never", "every day"],
      tips: [
        "Với he/she/it nhớ thêm -s/-es: works, goes, watches.",
        "Câu hỏi và phủ định: động từ chính luôn ở dạng nguyên mẫu (không thêm -s).",
      ],
    },
    rules: [
      {
        key: "affirmative",
        titleEn: "Affirmative form",
        titleVi: "Câu khẳng định",
        pattern: "Subject + V / V(s/es)",
        explanationVi:
          "Với I/you/we/they dùng động từ nguyên mẫu. Với he/she/it thêm -s hoặc -es. Ví dụ: I work · She works.",
        orderIndex: 1,
      },
      {
        key: "negative-questions",
        titleEn: "Negatives and questions",
        titleVi: "Phủ định và nghi vấn",
        pattern: "do/does + not + V · Do/Does + subject + V?",
        explanationVi:
          "Phủ định và câu hỏi dùng trợ động từ do/does; động từ chính luôn nguyên mẫu. He doesn't like… · Does she work here?",
        orderIndex: 2,
      },
    ],
    examples: [
      {
        sentenceEn: "I study English every day.",
        sentenceVi: "Tôi học tiếng Anh mỗi ngày.",
        highlights: [
          { text: "study", type: "grammar" },
          { text: "every day", type: "signal" },
        ],
        level: "A1",
        difficulty: 1,
        ruleKey: "affirmative",
      },
      {
        sentenceEn: "She works at a hospital.",
        sentenceVi: "Cô ấy làm việc ở bệnh viện.",
        highlights: [{ text: "works", type: "grammar" }],
        level: "A1",
        difficulty: 1,
        ruleKey: "affirmative",
      },
      {
        sentenceEn: "Water boils at 100 degrees Celsius.",
        sentenceVi: "Nước sôi ở 100 độ C.",
        highlights: [{ text: "boils", type: "grammar" }],
        level: "A1",
        difficulty: 2,
        ruleKey: "affirmative",
      },
      {
        sentenceEn: "They don't eat meat.",
        sentenceVi: "Họ không ăn thịt.",
        highlights: [{ text: "don't eat", type: "grammar" }],
        level: "A1",
        difficulty: 2,
        ruleKey: "negative-questions",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "She work at a hospital.",
        correctSentence: "She works at a hospital.",
        errorType: "subject_verb_agreement",
        explanationVi: "Với she phải thêm -s vào động từ: works, không phải work.",
        severity: 2,
        level: "A1",
      },
      {
        incorrectSentence: "He don't like coffee.",
        correctSentence: "He doesn't like coffee.",
        errorType: "subject_verb_agreement",
        explanationVi: "Ngôi thứ ba số ít dùng doesn't, không dùng don't.",
        severity: 2,
        level: "A1",
      },
    ],
    quiz: {
      slug: "present-simple-quiz",
      title: "Present Simple — Mini Quiz",
      description: "Test your understanding of the Present Simple tense.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "She ______ to work by bus every morning.",
          explanation: "Third-person singular (she) needs the -s ending: \"goes\".",
          answers: [
            { content: "goes", isCorrect: true },
            { content: "go", isCorrect: false },
            { content: "going", isCorrect: false },
            { content: "gone", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"They plays football on Sundays\" is correct.",
          explanation:
            "\"They\" is plural, so the verb stays in base form: \"They play football.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "He ______ (not/like) spicy food.",
          explanation:
            "Negative present simple for he/she/it uses \"doesn't\" + base verb: \"doesn't like\".",
          answers: [{ content: "doesn't like", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "Which question is correctly formed?",
          explanation:
            "Questions use \"Do/Does\" + subject + base verb, without -s on the main verb.",
          answers: [
            { content: "Does she work here?", isCorrect: true },
            { content: "Does she works here?", isCorrect: false },
            { content: "She does work here?", isCorrect: false },
            { content: "Work she here?", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "past-simple",
    titleEn: "Past Simple",
    titleVi: "Thì quá khứ đơn",
    level: "A2",
    category: "verb_tenses",
    orderIndex: 2,
    summaryVi:
      "Dùng thì quá khứ đơn để kể sự việc đã xảy ra và kết thúc tại một thời điểm cụ thể trong quá khứ.",
    lesson: {
      when_to_use:
        "Khi kể chuyện đã xảy ra xong, có mốc thời gian rõ (yesterday, last week, in 2019).",
      when_not_to_use:
        "Không dùng khi nhấn mạnh trải nghiệm đến hiện tại mà không nêu thời điểm cụ thể — lúc đó thường dùng Present Perfect.",
      formation: {
        affirmative: "Subject + V2 (regular: -ed / irregular)",
        negative: "did + not + V (nguyên mẫu)",
        question: "Did + subject + V (nguyên mẫu)?",
      },
      signal_words: ["yesterday", "last week", "last year", "ago", "in 2019"],
      tips: [
        "Sau did/didn't động từ chính luôn nguyên mẫu: Did you go? (không went).",
        "Động từ bất quy tắc phải học thuộc (go → went, see → saw).",
      ],
    },
    rules: [
      {
        key: "past-forms",
        titleEn: "Past verb forms",
        titleVi: "Dạng quá khứ của động từ",
        pattern: "Subject + V2",
        explanationVi:
          "Động từ có quy tắc thêm -ed. Động từ bất quy tắc đổi dạng riêng (go → went). Cả câu khẳng định đều dùng V2.",
        orderIndex: 1,
      },
      {
        key: "past-aux",
        titleEn: "Did for negatives and questions",
        titleVi: "Dùng did cho phủ định và nghi vấn",
        pattern: "did + not + V · Did + subject + V?",
        explanationVi:
          "Phủ định và câu hỏi dùng did; động từ chính trở lại nguyên mẫu. I didn't see her · Did you finish?",
        orderIndex: 2,
      },
    ],
    examples: [
      {
        sentenceEn: "I visited my grandparents last weekend.",
        sentenceVi: "Cuối tuần trước tôi đã thăm ông bà.",
        highlights: [
          { text: "visited", type: "grammar" },
          { text: "last weekend", type: "signal" },
        ],
        level: "A2",
        difficulty: 1,
        ruleKey: "past-forms",
      },
      {
        sentenceEn: "She didn't go to school yesterday.",
        sentenceVi: "Hôm qua cô ấy không đến trường.",
        highlights: [
          { text: "didn't go", type: "grammar" },
          { text: "yesterday", type: "signal" },
        ],
        level: "A2",
        difficulty: 2,
        ruleKey: "past-aux",
      },
      {
        sentenceEn: "Did you watch the match last night?",
        sentenceVi: "Tối qua bạn có xem trận đấu không?",
        highlights: [
          { text: "Did you watch", type: "grammar" },
          { text: "last night", type: "signal" },
        ],
        level: "A2",
        difficulty: 2,
        ruleKey: "past-aux",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "I didn't went to the party.",
        correctSentence: "I didn't go to the party.",
        errorType: "verb_tense",
        explanationVi: "Sau didn't phải dùng nguyên mẫu go, không dùng went.",
        severity: 2,
        level: "A2",
      },
      {
        incorrectSentence: "Did she saw the movie?",
        correctSentence: "Did she see the movie?",
        errorType: "verb_tense",
        explanationVi: "Sau Did động từ chính ở nguyên mẫu: see, không phải saw.",
        severity: 2,
        level: "A2",
      },
    ],
    quiz: {
      slug: "past-simple-quiz",
      title: "Past Simple — Mini Quiz",
      description: "Test your understanding of the Past Simple tense.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "They ______ to Da Nang last summer.",
          explanation: "A finished action at a specific past time uses the past simple: \"went\".",
          answers: [
            { content: "went", isCorrect: true },
            { content: "go", isCorrect: false },
            { content: "goes", isCorrect: false },
            { content: "going", isCorrect: false },
          ],
        },
        {
          type: "fill_blank",
          prompt: "She ______ (not/finish) the report yesterday.",
          explanation: "Past simple negative: \"didn't\" + base verb → \"didn't finish\".",
          answers: [{ content: "didn't finish", isCorrect: true }],
        },
        {
          type: "true_false",
          prompt: "\"Did you went home early?\" is correct.",
          explanation: "After \"did\", use the base verb: \"Did you go home early?\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
      ],
    },
  },
  {
    slug: "present-perfect",
    titleEn: "Present Perfect",
    titleVi: "Thì hiện tại hoàn thành",
    level: "B1",
    category: "verb_tenses",
    orderIndex: 3,
    summaryVi:
      "Dùng thì hiện tại hoàn thành để nói về trải nghiệm hoặc kết quả vẫn liên quan đến hiện tại, thường không nêu thời điểm cụ thể.",
    lesson: {
      when_to_use:
        "Khi nói về trải nghiệm đời sống (ever/never), việc vừa xảy ra còn ảnh hưởng hiện tại, hoặc khoảng thời gian chưa kết thúc (this week, today).",
      when_not_to_use:
        "Không dùng với mốc thời gian quá khứ cụ thể như yesterday / in 2019 — lúc đó dùng Past Simple.",
      formation: {
        affirmative: "have/has + V3 (past participle)",
        negative: "have/has + not + V3",
        question: "Have/Has + subject + V3?",
      },
      signal_words: ["ever", "never", "already", "yet", "just", "since", "for"],
      tips: [
        "Have/has + quá khứ phân từ (V3), không phải V2: have gone (không have went).",
        "Đừng nhầm với Past Simple: Present Perfect không kèm yesterday/last year.",
      ],
    },
    rules: [
      {
        key: "have-v3",
        titleEn: "Have/has + past participle",
        titleVi: "Have/has + quá khứ phân từ",
        pattern: "have/has + V3",
        explanationVi:
          "Khẳng định: I have finished · She has lived here for years. Phủ định và nghi vấn giữ have/has + V3.",
        orderIndex: 1,
      },
    ],
    examples: [
      {
        sentenceEn: "I have never eaten sushi.",
        sentenceVi: "Tôi chưa từng ăn sushi.",
        highlights: [
          { text: "have never eaten", type: "grammar" },
          { text: "never", type: "signal" },
        ],
        level: "B1",
        difficulty: 2,
        ruleKey: "have-v3",
      },
      {
        sentenceEn: "She has already finished her homework.",
        sentenceVi: "Cô ấy đã làm xong bài tập rồi.",
        highlights: [
          { text: "has already finished", type: "grammar" },
          { text: "already", type: "signal" },
        ],
        level: "B1",
        difficulty: 2,
        ruleKey: "have-v3",
      },
      {
        sentenceEn: "Have you ever been to Hanoi?",
        sentenceVi: "Bạn đã từng đến Hà Nội chưa?",
        highlights: [
          { text: "Have you ever been", type: "grammar" },
          { text: "ever", type: "signal" },
        ],
        level: "B1",
        difficulty: 3,
        ruleKey: "have-v3",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "I have seen him yesterday.",
        correctSentence: "I saw him yesterday.",
        errorType: "verb_tense",
        explanationVi:
          "Có yesterday (mốc quá khứ cụ thể) thì dùng Past Simple, không dùng Present Perfect.",
        severity: 3,
        level: "B1",
      },
    ],
    quiz: {
      slug: "present-perfect-quiz",
      title: "Present Perfect — Mini Quiz",
      description: "Test your understanding of the Present Perfect tense.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "I ______ never ______ to Japan.",
          explanation: "Present perfect experience: \"have\" + past participle \"been\".",
          answers: [
            { content: "have / been", isCorrect: true },
            { content: "has / been", isCorrect: false },
            { content: "had / been", isCorrect: false },
            { content: "have / went", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"I have finished my homework yesterday\" is correct.",
          explanation:
            "\"Yesterday\" marks a finished past time, so use Past Simple: \"I finished my homework yesterday.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "She ______ (live) here since 2020.",
          explanation: "A situation that started in the past and continues: \"has lived\".",
          answers: [{ content: "has lived", isCorrect: true }],
        },
      ],
    },
  },
];

/** Topic relation edges (Prompt 1 seed). */
export const grammarTopicRelationsSeed: Array<{
  fromSlug: string;
  toSlug: string;
  relationType: "prerequisite" | "related" | "confused_with";
}> = [
  {
    fromSlug: "present-simple",
    toSlug: "present-perfect",
    relationType: "prerequisite",
  },
  {
    fromSlug: "present-perfect",
    toSlug: "past-simple",
    relationType: "confused_with",
  },
  {
    fromSlug: "past-simple",
    toSlug: "present-perfect",
    relationType: "confused_with",
  },
];
