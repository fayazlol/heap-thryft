import { maxHeaderSize } from "http";
import React, { FC } from "react";

interface Listing {
  _id: string;
  productName: string;
  productBrand: string;
  productSize: string;
  category: string;
  price: number;
  productImagePath: string;
  isDiscounted: boolean;
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
              <p className="text-gray-600">Price: ${listing.price}</p>
              <img
                src={listing.productImagePath}
                alt={listing.productName}
                className="mt-4 rounded-lg"
                width={maxHeaderSize}
                height={300}
              />
              {listing.isDiscounted && (
                <span className="text-red-500 font-semibold">Discounted</span>
              )}
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