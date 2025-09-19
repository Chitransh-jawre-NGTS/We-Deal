import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaCommentDots, FaHeart } from "react-icons/fa";

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



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaChevronDown, FaCommentDots, FaHeart } from "react-icons/fa";
// import axios from "axios"; // for API calls

// const categories = [
//   "All Categories",
//   "Cars",
//   "Motorcycles",
//   "Mobile Phones",
//   "For Sale: Houses & Apartments",
//   "Scooters",
//   "Commercial & Other Vehicles",
//   "For Rent: Houses & Apartments",
// ];

// const DesktopNavbar = ({ title, city, state, onLocationChange }) => {
//   const [open, setOpen] = useState(false);
//   const [locationOpen, setLocationOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [locQuery, setLocQuery] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState({ city, state });
//   const [locations, setLocations] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Load user from localStorage
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   // Fetch locations from API
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const res = await axios.get("/api/locations"); // replace with your real API endpoint
//         setLocations(res.data.locations || []);
//       } catch (err) {
//         console.error("Failed to fetch locations:", err);
//       }
//     };
//     fetchLocations();
//   }, []);

//   const handleSelectLocation = (loc) => {
//     setSelectedLocation(loc);
//     setLocationOpen(false);
//     if (onLocationChange) onLocationChange(loc);
//   };

//   const filteredLocations = locations.filter((loc) =>
//     `${loc.city}, ${loc.state}`.toLowerCase().includes(locQuery.toLowerCase())
//   );

//   const handleSearch = () => {
//     if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//     window.location.reload();
//   };

//   const handleCategoryClick = (cat) => {
//     navigate(`/search?query=${encodeURIComponent(cat === "All Categories" ? "" : cat)}`);
//   };

//   return (
//     <header className="bg-white w-full shadow sticky top-0 z-50">
//       <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-[1500px] mx-auto">
//         <Link to="/" className="text-3xl font-bold text-gray-700">
//           {title || "WeDeal"}
//         </Link>

//         <div className="flex items-center gap-4 flex-1 mx-6">
//           {/* Location */}
//           <div className="relative">
//             <div
//               onClick={() => setLocationOpen(!locationOpen)}
//               className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:shadow transition"
//             >
//               {`${selectedLocation.city}, ${selectedLocation.state}`}
//               <FaChevronDown className="ml-2 text-gray-500" />
//             </div>

//             {locationOpen && (
//               <div className="absolute top-full mt-2 w-72 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-2">
//                 {/* Current Location */}
//                 <div className="mb-2 font-semibold text-gray-700">Current Location</div>
//                 <div
//                   className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
//                   onClick={() => handleSelectLocation(selectedLocation)}
//                 >
//                   {selectedLocation.city}, {selectedLocation.state}
//                 </div>

//                 {/* Search */}
//                 <input
//                   type="text"
//                   value={locQuery}
//                   onChange={(e) => setLocQuery(e.target.value)}
//                   placeholder="Search location..."
//                   className="w-full border border-gray-300 rounded-md px-3 py-1 my-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 />

//                 {/* Filtered Locations */}
//                 <div className="max-h-40 overflow-y-auto">
//                   {filteredLocations.map((loc, idx) => (
//                     <div
//                       key={idx}
//                       onClick={() => handleSelectLocation(loc)}
//                       className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
//                     >
//                       {loc.city}, {loc.state}
//                     </div>
//                   ))}
//                   {filteredLocations.length === 0 && (
//                     <div className="px-2 py-1 text-gray-400">No locations found</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Search Bar */}
//           <div className="relative flex-1">
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Find Cars, Mobile Phones and more..."
//               className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             />
//             <button
//               onClick={handleSearch}
//               className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition flex items-center justify-center"
//             >
//               <FaHeart />
//             </button>
//           </div>
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
