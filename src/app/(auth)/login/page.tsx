import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";
import { getCurrentUser } from "@/lib/session";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return { title: t("signInTitle") };
}

export default async function LoginPage() {
  // DB-backed check (not cookie-only) so a stale session never bounce-loops
  // with middleware the way an edge cookie check would.
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  const t = await getTranslations("auth");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("signInTitle")}</CardTitle>
        <CardDescription>{t("signInDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
