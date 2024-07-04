import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";
import EditListing from "@/components/editListing";

interface Params {
  id: string;
}

interface EditListingPageProps {
  params: Params;
}

const EditListingPage: React.FC<EditListingPageProps> = async ({ params }) => {
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

  return <EditListing params={params} />;
};

export default EditListingPage;
