import mongoose from 'mongoose';
import dbConnect from '@/app/lib/dbConnect';
import Favourite from '@/models/favourite';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  const username = searchParams.get('username');

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return NextResponse.json({ error: 'Invalid productId' }, { status: 400 });
  }

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const favourite = await Favourite.findOne({ productId, username });
    return NextResponse.json({ liked: !!favourite }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const { productId, username } = await req.json();

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return NextResponse.json({ error: 'Invalid productId' }, { status: 400 });
  }

  try {
    const existingFavourite = await Favourite.findOne({ productId, username });
    if (existingFavourite) {
      await Favourite.deleteOne({ productId, username });
      return NextResponse.json({ liked: false }, { status: 200 });
    } else {
      const newFavourite = new Favourite({ productId, username });
      await newFavourite.save();
      return NextResponse.json({ liked: true }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
