import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";
import CreateListing from "@/components/createListing";

export default async function UserProfilePage() {
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

  return <CreateListing user={user} />;
}
