import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import ProductListing from '@/models/ProductListing';

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const count = await ProductListing.countDocuments({ username });
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching listing count' }, { status: 500 });
  }
}
