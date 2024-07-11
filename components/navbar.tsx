"use client";
import React, { useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { LoginButton } from './loginbutton';
import { SignupButton } from './signupbutton';
import NavbarCart from "@/components/NavbarCart";
import HeartIconOutline from "@/components/NavHeartIconOutline";
import HeartIconSolid from "@/components/NavHeartSolid";
import dynamic from 'next/dynamic';
import NavPfp from '@/components/NavPfp';
import { Image, Link} from "@nextui-org/react";

const SearchBar = dynamic(() => import('@/components/SearchBar'), { ssr: false });

const Navbar = () => {
    const { data: session }: any = useSession();
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleHeartClick = () => {
        router.push('/userprofile/favourites');
    };

    const handleLogout = async () => {
        signOut();
    };

    return (
        <NextUIProvider>
            <style jsx global>{`
                @keyframes gradientBackground {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                .animated-gradient {
                    background:  linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5);
                    background-size: 400% 400%;
                    animation: gradientBackground 8s ease infinite;
                }
            `}</style>
            <header className="bg-white">
                <nav className="flex flex-col items-center w-[90%] mx-auto py-4">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center">
                        <Link href="/">
                        <Image
                            width={120}
                            alt="thryftlogo"
                            src="/thryftlogo.png"
                            isBlurred
                             />
                             </Link>
                        </div>
                        <div className="flex flex-grow justify-center items-center gap-6">
                            <SearchBar />
                            <a href="/shopnow" className="px-4 py-2 text-black bg-transparent border border-black rounded-md hover:bg-gray-200 text-base">Shop Now</a>
                            <a href="/userprofile/createlisting" className=" px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-md hover:from-pink-600 hover:to-blue-600 text-base animated-gradient">Sell</a>
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
                                    <div 
                                        className="flex flex-col text-2xl justify-center items-center cursor-pointer" 
                                        onClick={handleHeartClick}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}>
                                        {isHovered ? <HeartIconSolid className="heart-icon" /> : <HeartIconOutline className="heart-icon" />}
                                    </div>
                                    <a className="flex flex-col text-2xl justify-center items-center" href='/cart'>
                                        <NavbarCart />
                                    </a>
                                            <NavPfp/>
                                       
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-full mt-4 p-4 bg-white border-t border-gray-300 flex justify-between gap-6 rounded-md">
                        <a href="/onsale" className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 text-base flex-grow text-center">On Sale</a>
                        <a href="/menswear" className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 text-base flex-grow text-center">Menswear</a>
                        <a href="/womenswear" className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-200 text-base flex-grow text-center">Womenswear</a>
                    </div>
                </nav>
            </header>
        </NextUIProvider>
    );
};

export default Navbar;
