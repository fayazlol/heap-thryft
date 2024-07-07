"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, Image, Link, Divider, Button } from "@nextui-org/react";
import LikeIcon from '../app/lib/ToggleLikeButton';
import CartButton from "../app/lib/ToggleCartButton";
import { formatDate } from '../app/lib/formatDate';
import FilterSidebar from './FilterSidebar';

interface Listing {
  _id: string;
  username: string;
  productName: string;
  price: number;
  productBrand: string;
  productSize: string;
  category: string;
  isDiscounted: boolean;
  discountPrice?: number;
  productDescription: string;
  productImage1: string;
  productCondition: string;
  gender: 'Menswear' | 'Womenswear' | 'Unisex';
  createdAt: Date;
}

interface TodaysPiecesProps {
  user: {
    username: string;
  };
  alllistings: Listing[];
}

const ITEMS_PER_PAGE = 12;

const TodaysPiecesClient: React.FC<TodaysPiecesProps> = ({ user, alllistings }) => {
  const [listings, setListings] = useState<Listing[]>(alllistings);
  const [listingsCount, setListingsCount] = useState(alllistings.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(alllistings.length / ITEMS_PER_PAGE));
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    fetchListings();
  }, [filters, currentPage]);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/filtersidebar/todayspieces', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filters, page: currentPage, itemsPerPage: ITEMS_PER_PAGE }),
      });

      const data = await response.json();
      if (data.success) {
        setListings(data.data);
        setListingsCount(data.totalCount);
        setTotalPages(Math.ceil(data.totalCount / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <div className="flex bg-white text-black">
        <FilterSidebar onFilter={handleFilter} />
        <main className="w-4/5 p-4 text-black">
          <h1 className="text-2xl font-bold mb-4">Latest Drops</h1>
          <div className='grid md:grid-cols-4 gap-4'>
            {listings.length > 0 ? (
              listings.map((listing) => (
                <Card
                  key={listing._id}
                  className="w-full h-full overflow-hidden radius-lg relative"
                  isHoverable
                  isBlurred
                >
                  <div className="absolute top-2 right-2 z-20">
                    <LikeIcon productId={listing._id} username={user.username} />
                  </div>
                  <div className="absolute top-2 left-2 z-20">
                    <CartButton productId={listing._id} username={user.username} />
                  </div>
                  <CardBody className="overflow-visible p-0">
                    <Link href={`/listings/${listing._id}`}>
                      <div className="w-full h-[300px]">
                        <Image
                          radius="lg"
                          width="100%"
                          height="100%"
                          alt={listing.productName}
                          className="w-full object-cover h-[300px]"
                          src={listing.productImage1}
                        />
                      </div>
                    </Link>
                  </CardBody>
                  <Link href={`/listings/${listing._id}`}>
                    <CardFooter className="flex flex-col items-start">
                      <div className="flex justify-center items-center">
                        <b className="text-[#71717a] text-xs">Listed by {listing.username} {formatDate(listing.createdAt)}</b>
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
              <p>No listings available</p>
            )}
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button disabled={currentPage === 1} onPress={handlePreviousPage}>
              ←
            </Button>
            <span className="mx-2">{currentPage} / {totalPages}</span>
            <Button disabled={currentPage === totalPages} onPress={handleNextPage}>
              →
            </Button>
          </div>
        </main>
      </div>
    </main>
  );
};

export default TodaysPiecesClient;
