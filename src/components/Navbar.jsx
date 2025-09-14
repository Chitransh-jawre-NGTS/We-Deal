import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import {
  FaChevronDown,
  FaSearch,
  FaHeart,
  FaUser,
  FaComments,
  FaStore,
  FaHome,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

const Navbar = ({ showBottomNav = true, title, showTopBar = true, showMobileMenu= true, city = "Indore", state = "Madhya Pradesh"  }) => {
  const [location, setLocation] = useState("India");
  const [language, setLanguage] = useState("English");
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleSelect = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  const isActive = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <>
      {/* Desktop Navbar */}
      {showTopBar && (
        <header className="bg-white w-full shadow sticky top-0 z-50">
          <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-[1500px] mx-auto">
            <Link to="/" className="text-3xl font-bold text-gray-700">
              {title || "WeDeal"}
            </Link>

            {/* Search + Location */}
            <div className="flex items-center gap-4 flex-1 mx-6">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition">
                {location} <FaChevronDown className="ml-2 text-gray-500" />
              </div>

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

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition"
                >
                  {language} <FaChevronDown className="ml-1 text-gray-500" />
                </div>
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

              <Link to="/wishlist">
                <FaHeart className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition" />
              </Link>

              <Link
                to="/login"
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
          </div>

          {/* Categories */}
          <div className="hidden md:flex mx-auto overflow-x-auto gap-6 px-6 py-2 bg-gray-50 border-t border-gray-200">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="whitespace-nowrap cursor-pointer text-gray-700 hover:text-blue-600 font-medium text-sm transition"
              >
                {cat}
              </span>
            ))}
          </div>
        </header>
      )}

      {/* Mobile Top Navbar */}
      {showMobileMenu && (
        <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-4 py-3">
      
      {/* Left: Back Arrow + Logo */}
      <div className="flex items-center gap-2">
        {/* <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button> */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          {title || "WeDeal"}
        </Link>
      </div>

      {/* Right: Location */}
      <div className="flex items-center gap-1 text-sm text-gray-700">
        <FaMapMarkerAlt className="" />
        <span>{city}, {state}</span>
      </div>
    </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden fixed top-12 left-0 w-full bg-white shadow-lg z-40 border-t border-gray-200">
          <ul className="flex flex-col py-2">
            <li className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">
              <Link to="/chat">Chat</Link>
            </li>
            <li className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">
              <Link to="/store">Store</Link>
            </li>
            <li className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Navbar */}
      {showBottomNav && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-500 shadow-inner z-50">
          <div className="flex justify-around items-center py-2">
            <Link to="/" className={`flex flex-col items-center text-sm ${isActive("/")}`}>
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>

            <Link to="/chat" className={`flex flex-col items-center text-sm ${isActive("/chat")}`}>
              <FaComments className="text-xl" />
              <span>Chat</span>
            </Link>

            <Link
              to="/sell"
              className="flex flex-col items-center text-white bg-blue-600 p-3 rounded-full -mt-6 shadow-lg hover:bg-blue-700 transition"
            >
              <FaPlus className="text-2xl" />
            </Link>

            <Link to="/store" className={`flex flex-col items-center text-sm ${isActive("/store")}`}>
              <FaStore className="text-xl" />
              <span>Store</span>
            </Link>

            <Link to="/account" className={`flex flex-col items-center text-sm ${isActive("/account")}`}>
              <FaUser className="text-xl" />
              <span className=" pe-1">User </span>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
