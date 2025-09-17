import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const MobileTopNavbar = ({ title, city, state }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-blue-500">{title || "WeDeal"}</Link>
        <div className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer">
          <FaMapMarkerAlt />
          <span>{`${city}, ${state}`}</span>
        </div>
      </div>

      <div className="px-4 py-2 pb-3">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-inner">
          <FaSearch className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search items..."
            className="bg-transparent outline-none w-full text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="ml-2 text-blue-600">Search</button>
        </div>
      </div>
    </div>
  );
};

export default MobileTopNavbar;
