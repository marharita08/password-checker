import mongoose, { InferSchemaType } from "mongoose";

import { RuleType } from "@/const";

const UserRuleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ruleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rule",
      required: true,
    },
    enabled: { type: Boolean, default: true },
    config: {
      minLength: { type: Number },
      forbidden: [{ type: String }],
      repeatLimit: { type: Number },
    },
  },
  { timestamps: true },
);

UserRuleSchema.index({ userId: 1, ruleId: 1 }, { unique: true });

export type UserRuleDocument = InferSchemaType<typeof UserRuleSchema> & {
  _id: mongoose.Types.ObjectId;
};

export type SerializedUserRule = {
  _id: string;
  type: RuleType;
  enabled: boolean;
  config?: { minLength?: number; forbidden?: string[]; repeatLimit?: number };
};

export const UserRule =
  mongoose.models.UserRule ?? mongoose.model("UserRule", UserRuleSchema);
