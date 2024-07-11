import React from "react";
import dbConnect from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import Order from "@/models/order";
import ProductListing from "@/models/ProductListing";
import OrderHistoryClient from "@/components/OrderHistoryClient";

export default async function OrderHistoryPage() {
    const session = await getServerSession();
    if (!session) {
      redirect("/login");
      return null;
    }
  
    await dbConnect();
    const user = await User.findOne({ email: session.user?.email });
  
    if (!user) {
      redirect("/login");
      return null;
    }
  
    const orders = await Order.find({
        $and: [
          { $or: [{ buyer: user.username }, { seller: user.username }] },
          { isSent: true },
          { isReceived: true }
        ]
      });  
    const ordersWithProductDetails = await Promise.all(
      orders.map(async (order) => {
        const product = await ProductListing.findById(order.productId);
        return { ...order.toObject(), product };
      })
    );
  
    return <OrderHistoryClient user={user} orders={ordersWithProductDetails} />;
  }