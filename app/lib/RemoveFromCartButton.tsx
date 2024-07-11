"use client";
import { Card, Button, Image } from "@nextui-org/react";

import React from 'react';

interface RemoveFromCartButtonProps {
  productId: string;
  username: string;
}

const RemoveFromCartButton: React.FC<RemoveFromCartButtonProps> = ({ productId, username }) => {
  const handleRemove = async () => {
    try {
      const response = await fetch(`/api/removecart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, username }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button color="danger" variant="solid" className="text-white" onClick={handleRemove}>
      Remove
    </Button>
  );
};

export default RemoveFromCartButton;
