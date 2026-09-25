import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { FeedbackForm } from "@/features/feedback/components/FeedbackForm";
import { FeedbackList } from "@/features/feedback/components/FeedbackList";
import { PublicReviews } from "@/features/feedback/components/PublicReviews";
import { listMyFeedback, listPublicReviews } from "@/features/feedback/queries";
import { requireUser } from "@/lib/session";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("feedback");
  return { title: t("title") };
}

/**
 * Product review + suggestion inbox for signed-in learners.
 */
export default async function FeedbackPage() {
  const user = await requireUser();
  const t = await getTranslations("feedback");
  const [mine, published] = await Promise.all([
    listMyFeedback(user.id),
    listPublicReviews(),
  ]);

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title={t("title")} description={t("description")} />
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <FeedbackForm />
        <FeedbackList items={mine} />
      </div>
      <PublicReviews items={published} />
    </div>
  );
}
