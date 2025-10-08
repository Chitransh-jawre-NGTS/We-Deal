
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
// import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
// // import { indiaLocations } from "../data/locations";

// const MobileTopNavbar = ({
//   title,
//   currentLocation,
//   onDetectLocation,
//   onSearchLocation,
//   onSelectLocation,
// }) => {
//   const [query, setQuery] = useState("");
//   const [overlayOpen, setOverlayOpen] = useState(false);
//   const [locationQuery, setLocationQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
//   };

// const handleLocationSearch = async () => {
//   if (!locationQuery.trim()) return;
//   setLoading(true);
//   try {
//     const res = await fetch(
//       `${import.meta.env.VITE_API_URL}/location/search?query=${encodeURIComponent(locationQuery)}`
//     );
//     if (!res.ok) throw new Error("Failed to fetch location");
//     const data = await res.json();
//     setSuggestions(data.results || []);
//   } catch (err) {
//     console.error("Location search failed:", err);
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleSelectSuggestion = (loc) => {
//     // Extract city and state from API or display_name
//     let city = loc.city || loc.town || loc.village || "";
//     let state = loc.state || "";

//     if (!city || !state) {
//       const parts = loc.display_name.split(",").map((p) => p.trim());
//       city = city || parts[0] || "Unknown";
//       state = state || parts[1] || "Unknown";
//     }

//     const selectedLocation = {
//       city,
//       state,
//       latitude: loc.lat || loc.latitude || null,
//       longitude: loc.lng || loc.longitude || null,
//     };

//     onSelectLocation(selectedLocation);
//     setOverlayOpen(false);
//     setSuggestions([]);
//     setLocationQuery("");
//   };

//   const handlePredefinedLocation = (loc) => {
//     onSelectLocation(loc);
//     setOverlayOpen(false);
//   };

//   const location = currentLocation || { city: "Unknown", state: "" };

//   return (
//     <>
//       {/* Top Navbar */}
//       <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50">
//         <div className="flex items-center justify-between px-4 py-3">
//           <Link to="/" className="flex items-center">
//             <img
//               src={logo}
//               alt="WeDeal Logo"
//               className="h-10 w-auto object-contain"
//             />
//           </Link>
//           <div
//             className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
//             onClick={() => setOverlayOpen(true)}
//           >
//             <FaMapMarkerAlt />
//             <span>
//               {location.city}, {location.state}
//             </span>
//           </div>
//         </div>

//         <div className="px-4 py-2 pb-3">
//           <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-inner">
//             <FaSearch className="h-5 w-5 text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search items..."
//               className="bg-transparent outline-none w-full text-sm"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             />
//             <button onClick={handleSearch} className="ml-2 text-blue-600">
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Overlay Modal */}
//       {overlayOpen && (
//         <div className="fixed inset-0 h-screen bg-black bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm">
//           <div className="bg-white/95 backdrop-blur-md h-screen w-full max-w-md p-6 relative shadow-xl border border-gray-200 overflow-y-auto">
//             {/* Close Button */}
//             <button
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-transform hover:scale-110"
//               onClick={() => setOverlayOpen(false)}
//             >
//               <FaTimes className="text-xl" />
//             </button>

//             {/* Heading */}
//             <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b border-gray-300 pb-3">
//               Select Location
//             </h2>

//             {/* Detect Current Location */}
//             <button
//               onClick={() => {
//                 onDetectLocation();
//                 setOverlayOpen(false);
//               }}
//               className="w-full mb-5 border-b-2 border-blue-500 text-blue-600 font-semibold py-3 text-left hover:bg-blue-50 transition-all"
//             >
//               Detect Current Location
//             </button>

//             {/* Search Location */}
//             <div className="mb-5">
//               <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
//                 <input
//                   type="text"
//                   placeholder="Search for another location"
//                   className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-700"
//                   value={locationQuery}
//                   onChange={(e) => setLocationQuery(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleLocationSearch()}
//                 />
//                 <button
//                   onClick={handleLocationSearch}
//                   className="text-blue-600 font-semibold hover:underline transition-all"
//                 >
//                   Search
//                 </button>
//               </div>

