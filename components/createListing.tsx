"use client";
import { UploadButton } from "@/app/lib/uploadthing";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

interface FormData {
  productName: string;
  price: string;
  productImage1: string;
  productImage2: string;
  productImage3: string;
  productImage4: string;
  productBrand: string;
  productSize: string;
  category: string;
  productDescription: string;
  isDiscounted: boolean;
  discountPrice?: string;
  isMeetup: boolean;
  meetupLocation?: string;
  isDelivery: boolean;
  deliveryCost?: string;
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
    productImage1: "",
    productImage2: "",
    productImage3: "",
    productImage4: "",
    productBrand: "",
    productSize: "",
    category: "Outerwear",
    productDescription:"",
    isDiscounted: false,
    isMeetup: false,
    isDelivery: false,
  });

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        productImage1: "",
        productImage2: "",
        productImage3: "",
        productImage4: "",
        productBrand: "",
        productSize: "",
        category: "Outerwear",
        productDescription:"",
        isDiscounted: false,
        isMeetup: false,
        isDelivery: false,
      });
      router.push('/userprofile');
    }
  };

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-white p-6 rounded-lg shadow-md w-[100]">
          <h1 className="text-gray-600 mb-4 text-xl font-semibold">Create Listing</h1>
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
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />

            <div className="grid md:grid-cols-2 auto-rows gap-1 px-4">
            <UploadButton
        endpoint="imageUploader"
        className=" mt-4 ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-500/50"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setFormData({
            ...formData,
            productImage1: res[0].url, // Adjust based on the actual structure of res
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <UploadButton
        endpoint="imageUploader"
        className=" mt-4 ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-500/50"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setFormData({
            ...formData,
            productImage2: res[0].url, // Adjust based on the actual structure of res
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <UploadButton
        endpoint="imageUploader"
        className=" mt-4 ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-500/50"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setFormData({
            ...formData,
            productImage3: res[0].url, // Adjust based on the actual structure of res
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <UploadButton
        endpoint="imageUploader"
        className=" mt-4 ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-500/50"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setFormData({
            ...formData,
            productImage4: res[0].url, // Adjust based on the actual structure of res
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      </div>
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
            <p className="text-left text-black">Category</p>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            >
              <option value="Outerwear">Outerwear</option>
              <option value="Tops">Tops</option>
              <option value="Footwear">Footwear</option>
              <option value="Bags">Bags</option>
              <option value="Accessories">Accessories</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="text"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleInputChange}
              placeholder="Description (REQUIRED IF NOT WONT ADD TO DB)"
              className="flex w-full h-[100px] border border-gray-300 rounded px-3 py-2 mb-4 text-black"
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
            {formData.isDiscounted && (
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice || ""}
                onChange={handleInputChange}
                placeholder="Discount Price"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
                required
              />
            )}
            <label className="flex items-center mb-4 text-black">
              <input
                type="checkbox"
                name="isMeetup"
                checked={formData.isMeetup}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Meetup Available
            </label>
            {formData.isMeetup && (
              <input
                type="text"
                name="meetupLocation"
                value={formData.meetupLocation || ""}
                onChange={handleInputChange}
                placeholder="Meetup Location"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
                required
              />
            )}
            <label className="flex items-center mb-4 text-black">
              <input
                type="checkbox"
                name="isDelivery"
                checked={formData.isDelivery}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Delivery Available
            </label>
            {formData.isDelivery && (
              <input
                type="number"
                name="deliveryCost"
                value={formData.deliveryCost || ""}
                onChange={handleInputChange}
                placeholder="Delivery Cost"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
                required
              />
            )}
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
