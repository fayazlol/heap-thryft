// lib/LikeIcon.tsx
"use client"
import { useState } from 'react';
import HeartIconOutline from '@/components/HeartIconOutline';
import HeartIconSolid from '@/components/HeartIconSolid';
import mongoose from 'mongoose';

interface LikeIconProps {
    productId: mongoose.Types.ObjectId;
    username: string;
    initialLiked?: boolean;
  }
  
  const LikeIcon: React.FC<LikeIconProps> = ({ productId, username, initialLiked = false }) => {
    const [liked, setLiked] = useState(initialLiked);
  
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

  return (
    <button aria-label="Like" onClick={handleToggle}>
      {liked ? <HeartIconSolid /> : <HeartIconOutline />}
    </button>
  );
};

export default LikeIcon;
