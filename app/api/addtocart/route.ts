import mongoose from 'mongoose';
import dbConnect from '../../lib/dbConnect';
import Cart from '../../../models/cart';
import { NextRequest, NextResponse } from 'next/server';
import User from "../../../models/user";
import { getServerSession } from "next-auth";
import ProductListing from '../../../models/ProductListing'; 

export async function GET(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.redirect("/login");
  }

  const user = await User.findOne({ email: session.user?.email });

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
    const cartitem = await Cart.findOne({ productId, username });
    return NextResponse.json({ liked: !!cartitem }, { status: 200 });
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

  const session = await getServerSession();

  if (!session) {
    return NextResponse.redirect("/login");
  }

  const user = await User.findOne({ email: session.user?.email });

  const listing = await ProductListing.findById(productId);
  if (!listing) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  if (listing.username === username) {
    return NextResponse.json({ error: 'Cannot add own listing to cart' }, { status: 400 });
  }

  try {
    const existingCartItem = await Cart.findOne({ productId, username });
    if (existingCartItem) {
      await Cart.deleteOne({ productId, username });
      return NextResponse.json({ liked: false }, { status: 200 });
    } else {
      const newCartItem = new Cart({ productId, username });
      await newCartItem.save();
      return NextResponse.json({ liked: true }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
