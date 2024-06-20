"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { NextUIProvider } from "@nextui-org/system";
import { Input } from "@nextui-org/input";
import { signOut, useSession } from "next-auth/react";
import { LoginButton } from './loginbutton';
import { LogoutButton } from './logoutbutton';
import { SignupButton } from './signupbutton';
import ProfileIcon from "@/components/profileIcon"

const Navbar = () => {
    const { data: session }: any = useSession();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Function to handle search and input into database
        // For example, make a POST request to API with searchQuery
        console.log('Searching for:', searchQuery);
        // Add database input logic here
    };

    return (
        <NextUIProvider>
            <header className="bg-[#FFFFFF]">
                <nav className="flex flex-col items-center w-[90%] mx-auto py-4">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center">
                            <a className="text-3xl font-bold text-black" href='/'>
                                THRYFT
                            </a>
                        </div>
                        <div className="flex flex-grow justify-center items-center gap-6">
                            <form className="relative flex items-center w-[60%]" onSubmit={handleSearch}>
                                <Input
                                    radius='none'
                                    size='sm'
                                    type="search"
                                    placeholder="Search"
                                    className="pl-4 pr-12 py-2 border rounded-md w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="absolute right-0 h-full px-4 text-white bg-gray-700 rounded-md hover:bg-gray-600">
                                    Search
                                </button>
                            </form>
                            <a href="/shopnow" className="px-4 py-2 text-black bg-transparent border border-black rounded-md hover:bg-gray-200 text-base">Shop Now</a>
                            <a href="/userprofile/createlisting" className="px-4 py-2 text-black bg-gradient-to-r from-pink-500 to-blue-500 rounded-md hover:from-pink-600 hover:to-blue-600 text-base">Sell</a>
                        </div>
                        <div className="flex items-center gap-4">
                            {!session && (
                                <>
                                    <LoginButton />
                                    <SignupButton />
                                </>
                            )}
                            {session && (
                                <>
                                    <a className="flex flex-col text-2xl justify-center items-center" href='/userprofile'>
                                        <ProfileIcon/>
                                    </a>
                                    <LogoutButton />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-full mt-4 p-4 bg-white border-t border-gray-300 flex justify-between gap-6 rounded-md">
                        <a href="/featured" className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 text-base flex-grow text-center">Featured</a>
                        <a href="/menswear" className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 text-base flex-grow text-center">Menswear</a>
                        <a href="/womenswear" className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 text-base flex-grow text-center">Womenswear</a>
                    </div>
                </nav>
            </header>
        </NextUIProvider>
    );
};

export default Navbar;