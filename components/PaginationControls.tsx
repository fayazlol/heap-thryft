
"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      {currentPage > 1 && (
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="mx-2 px-4 py-2 bg-black text-white rounded-xl"
        >
          ←
        </button>
      )}
      <span className="mx-2 text-black">{currentPage} of {totalPages}</span>
      {currentPage < totalPages && (
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="mx-2 px-4 py-2 bg-black text-white rounded-xl"
        >
       →
        </button>
      )}
    </div>
  );
};

export default PaginationControls;
