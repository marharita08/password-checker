"use server";

import { revalidatePath } from "next/cache";

import { userRulesService } from "@/lib/services/user-rules.service";
import { RuleUpdate } from "@/types/rule-update";

export async function saveRulesAction(userId: string, updates: RuleUpdate[]) {
  await userRulesService.updateMany(userId, updates);
  revalidatePath("/");
  revalidatePath("/settings");
}
