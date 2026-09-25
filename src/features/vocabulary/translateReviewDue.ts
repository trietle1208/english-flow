import { formatReviewDueLabel } from "./schedule";

/** Maps English `formatReviewDueLabel` output to localized vocabulary strings. */
export function translateReviewDueLabel(
  nextReviewAt: Date,
  t: (key: "dueNow" | "dueTomorrow" | "dueInDays", values?: { count: number }) => string,
  now = new Date(),
): string {
  const en = formatReviewDueLabel(nextReviewAt, now);
  if (en === "due now") {
    return t("dueNow");
  }
  if (en === "due tomorrow") {
    return t("dueTomorrow");
  }
  const match = /^due in (\d+) days$/.exec(en);
  if (match) {
    return t("dueInDays", { count: Number(match[1]) });
  }
  return en;
}
