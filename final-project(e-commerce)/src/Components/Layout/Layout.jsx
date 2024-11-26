import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}