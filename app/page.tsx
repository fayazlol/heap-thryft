
import * as React from "react";
import {Card,Button,Image,Link,CardFooter,CardBody, Divider} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/system";
import { maxHeaderSize } from "http";
import { redirect } from "next/dist/server/api-utils";
import dbConnect from "./lib/dbConnect";
import mongoose from "mongoose";
import ShopByUsers from "@/components/ShopByUsers";
import User from "@/models/user";
import ProductListing from "@/models/ProductListing";
import { formatDate } from "./lib/formatDate";



export default async function Home() {
  await dbConnect();
  const users = await User.find()
  const discountedProducts = await ProductListing.find({ isDiscounted: true }).sort({ createdAt: -1 })
  .limit(5);




  return (
      <main className="bg-[#fafafa] min-h-screen">
        <div className="flex flex-col w-full h-full items-center p-3">
          <div className="relative w-full max-w px-0.5">
              <Image
                alt="This is supposed to be a video"
                className="object-cover w-full h-full rounded-"
                height={maxHeaderSize}
                width={maxHeaderSize}
                src="/topvid.png"
              />
              <div className="absolute inset-0 flex justify-center items-center z-10">
                <Button size='lg' className="text-white" variant="ghost">
                  {"Explore Today's Hottest Pieces"}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <b className="text-2xl text-black px-4 py-4">Shop by Category</b>
          </div>
          <div className='grid md:grid-cols-4 auto-rows-[300px] gap-4 px-4'>
        <Card
        className="w-full h-full overflow-hidden radius-lg md:col-span-2 relative"
        isHoverable
        isPressable
        isBlurred
      >
         <CardBody className="overflow-visible p-0">
            <Image
            isBlurred
              radius="lg"
              width={maxHeaderSize}
              height='100%'
              alt='bags'
              className="w-full object-cover h-[230px]"
              src='/bags.png'
            />

          </CardBody>
          <Link href="/categories/Bags">
          <CardFooter className="text-xl justify-start">
            <b className="text-xl text-black">bags</b>
          </CardFooter>
          </Link>
      </Card>


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
              alt='footwear'
              className="w-full object-cover h-[230px]"
              src='/footwear.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-end">
            <b>footwear</b>
          </CardFooter>

      </Card>

      <Card
        className="w-full h-full overflow-hidden radius-lg md:row-span-2 relative"
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
              alt='outerwear'
              className="w-full object-cover h-[550px]"
              src='/outerwear.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-end">
            <b>outerwear</b>
          </CardFooter>
      </Card>

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
              alt='accessories'
              className="w-full object-cover h-[230px]"
              src='/accessories.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-start">
            <b>accessories</b>
          </CardFooter>
      </Card>

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
              alt='bottoms'
              className="w-full object-cover h-[230px]"
              src='/bottoms.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-start">
            <b>bottoms</b>
          </CardFooter>
      </Card>

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
              alt='tops'
              className="w-full object-cover h-[230px]"
              src='/tops.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-end">
            <b>tops</b>
          </CardFooter>
      </Card>
    </div>
    <div className="flex flex-col justify-start py-10">
    </div>

{/*shop by stores part*/}
      <ShopByUsers users={users} />
    <div className="flex flex-col justify-start py-10"></div>

    {/*on sale part*/}

    <div className="flex flex-col justify-start">
        <b className="text-2xl text-black px-4 py-4">On Sale</b>
        <Link href="/onsale" className="flex justify-end px-5">
        <b className="text-blue-500 hover:underline">see all &rarr;</b>
      </Link>
      </div>
      <div className='grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4'>
        {discountedProducts.map((product: any) => (
          <Link key={product._id} href={`/listings/${product._id}`}>
            <Card
              className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
              isHoverable
              isPressable
              isBlurred
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  radius="lg"
                  width='100%'
                  height='100%'
                  alt={product.productName}
                  className="w-full object-cover h-[300px]"
                  src={product.productImage1}
                />
              </CardBody>
              <CardFooter className="flex flex-col items-start">
        <div className="flex justify-center items-center">
        <b className="text-[#71717a] text-xs">Listed by {product.username} {formatDate(product.createdAt)}</b>
        </div>
        <Divider/>
      <div className="flex justify-between w-full">
        <b className="text-black text-xl">{product.productName}</b>
        {
  product.isDiscounted ? (
    <div className="flex items-center space-x-2"> 
    <p className="text-gray-600 text-xl mb-4 line-through">${product.price}</p> 
    <p className="text-red-500 text-xl font-bold mb-4">${product.discountPrice}</p>
  </div>
  
  ) : (
    <p className="text-black text-xl font-bold mb-4">${product.price}</p>
  )
}
      </div>
      <div className="flex justify-between w-full">
      <b className="text-black text-l">{product.productBrand}</b>
      <b className="text-black text-l">{product.productSize}</b>
      </div>
    </CardFooter>
            </Card>
          </Link>
        ))}
      </div>


    <div className="flex flex-col justify-start py-20"></div>
    <div className="flex flex-col w-full h-full items-center ">
          <div className="relative w-full max-w ">
              <Image
                alt="This is supposed to be a video"
                className="object-cover w-full h-full rounded-none radius-none"
                height={maxHeaderSize}
                width={maxHeaderSize}
                src="/bottompic.png"
              />
              <div className="absolute inset-0 flex justify-center items-end z-10">
                <Card className="bg-white w-full h-[100px]" >
                  {"temporary footer, will make later :)"}
                </Card>
              </div>
            </div>
          </div>
    
      </main>
  );
}
