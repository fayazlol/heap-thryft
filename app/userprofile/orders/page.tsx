import React from 'react';
import dbConnect from '@/app/lib/dbConnect';
import Order from "../../../models/order"
import ProductListing from '@/models/ProductListing';
import User from '@/models/user';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import OrdersClient from "../../../components/OrdersClient";

const OrdersPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });
  if (!user) {
    redirect('/');
    return null;
  }

  const orders = await Order.find({ $or: [{ buyer: user.username }, { seller: user.username }] }).lean();
  const products = await ProductListing.find({ _id: { $in: orders.map(order => order.productId) } }).lean();

  const ordersWithProducts = orders.map(order => ({
    ...order,
    product: products.find(product => product._id.toString() === order.productId.toString()),
  }));

  return <OrdersClient user={user} orders={ordersWithProducts} />;
};

export default OrdersPage;
