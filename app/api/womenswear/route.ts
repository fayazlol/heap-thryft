import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing";
import { FlattenMaps } from "mongoose";
import { useEffect } from "react";

export default async function handler(req: { method: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; data?: (FlattenMaps<any> & Required<{ _id: unknown; }>)[]; message?: any; }): void; new(): any; }; }; }) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const listings = await ProductListing.find({ gender: { $in: ["Womenswear", "Unisex"] } }).lean();
                res.status(200).json({ success: true, data: listings });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}


useEffect(() => {
    const fetchListings = async () => {
        try {
            const response = await fetch('/api/listings/womenswear');
            const data = await response.json();
            console.log(data); // Log the response data
            if (data.success) {
                setListings(data.data);
                setListingsCount(data.data.length);
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    fetchListings();
}, []);

function setListingsCount(length: any) {
    throw new Error("Function not implemented.");
}

