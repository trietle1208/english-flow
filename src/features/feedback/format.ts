const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatFeedbackDate(value: Date): string {
  return DATE_FMT.format(value);
}
