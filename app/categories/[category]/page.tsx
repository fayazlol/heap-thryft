import React from "react";
import ProductListing from "../../../models/ProductListing";
import dbConnect from "../../lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "../../../models/user";
import CategoryClient from "../../../components/CategoryClient"; 

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category } = params;
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    return null;
  }

  const alllistings = await ProductListing.find({ category: { $regex: category, $options: 'i' },    isSold: false
});

  return <CategoryClient user={user} alllistings={alllistings} category={category} />;
};

export default CategoryPage;
