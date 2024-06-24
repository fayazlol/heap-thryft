import ProductListing from "@/models/ProductListing";
import {Card,Button,Image,Link,CardFooter,CardBody,Divider} from "@nextui-org/react";
import { formatDate } from "../lib/formatDate";
import LikeIcon from "../lib/ToggleLikeButton";
import dbConnect from "../lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import CartButton from "../lib/ToggleCartButton";

export default async function OnSale(){
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
    const salelistings = await ProductListing.find({ isDiscounted: true})
    const type = typeof salelistings;


    return (
        <main className="bg-[#fafafa] min-h-screen"> 
                  <h1 className="flex justify-center items-center text-black text-4xl font-semibold py-10 mb-20">On Sale</h1>
        <div className='grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4'>
            {Array.isArray(salelistings) ? (
                salelistings.map((salelistings: any) => (
                    <div key={salelistings._id}>
  <Card
    className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
    isHoverable
    isBlurred
  >
    <div className="absolute top-2 right-2 z-20">
    <LikeIcon productId={salelistings._id} username={user.username} />
    </div>
    <div className="absolute top-2 left-2 z-20 shadow-s ">
    <CartButton productId={salelistings._id} username={user.username} />
    </div>
    <CardBody className="overflow-visible p-0">
    <Link href={`/listings/${salelistings._id}`}>
    <div className="w-full h-[300px]">
      <Image
        radius="lg"
        width="100%"
        height="100%"
        alt="shirt1"
        className="w-full object-cover h-[300px]"
        src={salelistings.productImage1}
      />
      </div>
      </Link>
    </CardBody>
    <Link href={`/listings/${salelistings._id}`}>
    <CardFooter className="flex flex-col items-start">
        <div className="flex justify-center items-center">
        <b className="text-[#71717a] text-xs">Listed by {salelistings.username} {formatDate(salelistings.createdAt)}</b>
        </div>
        <Divider/>
      <div className="flex justify-between w-full">
        <b className="text-black text-xl">{salelistings.productName}</b>
        {
  salelistings.isDiscounted ? (
    <div className="flex items-center space-x-2"> 
    <p className="text-gray-600 text-xl mb-4 line-through">${salelistings.price}</p> 
    <p className="text-red-500 text-xl font-bold mb-4">${salelistings.discountPrice}</p>
  </div>
  
  ) : (
    <p className="text-black text-xl font-bold mb-4">${salelistings.price}</p>
  )
}
      </div>
      <div className="flex justify-between w-full">
      <b className="text-black text-l">{salelistings.productBrand}</b>
      <b className="text-black text-l">{salelistings.productSize}</b>
      </div>
    </CardFooter>
    </Link>
  </Card>
</div>
                ))
            ) : (
                <p>{type}No Listings available</p>
            )}
        </div>
        </main>
    );
}


      