import { PasswordRule } from "@/types/password-rule";

export const STATIC_PASSWORD_RULES: PasswordRule[] = [
  {
    id: "uppercase",
    label: "At least one uppercase letter (A–Z)",
    validate: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter (a–z)",
    validate: (password) => /[a-z]/.test(password),
  },
  {
    id: "digit",
    label: "At least one digit (0–9)",
    validate: (password) => /[0-9]/.test(password),
  },
  {
    id: "special-character",
    label: "At least one special character (!@#$%^&*)",
    validate: (password) => /[!@#$%^&*]/.test(password),
  },
];
