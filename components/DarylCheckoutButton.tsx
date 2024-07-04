"use client";

import React from 'react';
import { Card, Button, Image } from "@nextui-org/react";

async function handleCheckout() {
  console.log('handleCheckout function called');
  try {
    const cartItems = [
      {
        item: {
          _id: '1',
          title: 'Sample Item',
          price: 1000,
        },
        quantity: 1,
      },
    ];

    const customer = {
      clerkId: 'customer_id', // Replace with actual customer ID
    };

    console.log('Sending request with:', { cartItems, customer });

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems, customer }),
    });

    console.log('Response received:', response);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const session = await response.json();
    console.log('Session data:', session);

    if (session.url) {
      window.location.href = session.url;
    } else {
      throw new Error('Session URL not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const CheckoutButton: React.FC = () => {
  return (
    <Button className="text-black border bg-white py-3 w-full hover:bg-black hover:text-white hover:font-semibold" id="checkout-button" onClick={handleCheckout}>
      Proceed to Checkout
    </Button>
  );
};

export default CheckoutButton;
