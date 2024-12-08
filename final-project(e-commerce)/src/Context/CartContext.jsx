import React, { createContext, useState } from "react";
import axios from "axios";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsCart, setProductsCart] = useState([]);

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
        getCart(); //BUG::Fix this 
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
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
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
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
