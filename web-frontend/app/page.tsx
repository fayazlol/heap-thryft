//import Image from "next/image";
import * as React from "react";
import {Card,Button,Image,Link,CardFooter,CardBody} from "@nextui-org/react";
// 1. import `NextUIProvidernpm` component
import {NextUIProvider} from "@nextui-org/system";
import { maxHeaderSize } from "http";
import { GetSession, getSession } from "@auth0/nextjs-auth0";




const categories = [
  { name: 'footwear', image: '/footwear.png', link: '/footwear' },
  { name: 'outerwear', image: '/outerwear.png', link: '/outerwear' },
  { name: 'bags', image: '/bags.png', link: '/bags' },
  { name: 'bottoms', image: '/bottoms.png', link: '/bottoms' },
  { name: 'tops', image: '/tops.png', link: '/tops' },
  { name: 'accessories', image: '/accessories.png', link: '/accessories' },
];



export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);


  return (
    <NextUIProvider>
      <main className="bg-[#fafafa] min-h-screen">
        <div className="flex flex-col w-full h-full items-center p-3">
          <div className="relative w-full max-w px-0.5">
              <Image
                alt="This is supposed to be a video"
                className="object-cover w-full h-full rounded-lg"
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
          <Link href="/insert_link_to_categories_page" className="flex justify-end px-5">
          <b className="text-blue-500 hover:underline">see all &rarr;</b>
        </Link>
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
              width='100%'
              height='100%'
              alt='bags'
              className="w-full object-cover h-[230px]"
              src='/bags.png'
            />
          </CardBody>
          <CardFooter className="text-xl justify-start">
            <b>bags</b>
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

    <div className="flex flex-col justify-start ">
            <b className="text-2xl text-black px-4 py-4">Shop by Stores</b>
          </div>
          <Link href="/insert_link_to_stores_page" className="flex justify-end px-5">
          <b className="text-blue-500 hover:underline">see all &rarr;</b>
        </Link>     
        <div className='grid md:grid-cols-5 auto-rows-[300px] gap-4 px-4'>
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
              alt='woofie'
              className="w-full object-cover h-[260px]"
              src='/woofie.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
            <b>{"woofie's warhouse"}</b>
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
              alt='frankswarehouse'
              className="w-full object-cover h-[260px]"
              src='/frank.jpg'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
            <b>{"frank's warehouse"}</b>
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
              alt='astonabode'
              className="w-full object-cover h-[260px]"
              src='/aston.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
            <b>{"aston's abode"}</b>
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
              alt='honsieponsie'
              className="w-full object-cover h-[260px]"
              src='/honsie.jpg'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
            <b>honsieponsie</b>
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
              alt='the rookies'
              className="w-full object-cover h-[260px]"
              src='/rookies.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
            <b>the rookies store</b>
          </CardFooter>
      </Card>      
    </div>

    <div className="flex flex-col justify-start py-10"></div>

    {/*on sale part*/}

    <div className="flex flex-col justify-start ">
            <b className="text-2xl text-black px-4 py-4">On Sale</b>
          </div>
          <Link href="/insert_link_to_store_page" className="flex justify-end px-5">
          <b className="text-blue-500 hover:underline">see all &rarr;</b>
        </Link>     
        <div className='grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4'>
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
              alt='shirt1'
              className="w-full object-cover h-[300px]"
              src='/shirt1.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-start items-start">
            <b>{"shirt"}</b>
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
              radius="lg"
              width='100%'
              height='100%'
              alt='shirt1'
              className="w-full object-cover h-[300px]"
              src='/shirt1.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
          <b>{"shirt"}</b>
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
              radius="lg"
              width='100%'
              height='100%'
              alt='shirt1'
              className="w-full object-cover h-[300px]"
              src='/shirt1.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
          <b>{"shirt"}</b>
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
              radius="lg"
              width='100%'
              height='100%'
              alt='shirt1'
              className="w-full object-cover h-[300px]"
              src='/shirt1.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
          <b>{"shirt"}</b>
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
              radius="lg"
              width='100%'
              height='100%'
              alt='shirt1'
              className="w-full object-cover h-[300px]"
              src='/shirt1.png'
            />
          </CardBody>
          <CardFooter className=" text-xl  justify-center">
          <b>{"shirt"}</b>
          </CardFooter>
      </Card>
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
    </NextUIProvider>
  );
}
