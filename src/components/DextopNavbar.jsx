import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaCommentDots, FaHeart, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout,setUser } from "../redux/slices/authSlice";

import { userApi } from "../api/auth";
import { setLocation, detectCurrentLocation, searchLocation } from "../redux/slices/locationSlice"; 
import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png"; 
import { HelpCircle, LogOut, Package, User } from "lucide-react";

const categories = [
  "All Categories",
  "Cars",
  "Motorcycles",
  "Mobile",
  "For Sale: Houses & Apartments",
  "Scooters",
  "Commercial & Other Vehicles",
  "For Rent: Houses & Apartments",
];

const DesktopNavbar = () => {
  const [open, setOpen] = useState(false);
  const hideTimeoutRef = useRef(null); // ✅ store hide timeout
  const [query, setQuery] = useState("");
  const [locOpen, setLocOpen] = useState(false);
  const [manualInput, setManualInput] = useState(""); 
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { selected } = useSelector((state) => state.location);

  const locationValue =
    selected?.city && selected?.state
      ? `${selected.city}, ${selected.state}`
      : "Select Location";

  const searchPlaceholders = ["Cars", "Mobiles", "Bikes", "Furniture"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await userApi.getProfile();
        dispatch(setUser(res.data));
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchUserProfile();
  }, [pathname, dispatch]);

  const handleSearch = () => {
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleCategoryClick = (cat) => {
    if (cat === "All Categories") navigate("/search?query=");
    else navigate(`/search?query=${encodeURIComponent(cat)}`);
  };

  // ✅ New mouse handlers
  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300); // 1 second delay
  };

  return (
    <header className="bg-white w-full shadow sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-[1500px] mx-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="WeDeal Logo" className="h-10 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-4 flex-1 mx-6 relative">
          {/* Location dropdown */}
          <div className="relative" onClick={() => setLocOpen(!locOpen)}>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              {locationValue}
              <FaChevronDown className="ml-2 text-gray-500" />
            </div>
            {locOpen && (
              <div className="absolute top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
                <p className="text-sm text-gray-600 mb-2">Current Location:</p>
                <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700 text-sm mb-3">
                  {locationValue}
                </div>
                <button
                  onClick={() => dispatch(detectCurrentLocation())}
                  className="w-full mb-3 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                >
                  📍 Use Current Location
                </button>
                <input
                  type="text"
                  placeholder="Search another location..."
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => dispatch(searchLocation(manualInput))}
                  className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                >
                  🔎 Set Location
                </button>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Find ${searchPlaceholders[placeholderIndex]} and more...`}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaSearch size={22} />
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
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={user?.avatar || "/default-avatar.png"}
                  alt={user?.name || "User"}
                  className="w-9 h-9 rounded-full object-cover border-2 border-gray-300 shadow-sm hover:scale-105 transition-transform"
                />
                <span className="text-gray-700 font-medium hover:text-blue-600 transition">
                  {user?.name || "User"}
                </span>
              </div>

              <div
                className={`absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg transform transition-all duration-200 origin-top-right z-50 ${
                  open
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition border-b"
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/my-listings"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition border-b"
                >
                  <Package size={18} />
                  <span>My Listings</span>
                </Link>

                <Link
                  to="/help"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition border-b"
                >
                  <HelpCircle size={18} />
                  <span>Help</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
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
