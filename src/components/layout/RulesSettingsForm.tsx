"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import {
  Button,
  Checkbox,
  Input,
  InputError,
  Label,
  NumberInput,
} from "@/components/ui";
import { MIN_LENGTH_BOUNDS, RULE_LABELS_SETTINGS, RuleType } from "@/const";
import { saveRulesAction } from "@/lib/actions";
import { SerializedUserRule } from "@/lib/db/models/user-rule";
import { RulesFormValues, rulesSchema } from "@/lib/schemas/rules.schema";
import { cn } from "@/utils";

interface RulesSettingsFormProps {
  initialRules: SerializedUserRule[];
  userId: string;
}

export function RulesSettingsForm({
  initialRules,
  userId,
}: RulesSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RulesFormValues>({
    resolver: zodResolver(rulesSchema),
    defaultValues: {
      rules: initialRules.map((r) => ({
        id: r._id,
        type: r.type,
        label: RULE_LABELS_SETTINGS[r.type],
        enabled: r.enabled,
        config: {
          minLength: r.config?.minLength,
          forbiddenString: r.config?.forbidden?.join(", "),
          repeatLimit: r.config?.repeatLimit,
        },
      })),
    },
  });

  const rules = useWatch({
    control,
    name: "rules",
  });

  const hasEnabledRules = rules.some((r) => r.enabled);

  const onSubmit = (data: RulesFormValues) => {
    startTransition(async () => {
      const updates = data.rules.map((r) => ({
        id: r.id,
        enabled: r.enabled,
        config: {
          ...r.config,
          forbidden: r.config?.forbiddenString
            ?.split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      }));

      await saveRulesAction(userId, updates);
      router.push("/");
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
    >
      <ul className="flex flex-col gap-4">
        {rules.map((rule, index) => (
          <li key={rule.id} className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Controller
                control={control}
                name={`rules.${index}.enabled`}
                render={({ field }) => (
                  <Checkbox
                    id={rule.type}
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                )}
              />

              <Label
                htmlFor={rule.type}
                className={cn(
                  "cursor-pointer transition-opacity",
                  !rule.enabled && "opacity-50",
                )}
              >
                {rule.label}
              </Label>
            </div>

            <div
              className={cn(
                "pl-7 flex flex-col gap-1",
                !rule.enabled && "opacity-50",
              )}
            >
              {rule.type === RuleType.MIN_LENGTH && rule.enabled && (
                <Controller
                  control={control}
                  name={`rules.${index}.config.minLength`}
                  render={({ field }) => (
                    <NumberInput
                      value={field.value ?? MIN_LENGTH_BOUNDS.min}
                      min={MIN_LENGTH_BOUNDS.min}
                      max={MIN_LENGTH_BOUNDS.max}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}

              {rule.type === RuleType.FORBIDDEN && rule.enabled && (
                <Controller
                  control={control}
                  name={`rules.${index}.config.forbiddenString`}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter forbidden words (comma separated)"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {rule.type === RuleType.REPEAT_LIMIT && rule.enabled && (
                <Controller
                  control={control}
                  name={`rules.${index}.config.repeatLimit`}
                  render={({ field }) => (
                    <NumberInput
                      value={field.value ?? 2}
                      min={1}
                      max={10}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}

              <InputError
                error={
                  errors.rules?.[index]?.config?.minLength?.message ??
                  errors.rules?.[index]?.config?.forbidden?.message ??
                  errors.rules?.[index]?.config?.repeatLimit?.message
                }
              />
            </div>
          </li>
        ))}
      </ul>

      <InputError error={errors.rules?.message} className="justify-center" />

      <Button type="submit" disabled={isPending || !hasEnabledRules}>
        {isPending ? "Saving..." : "Save & go to checker"}
      </Button>
    </form>
  );
}
