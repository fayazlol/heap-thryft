"use client";
import { useState, useEffect } from 'react';
import React from 'react';
interface ListingLikeIconProps {
  productId: string;
  username: string;
  initialLiked?: boolean;
}

const ListingLikeButton: React.FC<ListingLikeIconProps> = ({ productId, username, initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialLikedStatus = async () => {
      try {
        const response = await fetch(`/api/addfavourites?productId=${productId}&username=${username}`);
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
      const response = await fetch(`/api/addfavourites`, {
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
        className="relative z-10 flex items-center justify-center w-full mb-4 py-2 rounded-xl text-white hover:bg-gray-700 gradient-animation"
        //style={{ background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,105,180,1) 100%)' }}
      >
        {liked ? "Remove from Favourites ♥" : "Add to Favourites ♡"}
      </button>
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .gradient-animation {
          background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,105,180,1) 100%);
          background-size: 200% 200%;
          animation: gradientAnimation 4s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ListingLikeButton;
