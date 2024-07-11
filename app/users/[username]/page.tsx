import { redirect } from "next/navigation";
import { Card, Image, Avatar} from "@nextui-org/react";
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing";
import UserProfile from "@/components/userprofile";
import { maxHeaderSize } from "http";
import { getServerSession } from "next-auth";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const session = await getServerSession();
  if (!session) {
    redirect('/');
    return null;
  }

  await dbConnect();
  const CurrentUser = await User.findOne({ email: session.user?.email });

  if (!CurrentUser) {
    redirect('/');
    return null;
  }
  const user = await User.findOne({ username });
  if (!user) {
    redirect("/");
    return null;
  }

  const listings = await ProductListing.find({ username });
  const listingsCount = await ProductListing.countDocuments({ username: user.username });
  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  

  return (
    <div className="bg-[#fafafa] min-h-screen items-center justify-center px-6 ">
      <div className="items-center justify-center px-6 ">
    <h1 className="font-bold text-4xl text-black mb-2 py-2 ml-2">@{user.username}</h1>
      <Card className="bg-white rounded-xl shadow-lg w-full">
        <Image
          src={user.bannerpicture}
          alt="Banner Picture"
          width={maxHeaderSize}
          height={50}
          className="object-center mx-auto h-[300px] mb-6 "
        />
       <div className=" relative justify-start items-start inline-flex -top-6">
        <Avatar src={user.profilepicture} className=" z-20 -top-[50px] left-3 w-[120px] h-[120px] text-large  border-4 border-white" />
        <h1 className="text-2xl font-bold ml-8 mt-2  ">@{user.username}</h1>
        <p className="text-gray-600 mt-4 ml-10">{listingsCount} Listings | Joined {joinDate}</p>
        </div>
        <div className="absolute top-0 left-0 w-full mt-[370px]">
    <p className="text-gray-700 ml-4">{user.bio}</p>
  </div>
      </Card>
    <UserProfile user={user} listings={listings} currentuser={CurrentUser} />
    </div>
    </div>
  );
};

export default UserPage;


