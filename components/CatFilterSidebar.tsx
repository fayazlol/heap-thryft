"use client";
import React, { FC } from 'react';
import { Input } from "@nextui-org/react";

interface CatFilterSidebarProps {
    onFilter: (filters: any) => void;
}

const CatFilterSidebar: FC<CatFilterSidebarProps> = ({ onFilter }) => {
    const handleFilter = () => {
        const selectedConditions: string[] = [];

        const checkboxes = document.querySelectorAll("input[type=checkbox]:checked") as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
            if (checkbox.dataset.type === "condition") {
                selectedConditions.push(checkbox.value);
            }
        });

        const minPrice = (document.getElementById("min-price") as HTMLInputElement).value;
        const maxPrice = (document.getElementById("max-price") as HTMLInputElement).value;

        onFilter({
            conditions: selectedConditions,
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
        });
    };

    return (
        <aside className="w-1/4 p-4 border-r border-gray-300 overflow-auto h-screen">
            <hr className="border-gray-300 my-4" />
            <div className="mb-4">
                <div className="flex justify-between items-center cursor-pointer">
                    <strong>Price</strong>
                </div>
                <div className="mt-2 text-black">
                    <div className="flex gap-2">
                        <Input type="text" id="min-price" placeholder="Min" className="w-1/2 mb-2 text-black" />
                        <Input type="text" id="max-price" placeholder="Max" className="w-1/2 mb-2 text-black" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="mb-4">
                <div className="flex justify-between items-center cursor-pointer">
                    <strong>Condition</strong>
                </div>
                <div className="mt-2 text-black">
                    {["Brand New", "Like New", "Lightly Used", "Well Used", "Heavily Used"].map((condition) => (
                        <div key={condition}>
                            <label className="text-black">
                                <input type="checkbox" value={condition} data-type="condition" />
                                {condition}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleFilter} className="mt-4 px-4 py-2 bg-black text-white rounded">
                Search
            </button>
        </aside>
    );
};

export default CatFilterSidebar;
