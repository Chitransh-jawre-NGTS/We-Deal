// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaChevronDown, FaCommentDots, FaHeart, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
// import { userApi } from "../api/auth"; 
// import { getCurrentCoords } from "../api/location"; // ✅ your geolocation util
// import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png"; 

// const categories = [
//   "All Categories",
//   "Cars",
//   "Motorcycles",
//   "Mobile",
//   "For Sale: Houses & Apartments",
//   "Scooters",
//   "Commercial & Other Vehicles",
//   "For Rent: Houses & Apartments",
// ];

// const DesktopNavbar = ({ title, city, state, onLocationClick }) => {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [user, setUser] = useState(null);
//   const [locOpen, setLocOpen] = useState(false);
//   const [locationValue, setLocationValue] = useState(`${city}, ${state}`);
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const searchPlaceholders = ["Cars", "Mobiles", "Bikes", "Furniture"];
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   // Load user profile
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const res = await userApi.getProfile();
//         setUser(res.data);
//         localStorage.setItem("user", JSON.stringify(res.data));
//       } catch (err) {
//         console.error("❌ Failed to load profile:", err);
//       }
//     };
//     fetchUser();
//   }, [pathname]);

//   const handleSearch = () => {
//     if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/login");
//     window.location.reload();
//   };

//   const handleCategoryClick = (cat) => {
//     if (cat === "All Categories") navigate("/search?query=");
//     else navigate(`/search?query=${encodeURIComponent(cat)}`);
//   };

//   // Use device location
//   const handleFetchLocation = async () => {
//     try {
//       const coords = await getCurrentCoords();
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
//       );
//       const data = await response.json();
//       const newLoc =
//         data?.address?.city ||
//         data?.address?.town ||
//         data?.address?.state ||
//         "Unknown Location";

//       setLocationValue(newLoc);
//       localStorage.setItem("location", newLoc);
//     } catch (err) {
//       console.error("❌ Location fetch failed:", err);
//     }
//   };

