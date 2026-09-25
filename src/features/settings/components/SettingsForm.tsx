"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CEFR_LEVELS } from "@/config/cefr";
import { updateSettings } from "@/features/settings/actions";
import {
  DAILY_GOAL_OPTIONS,
  PREFERRED_LEARNING_TIMES,
} from "@/features/settings/constants";
import {
  updateSettingsSchema,
  type UpdateSettingsInput,
} from "@/features/settings/schemas";
import type { SettingsUser } from "@/features/settings/types";
import { useTranslations } from "next-intl";

const NONE_VALUE = "__none__";

type SettingsFormProps = {
  user: SettingsUser;
};

/**
 * Profile + Learning settings form. Email is display-only for Phase 1;
 * Appearance/Account live in sibling sections (theme is client-only).
 */
export function SettingsForm({ user }: SettingsFormProps) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");
  const tCefr = useTranslations("cefr");

  const form = useForm<UpdateSettingsInput>({
    resolver: zodResolver(updateSettingsSchema),
    defaultValues: {
      name: user.name,
      cefrLevel: user.cefrLevel,
      dailyGoalMinutes: user.dailyGoalMinutes,
      preferredLearningTime: user.preferredLearningTime,
    },
  });

  async function onSubmit(values: UpdateSettingsInput) {
    setFormError(null);
    const result = await updateSettings(values);

    if (!result.ok) {
      setFormError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success(t("saved"));
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        {formError && (
          <div
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {formError}
          </div>
        )}

        <SectionCard
          title={t("profile")}
          description={t("profileDescription")}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      className="min-h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel htmlFor="settings-email">{t("email")}</FormLabel>
              <Input
                id="settings-email"
                type="email"
                value={user.email}
                readOnly
                disabled
                className="min-h-11"
                aria-describedby="settings-email-hint"
              />
              <p
                id="settings-email-hint"
                className="text-xs text-muted-foreground"
              >
                {t("emailHint")}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title={t("learning")}
          description={t("learningDescription")}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="cefrLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("currentLevel")}</FormLabel>
                  <Select
                    value={field.value ?? NONE_VALUE}
                    onValueChange={(value) =>
                      field.onChange(value === NONE_VALUE ? null : value)
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="min-h-11 w-full">
                        <SelectValue placeholder={tCommon("notSet")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={NONE_VALUE}>{tCommon("notSet")}</SelectItem>
                      {CEFR_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {tCefr(level)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    <Link
                      href="/placement-test"
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      {user.cefrLevel
                        ? t("retakePlacement")
                        : t("takePlacement")}
                    </Link>{" "}
                    {t("placementHint")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dailyGoalMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dailyGoal")}</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) =>
                      field.onChange(Number.parseInt(value, 10))
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="min-h-11 w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DAILY_GOAL_OPTIONS.map((minutes) => (
                        <SelectItem key={minutes} value={String(minutes)}>
                          {tCommon("minutes", { count: minutes })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {t("dailyGoalHint")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredLearningTime"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>{t("preferredTime")}</FormLabel>
                  <Select
                    value={field.value ?? NONE_VALUE}
                    onValueChange={(value) =>
                      field.onChange(value === NONE_VALUE ? null : value)
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="min-h-11 w-full sm:max-w-sm">
                        <SelectValue placeholder={tCommon("notSet")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={NONE_VALUE}>{tCommon("notSet")}</SelectItem>
                      {PREFERRED_LEARNING_TIMES.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {t(slot)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </SectionCard>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="min-h-11 w-full sm:w-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" aria-hidden="true" />
            )}
            {tCommon("saveChanges")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
