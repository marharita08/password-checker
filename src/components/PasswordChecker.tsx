"use client";

import { CheckIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { cn } from "@/utils/cn";
import { checkRules } from "@/utils/check-rules";
import { buildRules } from "@/utils/build-rules";
import { SerializedRule } from "@/lib/db/models/rule";

interface PasswordCheckerProps {
  initialRules: SerializedRule[];
}

export function PasswordChecker({ initialRules }: PasswordCheckerProps) {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const enabledRules = buildRules(
    initialRules.map((r) => r.type),
    initialRules.find((r) => r.type === "min-length")?.config?.minLength ?? 8,
  );

  const results = checkRules(password, enabledRules);
  const passedCount = Object.values(results).filter(Boolean).length;
  const allPassed = passedCount === enabledRules.length;

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
        {enabledRules.map((rule) => {
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
        variant="outline"
        className="mt-2"
      >
        <SettingsIcon className="h-4 w-4" />
        Rules Settings
      </Button>
    </div>
  );
}
