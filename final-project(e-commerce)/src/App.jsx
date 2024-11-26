import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import Register from "./Components/Register/Register";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import "./App.css";
// TODO: create Guards in the oject
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute>},
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /> </ProtectedRoute>},
      { path: "productDetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <ProtectedRoute><Cart /> </ProtectedRoute> },
      {path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute>},
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
