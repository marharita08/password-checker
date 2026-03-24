export interface RuleUpdate {
  id: string;
  enabled: boolean;
  config?: { minLength?: number };
}
