import { RULE_VALIDATORS } from "@/const";
import { SerializedRule } from "@/lib/db/models/rule";
import { PasswordRule } from "@/types/password-rule";

import { getRuleLabel } from "./get-rule-label";

export function buildRules(rules: SerializedRule[]): PasswordRule[] {
  return rules
    .map((rule) => ({
      type: rule.type,
      label: getRuleLabel(rule),
      validate: (password: string) =>
        RULE_VALIDATORS[rule.type](password, rule.config),
    }))
    .filter((rule) => rule.validate);
}
