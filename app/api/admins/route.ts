import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/app/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hashed });

  return NextResponse.json({ success: true });
}
