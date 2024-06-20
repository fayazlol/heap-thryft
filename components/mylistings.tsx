import { maxHeaderSize } from "http";
import React, { FC } from "react";
import { formatDate } from "@/app/lib/formatDate";
import { Divider } from "@nextui-org/react";

interface Listing {
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
}

interface ListingsProps {
  listings: Listing[];
}

const Listings: FC<ListingsProps> = ({ listings }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {listings.length > 0 ? (
        <ul className="space-y-4">
          {listings.map((listing) => (
            <li key={listing._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl text-gray-600 font-semibold">{listing.productName}</h2>
              <p className="text-gray-600">Brand: {listing.productBrand}</p>
              <p className="text-gray-600">Size: {listing.productSize}</p>
              <p className="text-gray-600">Category: {listing.category}</p>

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
<Divider/>
<b className="text-[#71717a] text-xs">Listed by you, {formatDate(listing.createdAt)}</b>
              <img
                src={listing.productImage1}
                alt={listing.productName}
                className="mt-4 rounded-lg"
                width={maxHeaderSize}
                height={300}
              />

            </li>
          ))}
        </ul>
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
};

export default Listings;