import ProductListing from "@/models/ProductListing";
import dbConnect from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import Favourite from "@/models/favourite";
import mongoose from "mongoose";
import MyFavouritesClient from "../../../components/MyFavouritesClient";

interface ProductListing {
  _id: mongoose.Types.ObjectId;
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
  productCondition: string;
  gender: 'Menswear' | 'Womenswear' | 'Unisex';
  isSold: boolean;
  createdAt: Date;
}

const MyFavouritesPage = async () => {
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

  const favourites = await Favourite.find({ username: user.username });
  const productIds = favourites.map((favourite) => favourite.productId);
  const productListings = await ProductListing.find({
    _id: { $in: productIds },
  });

  return (
    <main className="bg-[#fafafa] min-h-screen"> 
      <h1 className="text-black text-2xl font-bold mb-4">My Favourites</h1>
      <MyFavouritesClient listings={productListings} username={user.username} />
    </main>
  );
};

export default MyFavouritesPage;
