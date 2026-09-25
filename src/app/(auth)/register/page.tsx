import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/register-form";
import { getCurrentUser } from "@/lib/session";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return { title: t("registerMeta") };
}

export default async function RegisterPage() {
  // DB-backed check — see login/page.tsx for why this lives here, not middleware.
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  const t = await getTranslations("auth");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("registerTitle")}</CardTitle>
        <CardDescription>{t("registerDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
