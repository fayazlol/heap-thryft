import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import ProductListing from '@/models/ProductListing';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
        return new NextResponse(JSON.stringify({ error: 'Query parameter is missing' }), { status: 400 });
    }

    await dbConnect();

    try {
        const searchKeywords = query.split(' ').map(keyword => ({
            $or: [
                { productName: { $regex: keyword, $options: 'i' } },
                { productDescription: { $regex: keyword, $options: 'i' } }
            ]
        }));

        const results = await ProductListing.find({ $and: searchKeywords });

        return new NextResponse(JSON.stringify(results), { status: 200 });
    } catch (error) {
        console.error('Error fetching search results:', error);
        return new NextResponse(JSON.stringify({ error: 'Error fetching search results' }), { status: 500 });
    }
}
