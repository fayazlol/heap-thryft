"use client";

import * as React from "react";
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
import { useRouter } from 'next/navigation';


const ShopByCategory: React.FC = () => {
    const router = useRouter();

    const handleCardClick = (category: string) => {
      router.push(`/categories/${category}`);
    };
  return (
    <div className='grid md:grid-cols-4 auto-rows-[300px] gap-4 px-4'>
      <Card
        className="w-full h-full overflow-hidden radius-lg md:col-span-2 relative"
        isHoverable
        isPressable onPress={() => handleCardClick('Bags')}
        isBlurred        
      >
        <CardBody className="overflow-visible p-0">
          <Image
            isBlurred
            radius="lg"
            width="100%"
            height='100%'
            alt='bags'
            className="w-full object-cover h-[230px]"
            src='/bags.png'
          />
        </CardBody>
          <CardFooter className="text-xl justify-start">
            <b className="text-xl text-black">bags</b>
          </CardFooter>
      </Card>

      <Card
        className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
        isHoverable
        isPressable onPress={() => handleCardClick('Footwear')}
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
          <CardFooter className="text-xl justify-end">
            <b>footwear</b>
          </CardFooter>
      </Card>

      <Card
        className="w-full h-full overflow-hidden radius-lg md:row-span-2 relative"
        isHoverable
        isPressable onPress={() => handleCardClick('Outerwear')}
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
          <CardFooter className="text-xl justify-end">
            <b>outerwear</b>
          </CardFooter>
      </Card>

      <Card
        className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
        isHoverable
        isPressable onPress={() => handleCardClick('Accessories')}
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
          <CardFooter className="text-xl justify-start">
            <b>accessories</b>
          </CardFooter>
      </Card>

      <Card
        className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
        isHoverable
        isPressable onPress={() => handleCardClick('Bottoms')}
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
          <CardFooter className="text-xl justify-start">
            <b>bottoms</b>
          </CardFooter>
      </Card>

      <Card
        className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
        isHoverable
        isPressable onPress={() => handleCardClick('Tops')}
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
          <CardFooter className="text-xl justify-end">
            <b>tops</b>
          </CardFooter>
      </Card>
    </div>
  );
};

export default ShopByCategory;
