"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@nextui-org/button";

const SuccessfulPayment: React.FC = () => {
  useEffect(() => {
    console.log("SuccessfulPayment component mounted");

    const processOrders = async () => {
      try {
        const response = await fetch('/api/orderManagement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.success) {
          console.log('Orders processed successfully');
        } else {
          console.error('Error processing orders:', data.error);
        }
      } catch (error) {
        console.error('Error processing orders:', error);
      }
    };

    processOrders();

    return () => {
      console.log("SuccessfulPayment component unmounted");
    };
  }, []);

  console.log("Rendering SuccessfulPayment component");

  return (
    <main className="bg-[#fafafa] min-h-screen flex items-center justify-center relative">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    src="/videoplayback.mp4"
    autoPlay
    loop
    muted
    playsInline
  />
  <div className="relative bg-white p-6 rounded-2xl shadow-2xl text-center">
    <h1 className="text-black mb-4 text-4xl font-semibold">Payment Successful!</h1>
    <p className="text-gray-700">Thank you for your purchase. Your order has been placed successfully.</p>
    <div className="py-4"></div>
    <Button href="/userprofile/orders" as={Link} color="primary" variant="ghost">Go to Orders</Button>
  </div>
</main>

  );
};

export default SuccessfulPayment;
