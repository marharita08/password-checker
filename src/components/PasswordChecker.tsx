"use client";

import { CheckIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/Input";
import { cn } from "@/utils/cn";
import { checkRules } from "@/utils/check-rules";
import { useEnabledRules } from "@/hooks/useEnabledRules";
import { buildRules } from "@/utils/build-rules";
import { DEFAULT_PASSWORD_RULES } from "@/const/default-password-rules";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

export function PasswordChecker() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { enabledIds, hydrated, minLength } = useEnabledRules();

  const rules = hydrated
    ? buildRules(enabledIds, minLength)
    : DEFAULT_PASSWORD_RULES;
  const results = checkRules(password, rules);
  const passedCount = Object.values(results).filter(Boolean).length;
  const allPassed = passedCount === rules.length;
  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        placeholder="Enter your password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant={
          password.length === 0 ? "default" : allPassed ? "success" : "error"
        }
      />

      <ul className="flex flex-col gap-2">
        {rules.map((rule) => {
          const passed = results[rule.id];

          return (
            <li
              key={rule.id}
              className={cn(
                "flex items-center gap-2 text-sm transition-colors duration-200",
                passed ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                  passed ? "bg-success" : "bg-muted",
                )}
              >
                {passed && <CheckIcon className="h-2.5 w-2.5 text-white" />}
              </span>
              {rule.label}
            </li>
          );
        })}
      </ul>
      <Button
        onClick={() => router.push("/settings")}
        variant={"outline"}
        className="mt-2"
      >
        <SettingsIcon className="h-4 w-4" />
        Rules Settings
      </Button>
    </div>
  );
}
