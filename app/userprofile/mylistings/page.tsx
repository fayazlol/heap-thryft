import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing";
import Listings from "@/components/mylistings";

const MyListingsPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    redirect("/");
    return null;
  }

  const listings = await ProductListing.find({ username: user.username });

  return (
    <main className="bg-[#fafafa] min-h-screen">
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-black text-3xl font-semibold mb-6">My Listings</h1>
      <Listings listings={listings} />
    </div>
    </main>
  );
};

export default MyListingsPage;