//   // Forward geocoding: search any city
//   const handleManualLocationSearch = async () => {
//     if (!locationValue.trim()) return;
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationValue)}&format=json&limit=1`
//       );
//       const data = await response.json();
//       if (data.length > 0) {
//         const newLoc = data[0].display_name;
//         setLocationValue(newLoc);
//         localStorage.setItem("location", newLoc);
//         setLocOpen(false);
//       } else {
//         alert("Location not found");
//       }
//     } catch (err) {
//       console.error("❌ Location search failed:", err);
//     }
//   };

//   return (
//     <header className="bg-white w-full shadow sticky top-0 z-50">
//       <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-[1500px] mx-auto">
//         <Link to="/" className="flex items-center">
//           <img src={logo} alt="WeDeal Logo" className="h-10 w-auto object-contain" />
//         </Link>

//         {/* Search & Location */}
//         <div className="flex items-center gap-4 flex-1 mx-6 relative">
//           {/* Location dropdown */}
//           <div className="relative" onClick={() => setLocOpen(!locOpen)}>
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition">
//               <FaMapMarkerAlt className="text-red-500 mr-2" />
//               {locationValue}
//               <FaChevronDown className="ml-2 text-gray-500" />
//             </div>

//             {locOpen && (
//               <div className="absolute top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
//                 <p className="text-sm text-gray-600 mb-2">Current Location:</p>
//                 <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700 text-sm mb-3">
//                   {locationValue}
//                 </div>

//                 <button
//                   onClick={handleFetchLocation}
//                   className="w-full mb-3 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
//                 >
//                   📍 Use Current Location
//                 </button>

//                 <input
//                   type="text"
//                   placeholder="Search another location..."
//                   value={locationValue}
//                   onChange={(e) => setLocationValue(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   onClick={handleManualLocationSearch}
//                   className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
//                 >
//                   🔎 Set Location
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Search bar */}
//           <div className="relative flex-1">
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder={`Find ${searchPlaceholders[placeholderIndex]} and more...`}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             />

//             <button
//               onClick={handleSearch}
//               className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition flex items-center justify-center"
//             >
//               <FaSearch size={22} />
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           <Link to={"/chat"}>
//             <FaCommentDots className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition" />
//           </Link>
//           <Link to="/wishlist">
//             <FaHeart className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition" />
//           </Link>

//           {user ? (
//             <div
//               className="relative"
//               onMouseEnter={() => setOpen(true)}
//               onMouseLeave={() => setOpen(false)}
//             >
//               <div className="flex items-center gap-2 cursor-pointer">
//                 <img
//                   src={user?.avatar || "/default-avatar.png"}
//                   alt={user?.name || "User"}
//                   className="w-9 h-9 rounded-full object-cover border-2 border-gray-300 shadow-sm hover:scale-105 transition-transform"
//                 />
//                 <span className="text-gray-700 font-medium hover:text-blue-600 transition">
//                   {user?.name || "User"}
//                 </span>
//               </div>

//               <div
//                 className={`absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg transform transition-all duration-300 origin-top-right z-50 ${open
//                   ? "scale-100 opacity-100 translate-y-0"
//                   : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
//                 }`}
//               >
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-xl transition"
//                 >
//                   👤 Profile
//                 </Link>
//                 <Link
//                   to="/my-listings"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
//                 >
//                   📦 My Listings
//                 </Link>
//                 <Link
//                   to="/help"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
//                 >
//                   ❓ Help
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-b-xl transition"
//                 >
//                   🚪 Logout
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <Link
//               to="/login"
//               className="text-gray-700 text-sm font-medium hover:text-blue-600 transition"
//             >
//               Login
//             </Link>
//           )}

//           <Link
//             to="/sell"
//             className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-blue-600 text-white font-semibold rounded-md hover:from-yellow-500 hover:to-blue-700 transition flex items-center gap-1 text-sm"
//           >
//             + SELL
//           </Link>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="hidden md:flex mx-auto overflow-x-auto gap-6 px-6 py-2 bg-gray-50 border-t border-gray-200">
//         {categories.map((cat, idx) => (
//           <span
//             key={idx}
//             onClick={() => handleCategoryClick(cat)}
//             className="whitespace-nowrap cursor-pointer text-gray-700 hover:text-blue-600 font-medium text-sm transition"
//           >
//             {cat}
//           </span>
//         ))}
//       </div>
//     </header>
//   );
// };

// export default DesktopNavbar;








// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaChevronDown, FaCommentDots, FaHeart, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
// import { userApi } from "../api/auth"; 
// import { getCurrentCoords } from "../api/location"; // ✅ your geolocation util
// import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png"; 

// const categories = [
//   "All Categories",
//   "Cars",
//   "Motorcycles",
//   "Mobile",
//   "For Sale: Houses & Apartments",
//   "Scooters",
//   "Commercial & Other Vehicles",
//   "For Rent: Houses & Apartments",
// ];

// const DesktopNavbar = ({ title, city, state, onLocationClick }) => {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [user, setUser] = useState(null);
//   const [locOpen, setLocOpen] = useState(false); // ✅ location dropdown
//   const [locationValue, setLocationValue] = useState(`${city}, ${state} `);

//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const searchPlaceholders = ["Cars", "Mobiles", "Bikes", "Furniture"];
// const [placeholderIndex, setPlaceholderIndex] = useState(0);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
//   }, 2000); // change every 2 seconds

//   return () => clearInterval(interval);
// }, []);

//   // ✅ Load user profile
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await userApi.getProfile();
//         setUser(res.data);
//         localStorage.setItem("user", JSON.stringify(res.data));
//       } catch (err) {
//         console.error("❌ Failed to load profile:", err);
//       }
//     };

//     fetchUser();
//   }, [pathname]);

//   const handleSearch = () => {
//     if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/login");
//     window.location.reload();
//   };

//   const handleCategoryClick = (cat) => {
//     if (cat === "All Categories") {
//       navigate("/search?query=");
//     } else {
//       navigate(`/search?query=${encodeURIComponent(cat)}`);
//     }
//   };

//   // ✅ Fetch current geolocation
//   const handleFetchLocation = async () => {
//     try {
//       const coords = await getCurrentCoords(); // returns { latitude, longitude }
//       // Example: call reverse geocoding API to get city/state
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
//       );
//       const data = await response.json();
//       const newLoc =
//         data?.address?.city ||
//         data?.address?.town ||
//         data?.address?.state ||
//         "Unknown Location";

//       setLocationValue(newLoc);
//       localStorage.setItem("location", newLoc);
//     } catch (err) {
//       console.error("❌ Location fetch failed:", err);
//     }
//   };

//   const handleManualSearch = () => {
//     if (locationValue.trim()) {
//       localStorage.setItem("location", locationValue);
//       setLocOpen(false);
//     }
//   };

//   return (
//     <header className="bg-white w-full shadow sticky top-0 z-50">
//       <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-[1500px] mx-auto">
//      <Link to="/" className="flex items-center">
//   <img
//     src={logo}
//     alt="WeDeal Logo"
//     className="h-10 w-auto object-contain " // adjust size as needed
//   />
// </Link>

//         {/* 🔍 Search & Location */}
//         <div className="flex items-center gap-4 flex-1 mx-6 relative">
//           {/* ✅ Location dropdown */}
//           <div
//             className="relative"
//             onClick={() => setLocOpen(!locOpen)}
//           >
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition">
//               <FaMapMarkerAlt className="text-red-500 mr-2" />
//               {locationValue }
//               <FaChevronDown className="ml-2 text-gray-500" />
//             </div>

//             {locOpen && (
//               <div className="absolute top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
//                 <p className="text-sm text-gray-600 mb-2">Current Location:</p>
//                 <div className="px-2 py-1 bg-gray-100 rounded-md text-gray-700 text-sm mb-3">
//                   {locationValue}
//                 </div>

//                 <button
//                   onClick={handleFetchLocation}
//                   className="w-full mb-3 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
//                 >
//                   📍 Use Current Location
//                 </button>

//                 <input
//                   type="text"
//                   placeholder="Search another location..."
//                   value={locationValue}
//                   onChange={(e) => setLocationValue(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   onClick={handleManualSearch}
//                   className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
//                 >
//                   🔎 Set Location
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Search bar */}
//           <div className="relative flex-1">
//           <input
//   type="text"
//   value={query}
//   onChange={(e) => setQuery(e.target.value)}
//   placeholder={`Find ${searchPlaceholders[placeholderIndex]} and more...`}
//   className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// />

