import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: { type: String, required: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
};

export type SerializedUser = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const User = mongoose.models.User ?? mongoose.model("User", UserSchema);
