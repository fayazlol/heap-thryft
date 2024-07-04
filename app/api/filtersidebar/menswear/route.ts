import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import ProductListing from '../../../../models/ProductListing';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { categories, conditions, minPrice, maxPrice, page, itemsPerPage } = body;

    const filterCriteria: any = {
      gender: { $in: ['Menswear', 'Unisex'] },
    };

    if (categories && categories.length > 0) {
      filterCriteria.category = { $in: categories };
    }

    if (conditions && conditions.length > 0) {
      filterCriteria.productCondition = { $in: conditions };
    }

    const listings = await ProductListing.find(filterCriteria);

    const filteredListings = listings.filter(listing => {
      let actualPrice = listing.isDiscounted ? listing.discountPrice : listing.price;

      if (minPrice && parseFloat(actualPrice) < parseFloat(minPrice)) {
        return false;
      }

      if (maxPrice && parseFloat(actualPrice) > parseFloat(maxPrice)) {
        return false;
      }

      return true;
    });

    const totalCount = filteredListings.length;
    const paginatedListings = filteredListings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return NextResponse.json({ success: true, data: paginatedListings, totalCount });
  } catch (error) {
    console.error('Error fetching filtered listings:', error);
    return NextResponse.json({ success: false, error: 'Error fetching filtered listings' }, { status: 500 });
  }
}
