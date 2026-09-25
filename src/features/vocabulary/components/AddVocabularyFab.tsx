"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { createManualVocabulary } from "../actions";
import {
  createManualVocabularySchema,
  type CreateManualVocabularyInput,
} from "../schemas";

const POS_VALUES: CreateManualVocabularyInput["partOfSpeech"][] = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
  "phrase",
  "phrasal_verb",
];

/**
 * Fixed high-z floating action on every authenticated view — open a dialog
 * to add a learner-owned vocabulary word without leaving the current page.
 */
export function AddVocabularyFab() {
  const t = useTranslations("vocabulary");
  const tc = useTranslations("common");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<CreateManualVocabularyInput>({
    resolver: zodResolver(createManualVocabularySchema),
    defaultValues: {
      word: "",
      meaning: "",
      partOfSpeech: "noun",
      phonetic: "",
      pronunciation: "",
      exampleSentence: "",
    },
  });

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setFormError(null);
      form.reset();
    }
  }

  async function onSubmit(values: CreateManualVocabularyInput) {
    setFormError(null);
    const result = await createManualVocabulary(values);
    if (!result.ok) {
      setFormError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success(t("toastAdded", { word: values.word.trim() }));
    handleOpenChange(false);
    router.refresh();
  }

  return (
    <>
      <Button
        type="button"
        size="icon"
        className="fixed bottom-20 right-4 z-50 size-14 rounded-full shadow-lg md:bottom-6 md:right-6"
        aria-label={t("addWordAria")}
        onClick={() => setOpen(true)}
      >
        <Plus className="size-6" aria-hidden="true" />
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("addWord")}</DialogTitle>
            <DialogDescription>{t("addWordDescription")}</DialogDescription>
          </DialogHeader>

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
                name="word"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("englishWord")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("englishPlaceholder")}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meaning"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("meaning")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("meaningPlaceholder")} autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partOfSpeech"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("partOfSpeech")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("selectPos")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {POS_VALUES.map((value) => (
                          <SelectItem key={value} value={value}>
                            {t(`pos.${value}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phonetic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phonetic")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("phoneticPlaceholder")} autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pronunciation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("pronunciation")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("pronunciationPlaceholder")}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exampleSentence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("exampleOptional")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("examplePlaceholder")}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={form.formState.isSubmitting}
                >
                  {tc("cancel")}
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      {tc("saving")}
                    </>
                  ) : (
                    t("saveWord")
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
