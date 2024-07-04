import React, { FC } from "react";
import { formatDate } from "@/app/lib/formatDate";
import { Card, Image, Link, CardFooter, CardBody, Divider } from "@nextui-org/react";
import LikeIcon from "@/app/lib/ToggleLikeButton";
import dynamic from 'next/dynamic';

const EditListingButton = dynamic(() => import('@/app/lib/EditListingButton'), { ssr: false });
const DeleteListingButton = dynamic(() => import('@/app/lib/DeleteListingButton'), { ssr: false });

interface Listing {
  _id: string;
  username: string;
  productName: string;
  price: string;
  productImage1: string;
  productImage2: string;
  productImage3: string;
  productImage4: string;
  productBrand: string;
  productSize: string;
  category: string;
  productDescription: string;
  isDiscounted: boolean;
  discountPrice: string;
  isMeetup: boolean;
  meetupLocation: string;
  isDelivery: boolean;
  deliveryCost: string;
  createdAt: Date;
}

interface ListingsProps {
  listings: Listing[];
}

const Listings: FC<ListingsProps> = ({ listings }) => {
  return (
    <div className="flex justify-center">
      <div className="grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <Card
              key={listing._id}
              className="w-full h-full overflow-hidden radius-lg relative"
              isHoverable
              isBlurred
            >
              <div className="absolute top-2 right-2 z-20">
                <LikeIcon productId={listing._id} username={listing.username} />
              </div>
              <div className="absolute top-2 left-2 z-20 flex flex-col space-y-2">
                <EditListingButton productId={listing._id} />
                <DeleteListingButton productId={listing._id} />
              </div>
              <CardBody className="overflow-visible p-0">
                <Link href={`/listings/${listing._id}`}>
                  <div className="w-full h-[300px]">
                    <Image
                      radius="lg"
                      width="100%"
                      height="100%"
                      alt="shirt1"
                      className="w-full object-cover h-[300px]"
                      src={listing.productImage1}
                    />
                  </div>
                </Link>
              </CardBody>
              <Link href={`/listings/${listing._id}`}>
                <CardFooter className="flex flex-col items-start">
                  <div className="flex justify-center items-center">
                    <b className="text-[#71717a] text-xs">Listed {formatDate(listing.createdAt)}</b>
                  </div>
                  <Divider />
                  <div className="flex justify-between w-full">
                    <b className="text-black text-xl">{listing.productName}</b>
                    {listing.isDiscounted ? (
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-600 text-xl mb-4 line-through">${listing.price}</p>
                        <p className="text-red-500 text-xl font-bold mb-4">${listing.discountPrice}</p>
                      </div>
                    ) : (
                      <p className="text-black text-xl font-bold mb-4">${listing.price}</p>
                    )}
                  </div>
                  <div className="flex justify-between w-full">
                    <b className="text-black text-l">{listing.productBrand}</b>
                    <b className="text-black text-l">{listing.productSize}</b>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default Listings;
