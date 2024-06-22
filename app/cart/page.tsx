import React from "react";
import ProductListing from "../../models/ProductListing";
import { Card, Button, Image } from "@nextui-org/react";
import { formatDate } from "../lib/formatDate";
import LikeIcon from "../lib/ToggleLikeButton";
import dbConnect from "../lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "../../models/user";
import Cart from "../../models/cart";
import mongoose from "mongoose";
import RemoveFromCartButton from "../lib/RemoveFromCartButton";

interface ProductListing {
  _id: mongoose.Types.ObjectId;
  username: string;
  productName: string;
  price: string;
  productImage1: string;
  productBrand: string;
  productSize: string;
  isDiscounted: boolean;
  discountPrice: string;
}

const fetchCartData = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    redirect("/register");
    return null;
  }

  const cartitems = await Cart.find({ username: user.username });
  const productIds = cartitems.map((cart) => cart.productId);
  const productListings: ProductListing[] = await ProductListing.find({
    _id: { $in: productIds },
  });

  return { user, productListings };
};

const calculateTotal = (productListings: ProductListing[]): number => {
  let total = 0;
  productListings.forEach((listing: ProductListing) => {
    total += listing.isDiscounted ? parseFloat(listing.discountPrice) : parseFloat(listing.price);
  });
  return total;
};

const MyCartPage = async () => {
  const data = await fetchCartData();

  if (!data) {
    return null;
  }

  const { user, productListings } = data;
  const total = calculateTotal(productListings);

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <div className="flex gap-20 py-4 px-10 max-lg:flex-col max-sm:px-3">
        <div className="w-2/3 max-lg:w-full">
          <p className="text-black text-4xl font-semibold">Shopping Cart</p>
          <hr className="my-6" />
          {productListings.length > 0 ? (
            productListings.map((listing: ProductListing) => (
              <div
                key={listing._id.toString()}
                className="bg-[#d1d5db] rounded-md w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between"
              >
                <div className="flex items-center">
                  <Image
                    radius="lg"
                    shadow="md"
                    isBlurred
                    src={listing.productImage1}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt={listing.productName}
                  />
                  <div className="flex flex-col ml-4">
                    <p className="text-s text-black justify-start">@{listing.username}'s</p>
                    <p className="text-xl font-semibold text-black">{listing.productName}</p>
                    <p className="text-small-medium text-black">{listing.productBrand} | {listing.productSize}</p>
                    {listing.isDiscounted ? (
                      <div className="flex items-center space-x-2">
                        <p className="text-black text-xl font-bold mb-4">${listing.discountPrice}</p>
                      </div>
                    ) : (
                      <p className="text-black text-xl font-bold mb-4">${listing.price}</p>
                    )}
                    <RemoveFromCartButton
                      productId={listing._id.toString()}
                      username={user.username}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-black justify-center items-center">No items in cart</p>
          )}
        </div>
        <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
          <div className="flex justify-between text-body-semibold">
            <span className="text-black">Total Amount</span>
            <span className="text-black font-semibold">${total.toFixed(2)}</span>
          </div>
          <Button className="text-black border bg-white py-3 w-full hover:bg-black hover:text-white hover:font-semibold">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </main>
  );
};

export default MyCartPage;
