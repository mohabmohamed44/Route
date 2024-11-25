import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";

export default function NavBar() {
  const { setToken, token } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const redirect = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    redirect("/login");
  }

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide the navbar when scrolling down
      } else {
        setIsVisible(true); // Show the navbar when scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-gray-200 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        {/* Logo */}
        <div className="flex items-center gap-5">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="FreshCart Logo" />
          </NavLink>
          {/* Desktop Navigation */}
          {token && (
            <ul className="hidden md:flex gap-5 text-gray-700 font-medium">
              <li>
                <NavLink to="/" className="hover:text-gray-900">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:text-gray-900">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="hover:text-gray-900">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/brands" className="hover:text-gray-900">
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className="hover:text-gray-900">
                  Categories
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Desktop Social Icons and Auth Links */}
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <ul className="flex gap-5">
            <li>
              <i className="fab fa-facebook-f cursor-pointer hover:text-gray-900 transition-colors"></i>
            </li>
            <li>
              <i className="fab fa-twitter cursor-pointer hover:text-gray-900 transition-colors"></i>
            </li>
            <li>
              <i className="fab fa-linkedin cursor-pointer hover:text-gray-900 transition-colors"></i>
            </li>
            <li>
              <i className="fab fa-tiktok cursor-pointer hover:text-gray-900 transition-colors"></i>
            </li>
          </ul>
          {token ? (
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-gray-900"
        >
          <i className={`fas fa-${isMenuOpen ? "times" : "bars"} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col px-4 py-2 bg-gray-200">
          <li className="py-2">
            <NavLink to="/" className="block text-gray-700 hover:text-gray-900">
              Home
            </NavLink>
          </li>
          {token && (
            <>
              <li className="py-2">
                <NavLink
                  to="/cart"
                  className="block text-gray-700 hover:text-gray-900"
                >
                  Cart
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  to="/products"
                  className="block text-gray-700 hover:text-gray-900"
                >
                  Products
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  to="/brands"
                  className="block text-gray-700 hover:text-gray-900"
                >
                  Brands
                </NavLink>
              </li>
              <li className="py-2">
                <button
                  className="block text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!token && (
            <>
              <li className="py-2">
                <NavLink
                  to="/login"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Login
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  to="/register"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
