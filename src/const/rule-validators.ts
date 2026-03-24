import { DEFAULT_MIN_LENGTH } from "./default-min-length";
import { RuleType } from "./rule-type";

export const RULE_VALIDATORS: Record<RuleType, (password: string) => boolean> =
  {
    [RuleType.MIN_LENGTH]: (password: string) =>
      password.length >= DEFAULT_MIN_LENGTH,
    [RuleType.UPPERCASE]: (password: string) => /[A-Z]/.test(password),
    [RuleType.LOWERCASE]: (password: string) => /[a-z]/.test(password),
    [RuleType.DIGIT]: (password: string) => /[0-9]/.test(password),
    [RuleType.SPECIAL_CHARACTER]: (password: string) =>
      /[!@#$%^&*]/.test(password),
  };
