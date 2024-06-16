"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  productName: string;
  price: string;
  productImagePath: string;
  productBrand: string;
  productSize: string;
  category: string;
  isDiscounted: boolean;
}

interface CreateListingProps {
  user: {
    username: string;
  };
}

const CreateListing: React.FC<CreateListingProps> = ({ user }) => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    price: "",
    productImagePath: "",
    productBrand: "",
    productSize: "",
    category: "",
    isDiscounted: false,
  });

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/productlisting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, username: user.username }),
    });

    if (response.ok) {
      setFormData({
        productName: "",
        price: "",
        productImagePath: "",
        productBrand: "",
        productSize: "",
        category: "",
        isDiscounted: false,
      });
      router.push('/userprofile');
    }
  };

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <h1 className="text-gray-600 mb-4">Create Listing</h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4  text-black"
              required
            />
            <input
              type="text"
              name="productImagePath"
              value={formData.productImagePath}
              onChange={handleInputChange}
              placeholder="Product Image URL"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            <input
              type="text"
              name="productBrand"
              value={formData.productBrand}
              onChange={handleInputChange}
              placeholder="Brand"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
            />
            <input
              type="text"
              name="productSize"
              value={formData.productSize}
              onChange={handleInputChange}
              placeholder="Size"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            <label className="flex items-center mb-4 text-black">
              <input
                type="checkbox"
                name="isDiscounted"
                checked={formData.isDiscounted}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Discounted
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateListing;