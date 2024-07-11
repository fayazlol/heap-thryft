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
    discountPrice?: string;
    productCondition: string;
    gender: 'Menswear' | 'Womenswear' | 'Unisex';
    isSold: boolean;
}

export async function POST(request: Request): Promise<NextResponse> {
    const { username, productName, price, productImage1, productImage2, productImage3, productImage4, productDescription,
        productBrand, productSize, category, isDiscounted, discountPrice, productCondition, gender }: ProductListing = await request.json();
        if (!productImage1) {
            return NextResponse.json({ message: "Image 1 required" }, { status: 400 });
          }
    await dbConnect();
    await ProductListing.create({ username, productName, price, productImage1, productImage2, productImage3, productImage4, productDescription,
        productBrand, productSize, category, isDiscounted, discountPrice, productCondition, gender, isSold: false });
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await dbConnect();
    const listing = await ProductListing.findById(id);
    if (!listing) {
        return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }
    return NextResponse.json(listing, { status: 200 });
}

export async function PUT(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updateData: ProductListing = await request.json();
    await dbConnect();
    const listing = await ProductListing.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!listing) {
        return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product Updated" }, { status: 200 });
}

export async function DELETE(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await dbConnect();
    const listing = await ProductListing.findByIdAndDelete(id);
    if (!listing) {
        return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
}
