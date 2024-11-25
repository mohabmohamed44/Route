import React, { useState, useEffect } from "react";
import Style from "./ProductDetails.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fix 1: Call useParams() correctly
  const { id } = useParams();

  function getSpecificProduct(productId) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => {
        console.log(res.data.data);
        setProductDetails(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    // Fix 2: Pass id to the function
    if (id) {
      getSpecificProduct(id);
    }
  }, [id]);

  // Add loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading product details. Please try again later.
      </div>
    );
  }

  if (!productDetails) {
    return <div className="text-center mt-10">No product details found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={productDetails.imageCover}
            alt={productDetails.title}
            className="max-w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4 flex items-center justify-center flex-col text-start w-full">
          <h1 className="text-3xl font-bold text-gray-800 w-full text-start">
            {productDetails.title}
          </h1>

          <p className="text-gray-600 text-md w-full text-start">
            {productDetails.description}
          </p>

          <div className="flex items-center justify-between w-full">
            <div>
              <span className="text-2xl font-bold text-green-600">
                {productDetails.priceAfterDiscount || productDetails.price} EGP
              </span>
              {productDetails.priceAfterDiscount && (
                <span className="text-red-500 line-through ml-2">
                  {productDetails.price} EGP
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-yellow-500">
              <i className="fas fa-star"></i>
              <span className="text-gray-700">
                {productDetails.ratingsAverage} (
                {productDetails.ratingsQuantity} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-xl font-semibold">Category</h2>
              <p className="text-emerald-500">{productDetails.category.name}</p>
            </div>
          </div>

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 mt-6"
            onClick={() => {
              // Add to cart logic
              console.log(`Added ${productDetails.title} to cart`);
            }}
          >
            <i className="fas fa-shopping-cart mr-2"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
