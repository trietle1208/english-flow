import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return { title: t("forgotMeta") };
}

/**
 * Explains that email-based password reset isn't built yet (spec §7 —
 * Phase 1 has no email sending). Exists so the "Forgot password" link on
 * `/login` doesn't 404; a real reset flow is future work.
 */
export default async function ForgotPasswordPage() {
  const t = await getTranslations("auth");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("forgotTitle")}</CardTitle>
        <CardDescription>{t("forgotDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>{t("forgotBody")}</p>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">{t("backToSignIn")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
