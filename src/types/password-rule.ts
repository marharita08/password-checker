import { RuleType } from "@/const";

export interface PasswordRule {
  type: RuleType;
  label: string;
  validate: (password: string) => boolean;
}
