import { z } from "zod";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, "Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    email: z.string().regex(EMAIL_REGEX, "Invalid email address"),
    password: z.string().regex(PASSWORD_REGEX, {
      error:
        "Password must be at least 8 characters and contain uppercase, lowercase and digit",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
