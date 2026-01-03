import { connectDB } from "@/lib/db";
import Admin from "@/app/models/Admin";
import bcrypt from "bcryptjs";

export async function isValidAdmin(
  email: string,
  password: string
): Promise<boolean> {
  await connectDB();

  /* Ensure base admin exists (one-time) */
  const baseEmail = "admin@inventory.com";
  const basePassword = "admin123";

  let baseAdmin = await Admin.findOne({ email: baseEmail });

  if (!baseAdmin) {
    const hashed = await bcrypt.hash(basePassword, 10);
    await Admin.create({
      email: baseEmail,
      password: hashed
    });
    baseAdmin = await Admin.findOne({ email: baseEmail });
  }

  /* 🔎 Normal login check */
  const admin = await Admin.findOne({ email });
  if (!admin) return false;

  return await bcrypt.compare(password, admin.password);
}

