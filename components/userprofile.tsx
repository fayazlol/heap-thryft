import React, { FC } from "react";
import Image from "next/image";
import { maxHeaderSize } from "http";
//line 3-18 just sets the attributes for the user and listing collections
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
    isMeetup: boolean;
    meetupLocation?: string;
    isDelivery: boolean;
    deliveryCost?: string;
  }[];
}
//this is all front end stuff (html)
const UserProfile: FC<UserProfileProps> = ({ user, listings }) => {
  return (
    <main className="bg-[#fafafa] min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <Image
            src={user.profilepicture || "/testuser.jpg"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-black text-3xl font-semibold mb-4">@{user.username}</h1>
        </div>
        <div className="w-full max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4">Listings</h2>
          {listings.length > 0 ? (
            <ul className="space-y-4">
              {listings.map((listing) => (
                <li key={listing._id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-black text-xl font-semibold">{listing.productName}</h3>
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
                  <Image
                    src={listing.productImage1}
                    alt={listing.productName}
                    width={maxHeaderSize}
                    height={300}
                    className="mt-4 rounded-lg"
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
      </div>
    </main>
  );
};

export default UserProfile;