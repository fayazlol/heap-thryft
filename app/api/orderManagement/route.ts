import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Order from '@/models/order';
import Cart from '@/models/cart';
import ProductListing from '@/models/ProductListing';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const orders = await Order.find();

    // Process each order
    for (const order of orders) {
      const cartId = order.cartId;
      const productId = order.productId;

      // Delete the cart item
      await Cart.findByIdAndDelete(cartId);

      // Update the product listing
      await ProductListing.findByIdAndUpdate(productId, { isSold: true });
    }

    return NextResponse.json({ success: true, message: 'Order processed successfully' });
  } catch (error) {
    console.error('Error processing orders:', error);
    return NextResponse.json({ success: false, error: 'Error processing orders' }, { status: 500 });
  }
}
