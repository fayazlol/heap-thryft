"use client";

import { useEffect, useState } from 'react';
import { Card, CardBody, Image, Button, Link } from "@nextui-org/react";

interface Order {
  _id: string;
  buyer: string;
  seller: string;
  address: {
    city: string | null;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string | null;
  };
  email: string;
  isSent: boolean;
  isReceived: boolean;
  xyz: string;
  created: number;
  cartId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  _id: string;
  productName: string;
  productBrand: string;
  productSize: string;
  productCondition: string;
  isDiscounted: boolean;
  discountPrice?: number;
  price: number;
  productImage1: string;
  username: string;
}

const OrdersClient = ({ user }: { user: any }) => {
  const [toReceiveOrders, setToReceiveOrders] = useState<(Order & { product: Product })[]>([]);
  const [toSendOrders, setToSendOrders] = useState<(Order & { product: Product })[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders`);
      const data = await response.json();

      if (data.success) {
        const toReceiveOrdersWithProducts = await Promise.all(data.toReceive.map(async (order: Order) => {
          const productResponse = await fetch(`/api/productlisting?id=${order.productId}`);
          const product = await productResponse.json();
          return { ...order, product };
        }));

        const toSendOrdersWithProducts = await Promise.all(data.toSend.map(async (order: Order) => {
          const productResponse = await fetch(`/api/productlisting?id=${order.productId}`);
          const product = await productResponse.json();
          return { ...order, product };
        }));

        setToReceiveOrders(toReceiveOrdersWithProducts);
        setToSendOrders(toSendOrdersWithProducts);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsReceived = async (orderId: string) => {
    try {
      const response = await fetch('/api/orders/mark-received', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        setToReceiveOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, isReceived: true } : order
          ).filter(order => !(order.isSent && order.isReceived))
        );
      }
    } catch (error) {
      console.error('Error marking order as received:', error);
    }
  };

  const markAsSent = async (orderId: string) => {
    try {
      const response = await fetch('/api/orders/mark-sent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        setToSendOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, isSent: true } : order
          ).filter(order => !(order.isSent && order.isReceived))
        );
      }
    } catch (error) {
      console.error('Error marking order as sent:', error);
    }
  };

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <h1 className="text-4xl text-black font-bold ml-3 py-4">My Orders</h1>
      <Link href="/userprofile/orders/order-history">
        <p className=" ml-3 text-sm">View Order History →</p>
        </Link>
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="text-2xl text-black font-semibold mb-4">To Receive</h2>
          {toReceiveOrders.filter(order => !(order.isSent && order.isReceived)).map(order => (
            <Card key={order._id}
              isBlurred
              className="mb-4 border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
              shadow="sm"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Product Image"
                      className="object-cover"
                      height={200}
                      shadow="md"
                      src={order.product.productImage1}
                      width="100%"
                    />
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                      <p className="text-small text-foreground/80">@{order.product.username}&apos;ss</p>
                        <h3 className="font-semibold text-foreground/90">{order.product.productName}</h3>
                        <p className="text-small text-foreground/80">{order.product.productBrand} | {order.product.productSize}</p>
                        <p className="text-small text-foreground/80">{order.product.productCondition}</p>
                        <p className="text-small text-foreground/80">${order.product.isDiscounted ? order.product.discountPrice : order.product.price}</p>
                        <p className="text-small text-foreground/80">Is Received: {order.isReceived ? 'Yes' : 'No'}</p>
                        <p className="text-small text-foreground/80">Is Sent: {order.isSent ? 'Yes' : 'No'}</p>
                        <p className="text-small text-foreground/80">
                          Address: {`${order.address.line1}, ${order.address.line2}, ${order.address.city}, ${order.address.state}, ${order.address.postal_code}, ${order.address.country}`}
                        </p>
                        {!order.isReceived && (
                          <Button onClick={() => markAsReceived(order._id)}>Mark as Received</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-2xl text-black font-semibold mb-4">To Send</h2>
          {toSendOrders.filter(order => !(order.isSent && order.isReceived)).map(order => (
            <Card key={order._id}
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
              shadow="sm"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Product Image"
                      className="object-cover"
                      height={200}
                      shadow="md"
                      src={order.product.productImage1}
                      width="100%"
                    />
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-semibold text-foreground/90">{order.product.productName}</h3>
                        <p className="text-small text-foreground/80">{order.product.productBrand} | {order.product.productSize}</p>
                        <p className="text-small text-foreground/80">{order.product.productCondition}</p>
                        <p className="text-small text-foreground/80">${order.product.isDiscounted ? order.product.discountPrice : order.product.price}</p>
                        <p className="text-small text-foreground/80">Is Received: {order.isReceived ? 'Yes' : 'No'}</p>
                        <p className="text-small text-foreground/80">Is Sent: {order.isSent ? 'Yes' : 'No'}</p>
                        <p className="text-small text-foreground/80">
                          Address: {`${order.address.line1}, ${order.address.line2}, ${order.address.city}, ${order.address.state}, ${order.address.postal_code}, ${order.address.country}`}
                        </p>
                        {!order.isSent && (
                          <Button onClick={() => markAsSent(order._id)}>Mark as Sent</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OrdersClient;
