import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Favourite from '@/models/favourite';

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    const count = await Favourite.countDocuments({ productId });
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching favorite count' }, { status: 500 });
  }
}
