"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";
import NumberInput from "@/components/NumberInput";
import { MIN_LENGTH_BOUNDS } from "@/const/min-length-bounds";
import { STATIC_PASSWORD_RULES } from "@/const/static-password-rules";
import { saveRulesAction } from "@/lib/actions/user-rules.actions";
import { SerializedUserRule } from "@/lib/db/models/user-rule";
import { RuleUpdate } from "@/types/rule-update";
import { cn } from "@/utils/cn";

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
  const [rules, setRules] = useState(initialRules);

  const minLengthRule = rules.find((r) => r.type === "min-length");
  const hasEnabledRules = rules.some((r) => r.enabled);

  const handleToggle = (id: string, enabled: boolean) => {
    setRules((prev) => prev.map((r) => (r._id === id ? { ...r, enabled } : r)));
  };

  const handleMinLengthChange = (id: string, minLength: number) => {
    setRules((prev) =>
      prev.map((r) => (r._id === id ? { ...r, config: { minLength } } : r)),
    );
  };

  const handleSave = () => {
    startTransition(async () => {
      const updates: RuleUpdate[] = rules.map((r) => ({
        id: r._id,
        enabled: r.enabled,
        config: r.config,
      }));
      await saveRulesAction(userId, updates);
      router.push("/");
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <ul className="flex flex-col gap-4">
        {minLengthRule && (
          <li className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Checkbox
                id="min-length"
                checked={minLengthRule.enabled}
                onCheckedChange={(checked) =>
                  handleToggle(minLengthRule._id, checked === true)
                }
              />
              <Label
                htmlFor="min-length"
                className={cn(
                  "cursor-pointer transition-opacity",
                  !minLengthRule.enabled && "opacity-50",
                )}
              >
                Minimum length
              </Label>
            </div>
            {minLengthRule.enabled && (
              <div className="pl-7">
                <NumberInput
                  value={minLengthRule.config?.minLength ?? 8}
                  min={MIN_LENGTH_BOUNDS.min}
                  max={MIN_LENGTH_BOUNDS.max}
                  onChange={(value) =>
                    handleMinLengthChange(minLengthRule._id, value)
                  }
                />
              </div>
            )}
          </li>
        )}

        {STATIC_PASSWORD_RULES.map((staticRule) => {
          const dbRule = rules.find((r) => r.type === staticRule.id);
          if (!dbRule) return null;
          return (
            <li key={staticRule.id} className="flex items-center gap-3">
              <Checkbox
                id={staticRule.id}
                checked={dbRule.enabled}
                onCheckedChange={(checked) =>
                  handleToggle(dbRule._id, checked === true)
                }
              />
              <Label
                htmlFor={staticRule.id}
                className={cn(
                  "cursor-pointer transition-opacity",
                  !dbRule.enabled && "opacity-50",
                )}
              >
                {staticRule.label}
              </Label>
            </li>
          );
        })}
      </ul>

      {!hasEnabledRules && (
        <p className="text-error text-xs text-center">
          Select at least one rule.
        </p>
      )}

      <Button disabled={isPending || !hasEnabledRules} onClick={handleSave}>
        {isPending ? "Saving..." : "Save & go to checker"}
      </Button>
    </div>
  );
}
