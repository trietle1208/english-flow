"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/features/feedback/actions";
import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_CATEGORY_LABELS,
} from "@/features/feedback/constants";
import {
  submitFeedbackSchema,
  type SubmitFeedbackInput,
} from "@/features/feedback/schemas";
import { RatingStars } from "./RatingStars";

const DEFAULT_VALUES: SubmitFeedbackInput = {
  category: "suggestion",
  rating: null,
  title: "",
  message: "",
  isPublic: false,
};

/**
 * Submit a review or suggestion. Client Zod matches the Server Action.
 */
export function FeedbackForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<SubmitFeedbackInput>({
    resolver: zodResolver(submitFeedbackSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values: SubmitFeedbackInput) {
    setFormError(null);
    const result = await submitFeedback(values);

    if (!result.ok) {
      setFormError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success("Cảm ơn bạn — góp ý đã được gửi.");
    form.reset(DEFAULT_VALUES);
    router.refresh();
  }

  return (
    <SectionCard
      title="Gửi góp ý"
      description="Bug, ý tưởng, lỗi nội dung, hoặc một đánh giá ngắn về EnglishFlow."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="min-h-11 w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FEEDBACK_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {FEEDBACK_CATEGORY_LABELS[category]}
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
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đánh giá</FormLabel>
                <FormControl>
                  <RatingStars value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  Bắt buộc nếu bạn chọn Đánh giá. Tùy chọn cho các loại khác.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input
                    className="min-h-11"
                    maxLength={120}
                    placeholder="Ví dụ: Quiz fill-blank khó đọc trên điện thoại"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-32"
                    maxLength={2000}
                    placeholder="Mô tả những gì bạn thấy, những gì bạn mong đợi, hoặc ý tưởng cải thiện."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel className="font-medium leading-snug">
                    Chia sẻ công khai
                  </FormLabel>
                  <FormDescription>
                    Học viên khác sẽ thấy tiêu đề, nội dung và tên của bạn — không
                    phải email.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="min-h-11 w-full sm:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" aria-hidden="true" />
              )}
              Gửi góp ý
            </Button>
          </div>
        </form>
      </Form>
    </SectionCard>
  );
}
