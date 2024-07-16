"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { UploadButton } from "@/app/lib/uploadthing";
import { Divider, Image } from "@nextui-org/react";

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
  productCondition: string;
  gender: 'Menswear' | 'Womenswear' | 'Unisex';
}
interface Params {
  id: string;
}

interface EditListingProps {
  params: Params;
}

const EditListing: React.FC<EditListingProps>  = ({ params }) => {
  const router = useRouter();
  const { id } = useParams();

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
    productDescription: "",
    isDiscounted: false,
    discountPrice: "",
    productCondition: "Brand New",
    gender: 'Menswear', 
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    formData.productImage1,
    formData.productImage2,
    formData.productImage3,
    formData.productImage4
  ].filter(image => image); 

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };


  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      const response = await fetch(`/api/productlisting?id=${id}`);
      const listing = await response.json();
      setFormData({
        productName: listing.productName,
        price: listing.price,
        productImage1: listing.productImage1,
        productImage2: listing.productImage2,
        productImage3: listing.productImage3,
        productImage4: listing.productImage4,
        productBrand: listing.productBrand,
        productSize: listing.productSize,
        category: listing.category,
        productDescription: listing.productDescription,
        isDiscounted: listing.isDiscounted,
        discountPrice: listing.discountPrice,
        productCondition: listing.productCondition,
        gender: listing.gender,
      });
    };

    fetchListing();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "price" || name === "discountPrice") {
      const regex = /^\d+(\.\d{0,2})?$/;
      if (!regex.test(value)) {
        return; 
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const validateForm = () => {
    if (formData.isDiscounted && formData.discountPrice) {
      const price = parseFloat(formData.price);
      const discountPrice = parseFloat(formData.discountPrice);

      if (discountPrice >= price) {
        setErrorMessage("Discount price must be smaller than the original price.");
        return false;
      }
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/productlisting?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/userprofile/mylistings");
    }
  };

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-100 text-center">
          <h1 className="text-black mb-4 text-4xl font-semibold">Edit Listing</h1>
          <Divider/>
          <div className="flex-1 relative">
  <div className="flex justify-between items-center">
    <button
      className="bg-[#2563eb] text-white p-2 rounded-xl z-20"
      onClick={handlePreviousImage}
    >
      {"←"}
    </button>
    <div className="relative w-400 h-400">
      <Image
        src={images[currentImageIndex]}
        alt={formData.productName}
        className="object-cover shadow-lg"
      />
    </div>
    <button
      className="bg-[#2563eb] text-white p-2 rounded-xl z-20"
      onClick={handleNextImage}
    >
      {"→"}
    </button>
  </div>
</div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid md:grid-cols-2 auto-rows gap-0.5 px-4 py-2">
              <div>
                <h3 className="text-m font-semibold text-gray-600">Image 1 (Required)</h3>
                <UploadButton
                  endpoint="imageUploader"
                  className=" mt-1 ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-500/50"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setFormData({
                      ...formData,
                      productImage1: res[0].url, 
                    });
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
              <div>
                <h3 className="text-m font-semibold text-gray-600">Image 2</h3>
          
                <UploadButton
                  endpoint="imageUploader"
                  className=" mt-1 ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-500/50"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setFormData({
                      ...formData,
                      productImage2: res[0].url, 
                    });
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
              <div>
                <h3 className="text-m font-semibold text-gray-600">Image 3</h3>
                
                <UploadButton
                  endpoint="imageUploader"
                  className=" mt-1 ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-500/50"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setFormData({
                      ...formData,
                      productImage3: res[0].url, 
                    });
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
              <div>
                <h3 className="text-m font-semibold text-gray-600">Image 4</h3>
                
                <UploadButton
                  endpoint="imageUploader"
                  className=" mt-1 ut-button:bg-blue-500 ut-button:ut-readying:bg-blue-500/50"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setFormData({
                      ...formData,
                      productImage4: res[0].url, 
                    });
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            </div>
            <p className="text-left text-black">Product Name</p>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            <p className="text-left text-black">Price</p>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            <p className="text-left text-black">Brand</p>
            <input
              type="text"
              name="productBrand"
              value={formData.productBrand}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            <p className="text-left text-black">Size</p>
            <input
              type="text"
              name="productSize"
              value={formData.productSize}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            <p className="text-left text-black">Product Condition</p>
            <select
              name="productCondition"
              value={formData.productCondition}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            >
              <option value="Brand New">Brand New</option>
              <option value="Like New">Like new</option>
              <option value="Lightly Used">Lightly Used</option>
              <option value="Well Used">Well Used</option>
              <option value="Heavily Used">Heavily Used</option>
            </select>
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
            <p className="text-left text-black">Description</p>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleInputChange}
              placeholder="500 Character Limit"
              maxLength={500}
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
            {formData.isDiscounted && (
              <div>
              <p className="text-left text-black">Discount Price</p>

              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                placeholder="Discount Price"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
                required
              />
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
                          <p className="text-left text-black">Sub-Category</p>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            >
              <option value="Menswear">Menswear</option>
              <option value="Womenswear">Womenswear</option>
              <option value="Unisex">Unisex</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
            >
              Post Listing!
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditListing;
