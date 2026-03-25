import { DEFAULT_MIN_LENGTH } from "./default-min-length";
import { RuleType } from "./rule-type";

function hasTooManyRepeats(password: string, limit: number) {
  let count = 1;

  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      count++;
      if (count > limit) return true;
    } else {
      count = 1;
    }
  }

  return false;
}

export const RULE_VALIDATORS: Record<
  RuleType,
  (
    password: string,
    config?: { minLength?: number; forbidden?: string[]; repeatLimit?: number },
  ) => boolean
> = {
  [RuleType.MIN_LENGTH]: (password: string, config) =>
    password.length >= (config?.minLength ?? DEFAULT_MIN_LENGTH),

  [RuleType.UPPERCASE]: (password: string) => /[A-Z]/.test(password),

  [RuleType.LOWERCASE]: (password: string) => /[a-z]/.test(password),

  [RuleType.DIGIT]: (password: string) => /[0-9]/.test(password),

  [RuleType.SPECIAL_CHARACTER]: (password: string) =>
    /[!@#$%^&*]/.test(password),

  [RuleType.NO_SPACES]: (password: string) => !/\s/.test(password),

  [RuleType.FORBIDDEN]: (password: string, config) => {
    if (!config?.forbidden?.length) return true;

    const lower = password.toLowerCase();

    return !config.forbidden.some((word: string) =>
      lower.includes(word.toLowerCase()),
    );
  },

  [RuleType.REPEAT_LIMIT]: (password: string, config) => {
    if (!config?.repeatLimit) return true;
    return !hasTooManyRepeats(password, config.repeatLimit);
  },
};
