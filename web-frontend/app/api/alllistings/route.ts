import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();
    try {
    const alllistings = await ProductListing.find({});
    return NextResponse.json(alllistings);
    } catch (err : any){
       return  NextResponse.json({error: err.message});
    }
}
