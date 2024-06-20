import React, { FC } from "react";
import {Card,Button,Image,Link,CardFooter,CardBody,Divider} from "@nextui-org/react";
import { formatDate } from "@/app/lib/formatDate";

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
    discountPrice: string;
    isMeetup: boolean;
    meetupLocation: string;
    isDelivery: boolean;
    deliveryCost: string;
    createdAt: Date;
  };
}
//this is all front end stuff (html)
const ProductListingPage: FC<ProductListingProps> = ({ listing }) => {
  return (
    <main className="bg-[#fafafa] min-h-screen">
     <div className="container mx-auto px-4 py-8 flex">
      <div className="flex-1">
        <div className="relative">
          <Image
            src={listing.productImage1}
            alt={listing.productName}
            width={600}
            height={600}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1 ml-8">
        <h1 className="text-black text-4xl font-bold mb-2">{listing.productName}</h1>
        <p className="text-gray-700 mb-2">{listing.productBrand}</p>
        <p className="text-gray-500 mb-2">{listing.productSize}</p>
        <p className="text-gray-500 mb-2">Category: {listing.category}</p>
        <Divider/>
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
        <Button className="bg-black text-white mb-4 w-full">PURCHASE</Button>
        <Divider/>
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
              <p className="text-black font-bold hover:text-[#1d4ed8] ">{listing.username}</p>
            </Link>
            </div>
          </div>
          <Button className="bg-black text-white w-full">FOLLOW</Button>
        </div>
      </div>
    </div>
    </main>
  );
};

export default ProductListingPage;