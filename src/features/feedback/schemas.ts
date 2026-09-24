import { z } from "zod";
import { FEEDBACK_CATEGORIES } from "./constants";

export const submitFeedbackSchema = z
  .object({
    category: z.enum(FEEDBACK_CATEGORIES),
    rating: z
      .number()
      .int()
      .min(1, "Số sao phải từ 1 đến 5.")
      .max(5, "Số sao phải từ 1 đến 5.")
      .nullable(),
    title: z
      .string()
      .trim()
      .min(3, "Tiêu đề quá ngắn.")
      .max(120, "Tiêu đề quá dài."),
    message: z
      .string()
      .trim()
      .min(10, "Vui lòng viết ít nhất 10 ký tự.")
      .max(2000, "Nội dung quá dài."),
    isPublic: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.category === "review" && data.rating == null) {
      ctx.addIssue({
        code: "custom",
        path: ["rating"],
        message: "Hãy chọn số sao cho đánh giá.",
      });
    }
  });

export type SubmitFeedbackInput = z.infer<typeof submitFeedbackSchema>;
