import { connectDB } from "@/lib/db/mongoose";
import { Rule, RuleDocument } from "@/lib/db/models/rule";
import {
  UserRule,
  UserRuleDocument,
  SerializedUserRule,
} from "@/lib/db/models/user-rule";
import { RuleUpdate } from "@/types/rule-update";

function serialize(ur: UserRulePopulated): SerializedUserRule {
  return {
    _id: ur._id.toString(),
    type: ur.ruleId.type,
    label: ur.ruleId.label,
    enabled: ur.enabled,
    config: ur.config
      ? { minLength: ur.config.minLength ?? undefined }
      : ur.ruleId.config
        ? { minLength: ur.ruleId.config.minLength ?? undefined }
        : undefined,
  };
}

type UserRulePopulated = Omit<UserRuleDocument, "ruleId"> & {
  ruleId: RuleDocument;
};

class UserRulesService {
  private async connect() {
    await connectDB();
  }

  private async initForUser(userId: string): Promise<void> {
    const existingCount = await UserRule.countDocuments({ userId });
    if (existingCount > 0) return;

    const defaultRules = await Rule.find().lean();
    await UserRule.insertMany(
      defaultRules.map((rule) => ({
        userId,
        ruleId: rule._id,
        enabled: true,
        config: rule.config,
      })),
    );
  }

  async getForUser(
    userId: string,
    enabled?: boolean,
  ): Promise<SerializedUserRule[]> {
    await this.connect();
    await this.initForUser(userId);

    const userRules = (await UserRule.find({
      userId,
      ...(enabled !== undefined ? { enabled } : {}),
    })
      .populate<{ ruleId: RuleDocument }>("ruleId")
      .lean()) as unknown as UserRulePopulated[];

    return userRules.map((ur) => serialize(ur));
  }

  async updateMany(userId: string, updates: RuleUpdate[]): Promise<void> {
    await this.connect();
    await Promise.all(
      updates.map((u) =>
        UserRule.findOneAndUpdate(
          { _id: u.id, userId },
          {
            enabled: u.enabled,
            ...(u.config && { config: u.config }),
          },
        ),
      ),
    );
  }
}

export const userRulesService = new UserRulesService();
