

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "stream/consumers";
import dbConnect from "../../lib/dbConnect";
import Order from "../../../models/order";  // Import your Order model



const stripe = new Stripe(process.env.NEXT_TEST_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const endpointSecret = process.env.WEBHOOK_SECRET as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRequestBody(request: NextRequest) {
  const readable = request.body;
  if (!readable) {
    throw new Error("Request body is not readable");
  }

  const reader = readable.getReader();
  const chunks = [];
  let done, value;

  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      chunks.push(value);
    }
  }

  const body = Buffer.concat(chunks);
  return body;
}

export async function POST(req: NextRequest) {
  try {
    console.log("req.headers", req.headers);
    if (req.method !== "POST") {
      return new NextResponse("Only POST requests allowed", { status: 405 });
    }

    await dbConnect();  // Ensure DB connection

    const buf = await readRequestBody(req);
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return new NextResponse("Missing stripe-signature header", { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err: any) {
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log("event.type", JSON.stringify(event.type));

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;
      

      if (!lineItems) return new NextResponse("Internal Server Error", { status: 500 });

      try {
        const newOrder = new Order({
          email: (event.data.object as any).customer_details.email,
          address: (event.data.object as any).customer_details.address,
          test: "see if this gets into mongo test",
          created: (event.data.object as any).created,
          lineItems: lineItems.data,
        });
        await newOrder.save();  // Save the new order to MongoDB

        console.log("Fulfill the order with custom logic");
        console.log("data", lineItems.data);
        console.log(
          "customer email",
          (event.data.object as any).customer_details.email
        );
        console.log("created", (event.data.object as any).created);
      } catch (error) {
        console.log("Handling when you're unable to save an order", error);
        return new NextResponse("Internal Server Error", { status: 500 });
      }
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
