import React, { FC } from "react";
import { Card, Image, Link, CardFooter, CardBody, Divider } from "@nextui-org/react";
import LikeIcon from "@/app/lib/ToggleLikeButton";
import mongoose from "mongoose";
import { formatDate } from "@/app/lib/formatDate";
import dbConnect from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import CartButton from "@/app/lib/ToggleCartButton";

interface UserProfileProps {
  user: {
    username: string;
    email: string;
    profilepicture: string;
  };
  listings: {
    _id: string;
    productName: string;
  price: string;
  productImage1: string;
  productImage2: string;
  productImage3: string;
  productImage4: string;
  productBrand: string;
  productSize: string;
  category: string;
  productDescription: string;
  isDiscounted: boolean;
  discountPrice?: string;
  deliveryCost: string;
  productCondition: string;
  isSold: boolean;
  createdAt: Date;
  }[];
}

const UserProfile: FC<UserProfileProps> = async ({ user, listings }) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
    return null;
  }

  await dbConnect();
  const CurrentUser = await User.findOne({ email: session.user?.email });

  if (!CurrentUser) {
    redirect("/login");
    return null;
  }

  if (CurrentUser == user.username){
    redirect("/userprofile");
    return null;
  }

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center flex flex-col items-center">
          <Image
            src={user.profilepicture || "/testuser.jpg"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <h1 className="text-black text-3xl font-semibold mb-4">@{user.username}</h1>
        </div>
        <h2 className="text-2xl font-semibold mb-4 py-4 text-black">{user.username}'s Listings</h2>
        <div className="grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <div key={listing._id}>
                <Card
                  className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
                  isHoverable
                  isBlurred
                >
                  <div className="absolute top-2 right-2 z-20">
    <LikeIcon productId={listing._id} username={user.username} />
    </div>
    <div className="absolute top-2 left-2 z-20 shadow-s ">
    <CartButton productId={listing._id} username={user.username} />
    </div>
                  <CardBody className="overflow-visible p-0">
                    <Link href={`/listings/${listing._id}`}>
                      <div className="w-full h-[300px]">
                        <Image
                          radius="lg"
                          width="100%"
                          height="100%"
                          alt="shirt1"
                          className="w-full object-cover h-[300px]"
                          src={listing.productImage1}
                        />
                      </div>
                    </Link>
                  </CardBody>
                  <Link href={`/listings/${listing._id}`}>
                    <CardFooter className="flex flex-col items-start">
                      <div className="flex justify-center items-center">
                        <b className="text-[#71717a] text-xs">Listed {formatDate(listing.createdAt)}</b>
                      </div>
                      <Divider />
                      <div className="flex justify-between w-full">
                        <b className="text-black text-xl">{listing.productName}</b>
                        {listing.isDiscounted ? (
                          <div className="flex items-center space-x-2">
                            <p className="text-gray-600 text-xl mb-4 line-through">${listing.price}</p>
                            <p className="text-red-500 text-xl font-bold mb-4">${listing.discountPrice}</p>
                          </div>
                        ) : (
                          <p className="text-black text-xl font-bold mb-4">${listing.price}</p>
                        )}
                      </div>
                      <div className="flex justify-between w-full">
                        <b className="text-black text-l">{listing.productBrand}</b>
                        <b className="text-black text-l">{listing.productSize}</b>
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              </div>
            ))
          ) : (
            <p>No listings found</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
