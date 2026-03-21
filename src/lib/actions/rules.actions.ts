"use server";

import { revalidatePath } from "next/cache";
import { rulesService } from "@/lib/services/rules.service";
import { RuleUpdate } from "@/type/rule-update";

export async function deleteRuleAction(id: string) {
  await rulesService.delete(id);
  revalidatePath("/settings");
}

export async function saveRulesAction(updates: RuleUpdate[]) {
  await rulesService.updateMany(updates);
  revalidatePath("/");
  revalidatePath("/settings");
}
