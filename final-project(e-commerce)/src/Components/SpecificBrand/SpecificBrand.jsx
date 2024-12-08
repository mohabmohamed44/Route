import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";  // Import the useQuery hook
import { Bars } from "react-loader-spinner";
import axios from "axios";

// Function to fetch brand data
const fetchBrand = async (brandId) => {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
  );
  return data.data; // Adjust according to the response structure
};


// BUG: Fix Specific Brand please 


export default function SpecificBrand() {
  const { brandId } = useParams();
  const [search, setSearch] = useState("");
  
  // Use React Query to fetch data with object syntax
  const { data: brand, error, isLoading } = useQuery({
    queryKey: ["brand", brandId],  // Key to identify this query
    queryFn: () => fetchBrand(brandId),  // Function to fetch the brand data
    enabled: !!brandId,  // Ensure this query only runs when brandId is available
  });

  // Filter products based on search query
  const filtered = brand?.products?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div>
      <h2 className="text-2xl text-center mb-10 mt-12">Specific Brand</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <Bars />
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-center text-red-500">Failed to fetch brand data.</p>}

      {/* Brand Data */}
      {!isLoading && !error && brand && (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold">{brand.name}</h3>
            <img
              src={brand.image}
              alt={brand.name}
              className="w-32 h-32 object-contain mx-auto"
            />
            <p>Brand created on: {new Date(brand.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Search Filter */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="border p-2 rounded w-1/2"
            />
          </div>

          {filtered.length > 0 ? (
            filtered.map((product) => (
              <div key={product._id} className="bg-white p-4 mb-6 rounded shadow-md">
                <h4 className="font-semibold">{product.name}</h4>
                <p>{product.description}</p>
                <p className="font-bold">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center">No products found for this brand.</p>
          )}
        </div>
      )}
    </div>
  );
}
