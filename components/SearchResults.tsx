"use client";
import React from 'react';
import { useState } from 'react';
import { Card, CardBody, CardFooter, Image, Link, Divider } from "@nextui-org/react";
import LikeIcon from '../app/lib/ToggleLikeButton';
import CartButton from "../app/lib/ToggleCartButton";
import { formatDate } from '../app/lib/formatDate';

interface User {
  username: string;
}

interface Listing {
  _id: string;
  username: string;
  productName: string;
  price: number;
  productBrand: string;
  productSize: string;
  category: string;
  isDiscounted: boolean;
  discountPrice?: number;
  productDescription: string;
  productImage1: string;
  productCondition: string;
  gender: 'Menswear' | 'Womenswear' | 'Unisex';
  createdAt: Date;
}

interface SearchResultsProps {
  user: User;
  results: Listing[];
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ user, results, searchQuery }) => {
  return (
    <main className="bg-[#fafafa] min-h-screen"> 
      <h1 className="flex justify-center items-center text-black text-4xl font-semibold py-10 mb-20">Search Results for: {searchQuery}</h1>
      <div className='grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4'>
        {results.length > 0 ? (
          results.map((listing) => (
            <div key={listing._id}>
              <Card className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative" isHoverable isBlurred>
                <div className="absolute top-2 right-2 z-20">
                  <LikeIcon productId={listing._id} username={user.username} />
                </div>
                <div className="absolute top-2 left-2 z-20">
                  <CartButton productId={listing._id} username={user.username} />
                </div>
                <CardBody className="overflow-visible p-0">
                  <Link href={`/listings/${listing._id}`}>
                    <div className="w-full h-[300px]">
                      <Image
                        radius="lg"
                        width="100%"
                        height="100%"
                        alt="product"
                        className="w-full object-cover h-[300px]"
                        src={listing.productImage1}
                      />
                    </div>
                  </Link>
                </CardBody>
                <Link href={`/listings/${listing._id}`}>
                  <CardFooter className="flex flex-col items-start">
                    <div className="flex justify-center items-center">
                      <b className="text-[#71717a] text-xs">Listed by {listing.username} {formatDate(listing.createdAt)}</b>
                    </div>
                    <Divider/>
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
          <p className="text-black justify-center">No Listings available</p>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
