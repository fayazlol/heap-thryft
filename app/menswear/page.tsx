"use client";

import React, { useState, useEffect } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { useSession } from "next-auth/react";

const Menswear = () => {
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState('');
    const [listingsCount, setListingsCount] = useState(0);
    const [openCategory, setOpenCategory] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);
    const [openCondition, setOpenCondition] = useState(false);

    useEffect(() => {
        // Fetch the number of listings from the API
        const fetchListingsCount = async () => {
            try {
                const response = await fetch('/api/listings/count');
                const data = await response.json();
                setListingsCount(data.count);
            } catch (error) {
                console.error('Error fetching listings count:', error);
            }
        };

        fetchListingsCount();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // Add database input logic here
    };

    return (
        <NextUIProvider>
            <div className="flex bg-white text-black">
                <aside className="w-1/4 p-4 border-r border-gray-300 overflow-auto h-screen">
                    <div className="mb-4">
                        <strong>{listingsCount.toLocaleString()} listings</strong>
                    </div>
                    <hr className="border-gray-300 my-4" />
                    <div className="mb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenCategory(!openCategory)}>
                            <strong>Category</strong>
                            <button>{openCategory ? '▲' : '▼'}</button>
                        </div>
                        {openCategory && (
                            <div className="mt-2">
                                <div>
                                    <label className="text-black">
                                        <input type="checkbox" />
                                        Tops
                                    </label>
                                </div>
                                <div>
                                    <label className="text-black">
                                        <input type="checkbox" />
                                        Bottoms
                                    </label>
                                </div>
                                <div>
                                    <label className="text-black">
                                        <input type="checkbox" />
                                        Outerwear
                                    </label>
                                </div>
                                <div>
                                    <label className="text-black">
                                        <input type="checkbox" />
                                        Dresses
                                    </label>
                                </div>
                                <div>
                                    <label className="text-black">
                                        <input type="checkbox" />
                                        Footwear
                                    </label>
                                </div>
                                <div>
                                    <label className="text-black">
                                        <input type="checkbox" />
                                        Accessories
                                    </label>
                                </div>
                                <div>
                                    <label className="text-black">
                                        <input type="checkbox" />
                                        Bags & luggage
                                    </label>
                                </div>
                                <div>
                                    <label className="text-black">
                                        <input type="checkbox" />
                                        Jewelry
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                    <hr className="border-gray-300 my-4" />
                    <div className="mb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenPrice(!openPrice)}>
                            <strong>Price</strong>
                            <button>{openPrice ? '▲' : '▼'}</button>
                        </div>
                        {openPrice && (
                            <div className="mt-2 text-black">
                                <div className="flex gap-2">
                                    <Input type="text" placeholder="Min" className="w-1/2 mb-2 text-black" />
                                    <Input type="text" placeholder="Max" className="w-1/2 mb-2 text-black" />
                                </div>
                            </div>
                        )}
                    </div>
                    <hr className="border-gray-300 my-4" />
                    <div className="mb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenCondition(!openCondition)}>
                            <strong>Condition</strong>
                            <button>{openCondition ? '▲' : '▼'}</button>
                        </div>
                        {openCondition && (
                            <div className="mt-2 text-black">
                                <ul className="pl-4 text-black">
                                    <li><label className="text-black"><input type="checkbox" /> New/Never Worn</label></li>
                                    <li><label className="text-black"><input type="checkbox" /> Gently Used</label></li>
                                    <li><label className="text-black"><input type="checkbox" /> Used</label></li>
                                    <li><label className="text-black"><input type="checkbox" /> Very Worn</label></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </aside>
                {/* Main Content Section */}
                <main className="w-3/4 p-4 text-black">
                    <h1 className="text-2xl font-bold mb-4">Menswear</h1>
                    {/* Add your product listings here */}
                </main>
            </div>
        </NextUIProvider>
    );
};

export default Menswear;
