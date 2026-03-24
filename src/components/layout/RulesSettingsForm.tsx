"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import {
  Button,
  Checkbox,
  InputError,
  Label,
  NumberInput,
} from "@/components/ui";
import { MIN_LENGTH_BOUNDS, RuleType } from "@/const";
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
        label: r.label,
        enabled: r.enabled,
        config: r.config,
      })),
    },
  });

  const rules = useWatch({
    control,
    name: "rules",
  });

  const minLengthIndex = rules.findIndex((r) => r.type === RuleType.MIN_LENGTH);

  const hasEnabledRules = rules.some((r) => r.enabled);

  const onSubmit = (data: RulesFormValues) => {
    startTransition(async () => {
      const updates = data.rules.map((r) => ({
        id: r.id,
        enabled: r.enabled,
        config: r.config,
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
        {minLengthIndex !== -1 && (
          <li className="flex flex-col gap-2">
            <Controller
              control={control}
              name={`rules.${minLengthIndex}.enabled`}
              render={({ field }) => (
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={RuleType.MIN_LENGTH}
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                  <Label
                    htmlFor={RuleType.MIN_LENGTH}
                    className={cn(
                      "cursor-pointer transition-opacity",
                      !field.value && "opacity-50",
                    )}
                  >
                    Minimum length
                  </Label>
                </div>
              )}
            />

            {rules[minLengthIndex]?.enabled && (
              <div className="pl-7 flex flex-col gap-1">
                <Controller
                  control={control}
                  name={`rules.${minLengthIndex}.config.minLength`}
                  render={({ field }) => (
                    <NumberInput
                      value={field.value ?? MIN_LENGTH_BOUNDS.min}
                      min={MIN_LENGTH_BOUNDS.min}
                      max={MIN_LENGTH_BOUNDS.max}
                      onChange={field.onChange}
                    />
                  )}
                />

                <InputError
                  error={
                    errors.rules?.[minLengthIndex]?.config?.minLength?.message
                  }
                />
              </div>
            )}
          </li>
        )}

        {rules.map((rule, index) => {
          if (rule.type === RuleType.MIN_LENGTH) return null;

          return (
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
            </li>
          );
        })}
      </ul>

      <InputError error={errors.rules?.message} className="justify-center" />

      <Button type="submit" disabled={isPending || !hasEnabledRules}>
        {isPending ? "Saving..." : "Save & go to checker"}
      </Button>
    </form>
  );
}
