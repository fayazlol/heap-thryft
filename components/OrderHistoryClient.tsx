"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, Image, Divider, Button, Link } from "@nextui-org/react";

interface Listing {
  _id: string;
  username: string;
  productName: string;
  price: number;
  productBrand: string;
  productSize: string;
  category: string;
  isDiscounted: boolean;
  discountPrice?: number;
  productDescription: string;
  productImage1: string;
  productCondition: string;
  gender: 'Menswear' | 'Womenswear' | 'Unisex';
  createdAt: Date;
}

interface Order {
  _id: string;
  buyer: string;
  seller: string;
  email: string;
  address: {
    city: string | null;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string | null;
  };
  isSent: boolean;
  isReceived: boolean;
  created: number;
  product: Listing;
}

interface OrderHistoryClientProps {
  user: {
    username: string;
  };
  orders: Order[];
}

const ITEMS_PER_PAGE = 6;

const OrderHistoryClient: React.FC<OrderHistoryClientProps> = ({ user, orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(orders.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setTotalPages(Math.ceil(orders.length / ITEMS_PER_PAGE));
  }, [orders]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedOrders = orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="bg-[#fafafa] min-h-screen p-4">
        <Link href="/userprofile/orders">
        <p className=" text-sm">← Back to Orders</p>
        </Link>
      <h1 className="text-black mb-4 text-4xl font-semibold">Order History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedOrders.map((order) => (
          <Card key={order._id} className="mb-4 border-none bg-background/60 dark:bg-default-100/50" shadow="sm">
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    alt={order.product.productName}
                    className="object-cover w-full h-full"
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
                      <p className="text-large font-medium mt-2">${order.product.isDiscounted ? order.product.discountPrice : order.product.price}</p>
                      <p className="text-small text-foreground/80">Is Received: {order.isReceived ? "Yes" : "No"}</p>
                      <p className="text-small text-foreground/80">Is Sent: {order.isSent ? "Yes" : "No"}</p>
                      <p className="text-small text-foreground/80">Address: {Object.values(order.address).filter(Boolean).join(", ")}</p>
                    </div>
                  </div>
                  <Divider />
                  <div className="mt-2 text-purple-600 font-bold">
                    Order Completed
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button disabled={currentPage === 1} onPress={handlePreviousPage}>
          ←
        </Button>
        <span className="mx-2 text-black">{currentPage} / {totalPages}</span>
        <Button disabled={currentPage === totalPages} onPress={handleNextPage}>
          →
        </Button>
      </div>
    </main>
  );
};

export default OrderHistoryClient;
