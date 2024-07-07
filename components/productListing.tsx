"use client";
import React, { FC, useState } from "react";
import { Card, Button, Image, Link, CardFooter, CardBody, Divider } from "@nextui-org/react";
import { formatDate } from "@/app/lib/formatDate";
import ListingCartButton from "@/app/lib/ListingCartButton";
import ListingLikeButton from "@/app/lib/ListingLikeButton";

interface ProductListingProps {
  listing: {
    _id: string;
    username: string;
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
    productCondition: string;
    gender: 'Menswear' | 'Womenswear' | 'Unisex';
    createdAt: Date;
    isSold: boolean;
  };
  sessionuser: string;
}

const ProductListingPage: FC<ProductListingProps> = ({ listing, sessionuser }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    listing.productImage1,
    listing.productImage2,
    listing.productImage3,
    listing.productImage4
  ].filter(image => image); // Filter out empty image URLs

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <div className="container mx-auto px-4 py-8 flex">
        <div className="flex-1 relative">
          <Image
            src={images[currentImageIndex]}
            alt={listing.productName}
            width={600}
            height={600}
            className="object-cover shadow-lg"
          />
          <button
            className="absolute left-[-10px] top-1/2 z-20 transform -translate-y-1/2 bg-black text-white p-2 rounded-xl"
            onClick={handlePreviousImage}
          >
            {"<"}
          </button>
          <button
            className="absolute right-0 top-1/2 z-20 transform -translate-y-1/2 bg-black text-white p-2 rounded-xl"
            onClick={handleNextImage}
          >
            {">"}
          </button>
        </div>
        <div className="flex-1 ml-8">
          <h1 className="text-black text-4xl font-bold mb-2">{listing.productName}</h1>
          <p className="text-gray-700 mb-2">{listing.productBrand}</p>
          <p className="text-gray-500 mb-2">{listing.productSize} | {listing.productCondition}</p>
          <p className="text-gray-500 mb-2">Category: {listing.category} | {listing.gender}</p>
          <Divider />
          {
            listing.isDiscounted ? (
              <div className="flex items-center space-x-2">
                <p className="text-gray-600 text-xl mb-4 line-through">${listing.price}</p>
                <p className="text-red-500 text-xl font-bold mb-4">${listing.discountPrice}</p>
              </div>
            ) : (
              <p className="text-black text-xl font-bold mb-4">${listing.price}</p>
            )
          }
          <b className="text-[#71717a] text-xs">Listed {formatDate(listing.createdAt)}</b>
          <Divider />
          <p className="text-black mb-2 py-4">{listing.productDescription}</p>
          <div className="w-full">
            {listing.isSold ? (
              <div className="bg-red-500 text-white p-2 text-center rounded-xl mb-2">Item has been sold</div>
            ) : (
              <ListingCartButton productId={listing._id} username={sessionuser} />
            )}
          </div>
          <div className="w-full">
            <ListingLikeButton productId={listing._id} username={sessionuser} />
          </div>
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <Image
                src='/ballingcat.jpeg'
                alt={listing.username}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <Link href={`/users/${listing.username}`}>
                  <p className="text-black font-bold hover:text-[#1d4ed8]">{listing.username}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductListingPage;
