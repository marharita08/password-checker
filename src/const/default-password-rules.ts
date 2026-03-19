import { PasswordRule } from "@/type/password-rule";
import { createMinLengthRule } from "@/utils/create-min-length-rule";
import { DEFAULT_MIN_LENGTH } from "./default-min-length";
import { STATIC_PASSWORD_RULES } from "./static-password-rules";

export const DEFAULT_PASSWORD_RULES: PasswordRule[] = [
  createMinLengthRule(DEFAULT_MIN_LENGTH),
  ...STATIC_PASSWORD_RULES,
];
