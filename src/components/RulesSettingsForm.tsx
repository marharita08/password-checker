"use client";

import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { useEnabledRules } from "@/hooks/useEnabledRules";
import { MIN_LENGTH_BOUNDS } from "@/const/min-length-bounds";
import { STATIC_PASSWORD_RULES } from "@/const/static-password-rules";
import { cn } from "@/utils/cn";
import NumberInput from "./NumberInput";
import { Button } from "./Button";

export function RulesSettingsForm() {
  const router = useRouter();
  const { enabledIds, minLength, toggle, setMinLength, hydrated } =
    useEnabledRules();

  return (
    <div className="flex flex-col gap-6">
      <ul className={cn("flex flex-col gap-4", !hydrated && "opacity-0")}>
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Checkbox
              id="min-length"
              checked={enabledIds.includes("min-length")}
              onCheckedChange={(checked) =>
                toggle("min-length", checked === true)
              }
              disabled={!hydrated}
            />
            <Label
              htmlFor="min-length"
              className={cn(
                "cursor-pointer transition-opacity",
                !enabledIds.includes("min-length") && "opacity-50",
              )}
            >
              Minimum length
            </Label>
          </div>

          {enabledIds.includes("min-length") && (
            <div className="pl-7">
              <NumberInput
                value={minLength}
                min={MIN_LENGTH_BOUNDS.min}
                max={MIN_LENGTH_BOUNDS.max}
                onChange={setMinLength}
                disabled={!hydrated}
              />
            </div>
          )}
        </li>

        {STATIC_PASSWORD_RULES.map((rule) => {
          const enabled = enabledIds.includes(rule.id);
          return (
            <li key={rule.id} className="flex items-center gap-3">
              <Checkbox
                id={rule.id}
                checked={enabled}
                onCheckedChange={(checked) => toggle(rule.id, checked === true)}
                disabled={!hydrated}
              />
              <Label
                htmlFor={rule.id}
                className={cn(
                  "cursor-pointer transition-opacity",
                  !enabled && "opacity-50",
                )}
              >
                {rule.label}
              </Label>
            </li>
          );
        })}
      </ul>

      {enabledIds.length === 0 && hydrated && (
        <p className="text-error text-xs text-center">
          Select at least one rule.
        </p>
      )}

      <Button
        onClick={() => router.push("/")}
        disabled={!hydrated || enabledIds.length === 0}
      >
        Save & go to checker
      </Button>
    </div>
  );
}
