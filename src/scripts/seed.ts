import mongoose from "mongoose";
import { Rule } from "@/lib/db/models/rule";
import { UserRule } from "@/lib/db/models/user-rule";

const defaults = [
  {
    type: "min-length",
    label: "At least 8 characters",
    config: { minLength: 8 },
  },
  { type: "uppercase", label: "At least one uppercase letter" },
  { type: "lowercase", label: "At least one lowercase letter" },
  { type: "digit", label: "At least one digit" },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Rule.deleteMany({});
  await UserRule.deleteMany({});
  await Rule.insertMany(defaults);
  console.log("Seeded successfully");
  await mongoose.disconnect();
}

seed().catch(console.error);
