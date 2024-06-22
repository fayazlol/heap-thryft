"use client";
import { useState, useEffect } from 'react';
import InCart from '../../components/InCart';
import AddToCart from '../../components/AddToCart';

interface CartButtonProps {
  productId: string;
  username: string;
  initialLiked?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ productId, username, initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialLikedStatus = async () => {
      try {
        const response = await fetch(`/api/addtocart?productId=${productId}&username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch initial like status');
        }
        const data = await response.json();
        setLiked(data.liked);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialLikedStatus();
  }, [productId, username]);

  const handleToggle = async () => {
    try {
      const response = await fetch(`/api/addtocart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, username }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like status');
      }

      const data = await response.json();
      setLiked(data.liked);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <button aria-label="Like" disabled>Loading...</button>;
  }

  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-full shadow-lg w-8 h-8"></div>
      </div>
      <button
        aria-label="Like"
        onClick={handleToggle}
        className="relative z-10 flex items-center justify-center w-8 h-8"
      >
        {liked ? <InCart /> : <AddToCart />}
      </button>
    </div>
  );
};

export default CartButton;
