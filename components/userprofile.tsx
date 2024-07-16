"use client";

import React, { FC, useState } from "react";
import { Card, Image, Link, CardFooter, CardBody, Divider, Button, Avatar } from "@nextui-org/react";
import LikeIcon from "@/app/lib/ToggleLikeButton";
import mongoose from "mongoose";
import { formatDate } from "@/app/lib/formatDate";
import dbConnect from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import CartButton from "@/app/lib/ToggleCartButton";
import { maxHeaderSize } from "http";
import ProductListing from "@/models/ProductListing";

interface UserProfileProps {
  currentuser:{
    username:string;
  };
  user: {
    username: string;
    email: string;
    profilepicture: string;
    bannerpicture: string;
    bio: string;
    createdAt: Date;
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

const ITEMS_PER_PAGE = 10;


const UserProfile: FC<UserProfileProps> =  ({ user, listings, currentuser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentListings = listings.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  

  return (
    <div className="items-center justify-center px-6 ">
        <h2 className="text-2xl font-semibold mb-4 py-4 text-black">@{user.username}&apos;ss Listings</h2>
        <div className="grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <div key={listing._id}>
                <Card
                  className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
                  isHoverable
                  isBlurred
                >
                 {listing.isSold ? (
  <div className="z-30 absolute px-2 py-2 top-0 left-0 flex items-start justify-start">
  <Button
        color="danger"
        size="sm"
        variant="solid"
        className="text-white"
        radius="full"
      >
        Sold
      </Button>                  </div>
) : (
  <>
    <div className="absolute top-2 right-2 z-20">                
      <LikeIcon productId={listing._id} username={currentuser.username} />
    </div>
    <div className="absolute top-2 left-2 z-20 shadow-s">
      <CartButton productId={listing._id} username={currentuser.username} />
    </div>
  </>
)}

                
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
        <div className="flex items-center justify-center mt-4">
        <Button size="sm" radius="full" disabled={currentPage === 1} onPress={handlePreviousPage}>
          ← 
        </Button>
        <span className="mx-4 text-black">{currentPage} / {totalPages}</span>
        <Button size="sm" radius="full" disabled={currentPage === totalPages} onPress={handleNextPage}>
          →
        </Button>
        <div className="py-8 "></div>
      </div>
    </div>
  );
};

export default UserProfile;
