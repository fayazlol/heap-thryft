import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing";
import { NextResponse } from "next/server";

interface ProductListing {
    username: string;
    productName: string;
    price: number;
    productImagePath: string;
    productBrand: string;
    productSize: string;
    category: string;
    isDiscounted: boolean;
}

export async function GET(request: Request): Promise<NextResponse> {
    const { username,productName,price,productImagePath,productBrand,productSize,category,isDiscounted }: ProductListing = await request.json();
    await dbConnect();
    await ProductListing.find({username});
    return NextResponse.json({ message: "Product Found" }, { status: 201 });
}
