import { z } from "zod";

/**
 * Shared password rule (spec §34): at least 8 characters, at least one
 * letter and one digit. better-auth only enforces `minPasswordLength` itself
 * (see `src/lib/auth.ts`), so this is the one place the full rule lives —
 * used by both the client form and the Server Action, per "validate cả
 * client và server".
 */
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Za-z]/, "Password must contain at least one letter.")
  .regex(/[0-9]/, "Password must contain at least one number.");

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required.").max(100, "Name is too long."),
    email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
