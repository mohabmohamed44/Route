import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bars } from "react-loader-spinner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getProducts() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Loading Component
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div> */}
        <Bars/>
      </div>
    );
  }

  // Error Handling
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <p>Error loading products</p>
          <button
            onClick={getProducts}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Our Products
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group relative"
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link to={`/productDetails/${product._id}/${product.category.name}`} className="block">
              <div className="relative overflow-hidden h-full">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                {product.priceAfterDiscount ? (
                  <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    SALE
                  </span>
                ) : null}
              </div>

              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-800 mb-2 truncate">
                  {product.title.split(" ", 2).join(" ")}
                </h2>

                <h3 className="text-sm text-emerald-500 mb-2">
                  {product.category.name}
                </h3>

                <div className="flex justify-between items-center">
                  <div>
                    {product.priceAfterDiscount ? (
                      <div className="flex items-center">
                        <span className="text-red-500 line-through mr-2 text-sm">
                          {product.price} EGP
                        </span>
                        <span className="text-green-600 font-bold">
                          {product.priceAfterDiscount} EGP
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-800 font-bold">
                        {product.price} EGP
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-yellow-500">
                    <i className="fas fa-star mr-1"></i>
                    <span className="text-gray-700">
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Add to Cart Button */}
            <div
              className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${
                hoveredProduct === product._id
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <button
                className="w-full bg-green-600 text-white py-3 hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                onClick={() => {
                  // Add to cart logic here
                  console.log(`Added ${product.title} to cart`);
                }}
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
