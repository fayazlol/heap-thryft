// components/PaymentSuccess.tsx

"use client";
import React, { useEffect } from 'react';

interface PaymentSuccessProps {
  user: {
    username: string;
  };
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ user }) => {

  useEffect(() => {
    const fetchUsernameAndHandleOrderCreation = async () => {
      try {
        const username = user.username;

        // Fetch the user's cart items
        const cartRes = await fetch(`/api/cart?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!cartRes.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const cartItems = await cartRes.json();

        // Create orders for each cart item
        for (const item of cartItems) {
          await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              productId: item.productId._id,
              isSent: false,
              isReceived: false,
            }),
          });
        }

        // Clear the user's cart
        await fetch(`/api/cart?username=${username}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

      } catch (error) {
        console.error('Error processing order:', error);
      }
    };

    fetchUsernameAndHandleOrderCreation();

  }, [user.username]);

  return (
    <main className="bg-[#fafafa] min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-2xl text-center">
        <h1 className="text-black mb-4 text-4xl font-semibold">Payment Successful!</h1>
        <p className="text-gray-700">Thank you for your purchase. Your order has been placed successfully.</p>
      </div>
    </main>
  );
};

export default PaymentSuccess;
