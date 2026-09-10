import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Forgot password",
};

/**
 * Explains that email-based password reset isn't built yet (spec §7 —
 * Phase 1 has no email sending). Exists so the "Forgot password" link on
 * `/login` doesn't 404; a real reset flow is future work.
 */
export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot password</CardTitle>
        <CardDescription>Password reset by email isn&apos;t available yet.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>
          EnglishFlow doesn&apos;t send emails yet, so we can&apos;t reset your password this way
          for now. If you&apos;re stuck, use a different account or contact support once that
          channel exists.
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">Back to sign in</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
