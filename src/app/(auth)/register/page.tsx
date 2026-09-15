import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/register-form";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Create account",
};

export default async function RegisterPage() {
  // DB-backed check — see login/page.tsx for why this lives here, not middleware.
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Start learning English at your own pace — free, no credit card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
