// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
// import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
// import { getUserLocation, getLocationFromCoords } from "../api/location"; // ✅ import helper

// const MobileTopNavbar = ({ title, city, state }) => {
//   const [query, setQuery] = useState("");
//   const [overlayOpen, setOverlayOpen] = useState(false);
//   const [locationQuery, setLocationQuery] = useState("");
//   const [currentLocation, setCurrentLocation] = useState({ city, state });
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
//   };

//   // ✅ Detect Current Location (City + State)
//   const detectCurrentLocation = async () => {
//     try {
//       setLoadingLocation(true);
//       const location = await getUserLocation(); // uses geolocation + reverse geocoding
//       const [cityName, stateName] = location.split(", ");
//       setCurrentLocation({ city: cityName, state: stateName });
//       setOverlayOpen(false);
//     } catch (err) {
//       alert("Failed to detect location. Please allow location access.");
//     } finally {
//       setLoadingLocation(false);
//     }
//   };

//   // ✅ Handle manually entered location (use geocoding API if needed)
//   const handleLocationSearch = async () => {
//     if (locationQuery.trim()) {
//       try {
//         setLoadingLocation(true);
//         // Call Nominatim search API to get coords & reverse-geocode
//         const searchRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationQuery
//           )}&format=json&limit=1`
//         );
//         const results = await searchRes.json();
//         if (results.length > 0) {
//           const { lat, lon } = results[0];
//           const resolvedLocation = await getLocationFromCoords(lat, lon);
//           const [cityName, stateName] = resolvedLocation.split(", ");
//           setCurrentLocation({ city: cityName, state: stateName });
//         } else {
//           setCurrentLocation({ city: locationQuery, state: "" });
//         }
//         setOverlayOpen(false);
//       } catch (error) {
//         alert("Failed to fetch location.");
//       } finally {
//         setLoadingLocation(false);
//       }
//     }
//   };

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
//               {currentLocation.city}, {currentLocation.state}
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
//         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//               onClick={() => setOverlayOpen(false)}
//             >
//               <FaTimes />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Select Location</h2>

//             {/* Current Location Button */}
//             <button
//               onClick={detectCurrentLocation}
//               className="w-full mb-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//               disabled={loadingLocation}
//             >
//               {loadingLocation ? "Detecting..." : "📍 Detect Current Location"}
//             </button>

//             {/* Search Location */}
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 placeholder="Search for another location"
//                 className="flex-1 border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={locationQuery}
//                 onChange={(e) => setLocationQuery(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleLocationSearch()}
//               />
//               <button
//                 onClick={handleLocationSearch}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
//                 disabled={loadingLocation}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileTopNavbar;





















// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
// import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
// import { getUserLocation, getLocationFromCoords } from "../api/location";
// import { indiaLocations } from "../data/locations";

// const MobileTopNavbar = ({ title, city, state }) => {
//   const [query, setQuery] = useState("");
//   const [overlayOpen, setOverlayOpen] = useState(false);
//   const [locationQuery, setLocationQuery] = useState("");
//   const [currentLocation, setCurrentLocation] = useState({ city, state });
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Load persisted location on mount
//   useEffect(() => {
//     const storedLocation = localStorage.getItem("selectedLocation");
//     if (storedLocation) {
//       setCurrentLocation(JSON.parse(storedLocation));
//     }
//   }, []);

//   const handleSearch = () => {
//     if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
//   };

//   // ✅ Detect Current Location
//   const detectCurrentLocation = async () => {
//     try {
//       setLoadingLocation(true);
//       const location = await getUserLocation(); // geolocation + reverse geocoding
//       const [cityName, stateName] = location.split(", ");
//       const newLocation = { city: cityName, state: stateName };
//       setCurrentLocation(newLocation);
//       localStorage.setItem("selectedLocation", JSON.stringify(newLocation)); // persist
//       setOverlayOpen(false);
//     } catch (err) {
//       alert("Failed to detect location. Please allow location access.");
//     } finally {
//       setLoadingLocation(false);
//     }
//   };

//   // ✅ Handle manually entered location
//   const handleLocationSearch = async () => {
//     if (locationQuery.trim()) {
//       try {
//         setLoadingLocation(true);
//         const searchRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationQuery
//           )}&format=json&limit=1`
//         );
//         const results = await searchRes.json();
//         let newLocation;
//         if (results.length > 0) {
//           const { lat, lon } = results[0];
//           const resolvedLocation = await getLocationFromCoords(lat, lon);
//           const [cityName, stateName] = resolvedLocation.split(", ");
//           newLocation = { city: cityName, state: stateName };
//         } else {
//           newLocation = { city: locationQuery, state: "" };
//         }

