export const siteConfig = {
  name: "EnglishFlow",
  description:
    "Personal English learning platform — courses, vocabulary, grammar, listening, and progress tracking tailored to your CEFR level.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
