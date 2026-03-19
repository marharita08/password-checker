export interface PasswordRule {
  id: string;
  label: string;
  validate: (password: string) => boolean;
}
