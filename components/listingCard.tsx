import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/app/lib/formatDate';
import LikeIcon from '@/app/lib/ToggleLikeButton';
import mongoose from 'mongoose';
//still figuring out for now, can ignore
interface Listing {
  _id: mongoose.Types.ObjectId;
  productImagePath: string;
  productName: string;
  productBrand: string;
  price: string;
  createdAt: Date;
}

interface ListingCardProps {
  alllistings: Listing;
  username: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ alllistings, username }) => {
  return (
    <div key={alllistings._id.toString()}>
      <Card
        className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
        isHoverable
        isBlurred
      >
        <div className="absolute top-2 right-2 z-20">
          <LikeIcon productId={alllistings._id} username={username} />
        </div>
        <CardBody className="overflow-visible p-0">
          <Link href="/userprofile">
            <div className="w-full h-[300px]">
              <Image
                radius="lg"
                width="100%"
                height="100%"
                alt="shirt1"
                className="w-full object-cover h-[300px]"
                src={alllistings.productImagePath}
              />
            </div>
          </Link>
        </CardBody>
        <Link href="/userprofile">
          <CardFooter className="flex flex-col items-start p-4">
            <div className="flex justify-between w-full">
              <b className="text-xl">{alllistings.productName}</b>
              <b className="text-xl">{alllistings.productBrand}</b>
            </div>
            <div className="mt-auto">
              <b className="text-xl">{alllistings.price}</b>
              <b className="text-xl">{formatDate(alllistings.createdAt)}</b>
              <div className="relative flex justify-center items-center">
                <b className="absolute top-[-10px] text-xs">Listed {formatDate(new Date(alllistings.createdAt))}</b>
              </div>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default ListingCard;
