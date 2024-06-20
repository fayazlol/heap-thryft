import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing";
import { NextResponse } from "next/server";

interface ProductListing {
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
}

export async function GET(request: Request): Promise<NextResponse> {
    const { username,productName,price,productImage1,productImage2,productImage3,productImage4,productDescription,
        productBrand,productSize,category,isDiscounted,discountPrice,isMeetup,meetupLocation,
    isDelivery,deliveryCost }: ProductListing = await request.json();
    await dbConnect();
    await ProductListing.find({username});
    return NextResponse.json({ message: "Product Found" }, { status: 201 });
}
