import type { cefrLevelEnum, skillEnum } from "@/db/schema/enums";

export type LessonSeed = {
  slug: string;
  title: string;
  skill: (typeof skillEnum.enumValues)[number];
  estimatedMinutes: number;
  objective: string;
  explanationMarkdown: string;
  /** Words from `vocabularySeed`, resolved to ids by `seed.ts` for the `vocabulary` content block. */
  vocabularyWords?: string[];
  examples: { en: string; vi: string }[];
  /** Slug of a quiz from `quizzes.ts` / a grammar topic's quiz, resolved to a `quizId` for the `exercise` block. */
  exerciseQuizSlug?: string;
  /** Slug of a lesson from `listening.ts`, resolved to a `listeningLessonId` for the `audio` block. */
  audioListeningSlug?: string;
};

export type CourseSeed = {
  slug: string;
  title: string;
  description: string;
  level: (typeof cefrLevelEnum.enumValues)[number];
  category: string;
  coverColor: string;
  sortOrder: number;
  lessons: LessonSeed[];
};

/** 5 courses × 5 lessons each (spec §28 minimum), covering vocabulary, conversation, travel, grammar and academic skills. */
export const coursesSeed: CourseSeed[] = [
  {
    slug: "everyday-english",
    title: "Everyday English",
    description:
      "Build a strong foundation with the words and phrases you use every single day — routines, home, and food.",
    level: "A1",
    category: "Everyday Life",
    coverColor: "sky",
    sortOrder: 1,
    lessons: [
      {
        slug: "your-morning-routine",
        title: "Your Morning Routine",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Describe what you do every morning using simple present-tense verbs.",
        explanationMarkdown:
          "Most daily routines are described with the **Present Simple** (see the Present Simple grammar topic) plus a small set of routine verbs. Learn the five verbs below, then practice building full sentences like *\"I wake up at 6, then I get up and take a shower.\"*",
        vocabularyWords: ["wake up", "get up", "brush", "shower", "breakfast"],
        examples: [
          { en: "I wake up at six every morning.", vi: "Tôi thức dậy lúc sáu giờ mỗi sáng." },
          { en: "She brushes her teeth after breakfast.", vi: "Cô ấy đánh răng sau bữa sáng." },
        ],
        exerciseQuizSlug: "everyday-english-practice",
      },
      {
        slug: "family-and-home",
        title: "Family and Home",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Talk about the people you live with and describe your home.",
        explanationMarkdown:
          "Family words like *sibling* and *relative* let you describe your household without repeating \"brother\", \"sister\", \"cousin\" every time. Combine them with simple adjectives like *tidy* to describe your home.",
        vocabularyWords: ["sibling", "spouse", "relative", "household", "neighbor", "furniture", "tidy"],
        examples: [
          { en: "There are four people in my household.", vi: "Gia đình tôi có bốn người." },
          { en: "My neighbor is very friendly.", vi: "Hàng xóm của tôi rất thân thiện." },
        ],
        exerciseQuizSlug: "everyday-english-practice",
      },
      {
        slug: "food-and-cooking",
        title: "Food and Cooking",
        skill: "vocabulary",
        estimatedMinutes: 12,
        objective: "Describe meals, ingredients, and flavors.",
        explanationMarkdown:
          "When you talk about food, you often need to describe **what's in it** (*ingredient*, *recipe*) and **how it tastes** (*delicious*, *spicy*). Try describing your favorite dish using at least two of today's words.",
        vocabularyWords: ["ingredient", "recipe", "flavor", "grocery", "delicious", "spicy"],
        examples: [
          { en: "Flour is the main ingredient in bread.", vi: "Bột mì là nguyên liệu chính trong bánh mì." },
          { en: "This soup has a spicy flavor.", vi: "Món súp này có vị cay." },
        ],
        exerciseQuizSlug: "everyday-english-practice",
      },
      {
        slug: "ordering-at-a-cafe",
        title: "Ordering at a Café",
        skill: "listening",
        estimatedMinutes: 12,
        objective: "Understand a short café conversation and order your own drink confidently.",
        explanationMarkdown:
          "Listen to a real café order from start to finish. Notice how the customer politely asks for what they want with *\"Can I have...\"* and *\"Could I also get...\"*.",
        vocabularyWords: ["delicious", "beverage", "appetite"],
        examples: [
          { en: "Could I get a medium latte, please?", vi: "Cho tôi một ly latte cỡ vừa được không?" },
          { en: "The menu offers a variety of beverages.", vi: "Thực đơn có nhiều loại đồ uống." },
        ],
        audioListeningSlug: "ordering-coffee",
        exerciseQuizSlug: "everyday-english-practice",
      },
      {
        slug: "daily-chores-and-habits",
        title: "Daily Chores and Habits",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Talk about chores, habits, and how tired they make you feel.",
        explanationMarkdown:
          "A *chore* is a small task like washing dishes; an *errand* is a task that takes you outside the house, like going to the bank. Notice the difference as you go through today's words.",
        vocabularyWords: ["chore", "routine", "nap", "exhausted", "errand", "schedule"],
        examples: [
          { en: "Washing dishes is my least favorite chore.", vi: "Rửa bát là việc nhà tôi ghét nhất." },
          { en: "I need to run a few errands this afternoon.", vi: "Chiều nay tôi cần đi làm vài việc vặt." },
        ],
        exerciseQuizSlug: "everyday-english-practice",
      },
    ],
  },
  {
    slug: "english-conversation",
    title: "English Conversation",
    description:
      "Speak more naturally in everyday conversations — share opinions, express feelings, and keep a conversation flowing.",
    level: "A2",
    category: "Conversation",
    coverColor: "violet",
    sortOrder: 2,
    lessons: [
      {
        slug: "sharing-your-opinion",
        title: "Sharing Your Opinion",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Politely agree, disagree, and suggest ideas in a conversation.",
        explanationMarkdown:
          "Native speakers rarely say a flat \"no\" — they soften disagreement with phrases like *\"I'm afraid I disagree\"* or by *suggesting* an alternative instead. Practice both styles today.",
        vocabularyWords: ["opinion", "agree", "disagree", "suggest", "assume"],
        examples: [
          { en: "In my opinion, this book is excellent.", vi: "Theo ý tôi, cuốn sách này rất hay." },
          { en: "I suggest we leave early tomorrow.", vi: "Tôi đề nghị chúng ta khởi hành sớm vào ngày mai." },
        ],
        exerciseQuizSlug: "english-conversation-practice",
      },
      {
        slug: "talking-about-feelings",
        title: "Talking About Feelings",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Describe emotions more precisely than just \"good\" or \"bad\".",
        explanationMarkdown:
          "Instead of always saying \"I feel bad\", try more specific words: *nervous* before something stressful, *frustrated* when something goes wrong, *relieved* once it's over.",
        vocabularyWords: ["curious", "nervous", "confident", "embarrassed", "relieved", "frustrated"],
        examples: [
          { en: "I always feel nervous before an interview.", vi: "Tôi luôn cảm thấy hồi hộp trước buổi phỏng vấn." },
          { en: "I was relieved to hear the good news.", vi: "Tôi cảm thấy nhẹ nhõm khi nghe tin tốt." },
        ],
        exerciseQuizSlug: "english-conversation-practice",
      },
      {
        slug: "apologizing-and-complimenting",
        title: "Apologizing and Complimenting",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Apologize sincerely and give genuine compliments.",
        explanationMarkdown:
          "A good apology names the mistake directly: *\"I want to apologize for being late\"* — not just \"sorry\". Compliments work best when they're specific, too.",
        vocabularyWords: ["apologize", "compliment", "interrupt", "mention"],
        examples: [
          { en: "I want to apologize for being late.", vi: "Tôi muốn xin lỗi vì đã đến trễ." },
          { en: "Thank you for the compliment.", vi: "Cảm ơn vì lời khen." },
        ],
        exerciseQuizSlug: "english-conversation-practice",
      },
      {
        slug: "small-talk-at-work",
        title: "Small Talk at Work",
        skill: "listening",
        estimatedMinutes: 12,
        objective: "Follow a casual workplace conversation about weekends and plans.",
        explanationMarkdown:
          "Small talk usually follows a pattern: a friendly question, a short answer, then a question back. Listen for how Anna and Tom take turns asking about each other's weekend.",
        vocabularyWords: ["mention", "opinion"],
        examples: [
          { en: "How was your weekend?", vi: "Cuối tuần của bạn thế nào?" },
          { en: "Tell me about it.", vi: "Đúng vậy đó (dùng để đồng cảm)." },
        ],
        audioListeningSlug: "small-talk-at-work",
        exerciseQuizSlug: "english-conversation-practice",
      },
      {
        slug: "keeping-a-conversation-going",
        title: "Keeping a Conversation Going",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Use follow-up questions and comments to keep a conversation alive.",
        explanationMarkdown:
          "Being *curious* about the other person is the easiest way to keep talking — ask a follow-up question instead of only sharing your own opinion.",
        vocabularyWords: ["curious", "suggest", "mention", "interrupt"],
        examples: [
          { en: "She was curious about his new job.", vi: "Cô ấy tò mò về công việc mới của anh ấy." },
          { en: "Sorry to interrupt, but that reminds me of something.", vi: "Xin lỗi vì đã ngắt lời, nhưng điều đó làm tôi nhớ tới một chuyện." },
        ],
        exerciseQuizSlug: "english-conversation-practice",
      },
    ],
  },
  {
    slug: "english-for-travel",
    title: "English for Travel",
    description: "Everything you need to fly, check in, get around, and shop confidently in English.",
    level: "A2",
    category: "Travel",
    coverColor: "amber",
    sortOrder: 3,
    lessons: [
      {
        slug: "at-the-airport",
        title: "At the Airport",
        skill: "listening",
        estimatedMinutes: 12,
        objective: "Understand a real airport check-in conversation.",
        explanationMarkdown:
          "Airport English follows a predictable script: passport and ticket, luggage, seat choice, then a boarding pass. Listen for each of these four steps.",
        vocabularyWords: ["luggage", "boarding pass", "customs", "departure", "arrival"],
        examples: [
          { en: "Please keep your luggage with you at all times.", vi: "Vui lòng giữ hành lý bên mình mọi lúc." },
          { en: "The departure time is 9 a.m.", vi: "Giờ khởi hành là 9 giờ sáng." },
        ],
        audioListeningSlug: "airport-check-in",
        exerciseQuizSlug: "english-for-travel-practice",
      },
      {
        slug: "booking-accommodation",
        title: "Booking Accommodation",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Book a hotel room and understand common hotel vocabulary.",
        explanationMarkdown:
          "\"Vacancy\" and \"reservation\" are two of the most useful words at a hotel front desk — one means a room is free, the other means you've already secured one.",
        vocabularyWords: ["accommodation", "vacancy", "checkout", "reservation", "currency"],
        examples: [
          { en: "We booked our accommodation online.", vi: "Chúng tôi đã đặt chỗ ở qua mạng." },
          { en: "Checkout time is noon.", vi: "Giờ trả phòng là 12 giờ trưa." },
        ],
        exerciseQuizSlug: "english-for-travel-practice",
      },
      {
        slug: "asking-for-directions",
        title: "Asking for Directions",
        skill: "listening",
        estimatedMinutes: 10,
        objective: "Ask for and understand simple street directions.",
        explanationMarkdown:
          "Directions almost always use the same building blocks: a direction (*straight*, *left*, *right*), a distance (*two blocks*), and a landmark (*at the pharmacy*).",
        vocabularyWords: ["landmark", "detour"],
        examples: [
          { en: "Go straight for two blocks, then turn left.", vi: "Đi thẳng hai dãy nhà, sau đó rẽ trái." },
          { en: "We took a detour to avoid traffic.", vi: "Chúng tôi đã đi đường vòng để tránh kẹt xe." },
        ],
        audioListeningSlug: "asking-for-directions",
        exerciseQuizSlug: "english-for-travel-practice",
      },
      {
        slug: "getting-around-town",
        title: "Getting Around Town",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Talk about buses, trains, and fares when getting around a new city.",
        explanationMarkdown:
          "Know your \"platform\" from your \"fare\": the platform is where you wait for the train, the fare is the price of the ticket.",
        vocabularyWords: ["fare", "platform", "roundtrip", "detour", "landmark"],
        examples: [
          { en: "The train leaves from platform 4.", vi: "Tàu khởi hành từ sân ga số 4." },
          { en: "A roundtrip ticket is cheaper than two one-way tickets.", vi: "Vé khứ hồi rẻ hơn hai vé một chiều." },
        ],
        exerciseQuizSlug: "english-for-travel-practice",
      },
      {
        slug: "souvenirs-and-shopping",
        title: "Souvenirs and Shopping",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Shop for souvenirs and handle receipts and refunds.",
        explanationMarkdown:
          "Always ask for a *receipt* when you shop — you'll need it if you want a *refund* later.",
        vocabularyWords: ["souvenir", "currency", "purchase", "refund", "receipt"],
        examples: [
          { en: "I bought a souvenir for my sister.", vi: "Tôi đã mua một món quà lưu niệm cho chị tôi." },
          { en: "Keep your receipt in case you need to return it.", vi: "Giữ hóa đơn phòng khi bạn cần trả hàng." },
        ],
        exerciseQuizSlug: "english-for-travel-practice",
      },
    ],
  },
  {
    slug: "essential-grammar",
    title: "Essential Grammar",
    description: "Master the core tenses and structures every intermediate learner needs.",
    level: "B1",
    category: "Grammar",
    coverColor: "emerald",
    sortOrder: 4,
    lessons: [
      {
        slug: "talking-about-habits",
        title: "Talking About Habits: Present Simple",
        skill: "grammar",
        estimatedMinutes: 15,
        objective: "Use the Present Simple to describe habits, routines and facts.",
        explanationMarkdown:
          "See the full **Present Simple** grammar topic for rules and common mistakes. Here, focus on habits you do *regularly*.",
        vocabularyWords: ["regularly", "routine"],
        examples: [
          { en: "I study English every day.", vi: "Tôi học tiếng Anh mỗi ngày." },
          { en: "He exercises regularly every morning.", vi: "Anh ấy tập thể dục đều đặn mỗi sáng." },
        ],
        exerciseQuizSlug: "present-simple-quiz",
      },
      {
        slug: "whats-happening-now",
        title: "What's Happening Now: Present Continuous",
        skill: "grammar",
        estimatedMinutes: 15,
        objective: "Use the Present Continuous for actions happening right now.",
        explanationMarkdown:
          "See the full **Present Continuous** grammar topic. Remember: some verbs like *know* and *want* aren't normally used in this form.",
        examples: [
          { en: "I am reading a book right now.", vi: "Tôi đang đọc một cuốn sách." },
          { en: "They are watching a movie tonight.", vi: "Tối nay họ đang xem phim." },
        ],
        exerciseQuizSlug: "present-continuous-quiz",
      },
      {
        slug: "talking-about-the-past",
        title: "Talking About the Past: Past Simple",
        skill: "grammar",
        estimatedMinutes: 15,
        objective: "Use the Past Simple for completed actions at a specific past time.",
        explanationMarkdown:
          "See the full **Past Simple** grammar topic, including the most common irregular verbs.",
        examples: [
          { en: "She visited Paris last summer.", vi: "Mùa hè năm ngoái cô ấy đã đến Paris." },
          { en: "Did you finish your homework?", vi: "Bạn đã làm xong bài tập chưa?" },
        ],
        exerciseQuizSlug: "past-simple-quiz",
      },
      {
        slug: "making-comparisons",
        title: "Making Comparisons: Comparatives",
        skill: "grammar",
        estimatedMinutes: 12,
        objective: "Compare people and things using comparative and superlative forms.",
        explanationMarkdown:
          "See the full **Comparatives** grammar topic. Watch out for irregular forms like *good → better → best*.",
        examples: [
          { en: "This phone is more expensive than mine.", vi: "Chiếc điện thoại này đắt hơn của tôi." },
          { en: "She is the tallest student in the class.", vi: "Cô ấy là học sinh cao nhất lớp." },
        ],
        exerciseQuizSlug: "comparatives-quiz",
      },
      {
        slug: "modal-verbs-for-advice",
        title: "Modal Verbs for Advice and Obligation",
        skill: "grammar",
        estimatedMinutes: 15,
        objective: "Use should, must and can to give advice, state obligations, and ask permission.",
        explanationMarkdown:
          "See the full **Modal Verbs** grammar topic. Note that modal verbs are always followed by the base verb, with no \"to\".",
        examples: [
          { en: "You should drink more water.", vi: "Bạn nên uống nhiều nước hơn." },
          { en: "We must finish this by Friday.", vi: "Chúng ta phải hoàn thành việc này trước thứ Sáu." },
        ],
        exerciseQuizSlug: "modal-verbs-quiz",
      },
    ],
  },
  {
    slug: "academic-english",
    title: "Academic English",
    description: "Formal vocabulary and structures for lectures, essays and research writing.",
    level: "B2",
    category: "Academic",
    coverColor: "rose",
    sortOrder: 5,
    lessons: [
      {
        slug: "understanding-lectures",
        title: "Understanding Lectures",
        skill: "listening",
        estimatedMinutes: 15,
        objective: "Follow the structure of a university lecture introduction.",
        explanationMarkdown:
          "Lecturers often open with the topic, a guiding question, and what to expect next (assignments, quizzes). Listen for all three parts.",
        vocabularyWords: ["analyze", "evidence", "outcome"],
        examples: [
          { en: "Researchers analyzed the survey results.", vi: "Các nhà nghiên cứu đã phân tích kết quả khảo sát." },
          { en: "There is strong evidence to support this theory.", vi: "Có bằng chứng mạnh mẽ để ủng hộ giả thuyết này." },
        ],
        audioListeningSlug: "university-lecture-intro",
        exerciseQuizSlug: "academic-english-practice",
      },
      {
        slug: "building-an-argument",
        title: "Building an Argument",
        skill: "vocabulary",
        estimatedMinutes: 12,
        objective: "Structure a persuasive academic argument with formal connectors.",
        explanationMarkdown:
          "Academic writing avoids casual connectors like \"also\" or \"but\", preferring *furthermore* and *however*. Formal writing also emphasizes points explicitly rather than relying on tone of voice.",
        vocabularyWords: ["significant", "sufficient", "furthermore", "emphasize", "contradict"],
        examples: [
          { en: "There was a significant improvement in her grades.", vi: "Có sự cải thiện đáng kể trong điểm số của cô ấy." },
          { en: "The teacher emphasized the importance of practice.", vi: "Giáo viên nhấn mạnh tầm quan trọng của việc luyện tập." },
        ],
        exerciseQuizSlug: "academic-english-practice",
      },
      {
        slug: "research-vocabulary",
        title: "Research Vocabulary",
        skill: "vocabulary",
        estimatedMinutes: 12,
        objective: "Use core research terms: hypothesis, methodology, and criteria.",
        explanationMarkdown:
          "Every research paper follows roughly the same shape: a *hypothesis*, a *methodology* to test it, and *criteria* to judge the results.",
        vocabularyWords: ["hypothesis", "methodology", "criteria", "assessment", "conclude"],
        examples: [
          { en: "The scientist tested her hypothesis in the lab.", vi: "Nhà khoa học đã kiểm chứng giả thuyết của mình trong phòng thí nghiệm." },
          { en: "The report concludes that more funding is needed.", vi: "Báo cáo kết luận rằng cần thêm kinh phí." },
        ],
        exerciseQuizSlug: "academic-english-practice",
      },
      {
        slug: "formal-writing-connectors",
        title: "Formal Writing Connectors",
        skill: "vocabulary",
        estimatedMinutes: 10,
        objective: "Link ideas smoothly in formal writing using connectors.",
        explanationMarkdown:
          "Connectors like *therefore* and *despite* signal how one idea relates to the next — result, contrast, or condition — which makes essays easier to follow.",
        vocabularyWords: ["furthermore", "however", "therefore", "despite", "although"],
        examples: [
          { en: "The plan sounded good; however, it was too expensive.", vi: "Kế hoạch nghe có vẻ tốt; tuy nhiên, nó quá đắt." },
          { en: "Despite the rain, the match continued.", vi: "Mặc dù trời mưa, trận đấu vẫn tiếp tục." },
        ],
        exerciseQuizSlug: "academic-english-practice",
      },
      {
        slug: "discussing-controversial-topics",
        title: "Discussing Controversial Topics",
        skill: "vocabulary",
        estimatedMinutes: 12,
        objective: "Discuss debated topics objectively, using precise academic vocabulary.",
        explanationMarkdown:
          "Being *objective* means presenting all sides of a *controversial* topic fairly, rather than only your own *opinion*.",
        vocabularyWords: ["controversial", "objective", "opinion", "significant"],
        examples: [
          { en: "It was a controversial decision.", vi: "Đó là một quyết định gây tranh cãi." },
          { en: "The main objective of the study is to reduce costs.", vi: "Mục tiêu chính của nghiên cứu là giảm chi phí." },
        ],
        exerciseQuizSlug: "academic-english-practice",
      },
    ],
  },
];
