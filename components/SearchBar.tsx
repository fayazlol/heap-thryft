"use client";
import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            console.log('Searching for:', searchQuery);
            router.push(`/search?query=${searchQuery}`);
        } else {
            alert('Please enter a search query.');
        }
    };

    return (
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
    );
};

export default SearchBar;
