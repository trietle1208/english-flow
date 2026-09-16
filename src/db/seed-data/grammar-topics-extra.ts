import type { GrammarTopicSeed } from "./grammar";

type ExampleSeed = GrammarTopicSeed["examples"][number];

function attributed(
  example: ExampleSeed,
  sourceKey: "tatoeba" | "talpco",
  sourceRecordId: string,
) {
  return { ...example, sourceKey, sourceRecordId };
}

function multipleChoice(
  prompt: string,
  explanation: string,
  correct: string,
  distractors: [string, string, string],
) {
  return {
    type: "multiple_choice" as const,
    prompt,
    explanation,
    answers: [
      { content: correct, isCorrect: true },
      ...distractors.map((content) => ({ content, isCorrect: false })),
    ],
  };
}

function fillBlank(
  prompt: string,
  explanation: string,
  answer: string,
) {
  return {
    type: "fill_blank" as const,
    prompt,
    explanation,
    answers: [{ content: answer, isCorrect: true }],
  };
}

export const grammarTopicsExtraSeed: GrammarTopicSeed[] = [
  {
    slug: "articles",
    titleEn: "Articles",
    titleVi: "Mạo từ a, an, the",
    level: "A1",
    category: "articles",
    orderIndex: 2,
    summaryVi:
      "A/an giới thiệu một danh từ đếm được số ít chưa xác định; the chỉ người hoặc vật đã xác định. Danh từ số nhiều và không đếm được đôi khi không cần mạo từ.",
    lesson: {
      when_to_use:
        "Dùng a/an khi nhắc lần đầu đến một người hoặc vật chưa cụ thể. Dùng the khi người nghe biết rõ đối tượng hoặc đối tượng là duy nhất.",
      when_not_to_use:
        "Không dùng a/an với danh từ số nhiều hay không đếm được. Không tự động thêm the trước tên riêng hoặc khi nói chung về một khái niệm.",
      formation: {
        affirmative: "a/an + singular countable noun · the + specific noun",
        negative: "not + a/an/the + noun",
        question: "question word/auxiliary + a/an/the + noun?",
      },
      signal_words: ["one of many", "first mention", "already known", "only", "same"],
      tips: [
        "Chọn a/an theo âm đầu, không chỉ theo chữ cái: an hour nhưng a university.",
        "Nhắc lần đầu dùng a/an; nhắc lại cùng đối tượng thường dùng the.",
      ],
    },
    rules: [
      {
        key: "indefinite",
        titleEn: "Indefinite articles",
        titleVi: "Mạo từ không xác định",
        pattern: "a + consonant sound · an + vowel sound",
        explanationVi:
          "A/an đứng trước danh từ đếm được số ít khi đối tượng chưa xác định. An đi trước âm nguyên âm, vì vậy cách phát âm quyết định lựa chọn.",
        orderIndex: 1,
      },
      {
        key: "definite-zero",
        titleEn: "The and zero article",
        titleVi: "The và trường hợp không dùng mạo từ",
        pattern: "the + specific noun · Ø + general plural/uncountable noun",
        explanationVi:
          "The dùng cho đối tượng cụ thể hoặc duy nhất trong ngữ cảnh. Khi nói chung bằng danh từ số nhiều hay không đếm được, ta thường bỏ mạo từ.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "My father is a teacher.",
          sentenceVi: "Bố tôi là giáo viên.",
          highlights: [{ text: "a teacher", type: "grammar" }],
          level: "A1",
          difficulty: 1,
          ruleKey: "indefinite",
        },
        "talpco",
        "1178",
      ),
      attributed(
        {
          sentenceEn: "There is a book on the desk.",
          sentenceVi: "Trên bàn có quyển sách.",
          highlights: [
            { text: "a book", type: "grammar" },
            { text: "the desk", type: "grammar" },
          ],
          level: "A1",
          difficulty: 2,
          ruleKey: "definite-zero",
        },
        "talpco",
        "1244",
      ),
      {
        sentenceEn: "She bought an umbrella, and the umbrella is red.",
        sentenceVi: "Cô ấy mua một chiếc ô, và chiếc ô đó màu đỏ.",
        highlights: [
          { text: "an umbrella", type: "grammar" },
          { text: "the umbrella", type: "grammar" },
        ],
        level: "A1",
        difficulty: 2,
        ruleKey: "definite-zero",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "He is an university student.",
        correctSentence: "He is a university student.",
        errorType: "article",
        explanationVi:
          "University bắt đầu bằng âm /j/, là âm phụ âm, nên dùng a chứ không dùng an.",
        severity: 2,
        level: "A1",
      },
      {
        incorrectSentence: "I like the music in general.",
        correctSentence: "I like music in general.",
        errorType: "article",
        explanationVi:
          "Music là danh từ không đếm được và đang được nói theo nghĩa chung, vì vậy không cần the.",
        severity: 2,
        level: "A1",
      },
    ],
    quiz: {
      slug: "articles-quiz",
      title: "Articles — Mini Quiz",
      description: "Practice a, an, the, and the zero article.",
      questions: [
        multipleChoice("She is ______ honest person.", "\"Honest\" begins with a vowel sound.", "an", ["a", "the", "no article"]),
        fillBlank("I saw ______ dog. The dog was friendly.", "This is the first mention of one dog.", "a"),
        multipleChoice("______ sun rises in the east.", "A unique object takes the definite article.", "The", ["A", "An", "No article"]),
        fillBlank("Please close ______ door.", "The context identifies the particular door.", "the"),
      ],
    },
  },
  {
    slug: "present-continuous",
    titleEn: "Present Continuous",
    titleVi: "Thì hiện tại tiếp diễn",
    level: "A1",
    category: "verb_tenses",
    orderIndex: 3,
    summaryVi:
      "Thì hiện tại tiếp diễn diễn tả việc đang xảy ra quanh thời điểm nói hoặc một tình huống tạm thời. Cấu trúc chính là be + động từ thêm -ing.",
    lesson: {
      when_to_use:
        "Dùng cho hành động đang diễn ra ngay bây giờ, tình huống tạm thời, hoặc kế hoạch cá nhân đã sắp xếp.",
      when_not_to_use:
        "Không dùng cho thói quen đều đặn. Các động từ chỉ trạng thái như know, need, believe thường không dùng ở dạng tiếp diễn.",
      formation: {
        affirmative: "subject + am/is/are + V-ing",
        negative: "subject + am/is/are not + V-ing",
        question: "Am/Is/Are + subject + V-ing?",
      },
      signal_words: ["now", "right now", "at the moment", "today", "this week"],
      tips: [
        "Không bỏ động từ be trước V-ing.",
        "Một số động từ đổi chính tả: make → making, run → running, lie → lying.",
      ],
    },
    rules: [
      {
        key: "be-ing",
        titleEn: "Be plus -ing",
        titleVi: "Be kết hợp với V-ing",
        pattern: "am/is/are + V-ing",
        explanationVi:
          "Chia am/is/are theo chủ ngữ rồi thêm -ing vào động từ chính. Phủ định đặt not sau be; câu hỏi đưa be lên trước chủ ngữ.",
        orderIndex: 1,
      },
      {
        key: "temporary-now",
        titleEn: "Actions now and temporary situations",
        titleVi: "Việc đang diễn ra và tình huống tạm thời",
        pattern: "be + V-ing + now/temporary time phrase",
        explanationVi:
          "Dạng tiếp diễn nhấn mạnh hoạt động có tính tạm thời hoặc đang trong quá trình. Nó khác hiện tại đơn ở chỗ không diễn tả thói quen ổn định.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "I am reading a book now.",
          sentenceVi: "Tôi đang đọc một cuốn sách.",
          highlights: [
            { text: "am reading", type: "grammar" },
            { text: "now", type: "signal" },
          ],
          level: "A1",
          difficulty: 1,
          ruleKey: "temporary-now",
        },
        "tatoeba",
        "257629",
      ),
      attributed(
        {
          sentenceEn: "The sun is rising.",
          sentenceVi: "Mặt trời đang lên.",
          highlights: [{ text: "is rising", type: "grammar" }],
          level: "A1",
          difficulty: 2,
          ruleKey: "be-ing",
        },
        "tatoeba",
        "281049",
      ),
      {
        sentenceEn: "She is staying with her aunt this week.",
        sentenceVi: "Tuần này cô ấy đang ở cùng dì.",
        highlights: [
          { text: "is staying", type: "grammar" },
          { text: "this week", type: "signal" },
        ],
        level: "A1",
        difficulty: 2,
        ruleKey: "temporary-now",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "He working now.",
        correctSentence: "He is working now.",
        errorType: "verb_tense",
        explanationVi: "Hiện tại tiếp diễn bắt buộc có động từ be; với he dùng is.",
        severity: 2,
        level: "A1",
      },
      {
        incorrectSentence: "They are play football.",
        correctSentence: "They are playing football.",
        errorType: "verb_tense",
        explanationVi: "Sau are phải dùng dạng V-ing: playing.",
        severity: 2,
        level: "A1",
      },
    ],
    quiz: {
      slug: "present-continuous-quiz",
      title: "Present Continuous — Mini Quiz",
      description: "Practice actions happening now and temporary situations.",
      questions: [
        multipleChoice("Look! The baby ______.", "An action happening now uses is + V-ing.", "is sleeping", ["sleeps", "sleep", "sleeping"]),
        fillBlank("We ______ (study) at the moment.", "Use are with we and the -ing form.", "are studying"),
        multipleChoice("Which sentence describes a temporary situation?", "This month marks a limited period.", "I am working from home this month.", ["I work every Monday.", "Water boils at 100°C.", "She knows the answer."]),
        fillBlank("______ she ______ (cook) now?", "Move is before the subject in a question.", "Is she cooking"),
      ],
    },
  },
  {
    slug: "past-continuous",
    titleEn: "Past Continuous",
    titleVi: "Thì quá khứ tiếp diễn",
    level: "A2",
    category: "verb_tenses",
    orderIndex: 5,
    summaryVi:
      "Thì quá khứ tiếp diễn mô tả một hành động đang diễn ra tại một thời điểm trong quá khứ. Nó thường tạo bối cảnh cho một hành động ngắn hơn xen vào.",
    lesson: {
      when_to_use:
        "Dùng để nói việc đang diễn ra ở một mốc quá khứ, hai việc cùng diễn ra, hoặc bối cảnh khi một sự việc khác xảy đến.",
      when_not_to_use:
        "Không dùng cho một sự việc ngắn đã hoàn tất đơn lẻ. Khi chỉ kể chuỗi hành động đã xong, dùng quá khứ đơn.",
      formation: {
        affirmative: "subject + was/were + V-ing",
        negative: "subject + was/were not + V-ing",
        question: "Was/Were + subject + V-ing?",
      },
      signal_words: ["while", "when", "at 8 p.m. yesterday", "all evening"],
      tips: [
        "I/he/she/it đi với was; you/we/they đi với were.",
        "Hành động nền thường dùng quá khứ tiếp diễn; việc xen vào thường dùng quá khứ đơn.",
      ],
    },
    rules: [
      {
        key: "past-in-progress",
        titleEn: "Action in progress in the past",
        titleVi: "Hành động đang diễn ra trong quá khứ",
        pattern: "was/were + V-ing",
        explanationVi:
          "Cấu trúc này đặt người nghe vào giữa một hành động ở mốc quá khứ. Mốc thời gian có thể được nêu trực tiếp hoặc hiểu từ ngữ cảnh.",
        orderIndex: 1,
      },
      {
        key: "interrupted-action",
        titleEn: "Interrupted past action",
        titleVi: "Hành động quá khứ bị xen vào",
        pattern: "was/were + V-ing when + Past Simple",
        explanationVi:
          "Việc đang kéo dài dùng quá khứ tiếp diễn; sự việc ngắn xảy đến dùng quá khứ đơn. While thường nối hai hoạt động cùng diễn ra.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "When I was eating dinner, my friend came over to my home.",
          sentenceVi: "Lúc tôi đang ăn cơm thì bạn tới nhà.",
          highlights: [
            { text: "was eating", type: "grammar" },
            { text: "When", type: "signal" },
          ],
          level: "A2",
          difficulty: 2,
          ruleKey: "interrupted-action",
        },
        "talpco",
        "2178",
      ),
      attributed(
        {
          sentenceEn: "Many children were playing in the park.",
          sentenceVi: "Nhiều đứa trẻ đã chơi ở trong công viên.",
          highlights: [{ text: "were playing", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "past-in-progress",
        },
        "tatoeba",
        "41032",
      ),
      {
        sentenceEn: "I was walking home when it started to rain.",
        sentenceVi: "Tôi đang đi bộ về nhà thì trời bắt đầu mưa.",
        highlights: [
          { text: "was walking", type: "grammar" },
          { text: "when", type: "signal" },
        ],
        level: "A2",
        difficulty: 2,
        ruleKey: "interrupted-action",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "They was watching TV.",
        correctSentence: "They were watching TV.",
        errorType: "subject_verb_agreement",
        explanationVi: "Chủ ngữ they đi với were, không đi với was.",
        severity: 2,
        level: "A2",
      },
      {
        incorrectSentence: "I was cook when she called.",
        correctSentence: "I was cooking when she called.",
        errorType: "verb_tense",
        explanationVi: "Sau was phải dùng động từ dạng V-ing: cooking.",
        severity: 2,
        level: "A2",
      },
    ],
    quiz: {
      slug: "past-continuous-quiz",
      title: "Past Continuous — Mini Quiz",
      description: "Practice ongoing and interrupted actions in the past.",
      questions: [
        multipleChoice("At 9 last night, I ______.", "The action was in progress at a past time.", "was studying", ["studied", "am studying", "were studying"]),
        fillBlank("They ______ (play) when the lights went out.", "Use were + playing with they.", "were playing"),
        multipleChoice("While she ______, the phone rang.", "The longer background action takes past continuous.", "was sleeping", ["slept", "is sleeping", "were sleeping"]),
        fillBlank("What ______ you ______ (do) at noon?", "A past continuous question begins with were for you.", "were you doing"),
      ],
    },
  },
  {
    slug: "future-will-going-to",
    titleEn: "Future: Will and Be Going To",
    titleVi: "Tương lai với will và be going to",
    level: "A2",
    category: "verb_tenses",
    orderIndex: 6,
    summaryVi:
      "Will thường diễn tả quyết định ngay lúc nói, lời hứa hoặc dự đoán mang tính ý kiến. Be going to dùng cho dự định đã có và dự đoán dựa trên dấu hiệu hiện tại.",
    lesson: {
      when_to_use:
        "Dùng will cho quyết định tức thời, lời đề nghị, lời hứa và dự đoán chủ quan. Dùng be going to cho kế hoạch đã định hoặc khi có bằng chứng rõ.",
      when_not_to_use:
        "Không dùng will chỉ vì câu nói về tương lai; cần xét người nói đã có kế hoạch hay chưa. Với lịch trình cố định, hiện tại đơn thường tự nhiên hơn.",
      formation: {
        affirmative: "subject + will + V · subject + am/is/are going to + V",
        negative: "subject + will not + V · subject + be not going to + V",
        question: "Will + subject + V? · Be + subject + going to + V?",
      },
      signal_words: ["tomorrow", "next week", "I think", "probably", "look!"],
      tips: [
        "Sau will và going to đều dùng động từ nguyên mẫu.",
        "Nhìn dấu hiệu hiện tại để dự đoán thì ưu tiên be going to.",
      ],
    },
    rules: [
      {
        key: "will",
        titleEn: "Spontaneous decisions and predictions",
        titleVi: "Quyết định tức thời và dự đoán",
        pattern: "will + base verb",
        explanationVi:
          "Will phù hợp khi quyết định được đưa ra ngay lúc nói hoặc khi người nói nêu dự đoán, lời hứa. Will không thay đổi theo chủ ngữ.",
        orderIndex: 1,
      },
      {
        key: "going-to",
        titleEn: "Plans and evidence-based predictions",
        titleVi: "Dự định và dự đoán có căn cứ",
        pattern: "am/is/are going to + base verb",
        explanationVi:
          "Be going to cho thấy ý định đã hình thành trước lúc nói. Nó cũng dùng khi dấu hiệu hiện tại khiến kết quả tương lai dễ thấy.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "It will rain tomorrow.",
          sentenceVi: "Mai trời có thể sẽ mưa.",
          highlights: [
            { text: "will rain", type: "grammar" },
            { text: "tomorrow", type: "signal" },
          ],
          level: "A2",
          difficulty: 1,
          ruleKey: "will",
        },
        "tatoeba",
        "1345228",
      ),
      attributed(
        {
          sentenceEn: "Which shoes are you going to buy?",
          sentenceVi: "Bạn sẽ mua đôi giày nào?",
          highlights: [{ text: "are you going to buy", type: "grammar" }],
          level: "A2",
          difficulty: 2,
          ruleKey: "going-to",
        },
        "talpco",
        "1286",
      ),
      attributed(
        {
          sentenceEn: "I will go home.",
          sentenceVi: "Tôi sẽ về nhà.",
          highlights: [{ text: "will go", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "will",
        },
        "talpco",
        "1367",
      ),
    ],
    mistakes: [
      {
        incorrectSentence: "She will goes tomorrow.",
        correctSentence: "She will go tomorrow.",
        errorType: "verb_tense",
        explanationVi: "Sau will luôn dùng động từ nguyên mẫu go, không thêm -s.",
        severity: 2,
        level: "A2",
      },
      {
        incorrectSentence: "They going to travel next week.",
        correctSentence: "They are going to travel next week.",
        errorType: "verb_tense",
        explanationVi: "Cấu trúc be going to cần are với chủ ngữ they.",
        severity: 2,
        level: "A2",
      },
    ],
    quiz: {
      slug: "future-will-going-to-quiz",
      title: "Will and Going To — Mini Quiz",
      description: "Choose the natural future form for each context.",
      questions: [
        multipleChoice("The phone is ringing. I ______ answer it.", "This is a decision made at the moment of speaking.", "will", ["am going", "was going to", "do"]),
        fillBlank("Look at those clouds! It ______ (rain).", "Visible evidence favors be going to.", "is going to rain"),
        multipleChoice("We bought the tickets yesterday. We ______ fly on Friday.", "The arrangement already exists.", "are going to", ["will suddenly", "were", "have"]),
        fillBlank("I promise I ______ (help) you.", "A promise commonly uses will.", "will help"),
      ],
    },
  },
  {
    slug: "modals-can-could",
    titleEn: "Can and Could",
    titleVi: "Động từ khuyết thiếu can và could",
    level: "A2",
    category: "modals",
    orderIndex: 7,
    summaryVi:
      "Can và could diễn tả khả năng, sự cho phép và lời yêu cầu. Could còn nói khả năng trong quá khứ hoặc giúp lời đề nghị lịch sự hơn.",
    lesson: {
      when_to_use:
        "Dùng can cho khả năng hiện tại và lời xin phép thân mật. Dùng could cho khả năng chung trong quá khứ, khả năng chưa chắc chắn hoặc yêu cầu lịch sự.",
      when_not_to_use:
        "Không thêm to hoặc chia động từ sau can/could. Khi nói một lần thành công cụ thể trong quá khứ, was/were able to thường rõ nghĩa hơn could.",
      formation: {
        affirmative: "subject + can/could + base verb",
        negative: "subject + cannot/could not + base verb",
        question: "Can/Could + subject + base verb?",
      },
      signal_words: ["now", "when I was young", "please", "possibly"],
      tips: [
        "Can/could giữ nguyên với mọi chủ ngữ.",
        "Could you…? lịch sự hơn Can you…? trong lời yêu cầu.",
      ],
    },
    rules: [
      {
        key: "ability",
        titleEn: "Ability",
        titleVi: "Khả năng",
        pattern: "can/could + base verb",
        explanationVi:
          "Can nói khả năng hiện tại; could thường nói khả năng chung trong quá khứ. Động từ theo sau luôn ở nguyên mẫu không to.",
        orderIndex: 1,
      },
      {
        key: "permission-request",
        titleEn: "Permission and requests",
        titleVi: "Xin phép và yêu cầu",
        pattern: "Can/Could + subject + base verb?",
        explanationVi:
          "Can dùng trong tình huống gần gũi; could tạo sắc thái mềm và lịch sự hơn. Could ở đây không mang nghĩa quá khứ.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "Can you swim?",
          sentenceVi: "Bạn có biết bơi không?",
          highlights: [{ text: "Can you swim", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "ability",
        },
        "tatoeba",
        "16300",
      ),
      attributed(
        {
          sentenceEn: "We can study here.",
          sentenceVi: "Có thể học bài ở đây.",
          highlights: [{ text: "can study", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "permission-request",
        },
        "talpco",
        "1474",
      ),
      attributed(
        {
          sentenceEn: "Mr Tanaka can play tennis.",
          sentenceVi: "Anh Tanaka có thể chơi ten-nít.",
          highlights: [{ text: "can play", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "ability",
        },
        "talpco",
        "1881",
      ),
    ],
    mistakes: [
      {
        incorrectSentence: "She can to drive.",
        correctSentence: "She can drive.",
        errorType: "modal",
        explanationVi: "Sau can dùng động từ nguyên mẫu không to: can drive.",
        severity: 2,
        level: "A2",
      },
      {
        incorrectSentence: "He cans swim well.",
        correctSentence: "He can swim well.",
        errorType: "modal",
        explanationVi: "Động từ khuyết thiếu can không thêm -s với ngôi thứ ba số ít.",
        severity: 2,
        level: "A2",
      },
    ],
    quiz: {
      slug: "modals-can-could-quiz",
      title: "Can and Could — Mini Quiz",
      description: "Practice ability, permission, and polite requests.",
      questions: [
        multipleChoice("When I was five, I ______ read simple books.", "Could expresses general ability in the past.", "could", ["can", "could to", "cans"]),
        fillBlank("______ you open the window, please?", "Could makes the request polite.", "Could"),
        multipleChoice("Which sentence is correct?", "A modal is followed by the base verb.", "She can speak French.", ["She can speaks French.", "She can to speak French.", "She cans speak French."]),
        fillBlank("He ______ (not/can) come today.", "The negative form can be written cannot.", "cannot"),
      ],
    },
  },
  {
    slug: "comparatives-superlatives",
    titleEn: "Comparatives and Superlatives",
    titleVi: "So sánh hơn và so sánh nhất",
    level: "A2",
    category: "other",
    orderIndex: 8,
    summaryVi:
      "So sánh hơn đặt hai đối tượng cạnh nhau; so sánh nhất chọn một đối tượng nổi bật trong nhóm. Dạng từ phụ thuộc độ dài và chính tả của tính từ.",
    lesson: {
      when_to_use:
        "Dùng comparative + than để so hai đối tượng. Dùng the + superlative khi một đối tượng có mức độ cao hoặc thấp nhất trong nhóm.",
      when_not_to_use:
        "Không dùng đồng thời more với đuôi -er hoặc most với đuôi -est. Không quên the trước dạng so sánh nhất thông thường.",
      formation: {
        affirmative: "adjective-er + than · more + adjective + than · the adjective-est/most adjective",
        negative: "not as + adjective + as · less + adjective + than",
        question: "Which/Who + be + comparative/superlative?",
      },
      signal_words: ["than", "of all", "in the group", "the most", "the least"],
      tips: [
        "Tính từ ngắn thường thêm -er/-est; tính từ dài thường dùng more/most.",
        "Học riêng các dạng bất quy tắc: good → better → best; bad → worse → worst.",
      ],
    },
    rules: [
      {
        key: "comparative",
        titleEn: "Comparative forms",
        titleVi: "Dạng so sánh hơn",
        pattern: "short adjective-er / more + long adjective + than",
        explanationVi:
          "Dùng so sánh hơn khi đặt hai người hoặc vật cạnh nhau. Than giới thiệu đối tượng được dùng làm mốc so sánh.",
        orderIndex: 1,
      },
      {
        key: "superlative",
        titleEn: "Superlative forms",
        titleVi: "Dạng so sánh nhất",
        pattern: "the + adjective-est / the most + adjective",
        explanationVi:
          "So sánh nhất cần một nhóm từ ba đối tượng trở lên hoặc một phạm vi rõ. The thường đứng trước tính từ so sánh nhất.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "Dogs are bigger than cats.",
          sentenceVi: "Những con chó bự hơn những con mèo.",
          highlights: [
            { text: "bigger", type: "grammar" },
            { text: "than", type: "signal" },
          ],
          level: "A2",
          difficulty: 1,
          ruleKey: "comparative",
        },
        "tatoeba",
        "13097356",
      ),
      attributed(
        {
          sentenceEn: "Love is the most beautiful feeling.",
          sentenceVi: "Tình yêu là cảm xúc đẹp đẽ nhất.",
          highlights: [{ text: "the most beautiful", type: "grammar" }],
          level: "A2",
          difficulty: 2,
          ruleKey: "superlative",
        },
        "tatoeba",
        "14026834",
      ),
      {
        sentenceEn: "This exercise is easier than the last one.",
        sentenceVi: "Bài tập này dễ hơn bài trước.",
        highlights: [
          { text: "easier", type: "grammar" },
          { text: "than", type: "signal" },
        ],
        level: "A2",
        difficulty: 2,
        ruleKey: "comparative",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "This bag is more cheaper.",
        correctSentence: "This bag is cheaper.",
        errorType: "other",
        explanationVi: "Cheaper đã là dạng so sánh hơn, vì vậy không thêm more.",
        severity: 2,
        level: "A2",
      },
      {
        incorrectSentence: "She is tallest student in the class.",
        correctSentence: "She is the tallest student in the class.",
        errorType: "other",
        explanationVi: "Dạng so sánh nhất tallest cần the ở phía trước.",
        severity: 2,
        level: "A2",
      },
    ],
    quiz: {
      slug: "comparatives-superlatives-quiz",
      title: "Comparatives and Superlatives — Mini Quiz",
      description: "Practice comparing people, places, and things.",
      questions: [
        multipleChoice("A train is usually ______ than a bus.", "Fast is a short adjective, so add -er.", "faster", ["more fast", "fastest", "the faster"]),
        fillBlank("This is ______ (interesting) book in the series.", "A long adjective uses the most in the superlative.", "the most interesting"),
        multipleChoice("The weather today is ______ yesterday.", "Worse is the irregular comparative of bad.", "worse than", ["badder than", "the worst", "more worse than"]),
        fillBlank("My room is ______ (small) than yours.", "Small takes the -er comparative ending.", "smaller"),
      ],
    },
  },
  {
    slug: "prepositions-time-place",
    titleEn: "Prepositions of Time and Place",
    titleVi: "Giới từ chỉ thời gian và nơi chốn",
    level: "A2",
    category: "prepositions",
    orderIndex: 9,
    summaryVi:
      "In, on và at giúp xác định thời gian hoặc vị trí với mức độ cụ thể khác nhau. Người học nên ghi nhớ theo cụm và hình dung phạm vi từ rộng đến điểm.",
    lesson: {
      when_to_use:
        "Dùng in cho khoảng thời gian hoặc không gian rộng, on cho ngày và bề mặt, at cho thời điểm hay vị trí cụ thể.",
      when_not_to_use:
        "Không áp dụng quy tắc máy móc cho mọi cụm cố định. Một số cách nói như at night, on the bus cần được học nguyên cụm.",
      formation: {
        affirmative: "subject + verb + in/on/at + time/place",
        negative: "subject + do/be not + verb/complement + in/on/at + time/place",
        question: "When/Where + auxiliary + subject + verb?",
      },
      signal_words: ["in the morning", "on Monday", "at 7 o'clock", "in a city", "on a surface"],
      tips: [
        "Thời gian: in cho tháng/năm, on cho ngày, at cho giờ.",
        "Nơi chốn: in là bên trong, on là trên bề mặt, at là một điểm.",
      ],
    },
    rules: [
      {
        key: "time",
        titleEn: "In, on, and at for time",
        titleVi: "In, on, at với thời gian",
        pattern: "in + month/year/part of day · on + day/date · at + clock time",
        explanationVi:
          "In bao quát khoảng dài, on gắn với ngày cụ thể, còn at chỉ một thời điểm. Các cụm ngoại lệ thông dụng nên được ghi nhớ riêng.",
        orderIndex: 1,
      },
      {
        key: "place",
        titleEn: "In, on, and at for place",
        titleVi: "In, on, at với nơi chốn",
        pattern: "in + enclosed area · on + surface · at + point",
        explanationVi:
          "In nhấn mạnh ở bên trong một vùng; on nói sự tiếp xúc với bề mặt. At coi địa điểm như một điểm gặp hoặc hoạt động.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "I work in the morning.",
          sentenceVi: "Tôi làm việc vào buổi sáng.",
          highlights: [{ text: "in the morning", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "time",
        },
        "tatoeba",
        "455783",
      ),
      attributed(
        {
          sentenceEn: "I met him at the station.",
          sentenceVi: "Tôi đã gặp anh ấy ở nhà ga.",
          highlights: [{ text: "at the station", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "place",
        },
        "tatoeba",
        "260346",
      ),
      attributed(
        {
          sentenceEn: "There is a book on the desk.",
          sentenceVi: "Trên bàn có quyển sách.",
          highlights: [{ text: "on the desk", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "place",
        },
        "talpco",
        "1244",
      ),
    ],
    mistakes: [
      {
        incorrectSentence: "The meeting starts in 9 a.m.",
        correctSentence: "The meeting starts at 9 a.m.",
        errorType: "preposition",
        explanationVi: "Giờ cụ thể đi với at: at 9 a.m.",
        severity: 2,
        level: "A2",
      },
      {
        incorrectSentence: "I was born at July.",
        correctSentence: "I was born in July.",
        errorType: "preposition",
        explanationVi: "Tháng đi với in: in July.",
        severity: 2,
        level: "A2",
      },
    ],
    quiz: {
      slug: "prepositions-time-place-quiz",
      title: "Prepositions of Time and Place — Mini Quiz",
      description: "Practice in, on, and at in common contexts.",
      questions: [
        multipleChoice("The class begins ______ 8:30.", "Use at with a precise clock time.", "at", ["in", "on", "to"]),
        fillBlank("We have a test ______ Monday.", "Days of the week take on.", "on"),
        multipleChoice("The keys are ______ the drawer.", "The keys are inside an enclosed space.", "in", ["on", "at", "from"]),
        fillBlank("There is a picture ______ the wall.", "Use on for a surface.", "on"),
      ],
    },
  },
  {
    slug: "quantifiers",
    titleEn: "Quantifiers",
    titleVi: "Từ chỉ số lượng",
    level: "A2",
    category: "other",
    orderIndex: 10,
    summaryVi:
      "Từ chỉ số lượng cho biết nhiều, ít hoặc một phần của danh từ. Việc chọn từ phụ thuộc danh từ đếm được hay không đếm được và sắc thái khẳng định hay phủ định.",
    lesson: {
      when_to_use:
        "Dùng many/few với danh từ đếm được số nhiều; much/little với danh từ không đếm được. A lot of và some dùng được trong nhiều ngữ cảnh.",
      when_not_to_use:
        "Không dùng many trực tiếp với danh từ không đếm được hoặc much với danh từ đếm được số nhiều. Phân biệt few/little mang nghĩa gần như không đủ với a few/a little mang nghĩa vẫn có một ít.",
      formation: {
        affirmative: "some/a lot of/many/much/a few/a little + noun",
        negative: "not many/much · no + noun",
        question: "How many + plural noun? · How much + uncountable noun?",
      },
      signal_words: ["how many", "how much", "a lot of", "a few", "a little"],
      tips: [
        "Đếm được: many, a few; không đếm được: much, a little.",
        "A lot of dùng tự nhiên với cả hai loại danh từ trong câu khẳng định.",
      ],
    },
    rules: [
      {
        key: "countable",
        titleEn: "Quantifiers with countable nouns",
        titleVi: "Lượng từ với danh từ đếm được",
        pattern: "many/few/a few + plural countable noun",
        explanationVi:
          "Danh từ đếm được phải ở số nhiều sau many, few và a few. A few mang ý tích cực hơn few vì vẫn còn một lượng nhỏ.",
        orderIndex: 1,
      },
      {
        key: "uncountable",
        titleEn: "Quantifiers with uncountable nouns",
        titleVi: "Lượng từ với danh từ không đếm được",
        pattern: "much/little/a little + uncountable noun",
        explanationVi:
          "Much thường gặp trong câu hỏi và phủ định. A little cho biết vẫn còn một ít, còn little nhấn mạnh lượng đó không đủ.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "I paid a lot of money.",
          sentenceVi: "Tôi đã trả rất nhiều tiền.",
          highlights: [{ text: "a lot of", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "uncountable",
        },
        "tatoeba",
        "13870585",
      ),
      attributed(
        {
          sentenceEn: "How many handkerchiefs are there?",
          sentenceVi: "Ở chỗ đó có mấy cái khăn tay?",
          highlights: [{ text: "How many", type: "grammar" }],
          level: "A2",
          difficulty: 1,
          ruleKey: "countable",
        },
        "talpco",
        "1326",
      ),
      {
        sentenceEn: "We have a little time before the train leaves.",
        sentenceVi: "Chúng ta còn một ít thời gian trước khi tàu chạy.",
        highlights: [{ text: "a little time", type: "grammar" }],
        level: "A2",
        difficulty: 2,
        ruleKey: "uncountable",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "How much books do you have?",
        correctSentence: "How many books do you have?",
        errorType: "other",
        explanationVi: "Books là danh từ đếm được số nhiều nên dùng how many.",
        severity: 2,
        level: "A2",
      },
      {
        incorrectSentence: "I need a few water.",
        correctSentence: "I need a little water.",
        errorType: "other",
        explanationVi: "Water không đếm được nên dùng a little, không dùng a few.",
        severity: 2,
        level: "A2",
      },
    ],
    quiz: {
      slug: "quantifiers-quiz",
      title: "Quantifiers — Mini Quiz",
      description: "Choose quantifiers for countable and uncountable nouns.",
      questions: [
        multipleChoice("How ______ sugar do we need?", "Sugar is uncountable, so use much.", "much", ["many", "few", "a few"]),
        fillBlank("There are only ______ (a small number of) seats left.", "A few goes with plural countable nouns.", "a few"),
        multipleChoice("We don't have ______ information.", "Much is used with an uncountable noun in a negative sentence.", "much", ["many", "a few", "few"]),
        fillBlank("She has ______ friends in this city, so she is not lonely.", "A few means some, with a positive implication.", "a few"),
      ],
    },
  },
  {
    slug: "conditionals-zero-first",
    titleEn: "Zero and First Conditionals",
    titleVi: "Câu điều kiện loại 0 và loại 1",
    level: "A2",
    category: "clauses",
    orderIndex: 11,
    summaryVi:
      "Câu điều kiện loại 0 nói về sự thật hoặc kết quả luôn xảy ra. Loại 1 nói về khả năng thực tế trong tương lai và kết quả có thể xảy ra.",
    lesson: {
      when_to_use:
        "Dùng loại 0 cho quy luật, hướng dẫn và thói quen. Dùng loại 1 khi điều kiện tương lai có khả năng xảy ra.",
      when_not_to_use:
        "Không đặt will trong mệnh đề if của câu điều kiện loại 1 thông thường. Không dùng loại 1 cho sự thật luôn đúng nếu loại 0 diễn đạt chính xác hơn.",
      formation: {
        affirmative: "If + Present Simple, Present Simple/will + base verb",
        negative: "If + subject + do/does not + V, subject + do/does not/will not + V",
        question: "What will + subject + do if + Present Simple?",
      },
      signal_words: ["if", "when", "unless", "as soon as"],
      tips: [
        "Loại 0: hiện tại đơn ở cả hai mệnh đề.",
        "Loại 1: mệnh đề if dùng hiện tại đơn, mệnh đề chính thường dùng will.",
      ],
    },
    rules: [
      {
        key: "zero",
        titleEn: "Zero conditional",
        titleVi: "Điều kiện loại 0",
        pattern: "If/When + Present Simple, Present Simple",
        explanationVi:
          "Hai vế đều dùng hiện tại đơn vì kết quả được xem là luôn đúng khi điều kiện xảy ra. When có thể thay if nếu kết quả chắc chắn.",
        orderIndex: 1,
      },
      {
        key: "first",
        titleEn: "First conditional",
        titleVi: "Điều kiện loại 1",
        pattern: "If + Present Simple, will + base verb",
        explanationVi:
          "Mệnh đề if nêu điều kiện có thể xảy ra; mệnh đề chính nêu kết quả tương lai. Có thể thay will bằng can, may hoặc câu mệnh lệnh tùy ý nghĩa.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "If it rains, we will stay home.",
          sentenceVi: "Nếu trời mưa, chúng ta sẽ ở nhà.",
          highlights: [
            { text: "If it rains", type: "grammar" },
            { text: "will stay", type: "grammar" },
          ],
          level: "A2",
          difficulty: 2,
          ruleKey: "first",
        },
        "tatoeba",
        "13971628",
      ),
      attributed(
        {
          sentenceEn: "If you press this button, the door will open.",
          sentenceVi: "Bấm cái nút này thì cửa sẽ mở ra.",
          highlights: [
            { text: "If you press", type: "grammar" },
            { text: "will open", type: "grammar" },
          ],
          level: "A2",
          difficulty: 2,
          ruleKey: "first",
        },
        "talpco",
        "2043",
      ),
      {
        sentenceEn: "If you heat ice, it melts.",
        sentenceVi: "Nếu làm nóng băng, nó tan chảy.",
        highlights: [
          { text: "If you heat", type: "grammar" },
          { text: "melts", type: "grammar" },
        ],
        level: "A2",
        difficulty: 1,
        ruleKey: "zero",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "If it will rain, we will stay home.",
        correctSentence: "If it rains, we will stay home.",
        errorType: "conditional",
        explanationVi: "Mệnh đề if của điều kiện loại 1 dùng hiện tại đơn, không dùng will.",
        severity: 3,
        level: "A2",
      },
      {
        incorrectSentence: "If you heat water, it will boils.",
        correctSentence: "If you heat water, it boils.",
        errorType: "conditional",
        explanationVi:
          "Đây là sự thật chung nên dùng loại 0 với hiện tại đơn ở cả hai vế: boils.",
        severity: 2,
        level: "A2",
      },
    ],
    quiz: {
      slug: "conditionals-zero-first-quiz",
      title: "Zero and First Conditionals — Mini Quiz",
      description: "Practice facts and realistic future conditions.",
      questions: [
        multipleChoice("If you mix blue and yellow, you ______ green.", "A general fact uses present simple in both clauses.", "get", ["will got", "would get", "are getting"]),
        fillBlank("If she ______ (finish) early, she will call us.", "The if-clause of a first conditional takes present simple.", "finishes"),
        multipleChoice("If we miss the bus, we ______ a taxi.", "A realistic future result uses will + base verb.", "will take", ["take always", "will took", "would took"]),
        fillBlank("Plants die if they ______ (not/get) water.", "A zero conditional uses present simple.", "don't get"),
      ],
    },
  },
  {
    slug: "present-perfect-continuous",
    titleEn: "Present Perfect Continuous",
    titleVi: "Thì hiện tại hoàn thành tiếp diễn",
    level: "B1",
    category: "verb_tenses",
    orderIndex: 13,
    summaryVi:
      "Thì hiện tại hoàn thành tiếp diễn nhấn mạnh quá trình bắt đầu trong quá khứ và còn tiếp tục hoặc vừa dừng nhưng để lại dấu hiệu. Cấu trúc là have/has been + V-ing.",
    lesson: {
      when_to_use:
        "Dùng khi muốn nhấn mạnh thời lượng hay tính liên tục của hoạt động đến hiện tại, hoặc giải thích một kết quả hiện tại bằng hoạt động vừa diễn ra.",
      when_not_to_use:
        "Không thường dùng với động từ trạng thái như know, own, believe. Khi nhấn mạnh kết quả hoàn tất hoặc số lượng đã làm xong, dùng hiện tại hoàn thành đơn.",
      formation: {
        affirmative: "subject + have/has been + V-ing",
        negative: "subject + have/has not been + V-ing",
        question: "Have/Has + subject + been + V-ing?",
      },
      signal_words: ["since", "for", "all day", "lately", "recently", "how long"],
      tips: [
        "Since đi với điểm bắt đầu; for đi với khoảng thời gian.",
        "Chọn dạng tiếp diễn khi quá trình quan trọng hơn kết quả hoàn thành.",
      ],
    },
    rules: [
      {
        key: "duration",
        titleEn: "Duration up to now",
        titleVi: "Khoảng thời gian kéo dài đến hiện tại",
        pattern: "have/has been + V-ing + since/for",
        explanationVi:
          "Cấu trúc cho biết hoạt động bắt đầu trước đây và vẫn tiếp diễn. Since nêu mốc bắt đầu, còn for nêu độ dài thời gian.",
        orderIndex: 1,
      },
      {
        key: "recent-evidence",
        titleEn: "Recent activity with present evidence",
        titleVi: "Hoạt động gần đây để lại dấu hiệu",
        pattern: "have/has been + V-ing",
        explanationVi:
          "Hoạt động có thể vừa dừng nhưng dấu hiệu vẫn còn ở hiện tại. Cách dùng này tập trung vào quá trình tạo ra kết quả.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "I have been waiting for three hours.",
          sentenceVi: "Tôi chờ ba tiếng rồi.",
          highlights: [
            { text: "have been waiting", type: "grammar" },
            { text: "for three hours", type: "signal" },
          ],
          level: "B1",
          difficulty: 2,
          ruleKey: "duration",
        },
        "tatoeba",
        "13971618",
      ),
      attributed(
        {
          sentenceEn: "How long have you been waiting for the bus?",
          sentenceVi: "Bạn đã chờ xe buýt bao lâu rồi?",
          highlights: [
            { text: "have you been waiting", type: "grammar" },
            { text: "How long", type: "signal" },
          ],
          level: "B1",
          difficulty: 3,
          ruleKey: "duration",
        },
        "tatoeba",
        "35258",
      ),
      attributed(
        {
          sentenceEn: "I have been studying since last year.",
          sentenceVi: "Tôi học từ năm ngoái.",
          highlights: [
            { text: "have been studying", type: "grammar" },
            { text: "since last year", type: "signal" },
          ],
          level: "B1",
          difficulty: 2,
          ruleKey: "duration",
        },
        "talpco",
        "1495",
      ),
    ],
    mistakes: [
      {
        incorrectSentence: "She has been work here for May.",
        correctSentence: "She has been working here since May.",
        errorType: "verb_tense",
        explanationVi:
          "Sau been dùng V-ing; May là mốc bắt đầu nên đi với since.",
        severity: 3,
        level: "B1",
      },
      {
        incorrectSentence: "I have been knowing him for years.",
        correctSentence: "I have known him for years.",
        errorType: "verb_tense",
        explanationVi:
          "Know là động từ trạng thái, vì vậy thường dùng hiện tại hoàn thành đơn thay vì dạng tiếp diễn.",
        severity: 2,
        level: "B1",
      },
    ],
    quiz: {
      slug: "present-perfect-continuous-quiz",
      title: "Present Perfect Continuous — Mini Quiz",
      description: "Practice duration and recently continuing activities.",
      questions: [
        multipleChoice("She ______ all morning.", "An activity continuing over a period uses has been + V-ing.", "has been studying", ["has studied yesterday", "is study", "have been studying"]),
        fillBlank("They ______ (work) here since January.", "Use have been working with they.", "have been working"),
        multipleChoice("Why are you wet? I ______ in the rain.", "Present evidence points to a recent activity.", "have been walking", ["walked tomorrow", "have walk", "am walked"]),
        fillBlank("How long ______ he ______ (learn) English?", "The question uses has + subject + been + V-ing.", "has he been learning"),
      ],
    },
  },
  {
    slug: "passive-present-past",
    titleEn: "Present and Past Passive",
    titleVi: "Câu bị động ở hiện tại và quá khứ",
    level: "B1",
    category: "verb_tenses",
    orderIndex: 14,
    summaryVi:
      "Câu bị động tập trung vào đối tượng chịu tác động hoặc kết quả thay vì người thực hiện. Hiện tại dùng am/is/are + V3; quá khứ dùng was/were + V3.",
    lesson: {
      when_to_use:
        "Dùng khi người thực hiện không rõ, không quan trọng, hoặc khi đối tượng chịu tác động cần được nhấn mạnh.",
      when_not_to_use:
        "Không lạm dụng bị động khi chủ thể hành động quan trọng và câu chủ động rõ hơn. Chỉ thêm by + tác nhân khi thông tin đó thực sự cần thiết.",
      formation: {
        affirmative: "subject + am/is/are or was/were + V3",
        negative: "subject + be + not + V3",
        question: "Be + subject + V3?",
      },
      signal_words: ["by", "every day", "in 1960", "was built", "is made"],
      tips: [
        "Thì nằm ở động từ be; động từ chính luôn ở V3.",
        "Tân ngữ của câu chủ động trở thành chủ ngữ câu bị động.",
      ],
    },
    rules: [
      {
        key: "present-passive",
        titleEn: "Present simple passive",
        titleVi: "Bị động hiện tại đơn",
        pattern: "am/is/are + past participle",
        explanationVi:
          "Dùng để nói quy trình, sự thật hoặc hành động thường xuyên mà trọng tâm là đối tượng. Chia be theo chủ ngữ mới.",
        orderIndex: 1,
      },
      {
        key: "past-passive",
        titleEn: "Past simple passive",
        titleVi: "Bị động quá khứ đơn",
        pattern: "was/were + past participle",
        explanationVi:
          "Dùng khi hành động bị động đã hoàn tất trong quá khứ. Was đi với chủ ngữ số ít; were đi với chủ ngữ số nhiều.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "The building was built in 1960.",
          sentenceVi: "Tòa nhà được xây vào năm 1960.",
          highlights: [
            { text: "was built", type: "grammar" },
            { text: "in 1960", type: "signal" },
          ],
          level: "B1",
          difficulty: 2,
          ruleKey: "past-passive",
        },
        "tatoeba",
        "48317",
      ),
      attributed(
        {
          sentenceEn: "It was written in the letter.",
          sentenceVi: "Điều đó có viết trong thư.",
          highlights: [{ text: "was written", type: "grammar" }],
          level: "B1",
          difficulty: 2,
          ruleKey: "past-passive",
        },
        "talpco",
        "1482",
      ),
      {
        sentenceEn: "English is spoken in many countries.",
        sentenceVi: "Tiếng Anh được nói ở nhiều quốc gia.",
        highlights: [{ text: "is spoken", type: "grammar" }],
        level: "B1",
        difficulty: 2,
        ruleKey: "present-passive",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "The bridge built in 1990.",
        correctSentence: "The bridge was built in 1990.",
        errorType: "passive",
        explanationVi: "Câu bị động quá khứ cần was trước V3 built.",
        severity: 3,
        level: "B1",
      },
      {
        incorrectSentence: "These cars is made in Japan.",
        correctSentence: "These cars are made in Japan.",
        errorType: "passive",
        explanationVi: "Chủ ngữ số nhiều these cars đi với are.",
        severity: 2,
        level: "B1",
      },
    ],
    quiz: {
      slug: "passive-present-past-quiz",
      title: "Present and Past Passive — Mini Quiz",
      description: "Practice forming passive sentences with be and V3.",
      questions: [
        multipleChoice("Coffee ______ in many countries.", "A present fact with a singular subject uses is + V3.", "is grown", ["grows by", "was grow", "is growing by"]),
        fillBlank("The emails ______ (send) yesterday.", "A plural subject in the past passive takes were sent.", "were sent"),
        multipleChoice("Which sentence is passive?", "The object of the action is the grammatical subject.", "The window was broken last night.", ["Someone broke the window.", "The window broke someone.", "Someone was breaking."]),
        fillBlank("This room ______ (clean) every day.", "A present routine in passive form uses is cleaned.", "is cleaned"),
      ],
    },
  },
  {
    slug: "relative-clauses",
    titleEn: "Relative Clauses",
    titleVi: "Mệnh đề quan hệ",
    level: "B1",
    category: "clauses",
    orderIndex: 15,
    summaryVi:
      "Mệnh đề quan hệ bổ sung thông tin cho danh từ mà không cần tách thành câu mới. Who thường thay người, which thay vật và that có thể thay cả hai trong mệnh đề xác định.",
    lesson: {
      when_to_use:
        "Dùng để xác định người hoặc vật đang nói đến, hoặc thêm thông tin phụ. Chọn đại từ quan hệ theo danh từ đứng trước và vai trò trong mệnh đề.",
      when_not_to_use:
        "Không dùng what ngay sau một danh từ với vai trò đại từ quan hệ. Không dùng that trong mệnh đề không xác định được ngăn bằng dấu phẩy.",
      formation: {
        affirmative: "noun + who/which/that + verb/clause",
        negative: "noun + who/which/that + auxiliary + not + verb",
        question: "question clause + noun + who/which/that + clause?",
      },
      signal_words: ["who", "which", "that", "whose", "where"],
      tips: [
        "Who dùng cho người; which dùng cho vật; that thường dùng cho cả hai trong mệnh đề xác định.",
        "Có thể bỏ đại từ quan hệ khi nó làm tân ngữ, nhưng không bỏ khi nó làm chủ ngữ.",
      ],
    },
    rules: [
      {
        key: "subject-relative",
        titleEn: "Relative pronoun as subject",
        titleVi: "Đại từ quan hệ làm chủ ngữ",
        pattern: "person + who/that + verb · thing + which/that + verb",
        explanationVi:
          "Khi đại từ quan hệ làm chủ ngữ của mệnh đề sau, không được lược bỏ. Động từ hòa hợp với danh từ được bổ nghĩa.",
        orderIndex: 1,
      },
      {
        key: "object-relative",
        titleEn: "Relative pronoun as object",
        titleVi: "Đại từ quan hệ làm tân ngữ",
        pattern: "noun + (who/which/that) + subject + verb",
        explanationVi:
          "Khi sau đại từ quan hệ đã có chủ ngữ, đại từ thường làm tân ngữ và có thể được lược bỏ trong mệnh đề xác định.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "The man who lives next door is a musician.",
          sentenceVi: "Người đàn ông sống kế bên là một nhạc sĩ.",
          highlights: [{ text: "who lives next door", type: "grammar" }],
          level: "B1",
          difficulty: 2,
          ruleKey: "subject-relative",
        },
        "tatoeba",
        "13971634",
      ),
      attributed(
        {
          sentenceEn: "The film I saw yesterday was interesting.",
          sentenceVi: "Bộ phim tôi xem hôm qua rất thú vị.",
          highlights: [
            { text: "I saw yesterday", type: "grammar" },
            { text: "yesterday", type: "signal" },
          ],
          level: "B1",
          difficulty: 3,
          ruleKey: "object-relative",
        },
        "talpco",
        "2154",
      ),
      {
        sentenceEn: "This is the book that explains the rule clearly.",
        sentenceVi: "Đây là cuốn sách giải thích quy tắc một cách rõ ràng.",
        highlights: [{ text: "that explains the rule", type: "grammar" }],
        level: "B1",
        difficulty: 2,
        ruleKey: "subject-relative",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "The woman which called me is my aunt.",
        correctSentence: "The woman who called me is my aunt.",
        errorType: "relative_clause",
        explanationVi: "Danh từ chỉ người woman đi với who, không dùng which.",
        severity: 2,
        level: "B1",
      },
      {
        incorrectSentence: "The book who I bought is useful.",
        correctSentence: "The book that I bought is useful.",
        errorType: "relative_clause",
        explanationVi: "Book chỉ vật nên dùng that hoặc which, không dùng who.",
        severity: 2,
        level: "B1",
      },
    ],
    quiz: {
      slug: "relative-clauses-quiz",
      title: "Relative Clauses — Mini Quiz",
      description: "Connect information with relative pronouns.",
      questions: [
        multipleChoice("The teacher ______ helped me was very patient.", "Who refers to a person and is the subject of the clause.", "who", ["which", "where", "what"]),
        fillBlank("The laptop ______ I bought is very light.", "That can introduce a defining object relative clause.", "that"),
        multipleChoice("This is the café ______ we first met.", "Where refers to a place.", "where", ["who", "whose", "which person"]),
        fillBlank("Students ______ study regularly improve faster.", "Who is the subject referring to people.", "who"),
      ],
    },
  },
  {
    slug: "gerunds-infinitives",
    titleEn: "Gerunds and Infinitives",
    titleVi: "Danh động từ và động từ nguyên mẫu có to",
    level: "B1",
    category: "other",
    orderIndex: 16,
    summaryVi:
      "Một số động từ đi với V-ing, một số đi với to + động từ nguyên mẫu, và một số dùng được cả hai nhưng có thể đổi nghĩa. Cách chắc chắn nhất là học động từ theo cụm.",
    lesson: {
      when_to_use:
        "Dùng V-ing sau enjoy, avoid, finish và sau giới từ. Dùng to + V sau want, decide, hope và để diễn tả mục đích.",
      when_not_to_use:
        "Không chọn dạng theo cách dịch từng từ sang tiếng Việt. Với remember, stop, try và regret, đổi giữa V-ing và to + V có thể làm đổi nghĩa.",
      formation: {
        affirmative: "verb + V-ing · verb + to + base verb",
        negative: "not + V-ing · not to + base verb",
        question: "auxiliary + subject + verb + V-ing/to + V?",
      },
      signal_words: ["enjoy", "avoid", "finish", "want", "decide", "hope"],
      tips: [
        "Học cả cụm: enjoy doing, decide to do.",
        "Sau giới từ dùng V-ing: interested in learning.",
      ],
    },
    rules: [
      {
        key: "gerund",
        titleEn: "Verb plus gerund",
        titleVi: "Động từ đi với V-ing",
        pattern: "enjoy/avoid/finish + V-ing · preposition + V-ing",
        explanationVi:
          "V-ing hoạt động như danh từ sau một số động từ và giới từ. Danh sách động từ cần được học theo cụm thay vì suy đoán.",
        orderIndex: 1,
      },
      {
        key: "infinitive",
        titleEn: "Verb plus infinitive",
        titleVi: "Động từ đi với to + V",
        pattern: "want/decide/hope + to + base verb",
        explanationVi:
          "To + V thường theo sau các động từ nói về mong muốn, kế hoạch hoặc quyết định. Nó cũng có thể nêu mục đích của hành động.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "Tom enjoys swimming.",
          sentenceVi: "Tom thích bơi.",
          highlights: [{ text: "enjoys swimming", type: "grammar" }],
          level: "B1",
          difficulty: 1,
          ruleKey: "gerund",
        },
        "tatoeba",
        "9733082",
      ),
      attributed(
        {
          sentenceEn: "I want to drink water.",
          sentenceVi: "Tôi muốn uống nước.",
          highlights: [{ text: "want to drink", type: "grammar" }],
          level: "B1",
          difficulty: 1,
          ruleKey: "infinitive",
        },
        "talpco",
        "1818",
      ),
      {
        sentenceEn: "She avoided answering the difficult question.",
        sentenceVi: "Cô ấy tránh trả lời câu hỏi khó.",
        highlights: [{ text: "avoided answering", type: "grammar" }],
        level: "B1",
        difficulty: 2,
        ruleKey: "gerund",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "I enjoy to read before bed.",
        correctSentence: "I enjoy reading before bed.",
        errorType: "gerund_infinitive",
        explanationVi: "Enjoy đi với V-ing, nên dùng reading.",
        severity: 2,
        level: "B1",
      },
      {
        incorrectSentence: "They decided going by train.",
        correctSentence: "They decided to go by train.",
        errorType: "gerund_infinitive",
        explanationVi: "Decide đi với to + động từ nguyên mẫu: to go.",
        severity: 2,
        level: "B1",
      },
    ],
    quiz: {
      slug: "gerunds-infinitives-quiz",
      title: "Gerunds and Infinitives — Mini Quiz",
      description: "Practice common verb patterns with -ing and to.",
      questions: [
        multipleChoice("She enjoys ______ new languages.", "Enjoy is followed by a gerund.", "learning", ["to learning", "learn", "to learned"]),
        fillBlank("We decided ______ (leave) early.", "Decide is followed by to + base verb.", "to leave"),
        multipleChoice("He is interested in ______ abroad.", "A preposition is followed by a gerund.", "studying", ["to study", "study", "studied"]),
        fillBlank("I hope ______ (see) you soon.", "Hope is followed by the infinitive.", "to see"),
      ],
    },
  },
  {
    slug: "reported-speech",
    titleEn: "Reported Speech",
    titleVi: "Câu tường thuật",
    level: "B1",
    category: "clauses",
    orderIndex: 17,
    summaryVi:
      "Câu tường thuật kể lại lời nói mà không lặp nguyên văn. Khi động từ tường thuật ở quá khứ, thì, đại từ và từ chỉ thời gian thường thay đổi theo góc nhìn mới.",
    lesson: {
      when_to_use:
        "Dùng để thuật lại lời nói, suy nghĩ hoặc câu hỏi của người khác. Backshift thường xuất hiện sau said/told ở quá khứ khi nội dung không còn được trình bày như lời trực tiếp.",
      when_not_to_use:
        "Không lùi thì máy móc nếu thông tin vẫn là sự thật chung hoặc vẫn còn đúng và người nói muốn nhấn mạnh điều đó. Không dùng said + tân ngữ trực tiếp; dùng told + tân ngữ.",
      formation: {
        affirmative: "said (that) + clause · told + object + (that) + clause",
        negative: "said/told + clause with not",
        question: "asked + if/whether or question word + statement word order",
      },
      signal_words: ["said", "told", "asked", "that", "if", "whether"],
      tips: [
        "Say something; tell someone something.",
        "Khi lùi thì: present → past, will → would, can → could; đồng thời đổi đại từ và mốc thời gian nếu cần.",
      ],
    },
    rules: [
      {
        key: "statements",
        titleEn: "Reported statements",
        titleVi: "Tường thuật câu kể",
        pattern: "said (that) + clause · told + object + clause",
        explanationVi:
          "That có thể được lược bỏ trong văn nói. Sau told phải có người nghe; sau said không đặt người nghe trực tiếp nếu không có to.",
        orderIndex: 1,
      },
      {
        key: "backshift",
        titleEn: "Backshift and viewpoint changes",
        titleVi: "Lùi thì và đổi góc nhìn",
        pattern: "Present → Past · will → would · can → could",
        explanationVi:
          "Khi thuật lại từ một thời điểm quá khứ, ta thường lùi thì một bậc. Đại từ và các từ như today, tomorrow cũng đổi để phù hợp ngữ cảnh mới.",
        orderIndex: 2,
      },
    ],
    examples: [
      attributed(
        {
          sentenceEn: "He said that he wants money.",
          sentenceVi: "Anh ấy đã nói rằng anh ấy muốn có tiền.",
          highlights: [{ text: "said that", type: "grammar" }],
          level: "B1",
          difficulty: 2,
          ruleKey: "statements",
        },
        "tatoeba",
        "13724416",
      ),
      attributed(
        {
          sentenceEn: "He said that he was furious.",
          sentenceVi: "Anh ấy đã nói rằng anh ấy rất tức giận",
          highlights: [
            { text: "said that", type: "grammar" },
            { text: "was furious", type: "grammar" },
          ],
          level: "B1",
          difficulty: 2,
          ruleKey: "backshift",
        },
        "tatoeba",
        "7401955",
      ),
      {
        sentenceEn: "Lan told me that she would call the next day.",
        sentenceVi: "Lan nói với tôi rằng cô ấy sẽ gọi vào ngày hôm sau.",
        highlights: [
          { text: "told me that", type: "grammar" },
          { text: "would call", type: "grammar" },
        ],
        level: "B1",
        difficulty: 3,
        ruleKey: "backshift",
      },
    ],
    mistakes: [
      {
        incorrectSentence: "She said me that she was tired.",
        correctSentence: "She told me that she was tired.",
        errorType: "other",
        explanationVi: "Khi nêu trực tiếp người nghe me, dùng told me thay vì said me.",
        severity: 2,
        level: "B1",
      },
      {
        incorrectSentence: "He said that he will come the next day.",
        correctSentence: "He said that he would come the next day.",
        errorType: "verb_tense",
        explanationVi:
          "Sau động từ tường thuật said ở quá khứ, will thường lùi thành would.",
        severity: 2,
        level: "B1",
      },
    ],
    quiz: {
      slug: "reported-speech-quiz",
      title: "Reported Speech — Mini Quiz",
      description: "Practice reporting statements and changing viewpoint.",
      questions: [
        multipleChoice("“I am busy,” Mai said. Mai said that she ______ busy.", "Present am normally backshifts to past was.", "was", ["is being", "were", "has"]),
        fillBlank("“I will help,” he said. He said he ______ help.", "Will backshifts to would.", "would"),
        multipleChoice("Which sentence is correct?", "Tell takes a direct object; say does not in this pattern.", "She told me the news.", ["She said me the news.", "She told the news me.", "She said me that news."]),
        fillBlank("“We can swim,” they said. They said they ______ swim.", "Can normally backshifts to could.", "could"),
      ],
    },
  },
];
