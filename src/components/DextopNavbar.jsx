import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaCommentDots, FaHeart } from "react-icons/fa";

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

const DesktopNavbar = ({ title, city, state, onLocationClick }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null); // user state
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // {name, avatarUrl}
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSearch = () => {
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user session
    navigate("/login");
    window.location.reload(); // optional: reload to update navbar
  };

  const handleCategoryClick = (cat) => {
    if (cat === "All Categories") {
      navigate("/search?query=");
    } else {
      navigate(`/search?query=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <header className="bg-white w-full shadow sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-[1500px] mx-auto">
        <Link to="/" className="text-3xl font-bold text-gray-700">
          {title || "WeDeal"}
        </Link>

        <div className="flex items-center gap-4 flex-1 mx-6">
          {/* Location */}
          <div
            onClick={onLocationClick}
            className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition"
          >
            {`${city}, ${state}`}
            <FaChevronDown className="ml-2 text-gray-500" />
          </div>

          {/* Search Bar */}
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

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link to={"/chat"}>
            <FaCommentDots className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition" />
          </Link>
          <Link to="/wishlist">
            <FaHeart className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition" />
          </Link>

          {user ? (
            // If user is logged in, show avatar and name
            <div className="relative">
              {/* Avatar and Name */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-listings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/help"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    Help
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // If not logged in, show login button
            <Link
              to="/login"
              className="text-gray-700 text-sm font-medium hover:text-blue-600 transition"
            >
              Login
            </Link>
          )}

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
            onClick={() => handleCategoryClick(cat)}
            className="whitespace-nowrap cursor-pointer text-gray-700 hover:text-blue-600 font-medium text-sm transition"
          >
            {cat}
          </span>
        ))}
      </div>
    </header>
  );
};

export default DesktopNavbar;
