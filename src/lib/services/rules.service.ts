import { Rule, RuleDocument, SerializedRule } from "@/lib/db/models/rule";
import { connectDB } from "@/lib/db/mongoose";

function serialize(rule: RuleDocument): SerializedRule {
  return {
    _id: rule._id.toString(),
    type: rule.type,
    label: rule.label,
    config: rule.config
      ? { minLength: rule.config.minLength ?? undefined }
      : undefined,
  };
}

class RulesService {
  private async connect() {
    await connectDB();
  }

  async getAll(): Promise<SerializedRule[]> {
    await this.connect();
    const rules = await Rule.find().lean();
    return rules.map(serialize);
  }

  async findById(id: string): Promise<RuleDocument | null> {
    await this.connect();
    return Rule.findById(id).lean() as Promise<RuleDocument | null>;
  }
}

export const rulesService = new RulesService();
