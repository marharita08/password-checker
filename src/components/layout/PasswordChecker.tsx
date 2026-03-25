"use client";

import { CheckIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Input } from "@/components/ui";
import { SerializedRule } from "@/lib/db/models/rule";
import { buildRules, checkRules, cn } from "@/utils";

interface PasswordCheckerProps {
  initialRules: SerializedRule[];
}

export function PasswordChecker({ initialRules }: PasswordCheckerProps) {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const enabledRules = buildRules(initialRules);

  const results = checkRules(password, enabledRules);
  const passedCount = Object.values(results).filter(Boolean).length;
  const allPassed = passedCount === enabledRules.length;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant={
          password.length === 0 ? "default" : allPassed ? "success" : "error"
        }
      />

      <ul className="flex flex-col gap-2">
        {enabledRules.map((rule) => {
          const passed = results[rule.type];
          return (
            <li
              key={rule.type}
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
        variant="outline"
        className="mt-2"
      >
        <SettingsIcon className="h-4 w-4" />
        Rules Settings
      </Button>
    </div>
  );
}
