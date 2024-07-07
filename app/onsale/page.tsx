
import React from "react";
import ProductListing from "../../models/ProductListing";
import dbConnect from "../lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "../../models/user";
import OnSaleClient from "../../components/OnSaleClient";

export default async function OnSale() {
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

  const salelistings = await ProductListing.find({ isDiscounted: true,    isSold: false
  });

  return <OnSaleClient user={user} salelistings={salelistings} />;
}
