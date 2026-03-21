import { connectDB } from "@/lib/db/mongoose";
import { Rule, RuleDocument, SerializedRule } from "@/lib/db/models/rule";
import { RuleUpdate } from "@/type/rule-update";

function serialize(rule: RuleDocument): SerializedRule {
  return {
    _id: rule._id.toString(),
    type: rule.type,
    label: rule.label,
    enabled: rule.enabled,
    isDefault: rule.isDefault,
    config: rule.config
      ? { minLength: rule.config.minLength ?? undefined }
      : undefined,
  };
}

class RulesService {
  private async connect() {
    await connectDB();
  }

  async getAll(enabled?: boolean): Promise<SerializedRule[]> {
    await this.connect();
    const filter = enabled !== undefined ? { enabled } : {};
    const rules = await Rule.find(filter).lean();
    return rules.map(serialize);
  }

  async updateMany(updates: RuleUpdate[]): Promise<void> {
    await this.connect();
    await Promise.all(
      updates.map((u) =>
        Rule.findByIdAndUpdate(u.id, {
          enabled: u.enabled,
          ...(u.config && { config: u.config }),
        }),
      ),
    );
  }

  async delete(id: string): Promise<boolean> {
    await this.connect();
    const result = await Rule.findByIdAndDelete(id);
    return result !== null;
  }
}

export const rulesService = new RulesService();
