import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaHeart } from "react-icons/fa";

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

const DesktopNavbar = ({ title, city, state }) => {
  const [language, setLanguage] = useState("English");
  const [openLang, setOpenLang] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = () => {
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const isActive = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <header className="bg-white w-full shadow sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-[1500px] mx-auto">
        <Link to="/" className="text-3xl font-bold text-gray-700">
          {title || "WeDeal"}
        </Link>

        <div className="flex items-center gap-4 flex-1 mx-6">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition">
            {`${city}, ${state}`}
            <FaChevronDown className="ml-2 text-gray-500" />
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Cars, Mobile Phones and more..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaHeart />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition"
            >
              {language} <FaChevronDown className="ml-1 text-gray-500" />
            </div>
            {openLang && (
              <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li onClick={() => setLanguage("English")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">English</li>
                  <li onClick={() => setLanguage("Hindi")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">हिंदी</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="hidden md:flex mx-auto overflow-x-auto gap-6 px-6 py-2 bg-gray-50 border-t border-gray-200">
        {categories.map((cat, idx) => (
          <span key={idx} className="whitespace-nowrap cursor-pointer text-gray-700 hover:text-blue-600 font-medium text-sm transition">
            {cat}
          </span>
        ))}
      </div>
    </header>
  );
};

export default DesktopNavbar;
