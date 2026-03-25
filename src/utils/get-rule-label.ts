import { DEFAULT_MIN_LENGTH, RULE_LABELS_SETTINGS, RuleType } from "@/const";
import { SerializedRule } from "@/lib/db/models/rule";

export function getRuleLabel(rule: SerializedRule): string {
  switch (rule.type) {
    case RuleType.MIN_LENGTH:
      return `At least ${rule.config?.minLength ?? DEFAULT_MIN_LENGTH} characters`;
    case RuleType.FORBIDDEN:
      return rule.config?.forbidden?.length
        ? `Must not contain: ${rule.config.forbidden.join(", ")}`
        : "Must not contain forbidden words";
    case RuleType.REPEAT_LIMIT:
      return `Limit repeated characters: ${rule.config?.repeatLimit ?? 2}`;
    default:
      return RULE_LABELS_SETTINGS[rule.type];
  }
}
