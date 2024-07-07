
import React from "react";
import ProductListing from "../../models/ProductListing";
import dbConnect from "../lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "../../models/user";
import TodaysPiecesClient from "../../components/TodaysPiecesClient";

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

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const alllistings = await ProductListing.find({
    createdAt: { $gte: twentyFourHoursAgo },
    isSold: false
  });

  return <TodaysPiecesClient user={user} alllistings={alllistings} />;
}
