import { PasswordRule } from "@/types/password-rule";

export function checkRules(
  password: string,
  rules: PasswordRule[],
): Record<string, boolean> {
  return Object.fromEntries(
    rules.map((rule) => [rule.type, rule.validate(password)]),
  );
}
