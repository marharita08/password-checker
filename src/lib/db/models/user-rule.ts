import mongoose, { InferSchemaType } from "mongoose";

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
  type: string;
  label: string;
  enabled: boolean;
  config?: { minLength?: number };
};

export const UserRule =
  mongoose.models.UserRule ?? mongoose.model("UserRule", UserRuleSchema);
