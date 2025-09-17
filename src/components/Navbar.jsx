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

const Navbar = ({
  showBottomNav = true,
  title,
  showTopBar = true,
  showMobileMenu = true,
  city = "Indore",
  state = "Madhya Pradesh",
}) => {
  const [language, setLanguage] = useState("English");
  const [openLang, setOpenLang] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");

  const [showLocationPage, setShowLocationPage] = useState(false);
  const [location, setLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const savedLocation = localStorage.getItem("userLocation");

  const handleSelect = (lang) => {
    setLanguage(lang);
    setOpenLang(false);
  };

  const isActive = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const detected = `Lat: ${latitude}, Lng: ${longitude}`;
          setCurrentLocation(detected);
          alert("Location detected! (demo only)");
        },
        () => alert("Failed to detect location. Please allow location access.")
      );
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Use OpenStreetMap Nominatim API for reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();

        if (data.address) {
          const city = data.address.city || data.address.town || data.address.village;
          const state = data.address.state;
          setLocation(`${city}, ${state}`);
        } else {
          setLocation("Location not found");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const handleSearch = () => {
    if (query.trim()) {
      // Navigate to the search page with the query as a URL parameter
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };
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
              <div
                onClick={() => setShowLocationPage(true)}
                className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition"
              >
                {savedLocation || `${city}, ${state}`}
                <FaChevronDown className="ml-2 text-gray-500" />
              </div>

              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Find Cars, Mobile Phones and more..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  aria-label="Search"
                  onClick={handleSearch}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Language Dropdown */}
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
        <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50">
         
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="text-2xl font-bold text-blue-500">
              {title || "WeDeal"}
            </Link>

            {/* Location on mobile */}
            <div
              onClick={() => setShowLocationPage(true)}
              className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
            >
              <FaMapMarkerAlt />
              <span>{savedLocation || `${city}, ${state}`}</span>
            </div>
          </div>
          

          {/* Search */}
          <div className="px-4 py-2 pb-3">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-inner">
              <FaSearch className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search items..."
                className="bg-transparent outline-none w-full text-sm"
                value={query} // bind state
                onChange={(e) => setQuery(e.target.value)} // update state
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(); // allow Enter key
                }}
              />
              <button onClick={handleSearch} className="ml-2 text-blue-600">
                Search
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Mobile Bottom Navbar */}
      {showBottomNav && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-inner z-50">
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
              <span>User</span>
            </Link>
          </div>
        </nav>
      )}

      {/* ✅ Fullscreen Location Selector Overlay */}
      {showLocationPage && (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col">
          {/* Topbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b shadow-sm">
            <button onClick={() => setShowLocationPage(false)}>
              <ArrowLeft className="text-xl text-gray-700" />
            </button>
            <h2 className="text-lg font-semibold">Choose Location</h2>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="flex items-center border rounded-full px-3 py-2 shadow-sm">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search city, area..."
                className="flex-1 outline-none text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Detect Location */}
          <div className="p-4">
            <button
              onClick={getLocation}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FaMapMarkerAlt />
              Detect My Current Location
            </button>
          </div>

          {currentLocation && (
            <div className="px-4 py-2 text-gray-700 text-sm">
              {location && <p className="mt-4">📍 {location}</p>}
            </div>
          )}

          {/* Save Button */}
          <div className="p-4">
            {location && <p className="mt-4"> {location}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;


// import React, { useState } from "react";
// import DesktopNavbar from "./DesktopNavbar";
// import MobileTopNavbar from "./MobileTopNavbar";
// import MobileBottomNav from "./MobileBottomNav";
// import LocationSelector from "./LocationSelector";

// const Navbar = ({ title, city = "Indore", state = "Madhya Pradesh" }) => {
//   const [showLocationPage, setShowLocationPage] = useState(false);
//   const [location, setLocation] = useState("");
//   const [currentLocation, setCurrentLocation] = useState("");

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//         );
//         const data = await response.json();
//         const city = data.address.city || data.address.town || data.address.village;
//         const state = data.address.state;
//         setLocation(`${city}, ${state}`);
//         setCurrentLocation(`${city}, ${state}`);
//       });
//     }
//   };

//   return (
//     <>
//       <DesktopNavbar title={title} city={city} state={state} />
//       <MobileTopNavbar title={title} city={city} state={state} />
//       <MobileBottomNav />
//       {showLocationPage && (
//         <LocationSelector
//           location={location}
//           setLocation={setLocation}
//           setShowLocationPage={setShowLocationPage}
//           getLocation={getLocation}
//           currentLocation={currentLocation}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;
