import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";

export default function Brands() {
  const [brands, setBrands] = useState([]); // State to store brands data
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Function to fetch data
  const fetchBrands = async () => {
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(response.data.data); // Set the fetched brands
      setIsLoading(false); // Set loading to false
    } catch (err) {
      setError(err.message); // Set error message
      setIsLoading(false); // Set loading to false
    }
  };

  // Fetch brands when the component mounts
  useEffect(() => {
    fetchBrands();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div> */}
        <Bars/>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-white">
      <h2 className="text-3xl text-center mt-12 mb-10">Brands</h2>
      <div className="text-center">
        <div className="max-w-full flex items-center justify-center flex-wrap py-5">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="w-[23%] max-lg:w-[29%] max-md:w-[45%] max-sm:w-[100%] grid place-items-center product m-2 p-2 rounded border border-[#f0f3f2] shadow-md cursor-pointer"
            >
              <img src={brand.image} alt={brand.name} className="max-w-full h-auto" />
              <span className="title">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
