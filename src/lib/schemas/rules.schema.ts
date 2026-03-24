import { z } from "zod";

import { MIN_LENGTH_BOUNDS, RuleType } from "@/const";

const ruleTypeValues = Object.values(RuleType) as [RuleType, ...RuleType[]];

export const rulesSchema = z
  .object({
    rules: z.array(
      z.object({
        id: z.string(),
        type: z.enum(ruleTypeValues),
        label: z.string(),
        enabled: z.boolean(),
        config: z
          .object({
            minLength: z
              .number()
              .min(MIN_LENGTH_BOUNDS.min)
              .max(MIN_LENGTH_BOUNDS.max)
              .optional(),
          })
          .optional(),
      }),
    ),
  })
  .refine((data) => data.rules.some((r) => r.enabled), {
    path: ["rules"],
    message: "Select at least one rule.",
  });

export type RulesFormValues = z.infer<typeof rulesSchema>;
