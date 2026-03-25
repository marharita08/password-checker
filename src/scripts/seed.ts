import mongoose from "mongoose";

import { DEFAULT_MIN_LENGTH, RuleType } from "@/const";
import { Rule } from "@/lib/db/models/rule";
import { UserRule } from "@/lib/db/models/user-rule";

const defaults = [
  {
    type: RuleType.MIN_LENGTH,
    config: { minLength: DEFAULT_MIN_LENGTH },
    isDefault: true,
  },
  {
    type: RuleType.UPPERCASE,
    isDefault: true,
  },
  {
    type: RuleType.LOWERCASE,
    isDefault: true,
  },
  {
    type: RuleType.DIGIT,
    isDefault: true,
  },
  {
    type: RuleType.SPECIAL_CHARACTER,
    isDefault: true,
  },
  {
    type: RuleType.NO_SPACES,
    isDefault: false,
  },
  {
    type: RuleType.FORBIDDEN,
    config: { forbidden: [] },
    isDefault: false,
  },
  {
    type: RuleType.REPEAT_LIMIT,
    config: { repeatLimit: 2 },
    isDefault: false,
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
