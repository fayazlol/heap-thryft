import React from "react";
import ProductListing from "../../models/ProductListing";
import { Card, Image, Link, CardFooter, CardBody } from "@nextui-org/react";
import dbConnect from "../lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "../../models/user";

export default async function AllUsers() {
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
  
  const allusers = await User.find();
  const userWithListings = await Promise.all(
    allusers.map(async (user) => {
      const numberOfListings = await ProductListing.countDocuments({ username: user.username });
      return { ...user.toObject(), numberOfListings }; 
    })
  );

  return (
    <main className="bg-[#fafafa] min-h-screen"> 
      <h1 className="flex justify-center items-center text-black text-4xl font-semibold py-10 mb-5">All Users</h1>
      <div>
        <div className='grid md:grid-cols-5 auto-rows-[300px] gap-4 px-4'>
          {userWithListings.map((user) => (
            <Link key={user._id} href={`/users/${user.username}`}>
              <Card
                className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
                isHoverable
                isPressable
                isBlurred
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    isBlurred
                    radius="lg"
                    width='100%'
                    height='100%'
                    alt='profile picture'
                    className="w-full object-cover h-[240px]"
                    src={user.profilepicture}
                  />
                </CardBody>
                <CardFooter className="justify-center flex flex-col items-center">
                  <b className="text-xl" >@{user.username}</b>
                  <p className="text-md">
                    {user.numberOfListings === 0 && "No Listings"}
                    {user.numberOfListings === 1 && "1 Listing"}
                    {user.numberOfListings > 1 && `${user.numberOfListings} Listings`}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="py-48"></div>
    </main>
  );
}
