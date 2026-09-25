"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { registerAction } from "@/features/auth/actions";
import { registerSchema, type RegisterInput } from "@/features/auth/schemas";
import { GoogleIcon } from "@/features/auth/components/google-icon";
import { useTranslations } from "next-intl";

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const t = useTranslations("auth");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: RegisterInput) {
    setFormError(null);
    const result = await registerAction(values);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    toast.success(t("accountCreated"));
    router.push("/placement-test");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        {formError && (
          <div
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {formError}
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("namePlaceholder")} autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("confirmPassword")}</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          {t("createAccountButton")}
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0} className="block w-full">
              <Button type="button" variant="outline" className="w-full" disabled>
                <GoogleIcon />
                {t("continueGoogle")}
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>{t("comingSoon")}</TooltipContent>
        </Tooltip>
      </form>
    </Form>
  );
}