//             <button
//               onClick={handleSearch}
//               className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition flex items-center justify-center"
//             >
//               <FaSearch size={22}/>
//             </button>
//           </div>
//         </div>

//         {/* 👉 Right Section */}
//         <div className="flex items-center gap-4">
//           <Link to={"/chat"}>
//             <FaCommentDots className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition" />
//           </Link>
//           <Link to="/wishlist">
//             <FaHeart className="text-gray-600 text-xl cursor-pointer hover:text-red-500 transition" />
//           </Link>

//           {user ? (
//             <div
//               className="relative"
//               onMouseEnter={() => setOpen(true)}
//               onMouseLeave={() => setOpen(false)}
//             >
//               {/* Avatar + Name */}
//               <div className="flex items-center gap-2 cursor-pointer">
//                 <img
//                   src={user?.avatar || "/default-avatar.png"}
//                   alt={user?.name || "User"}
//                   className="w-9 h-9 rounded-full object-cover border-2 border-gray-300 shadow-sm hover:scale-105 transition-transform"
//                 />
//                 <span className="text-gray-700 font-medium hover:text-blue-600 transition">
//                   {user?.name || "User"}
//                 </span>
//               </div>

//               {/* Dropdown */}
//               <div
//                 className={`absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg transform transition-all duration-300 origin-top-right z-50 ${open
//                     ? "scale-100 opacity-100 translate-y-0"
//                     : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
//                   }`}
//               >
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-xl transition"
//                 >
//                   👤 Profile
//                 </Link>
//                 <Link
//                   to="/my-listings"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
//                 >
//                   📦 My Listings
//                 </Link>
//                 <Link
//                   to="/help"
//                   className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
//                 >
//                   ❓ Help
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-b-xl transition"
//                 >
//                   🚪 Logout
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <Link
//               to="/login"
//               className="text-gray-700 text-sm font-medium hover:text-blue-600 transition"
//             >
//               Login
//             </Link>
//           )}

//           <Link
//             to="/sell"
//             className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-blue-600 text-white font-semibold rounded-md hover:from-yellow-500 hover:to-blue-700 transition flex items-center gap-1 text-sm"
//           >
//             + SELL
//           </Link>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="hidden md:flex mx-auto overflow-x-auto gap-6 px-6 py-2 bg-gray-50 border-t border-gray-200">
//         {categories.map((cat, idx) => (
//           <span
//             key={idx}
//             onClick={() => handleCategoryClick(cat)}
//             className="whitespace-nowrap cursor-pointer text-gray-700 hover:text-blue-600 font-medium text-sm transition"
//           >
//             {cat}
//           </span>
//         ))}
//       </div>
//     </header>
//   );
// };

// export default DesktopNavbar;










import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaCommentDots, FaHeart, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

import { userApi } from "../api/auth";
import { setLocation, detectCurrentLocation, searchLocation } from "../redux/slices/locationSlice"; 
import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png"; 

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
  const [query, setQuery] = useState("");
  const [locOpen, setLocOpen] = useState(false);
  const [manualInput, setManualInput] = useState(""); // ✅ for manual location typing
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // ✅ Redux state
  const { user } = useSelector((state) => state.auth);
  const { selected } = useSelector((state) => state.location);

  const locationValue =
    selected?.city && selected?.state
      ? `${selected.city}, ${selected.state}`
      : "Select Location";

  // 🔄 rotating placeholder
  const searchPlaceholders = ["Cars", "Mobiles", "Bikes", "Furniture"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch user on route change (from Redux)
useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const res = await userApi.getProfile(); // call the API
      dispatch(setUser(res.data)); // update Redux state
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
  window.location.reload();
};

  const handleCategoryClick = (cat) => {
    if (cat === "All Categories") navigate("/search?query=");
    else navigate(`/search?query=${encodeURIComponent(cat)}`);
  };

  return (
    <header className="bg-white w-full shadow sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-[1500px] mx-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="WeDeal Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Search & Location */}
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
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
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
                className={`absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg transform transition-all duration-300 origin-top-right z-50 ${
                  open
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-xl transition"
                >
                  👤 Profile
                </Link>
                <Link
                  to="/my-listings"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  📦 My Listings
                </Link>
                <Link
                  to="/help"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  ❓ Help
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-b-xl transition"
                >
                  🚪 Logout
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
