import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/models/Product";

/* GET all products */
export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

/* CREATE product */
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const product = await Product.create({
    name: body.name,
    category: body.category,
    units: body.units,
    mrp: body.mrp,
    imageUrl: body.imageUrl   
  });

  return NextResponse.json(product);
}

/* UPDATE product */
export async function PUT(req: Request) {
  await connectDB();
  const { id, ...data } = await req.json();

  const updated = await Product.findByIdAndUpdate(
    id,
    {
      name: data.name,
      category: data.category,
      units: data.units,
      mrp: data.mrp,
      imageUrl: data.imageUrl  
    },
    { new: true }
  );

  return NextResponse.json(updated);
}

/* DELETE product */
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
