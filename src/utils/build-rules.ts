import { PasswordRule } from "@/types/password-rule";
import { createMinLengthRule } from "./create-min-length-rule";
import { STATIC_PASSWORD_RULES } from "@/const/static-password-rules";

export function buildRules(
  enabledIds: string[],
  minLength: number,
): PasswordRule[] {
  const allRules = [createMinLengthRule(minLength), ...STATIC_PASSWORD_RULES];
  return allRules.filter((rule) => enabledIds.includes(rule.id));
}
