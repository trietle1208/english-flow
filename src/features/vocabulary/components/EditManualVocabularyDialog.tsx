"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { updateManualVocabulary } from "../actions";
import {
  updateManualVocabularySchema,
  type UpdateManualVocabularyInput,
} from "../schemas";
import type { SavedVocabularyItem } from "../types";

const POS_VALUES: UpdateManualVocabularyInput["partOfSpeech"][] = [
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

type EditManualVocabularyDialogProps = {
  item: SavedVocabularyItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Edit dialog for learner-owned vocabulary only. Catalog words never open this.
 */
export function EditManualVocabularyDialog({
  item,
  open,
  onOpenChange,
}: EditManualVocabularyDialogProps) {
  const t = useTranslations("vocabulary");
  const tc = useTranslations("common");
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<UpdateManualVocabularyInput>({
    resolver: zodResolver(updateManualVocabularySchema),
    defaultValues: toFormValues(item),
  });

  useEffect(() => {
    if (open) {
      form.reset(toFormValues(item));
      setFormError(null);
    }
  }, [open, item, form]);

  async function onSubmit(values: UpdateManualVocabularyInput) {
    setFormError(null);
    const result = await updateManualVocabulary(values);
    if (!result.ok) {
      setFormError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success(t("toastUpdated"));
    onOpenChange(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("editWord")}</DialogTitle>
          <DialogDescription>{t("editWordDescription")}</DialogDescription>
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
                    <Input autoComplete="off" {...field} />
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
                    <Input autoComplete="off" {...field} />
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
                    <Input autoComplete="off" {...field} />
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
                    <Input autoComplete="off" {...field} />
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
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
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
                  tc("saveChanges")
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function toFormValues(item: SavedVocabularyItem): UpdateManualVocabularyInput {
  return {
    vocabularyId: item.id,
    word: item.word,
    meaning: item.meaning,
    partOfSpeech: item.partOfSpeech,
    phonetic: item.phonetic,
    pronunciation: item.pronunciation,
    exampleSentence: item.exampleSentence,
  };
}
