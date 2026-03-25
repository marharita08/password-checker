import mongoose, { InferSchemaType } from "mongoose";

import { RuleType } from "@/const";

const RuleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(RuleType),
      required: true,
    },
    isDefault: { type: Boolean, default: false },
    config: {
      minLength: { type: Number },
      forbidden: [{ type: String }],
      repeatLimit: { type: Number },
    },
  },
  { timestamps: true },
);

export type RuleDocument = InferSchemaType<typeof RuleSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Rule = mongoose.models.Rule ?? mongoose.model("Rule", RuleSchema);

export type SerializedRule = {
  _id: string;
  type: RuleType;
  config?: { minLength?: number; forbidden?: string[]; repeatLimit?: number };
};
