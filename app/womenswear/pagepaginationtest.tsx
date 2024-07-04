import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/models/user';
import ProductListing from '@/models/ProductListing';
import WomenswearClient from '@/components/WomenswearClient';
import PaginationControls from '@/components/PaginationControls';

const ITEMS_PER_PAGE = 10;

export default async function WomenswearPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    redirect('/login');
    return null;
  }

  const page = parseInt(searchParams.get('page') || '1', 10);
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [initialListings, totalItems] = await Promise.all([
    ProductListing.find({ gender: { $in: ['Womenswear', 'Unisex'] } })
      .skip(skip)
      .limit(ITEMS_PER_PAGE),
    ProductListing.countDocuments({ gender: { $in: ['Womenswear', 'Unisex'] } }),
  ]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div>
      <WomenswearClient initialListings={initialListings} />
      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  );
}
