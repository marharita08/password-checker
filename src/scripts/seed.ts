import mongoose from "mongoose";

import { DEFAULT_MIN_LENGTH, RuleType } from "@/const";
import { Rule } from "@/lib/db/models/rule";
import { UserRule } from "@/lib/db/models/user-rule";

const defaults = [
  {
    type: RuleType.MIN_LENGTH,
    label: `At least ${DEFAULT_MIN_LENGTH} characters`,
    config: { minLength: DEFAULT_MIN_LENGTH },
  },
  { type: RuleType.UPPERCASE, label: "At least one uppercase letter (A–Z)" },
  { type: RuleType.LOWERCASE, label: "At least one lowercase letter (a–z)" },
  { type: RuleType.DIGIT, label: "At least one digit (0–9)" },
  {
    type: RuleType.SPECIAL_CHARACTER,
    label: "At least one special character (!@#$%^&*)",
  },
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
