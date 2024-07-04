import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../app/lib/dbConnect';
import Order from '../../../../models/order';
import ProductListing from '../../../../models/ProductListing';

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  const orders = await Order.find({}).populate('productId');
  const toSend = orders.filter(order => order.productId.username === username);

  return NextResponse.json(toSend);
}
