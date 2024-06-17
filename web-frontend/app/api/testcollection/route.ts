import dbConnect from "@/app/lib/dbConnect";
import TestCollection from "@/models/testCollection";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();
    try {
    const testcollections = await TestCollection.find({});
    return NextResponse.json(testcollections);
    } catch (err : any){
       return  NextResponse.json({error: err.message});
    }
}

//this is the api route to return all the objects inside the testcollections collection in our database (just to test out)