//used for testing

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "../../lib/dbConnect";
import Cart from '../../../models/cart';

export async function POST(req: NextRequest) {
  await dbConnect();

  const { productId, username } = await req.json();

  if (!productId || !username) {
    return NextResponse.json({ error: 'ProductId and username are required' }, { status: 400 });
  }

  try {
    await Cart.deleteOne({ productId, username });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