//               {/* Show Suggestions */}
//               {loading && <p className="text-sm text-gray-500 mt-2">Searching...</p>}
//               {suggestions.length > 0 &&
//                 suggestions.map((s, i) => {
//                   const parts = s.display_name.split(",").map((p) => p.trim());
//                   const city = s.city || s.town || s.village || parts[0];
//                   const state = s.state || parts[1];

//                   return (
//                     <button
//                       key={i}
//                       onClick={() => handleSelectSuggestion(s)}
//                       className="w-full text-left border-b border-gray-300 py-3 text-gray-700 hover:text-blue-600 hover:border-blue-500 transition-all font-medium"
//                     >
//                       {city}, {state}
//                     </button>
//                   );
//                 })}

//             </div>


//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileTopNavbar;















import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, detectCurrentLocation } from "../redux/slices/locationSlice";

const MobileTopNavbar = ({ title, currentLocation }) => {
  const [query, setQuery] = useState("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
 const location = useSelector((state) => state.location.selected);


  const handleSearch = () => {
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleLocationSearch = async () => {
    if (!locationQuery.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/location/search?query=${encodeURIComponent(locationQuery)}`
      );
      if (!res.ok) throw new Error("Failed to fetch location");
      const data = await res.json();
      setSuggestions(data.results || []);
    } catch (err) {
      console.error("Location search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (loc) => {
    let city = loc.city || loc.town || loc.village || "";
    let state = loc.state || "";

    if (!city || !state) {
      const parts = loc.display_name.split(",").map((p) => p.trim());
      city = city || parts[0] || "Unknown";
      state = state || parts[1] || "Unknown";
    }

    const selectedLocation = {
      city,
      state,
      latitude: loc.lat || loc.latitude || null,
      longitude: loc.lng || loc.longitude || null,
    };

    // Dispatch Redux action instead of prop callback
    dispatch(setLocation(selectedLocation));
    setOverlayOpen(false);
    setSuggestions([]);
    setLocationQuery("");
  };

  const handlePredefinedLocation = (loc) => {
    dispatch(setLocation(loc)); // Redux action
    setOverlayOpen(false);
  };

  const handleDetectLocation = () => {
    dispatch(detectCurrentLocation()); // Redux action to detect location
    setOverlayOpen(false);
  };

  const displayLocation = location || { city: "Unknown", state: "" };

  return (
    <>
      {/* Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="WeDeal Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div
            className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
            onClick={() => setOverlayOpen(true)}
          >
            <FaMapMarkerAlt />
            <span>
              {displayLocation.city}, {displayLocation.state}
            </span>
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
            <button onClick={handleSearch} className="ml-2 text-blue-600">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Modal */}
      {overlayOpen && (
        <div className="fixed inset-0 h-screen bg-black bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-md h-screen w-full max-w-md p-6 relative shadow-xl border border-gray-200 overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-transform hover:scale-110"
              onClick={() => setOverlayOpen(false)}
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b border-gray-300 pb-3">
              Select Location
            </h2>

            <button
              onClick={handleDetectLocation}
              className="w-full mb-5 border-b-2 border-blue-500 text-blue-600 font-semibold py-3 text-left hover:bg-blue-50 transition-all"
            >
              Detect Current Location
            </button>

            <div className="mb-5">
              <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
                <input
                  type="text"
                  placeholder="Search for another location"
                  className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-700"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLocationSearch()}
                />
                <button
                  onClick={handleLocationSearch}
                  className="text-blue-600 font-semibold hover:underline transition-all"
                >
                  Search
                </button>
              </div>

              {loading && <p className="text-sm text-gray-500 mt-2">Searching...</p>}
              {suggestions.length > 0 &&
                suggestions.map((s, i) => {
                  const parts = s.display_name.split(",").map((p) => p.trim());
                  const city = s.city || s.town || s.village || parts[0];
                  const state = s.state || parts[1];

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectSuggestion(s)}
                      className="w-full text-left border-b border-gray-300 py-3 text-gray-700 hover:text-blue-600 hover:border-blue-500 transition-all font-medium"
                    >
                      {city}, {state}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};



export default MobileTopNavbar;
























