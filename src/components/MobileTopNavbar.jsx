import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png"; 

const MobileTopNavbar = ({ title, city, state }) => {
  const [query, setQuery] = useState("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState({ city, state });
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // For demonstration, we can just display lat/lon. Ideally, call a geocoding API to get city/state
          setCurrentLocation({ city: `Lat: ${latitude.toFixed(2)}`, state: `Lon: ${longitude.toFixed(2)}` });
          setOverlayOpen(false);
        },
        (err) => {
          alert("Failed to detect location. Please allow location access.");
        }
      );
    }
  };

  const handleLocationSearch = () => {
    if (locationQuery.trim()) {
      setCurrentLocation({ city: locationQuery, state: "" });
      setOverlayOpen(false);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="flex items-center justify-between px-4 py-3">
           <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="WeDeal Logo"
              className="h-10 w-auto object-contain " // adjust size as needed
            />
          </Link>
          <div
            className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
            onClick={() => setOverlayOpen(true)}
          >
            <FaMapMarkerAlt />
            <span>{`${currentLocation.city}, ${currentLocation.state}`}</span>
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

      {/* Overlay Modal */}
      {overlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setOverlayOpen(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Select Location</h2>

            {/* Current Location Button */}
            <button
              onClick={detectCurrentLocation}
              className="w-full mb-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              📍 Detect Current Location
            </button>

            {/* Search Location */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search for another location"
                className="flex-1 border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLocationSearch()}
              />
              <button
                onClick={handleLocationSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileTopNavbar;