//         setCurrentLocation(newLocation);
//         localStorage.setItem("selectedLocation", JSON.stringify(newLocation)); // persist
//         setOverlayOpen(false);
//       } catch (error) {
//         alert("Failed to fetch location.");
//       } finally {
//         setLoadingLocation(false);
//       }
//     }
//   };

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
//               {currentLocation.city}, {currentLocation.state}
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
//       <div className="fixed inset-0 h-screen bg-black bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm">
//   <div className="bg-white/95 backdrop-blur-md h-screen w-full max-w-md p-4 relative shadow-xl border border-gray-200 overflow-y-auto">
//     {/* Close Button */}
//     <button
//       className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-transform hover:scale-110"
//       onClick={() => setOverlayOpen(false)}
//     >
//       <FaTimes className="text-xl" />
//     </button>

//     <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//       Select Location
//     </h2>

//     {/* Current Location Button */}
//     <button
//       onClick={detectCurrentLocation}
//       className="w-full mb-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all disabled:opacity-60"
//       disabled={loadingLocation}
//     >
//       {loadingLocation ? "Detecting..." : "📍 Detect Current Location"}
//     </button>

//     {/* Search Location */}
//     <div className="flex items-center gap-3 mb-5">
//       <input
//         type="text"
//         placeholder="Search for another location"
//         className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
//         value={locationQuery}
//         onChange={(e) => setLocationQuery(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleLocationSearch()}
//       />
//       <button
//         onClick={handleLocationSearch}
//         className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transform transition-all disabled:opacity-60"
//         disabled={loadingLocation}
//       >
//         Search
//       </button>
//     </div>

//     {/* Predefined Indian Locations */}
//     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//       {indiaLocations.map((loc, index) => (
//         <button
//           key={index}
//           onClick={() => {
//             setLocationQuery(`${loc.city}, ${loc.state}`);
//             handleLocationSearch();
//           }}
//           className="bg-gray-100 hover:bg-blue-100 text-gray-800 px-4 py-2 rounded-full font-medium shadow-sm transition"
//         >
//           {loc.city}, {loc.state}
//         </button>
//       ))}
//     </div>
//   </div>
// </div>

//       )}
//     </>
//   );
// };

// export default MobileTopNavbar;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
import logo from "../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
import { indiaLocations } from "../data/locations";
import { useSelector, useDispatch } from "react-redux";
import { detectCurrentLocation, searchLocation, setLocation } from "../redux/slices/locationSlice";

const MobileTopNavbar = ({ title }) => {
  const [query, setQuery] = useState("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selected: currentLocation, status } = useSelector((state) => state.location);

  const handleSearch = () => {
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleLocationSearch = () => {
    if (locationQuery.trim()) {
      dispatch(searchLocation(locationQuery)).then(() => setOverlayOpen(false));
    }
  };

  const handlePredefinedLocation = (loc) => {
    dispatch(setLocation(loc));
    setOverlayOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="WeDeal Logo" className="h-10 w-auto object-contain" />
          </Link>
          <div
            className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
            onClick={() => setOverlayOpen(true)}
          >
            <FaMapMarkerAlt />
            <span>
              {currentLocation.city}, {currentLocation.state}
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
          <div className="bg-white/95 backdrop-blur-md h-screen w-full max-w-md p-4 relative shadow-xl border border-gray-200 overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-transform hover:scale-110"
              onClick={() => setOverlayOpen(false)}
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Select Location
            </h2>

            {/* Detect Current Location */}
            <button
              onClick={() => dispatch(detectCurrentLocation()).then(() => setOverlayOpen(false))}
              className="w-full mb-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all disabled:opacity-60"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Detecting..." : "📍 Detect Current Location"}
            </button>

            {/* Search Location */}
            <div className="flex items-center gap-3 mb-5">
              <input
                type="text"
                placeholder="Search for another location"
                className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLocationSearch()}
              />
              <button
                onClick={handleLocationSearch}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transform transition-all disabled:opacity-60"
                disabled={status === "loading"}
              >
                Search
              </button>
            </div>

            {/* Predefined Locations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {indiaLocations.map((loc, index) => (
                <button
                  key={index}
                  onClick={() => handlePredefinedLocation(loc)}
                  className="bg-gray-100 hover:bg-blue-100 text-gray-800 px-4 py-2 rounded-full font-medium shadow-sm transition"
                >
                  {loc.city}, {loc.state}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileTopNavbar;
