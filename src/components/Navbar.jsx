import React, { useState } from "react";
import {
  FaChevronDown,
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaShoppingBag,
  FaPlus,
  FaHeart,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const categories = [
  "All Categories",
  "Cars",
  "Motorcycles",
  "Mobile Phones",
  "For Sale: Houses & Apartments",
  "Scooters",
  "Commercial & Other Vehicles",
  "For Rent: Houses & Apartments",
];

const Navbar = (
    showBottomNav = true,
    title,
) => {
  const [location, setLocation] = useState("India");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const { pathname } = useLocation(); // ✅ Get current path

  const handleSelect = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  // Helper for active styling
  const isActive = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <>
      <header className="bg-white w-full shadow sticky top-0 z-50">
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 max-w-[1500px] mx-auto">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-gray-700">
            { title || "WeDeal"}
          </Link>

          {/* Search + Location (Desktop) */}
          <div className="hidden md:flex items-center gap-4 flex-1 mx-6">
            {/* Location */}
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition">
              {location} <FaChevronDown className="ml-2 text-gray-500" />
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                aria-label="Search"
                className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Right Side (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              {/* Dropdown button */}
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition"
              >
                {language}
                <FaChevronDown className="ml-1 text-gray-500" />
              </div>

              {/* Dropdown menu */}
              {open && (
                <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <ul className="py-1 text-sm text-gray-700">
                    <li
                      onClick={() => handleSelect("English")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      English
                    </li>
                    <li
                      onClick={() => handleSelect("Hindi")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      हिंदी
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link to={"/wishlist"}>
              <FaHeart className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition" />
            </Link>
            <Link
              to={"/login"}
              className="text-gray-700 text-sm font-medium hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/sell"
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-blue-600 text-white font-semibold rounded-md hover:from-yellow-500 hover:to-blue-700 transition flex items-center gap-1 text-sm"
            >
              + SELL
            </Link>
          </div>

          {/* Mobile Menu Toggle
          <button
            className="md:hidden text-gray-600 text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button> */}


          <div className="flex">
            <div className=" w-auto h-auto bg-amber-300 px-3 rounded-full">cj</div>
            <div className="my-auto ms-2 text-2xl"> <h1>user</h1></div>
          </div>
        </div>

        {/* Categories (Desktop only) */}
        <div className="hidden md:flex mx-auto overflow-x-auto gap-6 px-6 py-2 bg-gray-50 border-t border-gray-200">
          {categories.map((cat, idx) => (
          <div className="mx-auto">
              <span
              key={idx}
              className="whitespace-nowrap cursor-pointer text-gray-700 hover:text-blue-600 font-medium text-sm transition"
            >
              {cat}
            </span>
          </div>
          ))}
        </div>
      </header>

      {/* ✅ Mobile Bottom Nav with Active Highlight */}
     {showBottomNav && (
         <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-500 shadow-inner z-50">
        <div className="flex justify-around items-center py-2">
          <Link
            to="/"
            className={`flex flex-col items-center text-sm ${isActive("/")}`}
          >
            <FaHome className="text-xl" />
            <span>Home</span>
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center text-sm ${isActive(
              "/orders"
            )}`}
          >
            <FaShoppingBag className="text-xl" />
            <span>Orders</span>
          </Link>

          <Link
            to="/sell"
            className="flex flex-col items-center text-white bg-blue-600 p-3 rounded-full -mt-6 shadow-lg hover:bg-blue-700 transition"
          >
            GO
          </Link>

          <Link
            to="/wishlist"
            className={`flex flex-col items-center text-sm ${isActive(
              "/wishlist"
            )}`}
          >
            <FaHeart className="text-xl" />
            <span>Wishlist</span>
          </Link>

          <Link
            to="/account"
            className={`flex flex-col items-center text-sm ${isActive(
              "/account"
            )}`}
          >
            <FaUser className="text-xl" />
            <span>Account</span>
          </Link>
        </div>
      </nav>
     )}
    </>
  );
};

export default Navbar;
