// app/users/[username]/page.tsx

import { redirect } from "next/navigation";
import User from "@/models/user"; // Ensure this path is correct based on your directory structure
import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing"; // Ensure this path is correct based on your directory structure
import UserProfile from "@/components/userprofile";
import { use } from "react";

const fetchUserAndListings = async (username: string) => {
  await dbConnect();
  
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return { user: null, listings: [] };
  }

  const listings = await ProductListing.find({ username }).lean();
  return {
    user: JSON.parse(JSON.stringify(user)),
    listings: JSON.parse(JSON.stringify(listings)),
  };
};

const UserPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const { user, listings } = await fetchUserAndListings(username);

  if (!user) {
    redirect("/");
    return null;
  }

  return <UserProfile user={user} listings={listings} />;
};

export default UserPage;
