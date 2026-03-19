import { PasswordRule } from "@/type/password-rule";

export function checkRules(
  password: string,
  rules: PasswordRule[],
): Record<string, boolean> {
  return Object.fromEntries(
    rules.map((rule) => [rule.id, rule.validate(password)]),
  );
}
