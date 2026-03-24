import mongoose, { InferSchemaType } from "mongoose";

const RuleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["min-length", "uppercase", "lowercase", "digit"],
      required: true,
    },
    label: { type: String, required: true },
    config: {
      minLength: { type: Number },
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
  type: string;
  label: string;
  config?: { minLength?: number };
};
