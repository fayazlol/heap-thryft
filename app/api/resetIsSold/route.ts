import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import ProductListing from '@/models/ProductListing';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    await ProductListing.updateMany({}, { $set: { isSold: false } });

    return NextResponse.json({ success: true, message: "All products' isSold set to false" });
  } catch (error) {
    console.error('Error resetting isSold:', error);
    return NextResponse.json({ success: false, message: 'Error resetting isSold' }, { status: 500 });
  }
}
