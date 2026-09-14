type Step = {
  title: string;
  description: string;
};

/** spec §6 "How it works" — 4 steps, in order. */
const STEPS: Step[] = [
  {
    title: "Find your level",
    description: "Take a short placement test and get a CEFR level from A1 to C2.",
  },
  {
    title: "Follow your learning path",
    description: "Work through courses and lessons matched to that level.",
  },
  {
    title: "Practice every day",
    description: "Review vocabulary, work through grammar, and train your listening.",
  },
  {
    title: "Track your progress",
    description: "Watch your streak, daily goal, and skill breakdown grow over time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How it works</h2>
      </div>

      <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex flex-col items-start gap-3">
            <span
              className="flex size-9 items-center justify-center rounded-full border-2 border-primary text-sm font-semibold text-primary"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
