import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
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
