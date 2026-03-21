import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

declare global {
  var mongoose: { conn: mongoose.Connection | null };
}

const cached = globalThis.mongoose ?? { conn: null };
globalThis.mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  const { connection } = await mongoose.connect(MONGODB_URI);
  cached.conn = connection;
  return connection;
}
