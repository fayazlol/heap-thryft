import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Order from '@/models/order';
import { getServerSession } from 'next-auth';
import User from '@/models/user';

export async function GET(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const toReceiveOrders = await Order.find({ buyer: user.username });
  const toSendOrders = await Order.find({ seller: user.username });

  return NextResponse.json({ success: true, toReceive: toReceiveOrders, toSend: toSendOrders }, { status: 200 });
}
