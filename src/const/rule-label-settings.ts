import { RuleType } from "./rule-type";

export const RULE_LABELS_SETTINGS: Record<RuleType, string> = {
  [RuleType.MIN_LENGTH]: "Min length",
  [RuleType.UPPERCASE]: "At least one uppercase letter (A-Z)",
  [RuleType.LOWERCASE]: "At least one lowercase letter (a-z)",
  [RuleType.DIGIT]: "At least one digit (0-9)",
  [RuleType.SPECIAL_CHARACTER]: "At least one special character (!@#$%^&*)",
  [RuleType.NO_SPACES]: "No spaces",
  [RuleType.FORBIDDEN]: "Must not contain forbidden words",
  [RuleType.REPEAT_LIMIT]: "Limit repeated characters",
};
