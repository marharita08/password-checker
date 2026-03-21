"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";
import NumberInput from "@/components/NumberInput";
import { MIN_LENGTH_BOUNDS } from "@/const/min-length-bounds";
import { STATIC_PASSWORD_RULES } from "@/const/static-password-rules";
import { saveRulesAction } from "@/lib/actions/rules.actions";
import { SerializedRule } from "@/lib/db/models/rule";
import { RuleUpdate } from "@/type/rule-update";

interface RulesSettingsFormProps {
  initialRules: SerializedRule[];
}

export function RulesSettingsForm({ initialRules }: RulesSettingsFormProps) {
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
      await saveRulesAction(updates);
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
              <Label htmlFor="min-length">Minimum length</Label>
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
              <Label htmlFor={staticRule.id}>{staticRule.label}</Label>
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
