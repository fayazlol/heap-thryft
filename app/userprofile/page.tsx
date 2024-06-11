import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";

const UserProfile = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    redirect("/");
    return null; 
  }

  return (
    <main className="bg-[#fafafa] min-h-screen">
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <Image
          src="/ballingcat.jpeg"
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-gray-600 mb-4">@{user.username}</h1>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <div className="flex flex-col space-y-2">
          <Link href="/user/listings">
            <p className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">My Listings</p>
          </Link>
          <Link href="/user/orders">
            <p className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">My Orders</p>
          </Link>
          <Link href="/user/liked">
            <p className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Liked Items</p>
          </Link>
        </div>
      </div>
    </div>
    </main>
  );
};

export default UserProfile;
