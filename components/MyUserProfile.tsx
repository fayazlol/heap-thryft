// components/MyUserProfile.tsx
import React, { FC } from 'react';
import { Image, Card, Button, Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { maxHeaderSize } from 'http';

interface MyUserProfileProps {
  user: {
    username: string;
    email: string;
    profilepicture: string;
    bannerpicture: string;
    bio: string;
    createdAt: Date;
  };
  listingsCount: number;
}

const MyUserProfile: FC<MyUserProfileProps> = ({ user, listingsCount }) => {
  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="items-center justify-center px-6 ">
    <h1 className="font-bold text-4xl text-black mb-2 py-2 ml-2">My Profile</h1>
      <Card className="bg-white rounded-xl shadow-lg w-full">
        <Image
          src={user.bannerpicture}
          alt="Banner Picture"
          width={maxHeaderSize}
          height={50}
          className="object-center mx-auto h-[300px] mb-6 "
        />
        <div className=" relative justify-start items-start inline-flex -top-6">
        <Avatar src={user.profilepicture} className=" z-20 -top-[50px] left-3 w-[120px] h-[120px] text-large  border-4 border-white" />
        <h1 className="text-2xl font-bold ml-8 mt-2  ">@{user.username}</h1>
        <p className="text-gray-600 mt-4 ml-10">{listingsCount} Listings | Joined {joinDate}</p>
        <Button href="/userprofile/editprofile" as={Link} size="md" radius="full" className='mt-2 ml-10' color="warning">Edit Profile ✎</Button>
        </div>
        <div className="absolute top-0 left-0 w-full mt-[370px]">
    <p className="text-gray-700 ml-4">{user.bio}</p>
  </div>
        <div className="flex justify-between mt-6 border-t border-gray-300 pt-4">
        <Button href="/userprofile/mylistings" as={Link} size="lg" radius="full" className='mb-4 ml-10' color="primary" variant="shadow">My Listings ★</Button>
        <Button  href="/userprofile/createlisting" as={Link} size="lg" radius="full" className='mb-4' color="success" variant="shadow">Create Listing +</Button>
        <Button  href="/userprofile/orders" as={Link} size="lg" radius="full" className='mb-4' color="secondary" variant="shadow">My Orders ᝰ.ᐟ</Button>
        <Button  href="/userprofile/favourites" as={Link} size="lg" radius="full" className='mr-10 mb-4' color="danger" variant="shadow">My Favourites ♡</Button>


        </div>
      </Card>
    </div>
  );
};

export default MyUserProfile;
