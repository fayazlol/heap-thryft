"use client";
import { useState, useEffect } from 'react';

interface ListingCartButtonProps {
  productId: string;
  username: string;
  initialLiked?: boolean;
}

const ListingCartButton: React.FC<ListingCartButtonProps> = ({ productId, username, initialLiked = false }) => {
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
    <div className="relative w-full">
      <button
        aria-label="Like"
        onClick={handleToggle}
        className="relative z-10 flex items-center justify-center w-full bg-black text-white mb-4 py-2 rounded-xl hover:bg-gray-700"
      >
        {liked ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ListingCartButton;
