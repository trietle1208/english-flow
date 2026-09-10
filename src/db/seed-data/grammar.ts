import type { cefrLevelEnum } from "@/db/schema/enums";
import type { GrammarContent } from "@/db/schema/grammar";
import type { QuizSeed } from "./quizzes";

export type GrammarTopicSeed = {
  slug: string;
  title: string;
  level: (typeof cefrLevelEnum.enumValues)[number];
  summary: string;
  content: GrammarContent;
  sortOrder: number;
  /** This topic's mini quiz (spec §17 "Include a small quiz at the end") — upserted into `quizzes` and linked via `quizId`. */
  quiz: QuizSeed;
};

/** 10 grammar topics (spec §17's 8 core topics + Comparatives + Articles, per the phase-03 task list). */
export const grammarTopicsSeed: GrammarTopicSeed[] = [
  {
    slug: "present-simple",
    title: "Present Simple",
    level: "A1",
    summary: "Use the Present Simple to talk about habits, routines and facts.",
    content: {
      rules: [
        "Use the base verb for I/you/we/they: \"I work in Hanoi.\"",
        "Add -s or -es for he/she/it: \"She works at a hospital.\"",
        "Negative: do/does + not + base verb — \"I don't like coffee.\" / \"He doesn't like coffee.\"",
        "Questions: Do/Does + subject + base verb? — \"Do you study English?\"",
        "Common time words: always, usually, often, sometimes, never, every day.",
      ],
      examples: [
        { en: "I study English every day.", vi: "Tôi học tiếng Anh mỗi ngày." },
        { en: "She works at a hospital.", vi: "Cô ấy làm việc ở bệnh viện." },
        { en: "Water boils at 100 degrees Celsius.", vi: "Nước sôi ở 100 độ C." },
        { en: "They don't eat meat.", vi: "Họ không ăn thịt." },
      ],
      commonMistakes: [
        { mistake: "She work at a hospital.", correction: "She works at a hospital. (add -s for he/she/it)" },
        { mistake: "He don't like coffee.", correction: "He doesn't like coffee. (use \"doesn't\", not \"don't\")" },
        { mistake: "Do she like tea?", correction: "Does she like tea? (use \"does\" for he/she/it)" },
      ],
    },
    sortOrder: 1,
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
          explanation: "\"They\" is plural, so the verb stays in base form: \"They play football.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "He ______ (not/like) spicy food.",
          explanation: "Negative present simple for he/she/it uses \"doesn't\" + base verb: \"doesn't like\".",
          answers: [{ content: "doesn't like", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "Which question is correctly formed?",
          explanation: "Questions use \"Do/Does\" + subject + base verb, without -s on the main verb.",
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
    slug: "present-continuous",
    title: "Present Continuous",
    level: "A1",
    summary: "Use the Present Continuous for actions happening right now or around now.",
    content: {
      rules: [
        "Form: am/is/are + verb-ing — \"I am studying.\"",
        "Use for actions happening at the moment of speaking: \"She is cooking dinner now.\"",
        "Use for temporary situations: \"He is staying with his parents this week.\"",
        "Some verbs (know, like, want, believe) are not usually used in the continuous form.",
      ],
      examples: [
        { en: "I am reading a book right now.", vi: "Tôi đang đọc một cuốn sách." },
        { en: "They are watching a movie tonight.", vi: "Tối nay họ đang xem phim." },
        { en: "She is learning to drive this month.", vi: "Tháng này cô ấy đang học lái xe." },
      ],
      commonMistakes: [
        { mistake: "I am knowing the answer.", correction: "I know the answer. (\"know\" is not used in continuous form)" },
        { mistake: "She is study now.", correction: "She is studying now. (need -ing on the main verb)" },
      ],
    },
    sortOrder: 2,
    quiz: {
      slug: "present-continuous-quiz",
      title: "Present Continuous — Mini Quiz",
      description: "Test your understanding of the Present Continuous tense.",
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
          explanation: "\"Want\" is a stative verb and isn't normally used in the continuous form. Say \"I want a coffee.\"",
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
        {
          type: "multiple_choice",
          prompt: "Which sentence describes a temporary situation \"this week\"?",
          explanation: "The present continuous can describe temporary arrangements around now, like staying somewhere for a short time.",
          answers: [
            { content: "He is staying with his parents this week.", isCorrect: true },
            { content: "He stays with his parents every year.", isCorrect: false },
            { content: "He stayed with his parents once.", isCorrect: false },
            { content: "He has stayed with his parents.", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "past-simple",
    title: "Past Simple",
    level: "A2",
    summary: "Use the Past Simple for completed actions at a specific time in the past.",
    content: {
      rules: [
        "Regular verbs: add -ed — \"I worked yesterday.\"",
        "Irregular verbs have their own past form — \"go → went\", \"eat → ate\".",
        "Negative: did not (didn't) + base verb — \"I didn't go to school.\"",
        "Questions: Did + subject + base verb? — \"Did you call her?\"",
        "Often used with time markers: yesterday, last week, in 2020, two days ago.",
      ],
      examples: [
        { en: "She visited Paris last summer.", vi: "Mùa hè năm ngoái cô ấy đã đến Paris." },
        { en: "We didn't watch the game.", vi: "Chúng tôi đã không xem trận đấu." },
        { en: "Did you finish your homework?", vi: "Bạn đã làm xong bài tập chưa?" },
      ],
      commonMistakes: [
        { mistake: "I didn't went to school.", correction: "I didn't go to school. (after \"didn't\", use the base verb)" },
        { mistake: "She goed home early.", correction: "She went home early. (\"go\" is irregular: go → went)" },
      ],
    },
    sortOrder: 3,
    quiz: {
      slug: "past-simple-quiz",
      title: "Past Simple — Mini Quiz",
      description: "Test your understanding of the Past Simple tense.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "Yesterday, I ______ my keys at home.",
          explanation: "\"Forget\" is irregular: forget → forgot.",
          answers: [
            { content: "forgot", isCorrect: true },
            { content: "forgetted", isCorrect: false },
            { content: "forgets", isCorrect: false },
            { content: "forgeted", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"Did you went to the party?\" is a correct question.",
          explanation: "After \"did\", the main verb stays in base form: \"Did you go to the party?\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "They ______ (not/finish) the project on time.",
          explanation: "Negative past simple: \"didn't finish\".",
          answers: [{ content: "didn't finish", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "Which time expression usually goes with the Past Simple?",
          explanation: "\"Last week\" refers to a finished, specific time in the past — perfect for the Past Simple.",
          answers: [
            { content: "last week", isCorrect: true },
            { content: "every day", isCorrect: false },
            { content: "right now", isCorrect: false },
            { content: "so far", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "present-perfect",
    title: "Present Perfect",
    level: "B1",
    summary: "Use the Present Perfect to connect the past with the present.",
    content: {
      rules: [
        "Form: have/has + past participle — \"I have finished my homework.\"",
        "Use for experiences without saying exactly when: \"I have been to Japan.\"",
        "Use for actions that started in the past and continue now, with for/since: \"She has lived here for five years.\"",
        "Use for recent actions with a present result: \"He has lost his keys.\" (he doesn't have them now)",
        "Don't use it with a specific finished time like \"yesterday\" or \"in 2020\" — use Past Simple instead.",
      ],
      examples: [
        { en: "I have already eaten lunch.", vi: "Tôi đã ăn trưa rồi." },
        { en: "She has lived in Hanoi since 2018.", vi: "Cô ấy đã sống ở Hà Nội từ năm 2018." },
        { en: "Have you ever tried durian?", vi: "Bạn đã bao giờ thử sầu riêng chưa?" },
      ],
      commonMistakes: [
        { mistake: "I have seen him yesterday.", correction: "I saw him yesterday. (specific past time → use Past Simple)" },
        { mistake: "She has live here for five years.", correction: "She has lived here for five years. (need the past participle \"lived\")" },
      ],
    },
    sortOrder: 4,
    quiz: {
      slug: "present-perfect-quiz",
      title: "Present Perfect — Mini Quiz",
      description: "Test your understanding of the Present Perfect tense.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "I ______ my keys — have you seen them?",
          explanation: "\"Have lost\" describes a past action with a present result (I don't have my keys now).",
          answers: [
            { content: "have lost", isCorrect: true },
            { content: "lost", isCorrect: false },
            { content: "am losing", isCorrect: false },
            { content: "lose", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"I have visited London last year\" is correct.",
          explanation: "\"Last year\" is a specific finished time, so it should be Past Simple: \"I visited London last year.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "She ______ (live) in this city for ten years.",
          explanation: "An action that started in the past and continues now, with \"for\": \"has lived\".",
          answers: [{ content: "has lived", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "\"Have you ever been to Korea?\" is asking about...",
          explanation: "This question asks about life experience up to now, without a specific time.",
          answers: [
            { content: "a life experience, any time up to now", isCorrect: true },
            { content: "a specific trip last year", isCorrect: false },
            { content: "a plan for next year", isCorrect: false },
            { content: "something happening right now", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "future-forms",
    title: "Future",
    level: "A2",
    summary: "Use \"will\", \"be going to\" and the Present Continuous to talk about the future.",
    content: {
      rules: [
        "\"Will\" for predictions and decisions made at the moment of speaking — \"I think it will rain.\"",
        "\"Be going to\" for plans and intentions decided before now — \"I'm going to visit my parents.\"",
        "\"Be going to\" for predictions based on present evidence — \"Look at those clouds — it's going to rain.\"",
        "Present Continuous for fixed future arrangements — \"We're flying to Da Nang on Friday.\"",
      ],
      examples: [
        { en: "I will call you when I arrive.", vi: "Tôi sẽ gọi cho bạn khi tôi đến." },
        { en: "She is going to start a new job next month.", vi: "Cô ấy sắp bắt đầu công việc mới vào tháng sau." },
        { en: "We are meeting the client at 3 p.m. tomorrow.", vi: "Ngày mai chúng tôi gặp khách hàng lúc 3 giờ chiều." },
      ],
      commonMistakes: [
        { mistake: "I will going to the gym later.", correction: "I am going to the gym later. / I will go to the gym later." },
        { mistake: "She is going travel next week.", correction: "She is going to travel next week. (need \"to\" before the base verb)" },
      ],
    },
    sortOrder: 5,
    quiz: {
      slug: "future-forms-quiz",
      title: "Future Forms — Mini Quiz",
      description: "Test your understanding of will, be going to, and the present continuous for the future.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "Look at those dark clouds! It ______ rain.",
          explanation: "\"Be going to\" is used for predictions based on present evidence you can see now.",
          answers: [
            { content: "is going to", isCorrect: true },
            { content: "will has", isCorrect: false },
            { content: "is", isCorrect: false },
            { content: "was going to", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"I will go to the gym\" and \"I'm going to the gym\" always mean the same thing.",
          explanation: "\"Will\" often shows a decision made now; \"be going to\" shows a plan decided earlier. They can differ in meaning.",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "A: \"The phone is ringing.\" B: \"I ______ (get) it!\"",
          explanation: "A decision made at the moment of speaking uses \"will\": \"I'll get it.\"",
          answers: [{ content: "will get", isCorrect: true }, { content: "'ll get", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "Which sentence describes a fixed arrangement already in the calendar?",
          explanation: "The Present Continuous is used for fixed future arrangements, like a booked flight.",
          answers: [
            { content: "We're flying to Da Nang on Friday.", isCorrect: true },
            { content: "We will maybe fly somewhere.", isCorrect: false },
            { content: "We fly to Da Nang every year.", isCorrect: false },
            { content: "We have flown to Da Nang before.", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "modal-verbs",
    title: "Modal Verbs",
    level: "B1",
    summary: "Use modal verbs (can, could, must, should, may, might) to express ability, obligation, permission and possibility.",
    content: {
      rules: [
        "Modal verbs are followed by the base verb, with no \"to\" — \"She can swim.\" not \"She can to swim.\"",
        "\"Must\" / \"have to\" express obligation — \"You must wear a seatbelt.\"",
        "\"Should\" expresses advice — \"You should see a doctor.\"",
        "\"Can\" / \"may\" express permission or possibility — \"You may leave early today.\"",
        "\"Might\" / \"could\" express a weaker possibility than \"will\" — \"It might rain later.\"",
      ],
      examples: [
        { en: "You should drink more water.", vi: "Bạn nên uống nhiều nước hơn." },
        { en: "We must finish this by Friday.", vi: "Chúng ta phải hoàn thành việc này trước thứ Sáu." },
        { en: "Can I ask you a question?", vi: "Tôi có thể hỏi bạn một câu được không?" },
      ],
      commonMistakes: [
        { mistake: "She can to swim very well.", correction: "She can swim very well. (no \"to\" after a modal verb)" },
        { mistake: "He musts finish the report.", correction: "He must finish the report. (modal verbs never take -s)" },
      ],
    },
    sortOrder: 6,
    quiz: {
      slug: "modal-verbs-quiz",
      title: "Modal Verbs — Mini Quiz",
      description: "Test your understanding of modal verbs.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "You ______ smoke in the hospital — it's forbidden.",
          explanation: "\"Must not\" expresses a strong prohibition.",
          answers: [
            { content: "must not", isCorrect: true },
            { content: "don't have to", isCorrect: false },
            { content: "should to", isCorrect: false },
            { content: "can to", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"He can swims very fast\" is grammatically correct.",
          explanation: "Modal verbs are followed by the base form: \"He can swim very fast.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "It's just a suggestion — you ______ (should) try the new restaurant downtown.",
          explanation: "\"Should\" is used to give friendly advice or a suggestion.",
          answers: [{ content: "should", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "Which sentence expresses a weak possibility?",
          explanation: "\"Might\" expresses something that is only possible, not certain.",
          answers: [
            { content: "It might rain this afternoon.", isCorrect: true },
            { content: "It must rain this afternoon.", isCorrect: false },
            { content: "It rains this afternoon.", isCorrect: false },
            { content: "It has rained this afternoon.", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "conditionals",
    title: "Conditionals",
    level: "B1",
    summary: "Use conditional sentences to talk about real and imaginary situations and their results.",
    content: {
      rules: [
        "Zero conditional (general truths): If + present simple, present simple — \"If you heat ice, it melts.\"",
        "First conditional (real future possibility): If + present simple, will + base verb — \"If it rains, I will stay home.\"",
        "Second conditional (unreal/hypothetical present): If + past simple, would + base verb — \"If I had more time, I would travel more.\"",
        "Don't mix \"will\" into the if-clause: say \"If it rains\", not \"If it will rain\".",
      ],
      examples: [
        { en: "If you don't water plants, they die.", vi: "Nếu bạn không tưới cây, chúng sẽ chết." },
        { en: "If I have free time this weekend, I will visit my grandparents.", vi: "Nếu cuối tuần này rảnh, tôi sẽ đến thăm ông bà." },
        { en: "If I won the lottery, I would buy a house.", vi: "Nếu tôi trúng số, tôi sẽ mua một căn nhà." },
      ],
      commonMistakes: [
        { mistake: "If it will rain, I will stay home.", correction: "If it rains, I will stay home. (no \"will\" in the if-clause)" },
        { mistake: "If I would have more money, I would travel.", correction: "If I had more money, I would travel. (use past simple after \"if\" in the second conditional)" },
      ],
    },
    sortOrder: 7,
    quiz: {
      slug: "conditionals-quiz",
      title: "Conditionals — Mini Quiz",
      description: "Test your understanding of zero, first and second conditionals.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "If I ______ enough money, I would travel around the world.",
          explanation: "Second conditional uses the past simple in the if-clause: \"had\".",
          answers: [
            { content: "had", isCorrect: true },
            { content: "have", isCorrect: false },
            { content: "will have", isCorrect: false },
            { content: "would have", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"If it will rain, I will bring an umbrella\" is correct.",
          explanation: "The if-clause should use the present simple, not \"will\": \"If it rains, I will bring an umbrella.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "If you heat water to 100°C, it ______ (boil). [zero conditional]",
          explanation: "Zero conditional describes general truths with present simple in both clauses: \"boils\".",
          answers: [{ content: "boils", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "\"If I have free time this weekend, I will visit my grandparents\" is which type of conditional?",
          explanation: "This describes a real, likely future possibility — the first conditional.",
          answers: [
            { content: "First conditional", isCorrect: true },
            { content: "Zero conditional", isCorrect: false },
            { content: "Second conditional", isCorrect: false },
            { content: "Third conditional", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "passive-voice",
    title: "Passive Voice",
    level: "B2",
    summary: "Use the passive voice when the action matters more than who did it.",
    content: {
      rules: [
        "Form: be + past participle — \"The cake was baked by my mother.\"",
        "Use it when the doer of the action is unknown, unimportant, or obvious — \"The window was broken.\"",
        "The tense of \"be\" changes with the tense of the sentence — is made (present), was made (past), has been made (present perfect).",
        "Add \"by + agent\" only when it's useful information — \"The novel was written by Jane Austen.\"",
      ],
      examples: [
        { en: "English is spoken in many countries.", vi: "Tiếng Anh được nói ở nhiều quốc gia." },
        { en: "The report was finished yesterday.", vi: "Bản báo cáo đã được hoàn thành hôm qua." },
        { en: "This bridge was built in 1990.", vi: "Cây cầu này được xây vào năm 1990." },
      ],
      commonMistakes: [
        { mistake: "The letter was wrote by him.", correction: "The letter was written by him. (use the past participle \"written\", not \"wrote\")" },
        { mistake: "The cake is baking by my mother.", correction: "The cake is baked by my mother. (passive needs \"be\" + past participle)" },
      ],
    },
    sortOrder: 8,
    quiz: {
      slug: "passive-voice-quiz",
      title: "Passive Voice — Mini Quiz",
      description: "Test your understanding of the passive voice.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "This song ______ by a famous singer.",
          explanation: "Passive form of the present simple: \"is sung\".",
          answers: [
            { content: "is sung", isCorrect: true },
            { content: "sings", isCorrect: false },
            { content: "is singing", isCorrect: false },
            { content: "sung", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"The window was broke last night\" is grammatically correct.",
          explanation: "The passive needs the past participle \"broken\", not \"broke\": \"The window was broken.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "The Eiffel Tower ______ (build) in 1889.",
          explanation: "Passive past simple: \"was built\".",
          answers: [{ content: "was built", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "Which sentence is a good use of the passive voice?",
          explanation: "The passive fits well when the doer is unknown or unimportant — here, we don't know who broke the window.",
          answers: [
            { content: "The window was broken last night.", isCorrect: true },
            { content: "I broke the window last night.", isCorrect: false },
            { content: "I am breaking the window.", isCorrect: false },
            { content: "I will break the window.", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "comparatives",
    title: "Comparatives",
    level: "A2",
    summary: "Use comparative and superlative forms to compare people, places and things.",
    content: {
      rules: [
        "Short adjectives (1 syllable): add -er / -est — \"fast → faster → fastest\".",
        "Adjectives ending in -y: change y to i, add -er/-est — \"happy → happier → happiest\".",
        "Long adjectives (2+ syllables): use more/most — \"expensive → more expensive → most expensive\".",
        "Irregular forms: good → better → best; bad → worse → worst.",
        "Use \"than\" with comparatives: \"This bag is cheaper than that one.\"",
      ],
      examples: [
        { en: "This phone is more expensive than mine.", vi: "Chiếc điện thoại này đắt hơn của tôi." },
        { en: "She is the tallest student in the class.", vi: "Cô ấy là học sinh cao nhất lớp." },
        { en: "Today is worse than yesterday.", vi: "Hôm nay tệ hơn hôm qua." },
      ],
      commonMistakes: [
        { mistake: "This book is more good than that one.", correction: "This book is better than that one. (\"good\" is irregular: good → better)" },
        { mistake: "She is more tall than her brother.", correction: "She is taller than her brother. (short adjectives take -er, not \"more\")" },
      ],
    },
    sortOrder: 9,
    quiz: {
      slug: "comparatives-quiz",
      title: "Comparatives — Mini Quiz",
      description: "Test your understanding of comparative and superlative forms.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "This exercise is ______ than the last one.",
          explanation: "\"Difficult\" is a long adjective, so it takes \"more\": \"more difficult\".",
          answers: [
            { content: "more difficult", isCorrect: true },
            { content: "difficulter", isCorrect: false },
            { content: "most difficult", isCorrect: false },
            { content: "difficultest", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "The superlative of \"good\" is \"goodest\".",
          explanation: "\"Good\" is irregular: good → better → best.",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "She is the ______ (happy) person I know. [superlative]",
          explanation: "Adjectives ending in -y change y to i before adding -est: \"happiest\".",
          answers: [{ content: "happiest", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "Which sentence correctly compares two things?",
          explanation: "Short adjectives take -er and are followed by \"than\".",
          answers: [
            { content: "This bag is cheaper than that one.", isCorrect: true },
            { content: "This bag is more cheap than that one.", isCorrect: false },
            { content: "This bag is cheap than that one.", isCorrect: false },
            { content: "This bag is cheapest than that one.", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "articles",
    title: "Articles",
    level: "A1",
    summary: "Use \"a\", \"an\" and \"the\" correctly before nouns.",
    content: {
      rules: [
        "Use \"a\" before a consonant sound: \"a car\", \"a university\" (starts with a /j/ sound).",
        "Use \"an\" before a vowel sound: \"an apple\", \"an hour\" (the \"h\" is silent).",
        "Use \"a/an\" the first time you mention something, or for one of many: \"I saw a dog.\"",
        "Use \"the\" when both speakers know which specific thing you mean, or after first mention: \"The dog was barking.\"",
        "No article before plural/uncountable nouns used in general statements: \"Dogs are loyal.\", \"I like music.\"",
      ],
      examples: [
        { en: "I bought a book and an umbrella.", vi: "Tôi đã mua một cuốn sách và một cái ô." },
        { en: "The book I bought yesterday is really good.", vi: "Cuốn sách tôi mua hôm qua thực sự hay." },
        { en: "Cats are independent animals.", vi: "Mèo là loài vật độc lập." },
      ],
      commonMistakes: [
        { mistake: "She is an university student.", correction: "She is a university student. (\"university\" starts with a /j/ sound, so use \"a\")" },
        { mistake: "I like the music in general.", correction: "I like music in general. (no article for general, uncountable statements)" },
      ],
    },
    sortOrder: 10,
    quiz: {
      slug: "articles-quiz",
      title: "Articles — Mini Quiz",
      description: "Test your understanding of a, an, and the.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "She waited for ______ hour before the doctor arrived.",
          explanation: "\"Hour\" starts with a silent \"h\", so it has a vowel sound: \"an hour\".",
          answers: [
            { content: "an", isCorrect: true },
            { content: "a", isCorrect: false },
            { content: "the", isCorrect: false },
            { content: "(no article)", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "\"I saw a elephant at the zoo\" is correct.",
          explanation: "\"Elephant\" starts with a vowel sound, so it needs \"an\": \"I saw an elephant.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "I bought a laptop yesterday. ______ laptop was very cheap. [second mention]",
          explanation: "After the first mention, use \"the\" because both speakers now know which laptop.",
          answers: [{ content: "The", isCorrect: true }, { content: "the", isCorrect: true }],
        },
        {
          type: "multiple_choice",
          prompt: "Which sentence is correct for a general statement about all dogs?",
          explanation: "General statements about plural nouns use no article at all.",
          answers: [
            { content: "Dogs are loyal animals.", isCorrect: true },
            { content: "The dogs are loyal animals.", isCorrect: false },
            { content: "A dogs are loyal animals.", isCorrect: false },
            { content: "An dogs are loyal animals.", isCorrect: false },
          ],
        },
      ],
    },
  },
];
