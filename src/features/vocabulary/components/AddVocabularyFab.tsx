"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
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

const POS_OPTIONS: { value: CreateManualVocabularyInput["partOfSpeech"]; label: string }[] = [
  { value: "noun", label: "Noun" },
  { value: "verb", label: "Verb" },
  { value: "adjective", label: "Adjective" },
  { value: "adverb", label: "Adverb" },
  { value: "pronoun", label: "Pronoun" },
  { value: "preposition", label: "Preposition" },
  { value: "conjunction", label: "Conjunction" },
  { value: "interjection", label: "Interjection" },
  { value: "phrase", label: "Phrase" },
  { value: "phrasal_verb", label: "Phrasal verb" },
];

/**
 * Fixed high-z floating action on every authenticated view — open a dialog
 * to add a learner-owned vocabulary word without leaving the current page.
 */
export function AddVocabularyFab() {
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

    toast.success(`Added “${values.word.trim()}” to your vocabulary.`);
    handleOpenChange(false);
    router.refresh();
  }

  return (
    <>
      <Button
        type="button"
        size="icon"
        className="fixed bottom-20 right-4 z-50 size-14 rounded-full shadow-lg md:bottom-6 md:right-6"
        aria-label="Add vocabulary word"
        onClick={() => setOpen(true)}
      >
        <Plus className="size-6" aria-hidden="true" />
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a word</DialogTitle>
            <DialogDescription>
              Save a word you learned yourself — it stays on your vocabulary list.
            </DialogDescription>
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
                    <FormLabel>English word</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. improve" autoComplete="off" {...field} />
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
                    <FormLabel>Meaning</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. cải thiện" autoComplete="off" {...field} />
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
                    <FormLabel>Part of speech</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select part of speech" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {POS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                    <FormLabel>Phonetic (IPA)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. /ɪmˈpruːv/" autoComplete="off" {...field} />
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
                    <FormLabel>Pronunciation (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. im-PROOV" autoComplete="off" {...field} />
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
                    <FormLabel>Example (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. I want to improve my English."
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
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Saving…
                    </>
                  ) : (
                    "Save word"
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
