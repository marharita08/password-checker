import { DEFAULT_PASSWORD_RULES } from "@/const/default-password-rules";
import { PasswordRule } from "@/type/password-rule";

export function filterRules(enabledIds: string[] | undefined): PasswordRule[] {
  if (!enabledIds || enabledIds.length === 0) {
    return DEFAULT_PASSWORD_RULES;
  }
  return DEFAULT_PASSWORD_RULES.filter((rule) => enabledIds.includes(rule.id));
}
