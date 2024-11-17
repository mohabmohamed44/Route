import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [padding, setPadding] = useState("py-4");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setPadding("py-2");
    } else {
      setPadding("py-4");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  return (
    <nav
      className={`bg-secColor fixed right-0 left-0 top-0 px-4 ${padding} duration-300 z-10`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto gap-1">
        <Link to="/" className="text-white text-3xl font-bold uppercase py-5">
          Start Framework
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden focus:outline-none  duration-300 a"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-bold flex flex-col p-4 gap-6 md:gap-0 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            <li>
              <NavLink
                to="/About"
                className="p-3 rounded dark:text-white uppercase"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Portfolio"
                className="p-3 rounded dark:text-white uppercase"
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                className="p-3 rounded dark:text-white uppercase"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
