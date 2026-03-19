import { PasswordRule } from "@/type/password-rule";

export function createMinLengthRule(minLength: number): PasswordRule {
  return {
    id: "min-length",
    label: `At least ${minLength} characters`,
    validate: (password) => password.length >= minLength,
  };
}
