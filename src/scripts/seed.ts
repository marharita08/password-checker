import mongoose from "mongoose";
import { Rule } from "@/lib/db/models/rule";

const defaults = [
  {
    type: "min-length",
    label: "At least 8 characters",
    isDefault: true,
    config: { minLength: 8 },
  },
  {
    type: "uppercase",
    label: "At least one uppercase letter",
    isDefault: true,
  },
  {
    type: "lowercase",
    label: "At least one lowercase letter",
    isDefault: true,
  },
  { type: "digit", label: "At least one digit", isDefault: true },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Rule.deleteMany({});
  await Rule.insertMany(defaults);
  console.log("Seeded successfully");
  await mongoose.disconnect();
}

seed().catch(console.error);
