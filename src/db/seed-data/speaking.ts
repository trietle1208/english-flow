import type { cefrLevelEnum, difficultyEnum } from "@/db/schema/enums";

export type SpeakingPromptSeed = {
  slug: string;
  title: string;
  promptText: string;
  cefrLevel: (typeof cefrLevelEnum.enumValues)[number];
  difficulty: (typeof difficultyEnum.enumValues)[number];
  audioUrl?: string | null;
};

/**
 * Original EnglishFlow read-aloud prompts (PRODUCTION_ALLOWED).
 * Short enough to speak in one take; `audioUrl` stays null so the UI uses TTS.
 */
export const speakingPromptsSeed: SpeakingPromptSeed[] = [
  {
    slug: "hello-my-name",
    title: "Hello, my name is…",
    cefrLevel: "A1",
    difficulty: "easy",
    promptText:
      "Hello, my name is Linh. I live in Hanoi with my family. I like coffee in the morning and a short walk after dinner.",
  },
  {
    slug: "my-family",
    title: "My family",
    cefrLevel: "A1",
    difficulty: "easy",
    promptText:
      "I have a small family. My mother is a teacher and my father cooks dinner. We eat together at seven o'clock every night.",
  },
  {
    slug: "morning-routine",
    title: "My morning routine",
    cefrLevel: "A1",
    difficulty: "easy",
    promptText:
      "I wake up at six. I wash my face, eat bread with eggs, and take the bus to work. I start work at eight thirty.",
  },
  {
    slug: "weekend-market",
    title: "At the weekend market",
    cefrLevel: "A2",
    difficulty: "easy",
    promptText:
      "On Saturday I go to the market near my house. I buy fruit, vegetables, and fresh bread. The seller always smiles and asks how I am.",
  },
  {
    slug: "asking-directions",
    title: "Asking for directions",
    cefrLevel: "A2",
    difficulty: "medium",
    promptText:
      "Excuse me, how do I get to the train station? Is it far from here? Can I walk, or should I take a taxi? Thank you for your help.",
  },
  {
    slug: "restaurant-order",
    title: "Ordering lunch",
    cefrLevel: "A2",
    difficulty: "medium",
    promptText:
      "Hi, I would like a bowl of pho and a glass of iced tea, please. No chili, thank you. Could I also have the bill when you have a moment?",
  },
  {
    slug: "weather-clothes",
    title: "Weather and clothes",
    cefrLevel: "A2",
    difficulty: "medium",
    promptText:
      "It is raining this afternoon, so I will take an umbrella. I am wearing a light jacket and comfortable shoes. Tomorrow should be sunny and warmer.",
  },
  {
    slug: "job-interview",
    title: "A job interview",
    cefrLevel: "B1",
    difficulty: "medium",
    promptText:
      "Thank you for inviting me today. I have two years of experience in customer support. I enjoy solving problems and I would like to grow with your team.",
  },
  {
    slug: "travel-delay",
    title: "A travel delay",
    cefrLevel: "B1",
    difficulty: "hard",
    promptText:
      "My flight was delayed for three hours because of heavy rain. I waited at the gate, called my friend, and bought a sandwich. We finally left just after midnight.",
  },
  {
    slug: "remote-work-opinion",
    title: "Working from home",
    cefrLevel: "B1",
    difficulty: "hard",
    promptText:
      "I think working from home helps me focus, but I miss talking to colleagues in person. A few office days each week feels like a good balance for me.",
  },
];
