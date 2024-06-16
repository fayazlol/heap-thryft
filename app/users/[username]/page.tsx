import { redirect } from "next/navigation";
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing";
import UserProfile from "@/components/userprofile";
//lines 10-11 sets up the dynamic route, so params refers to the url path (localhost:3000/users/params),
//and params will be replaced by whatever username 
const UserPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
//line 14 is to connect to database by calling dbConnect function
//line 15 sets the variable user, by using the mongoose function findone, which will find a document from the collection
//in the case User, a username which matches the username u provide.
//line 17 basically means if the user doesnt exist, redirect them to homepage
  await dbConnect();
  const user = await User.findOne({ username });
  if (!user) {
    redirect("/");
    return null;
  }
//line 23 finds uses mongoose find command to find all products in the ProductListing collection
//which have been posted by the username u want. the result is set as the variable listing
  const listings = await ProductListing.find({ username });
//line 24-25 calls the UserProfile variable from components/userprofile.tsx, which contains code to render the page
  return (
    <UserProfile user={user} listings={listings} />
  );
};

export default UserPage;


