import React from 'react';
import dbConnect from '@/app/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import User from '@/models/user';
import ProductListing from '@/models/ProductListing';
import MyUserProfile from '@/components/MyUserProfile';
import Listings from '@/components/mylistings';
const MyListingsPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    redirect('/');
    return null;
  }
  const listings = await ProductListing.find({ username: user.username });


  const listingsCount = await ProductListing.countDocuments({ username: user.username });

  return (
    <div className="bg-[#fafafa] min-h-screen items-center justify-center px-6 ">

  
  <MyUserProfile user={user} listingsCount={listingsCount} />
  <div className="flex min-h-screen flex-col items-center mt-4">
      <h1 className="text-black text-3xl font-semibold mb-6 ">My Listings</h1>
      <Listings listings={listings} />
    </div>
  </div>);
};

export default MyListingsPage;
