import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Order from "@/models/order";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { username, productId, isReceived = false, isSent = false } = await req.json();

    if (!username || !productId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrder = new Order({
      username,
      productId,
      isReceived,
      isSent,
    });

    await newOrder.save();

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
