import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Products</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div 
            key={product._id} 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group relative"
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative overflow-hidden">
              <img 
                src={product.imageCover} 
                alt={product.title} 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
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
                  <span className="text-gray-700">{product.ratingsAverage}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div 
              className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${
                hoveredProduct === product._id 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-full opacity-0'
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