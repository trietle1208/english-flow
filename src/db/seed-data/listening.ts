import type { difficultyEnum } from "@/db/schema/enums";
import type { QuizSeed } from "./quizzes";

export type ListeningLessonSeed = {
  slug: string;
  title: string;
  difficulty: (typeof difficultyEnum.enumValues)[number];
  durationSeconds: number;
  /**
   * Path under `public/audio/listening/`. Files were generated for Phase 10
   * to match each transcript (see `public/audio/README.md`).
   */
  audioUrl: string;
  transcript: string;
  /** Which course this reinforces (nullable in the schema — not every listening lesson needs one). */
  courseSlug?: string;
  quiz: QuizSeed;
};

export const listeningLessonsSeed: ListeningLessonSeed[] = [
  {
    slug: "ordering-coffee",
    title: "Ordering Coffee",
    difficulty: "easy",
    durationSeconds: 32,
    audioUrl: "/audio/listening/ordering-coffee.mp3",
    transcript:
      "Barista: Hi, welcome to Sunrise Café. What can I get you?\n" +
      "Customer: Hi, can I have a medium latte, please?\n" +
      "Barista: Sure. Would you like that hot or iced?\n" +
      "Customer: Iced, please. And could I also get a blueberry muffin?\n" +
      "Barista: Of course. That's one iced latte and one blueberry muffin. For here or to go?\n" +
      "Customer: To go, thanks.\n" +
      "Barista: That'll be six dollars fifty. Can I have your name for the order?\n" +
      "Customer: It's Minh.\n" +
      "Barista: Great, Minh. It'll be ready in a few minutes.",
    courseSlug: "everyday-english",
    quiz: {
      slug: "ordering-coffee-quiz",
      title: "Ordering Coffee — Comprehension Quiz",
      description: "Check your understanding of the coffee shop conversation.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "What size latte does the customer order?",
          explanation: "The customer says \"can I have a medium latte, please?\"",
          answers: [
            { content: "Medium", isCorrect: true },
            { content: "Small", isCorrect: false },
            { content: "Large", isCorrect: false },
            { content: "Extra large", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "The customer is eating the muffin in the café.",
          explanation: "The customer says \"To go, thanks\", meaning they are taking the order with them.",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "The total price of the order is $______.",
          explanation: "The barista says \"That'll be six dollars fifty.\"",
          answers: [{ content: "6.50", isCorrect: true }, { content: "six dollars fifty", isCorrect: true }],
        },
      ],
    },
  },
  {
    slug: "small-talk-at-work",
    title: "Making Small Talk at Work",
    difficulty: "medium",
    durationSeconds: 31,
    audioUrl: "/audio/listening/small-talk-at-work.mp3",
    transcript:
      "Anna: Morning, Tom! How was your weekend?\n" +
      "Tom: Pretty good, thanks. I went hiking with a few friends. How about you?\n" +
      "Anna: Nothing too exciting — I mostly stayed home and caught up on some reading.\n" +
      "Tom: That sounds relaxing, honestly. This week has been so busy already.\n" +
      "Anna: Tell me about it. I've got three meetings before lunch.\n" +
      "Tom: Same here. Anyway, are you still coming to the team lunch on Friday?\n" +
      "Anna: Definitely, I wouldn't miss it. See you there!",
    courseSlug: "english-conversation",
    quiz: {
      slug: "small-talk-at-work-quiz",
      title: "Making Small Talk at Work — Comprehension Quiz",
      description: "Check your understanding of the workplace conversation.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "What did Tom do over the weekend?",
          explanation: "Tom says \"I went hiking with a few friends.\"",
          answers: [
            { content: "He went hiking.", isCorrect: true },
            { content: "He stayed home and read.", isCorrect: false },
            { content: "He worked all weekend.", isCorrect: false },
            { content: "He traveled abroad.", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "Anna has a free morning with no meetings.",
          explanation: "Anna says \"I've got three meetings before lunch\", so her morning is busy.",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "The team lunch is happening on ______.",
          explanation: "Tom asks, \"are you still coming to the team lunch on Friday?\"",
          answers: [{ content: "Friday", isCorrect: true }],
        },
      ],
    },
  },
  {
    slug: "airport-check-in",
    title: "Checking in at the Airport",
    difficulty: "medium",
    durationSeconds: 35,
    audioUrl: "/audio/listening/airport-check-in.mp3",
    transcript:
      "Agent: Good morning. Passport and ticket, please.\n" +
      "Passenger: Here you go. I'm flying to Singapore.\n" +
      "Agent: Thank you. Do you have any luggage to check in?\n" +
      "Passenger: Yes, just one suitcase.\n" +
      "Agent: Okay, please place it on the scale... That's twenty-two kilograms, just under the limit. Would you like a window or aisle seat?\n" +
      "Passenger: Window, please, if it's available.\n" +
      "Agent: You're all set. Here's your boarding pass — boarding starts at gate 14 at 10:30, and the flight departs at 11:15.\n" +
      "Passenger: Thank you very much.",
    courseSlug: "english-for-travel",
    quiz: {
      slug: "airport-check-in-quiz",
      title: "Checking in at the Airport — Comprehension Quiz",
      description: "Check your understanding of the airport check-in conversation.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "How much does the passenger's suitcase weigh?",
          explanation: "The agent says \"That's twenty-two kilograms.\"",
          answers: [
            { content: "22 kg", isCorrect: true },
            { content: "12 kg", isCorrect: false },
            { content: "30 kg", isCorrect: false },
            { content: "25 kg", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "The passenger asks for an aisle seat.",
          explanation: "The passenger says \"Window, please, if it's available.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "Boarding starts at gate ______.",
          explanation: "The agent says \"boarding starts at gate 14 at 10:30.\"",
          answers: [{ content: "14", isCorrect: true }],
        },
      ],
    },
  },
  {
    slug: "asking-for-directions",
    title: "Asking for Directions",
    difficulty: "easy",
    durationSeconds: 27,
    audioUrl: "/audio/listening/asking-for-directions.mp3",
    transcript:
      "Tourist: Excuse me, could you tell me how to get to the train station?\n" +
      "Local: Sure. Go straight for two blocks, then turn left at the pharmacy.\n" +
      "Tourist: Straight for two blocks, then left at the pharmacy.\n" +
      "Local: That's right. The station will be on your right, just past the small park.\n" +
      "Tourist: How long does it take on foot?\n" +
      "Local: About ten minutes.\n" +
      "Tourist: Great, thank you so much!\n" +
      "Local: You're welcome. Have a safe trip!",
    courseSlug: "english-for-travel",
    quiz: {
      slug: "asking-for-directions-quiz",
      title: "Asking for Directions — Comprehension Quiz",
      description: "Check your understanding of the directions conversation.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "Where should the tourist turn left?",
          explanation: "The local says \"turn left at the pharmacy.\"",
          answers: [
            { content: "At the pharmacy", isCorrect: true },
            { content: "At the park", isCorrect: false },
            { content: "At the station", isCorrect: false },
            { content: "At the bank", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "The train station is a fifty-minute walk away.",
          explanation: "The local says \"About ten minutes.\"",
          answers: [
            { content: "True", isCorrect: false },
            { content: "False", isCorrect: true },
          ],
        },
        {
          type: "fill_blank",
          prompt: "The station is on the tourist's ______ side, past the small park.",
          explanation: "The local says \"The station will be on your right.\"",
          answers: [{ content: "right", isCorrect: true }],
        },
      ],
    },
  },
  {
    slug: "university-lecture-intro",
    title: "A University Lecture Introduction",
    difficulty: "hard",
    durationSeconds: 40,
    audioUrl: "/audio/listening/university-lecture-intro.mp3",
    transcript:
      "Professor: Good morning, everyone. Today we're going to start looking at climate change and its economic impact. " +
      "Before we dive into the data, I want you to consider a simple question: who actually pays the cost when a natural resource is damaged? " +
      "Over the next few weeks, we'll analyze several case studies, starting with coastal cities affected by rising sea levels. " +
      "I'll also give you a short reading assignment for next class — please review the article posted on the course page. " +
      "There will be a short quiz at the end of this unit, so take good notes. Any questions before we begin?",
    courseSlug: "academic-english",
    quiz: {
      slug: "university-lecture-intro-quiz",
      title: "University Lecture Introduction — Comprehension Quiz",
      description: "Check your understanding of the lecture introduction.",
      questions: [
        {
          type: "multiple_choice",
          prompt: "What is the topic of today's lecture?",
          explanation: "The professor says they will look at \"climate change and its economic impact.\"",
          answers: [
            { content: "Climate change and its economic impact", isCorrect: true },
            { content: "The history of universities", isCorrect: false },
            { content: "Rising college tuition", isCorrect: false },
            { content: "Renewable energy technology", isCorrect: false },
          ],
        },
        {
          type: "true_false",
          prompt: "There is a reading assignment for the next class.",
          explanation: "The professor says \"please review the article posted on the course page.\"",
          answers: [
            { content: "True", isCorrect: true },
            { content: "False", isCorrect: false },
          ],
        },
        {
          type: "fill_blank",
          prompt: "The case studies will start with ______ cities affected by rising sea levels.",
          explanation: "The professor says \"starting with coastal cities affected by rising sea levels.\"",
          answers: [{ content: "coastal", isCorrect: true }],
        },
      ],
    },
  },
];
