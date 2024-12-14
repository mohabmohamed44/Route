import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Bars } from "react-loader-spinner";

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryDetails = async () => {
    const token = localStorage.getItem('token');
    
    try {
      setLoading(true);
      setError(null);

      // Fetch category details and products concurrently
      const [categoryResponse, productsResponse] = await Promise.all([
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
          headers: { token }
        }),
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/products`)
      ]);

      setCategory(categoryResponse.data.data);
      setProducts(productsResponse.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars height={80} width={80} color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <p>Error loading category details: {error}</p>
          <button
            onClick={fetchCategoryDetails}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {category && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{category.name}</h1>
          <img
            src={category.image}
            alt={category.name}
            className="w-full max-h-96 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 truncate">{product.name}</h3>
                <p className="text-green-600 font-bold mt-2">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;