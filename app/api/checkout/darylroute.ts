import { NextRequest, NextResponse } from "next/server";
import { stripe } from '../../lib/stripe';
import dbConnect from "../../lib/dbConnect";
import User from "../../../models/user";
import Cart from "../../../models/cart";
import ProductListing from "../../../models/ProductListing"
import { getServerSession } from "next-auth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession({ req });
    if (!session) {
      return new NextResponse("User not logged in", { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const cartItems = await Cart.find({ username: user.username });
    const productIds = cartItems.map(cart => cart.productId);
    const productListings = await ProductListing.find({ _id: { $in: productIds } });

    if (!productListings.length) {
      return new NextResponse("Cart is empty", { status: 400 });
    }

    const lineItems = productListings.map(listing => ({
      price_data: {
        currency: "sgd",
        product_data: {
          name: listing.productName,
          description: listing.productDescription,
          metadata: {
            id: listing._id.toString(),
          },
        },
        unit_amount: listing.isDiscounted ? parseFloat(listing.discountPrice) * 100 : parseFloat(listing.price) * 100,
      },
      quantity: 1, // Assuming quantity is 1, update as necessary
    }));


    const totalAmount = lineItems.reduce((total, item) => total + item.price_data.unit_amount, 0);

    let shippingOptions = [
      { shipping_rate: "shr_1PVF3908ga7MtKrXj8mRm0g4" }, // Ground shipping
      { shipping_rate: "shr_1PVF3R08ga7MtKrXpML1vqu3" }  // Fast shipping
    ];

    if (totalAmount >= 8000) { // Total amount in cents (SGD 80.00)
      shippingOptions = [
        { shipping_rate: "shr_1PVF2H08ga7MtKrX69BuZOK8" } // Free shipping
      ];
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["SG"],
      },
      shipping_options: shippingOptions,
      line_items: lineItems,
      client_reference_id: user._id.toString(),
      success_url: `${process.env.NEXTAUTH_URL}/payment_success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      
    });

    return NextResponse.json(stripeSession, { headers: corsHeaders });
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

