import { DEFAULT_MIN_LENGTH, RULE_VALIDATORS, RuleType } from "@/const";
import { SerializedRule } from "@/lib/db/models/rule";
import { PasswordRule } from "@/types/password-rule";

export function buildRules(
  rules: SerializedRule[],
  minLength: number,
): PasswordRule[] {
  return rules
    .map((rule) => ({
      id: rule.type,
      label:
        rule.type === RuleType.MIN_LENGTH
          ? rule.label.replace(
              DEFAULT_MIN_LENGTH.toString(),
              minLength.toString(),
            )
          : rule.label,
      validate:
        rule.type === RuleType.MIN_LENGTH
          ? (password: string) => password.length >= minLength
          : RULE_VALIDATORS[rule.type],
    }))
    .filter((rule) => rule.validate);
}
