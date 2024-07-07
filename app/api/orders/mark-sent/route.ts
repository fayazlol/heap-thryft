import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Order from '@/models/order';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { orderId } = body;

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    order.isSent = true;
    await order.save();

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ success: false, error: 'Error updating order' }, { status: 500 });
  }
}
