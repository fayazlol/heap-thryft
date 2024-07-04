//api/orders/[id]

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../app/lib/dbConnect';
import Order from '../../../../models/order';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
  }

  const { isSent, isReceived } = await req.json();

  if (typeof isSent === 'undefined' && typeof isReceived === 'undefined') {
    return NextResponse.json({ error: 'isSent or isReceived must be provided' }, { status: 400 });
  }

  const updateData: { isSent?: boolean; isReceived?: boolean } = {};
  if (typeof isSent !== 'undefined') updateData.isSent = isSent;
  if (typeof isReceived !== 'undefined') updateData.isReceived = isReceived;

  const order = await Order.findByIdAndUpdate(id, updateData, { new: true });

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(order);
}
