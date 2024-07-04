
import React from "react";
import ProductListing from "../../models/ProductListing";
import dbConnect from "../lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "../../models/user";
import ShopNowClient from "../../components/ShopNowClient";

export default async function ShopNow() {
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

  const alllistings = await ProductListing.find();

  return <ShopNowClient user={user} alllistings={alllistings} />;
}
