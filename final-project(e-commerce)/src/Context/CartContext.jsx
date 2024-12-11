import React, { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsCart, setProductsCart] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const token = localStorage.getItem("token");

  async function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getCart();
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  async function getCart() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token,
          },
        }
      );
      console.log("Cart Response:", res.data);

      const products = res.data.data.products || [];
      setProductsCart(products);
      setTotalPrice(res.data.data.totalCartPrice);

      // Calculate total number of items in the cart
      const totalItems = products.reduce(
        (total, product) => total + product.count,
        0
      );
      setNumOfCartItems(totalItems);

      return true; // Indicate success
    } catch (err) {
      console.error("Error fetching cart:", err);
      return false; // Indicate failure
    }
  }

  async function updateCartQuantity(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Product deleted successfully");
        getCart();
      })
      .catch((err) => {
        toast.error("Failed to delete product");
        console.log(err);
      });
  }

  // Wishlist Functions
  async function addToWishlist(productId) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers: {
            token,
          },
        }
      );
      console.log("Added to Wishlist:", res.data);
      toast.success("Added to Wishlist!");
      getWishlist();
      return true;
    } catch (err) {
      toast.error(err);
      console.error("Error adding to wishlist:", err);
      return false;
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token,
          },
        }
      );
      console.log("Removed from Wishlist:", res.data);
      toast.success("Removed from Wishlist!");
      getWishlist();
      return true;
    } catch (err) {
      toast.error("Failed to remove from Wishlist!");
      console.error("Error removing from wishlist:", err);
      return false;
    }
  }

  async function getWishlist() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token,
          },
        }
      );
      console.log("Wishlist Response:", res.data);
      setWishlistItems(res.data.data || []);
      return true;
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      return false;
    }
  }

  async function getBrandDetail(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res) => res)
    .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCart,
        updateCartQuantity,
        deleteItem,
        numOfCartItems,
        totalPrice,
        productsCart,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        wishlistItems,
        getBrandDetail,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
