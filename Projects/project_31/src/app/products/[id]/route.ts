import Product from "@/models/Product";
import connectDb from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDb();
  const product = await Product.findById(params.id).lean().exec();

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
