import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaShareAlt, FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import { productApi } from "../../api/product";
import { wishlistApi } from "../../api/wishlist";
import { calculateDistance } from "../../utils/distance";
import FilterBar from "../../components/FilterBar";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MAX_DISTANCE = 50; // km

const SearchPage = () => {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchInput, setSearchInput] = useState(query);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null);
  const navigate = useNavigate();

  const { selected: currentLocation } = useSelector((state) => state.location);

  // Get user coordinates from selected location or fallback to geolocation
  useEffect(() => {
    const fetchCoords = async () => {
      if (currentLocation?.city) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
              currentLocation.city
            )}&format=json&limit=1`
          );
          const data = await res.json();
          if (data.length > 0) {
            setUserCoords({
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
            });
          }
        } catch (err) {
          console.error("Error fetching coordinates:", err);
        }
      } else {
        // Fallback to geolocation if no city selected
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            setUserCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
          (err) => {
            console.error("Location error:", err);
            setUserCoords(null);
          }
        );
      }
    };

    fetchCoords();
  }, [currentLocation]);

  // Fetch products whenever query or userCoords change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productApi.getAll();
        let products = Array.isArray(response.data.products) ? response.data.products : [];

        // Calculate distance if userCoords exist
        if (userCoords) {
          products = products.map((p) => {
            if (p.location?.lat && p.location?.lon) {
              const distance = calculateDistance(
                userCoords.latitude,
                userCoords.longitude,
                p.location.lat,
                p.location.lon
              );
              return { ...p, distance };
            }
            return { ...p, distance: null };
          });
        }

        // Filter products by MAX_DISTANCE
        products = products.filter((p) => p.distance == null || p.distance <= MAX_DISTANCE);

        // Apply search query
        if (query) {
          const lowerQuery = query.toLowerCase();
          products = products.filter((p) => {
            const category = p.category?.toLowerCase() || "";
            const brand = p.fields?.Brand?.toLowerCase() || "";
            const model = p.fields?.Model?.toLowerCase() || "";
            const location = p.fields?.Location?.toLowerCase() || "";
            return (
              category.includes(lowerQuery) ||
              brand.includes(lowerQuery) ||
              model.includes(lowerQuery) ||
              location.includes(lowerQuery)
            );
          });
        }

        setResults(products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (userCoords) fetchProducts();
  }, [query, userCoords]);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await wishlistApi.get();
        setWishlist(res.data.products.map((p) => p._id));
      } catch (err) {
        console.error("Error fetching wishlist", err);
      }
    };
    fetchWishlist();
  }, []);

  // Sorting
  const handleSort = (option) => {
    setSortOption(option);
    const sortedItems = [...results];
    if (option === "priceLowHigh") {
      sortedItems.sort((a, b) => Number(a.fields?.Price || 0) - Number(b.fields?.Price || 0));
    } else if (option === "priceHighLow") {
      sortedItems.sort((a, b) => Number(b.fields?.Price || 0) - Number(a.fields?.Price || 0));
    } else if (option === "dateNewOld") {
      sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === "dateOldNew") {
      sortedItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (option === "distance") {
      sortedItems.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    setResults(sortedItems);
  };

  // Wishlist toggle
  const toggleWishlist = async (productId) => {
    try {
      if (wishlist.includes(productId)) {
        const res = await wishlistApi.remove(productId);
        setWishlist(res.data.products.map((p) => p._id));
      } else {
        const res = await wishlistApi.add(productId);
        setWishlist(res.data.products.map((p) => p._id));
      }
    } catch (err) {
      console.error("Error updating wishlist", err);
    }
  };

  // Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar ShowMobileTop={false} />
      {/* Mobile Search Bar */}
      <div className="flex items-center md:hidden bg-white sticky top-0 z-50 px-4 py-3 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-gray-700 text-lg" />
        </button>
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 relative flex items-center ml-3"
        >
          <FaSearch className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products or locations..."
            className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-inner"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
            >
              <FaTimes />
            </button>
          )}
        </form>
      </div>

      <FilterBar sortOption={sortOption} handleSort={handleSort} />

      <section className="pb-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
        <main className="flex-1 flex flex-col gap-4">
          <h1 className="text-xl font-semibold mt-4 lg:mb-4">
            Here’s what we found for "{query}"
          </h1>

          {results.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className="relative bg-white border border-gray-300 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform flex flex-col"
                  onClick={() =>
                    navigate(`/product/${item._id}`, { state: { product: item, allProducts: results } })
                  }
                >
                  <div className="relative w-full h-40 md:h-48">
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={`${item.fields?.Brand || ""} ${item.fields?.Model || ""}`}
                      className="w-full h-full object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h4 className="text-base md:text-lg font-bold">
                      {item.fields?.Brand || "Unknown"} {item.fields?.Model || ""}
                    </h4>
                    <p className="text-gray-800 font-semibold text-sm md:text-base">
                      {item.fields?.Price
                        ? `₹${Number(item.fields.Price).toLocaleString()}`
                        : "N/A"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item.fields?.Location || "Unknown location"}
                      {item.distance != null && (
                        <span> — {item.distance.toFixed(1)} km away</span>
                      )}
                    </p>
                  </div>

                  {/* Wishlist + Share */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <FaHeart
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item._id);
                      }}
                      className={`text-lg cursor-pointer ${wishlist.includes(item._id) ? "text-red-500" : "text-gray-300"}`}
                    />
                    <FaShareAlt
                      onClick={(e) => {
                        e.stopPropagation();
                        const url = `${window.location.origin}/product/${item._id}`;
                        if (navigator.share) {
                          navigator.share({ title: `${item.fields?.Brand} ${item.fields?.Model}`, url }).catch(console.error);
                        } else {
                          navigator.clipboard.writeText(url);
                          alert("Product link copied!");
                        }
                      }}
                      className="text-lg cursor-pointer text-gray-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default SearchPage;








// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaHeart, FaShareAlt, FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
// import { productApi } from "../../api/product";
// import { wishlistApi } from "../../api/wishlist";
// import FilterBar from "../../components/FilterBar";
// import Navbar from "../../components/Navbar";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const SearchPage = () => {
//   const query = useQuery().get("query")?.toLowerCase() || "";
//   const [results, setResults] = useState([]);
//   const [sortOption, setSortOption] = useState("");
//   const [searchInput, setSearchInput] = useState(query);
//   const [wishlist, setWishlist] = useState([]);
//   const navigate = useNavigate();

//   // Fetch all products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await productApi.getAll();
//         const products = Array.isArray(response.data.products) ? response.data.products : [];

//         if (query) {
//           // 1️⃣ Category partial match
//           const categoryMatches = products.filter(
//             (p) => p.category?.toLowerCase().includes(query)
//           );

//           if (categoryMatches.length > 0) {
//             setResults(categoryMatches);
//           } else {
//             // 2️⃣ Brand, Model, or Location partial match
//             const filtered = products.filter(
//               (p) =>
//                 p.fields.Brand?.toLowerCase().includes(query) ||
//                 p.fields.Model?.toLowerCase().includes(query) ||
//                 p.fields.Location?.toLowerCase().includes(query)
//             );
//             setResults(filtered);
//           }
//         } else {
//           setResults(products);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setResults([]);
//       }
//     };

//     fetchProducts();
//   }, [query]);

//   // Fetch wishlist
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const res = await wishlistApi.get();
//         const productIds = res.data.products.map((p) => p._id);
//         setWishlist(productIds);
//       } catch (err) {
//         console.error("Error fetching wishlist", err);
//       }
//     };
//     fetchWishlist();
//   }, []);

//   // Handle sorting
//   const handleSort = (option) => {
//     setSortOption(option);
//     let sortedItems = [...results];

//     if (option === "priceLowHigh") {
//       sortedItems.sort((a, b) => Number(a.fields.Price) - Number(b.fields.Price));
//     } else if (option === "priceHighLow") {
//       sortedItems.sort((a, b) => Number(b.fields.Price) - Number(a.fields.Price));
//     } else if (option === "dateNewOld") {
//       sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     } else if (option === "dateOldNew") {
//       sortedItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//     }

//     setResults(sortedItems);
//   };

//   // Handle search submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     navigate(`/search?query=${searchInput}`);
//   };

//   // Toggle wishlist
//   const toggleWishlist = async (productId) => {
//     try {
//       if (wishlist.includes(productId)) {
//         const res = await wishlistApi.remove(productId);
//         setWishlist(res.data.products.map((p) => p._id));
//       } else {
//         const res = await wishlistApi.add(productId);
//         setWishlist(res.data.products.map((p) => p._id));
//       }
//     } catch (err) {
//       console.error("Error updating wishlist", err);
//     }
//   };
//     const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a small delay for spinner
//     const timer = setTimeout(() => setLoading(false), 1000); // 1s spinner
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }


//   return (
//     <>
//       <Navbar ShowMobileTop={false} />
//       {/* Mobile Search Bar */}
//       <div className="flex items-center md:hidden bg-white sticky top-0 z-50 px-4 py-3 shadow-md">
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 rounded-full hover:bg-gray-100 transition"
//         >
//           <FaArrowLeft className="text-gray-700 text-lg" />
//         </button>
//         <form
//           onSubmit={handleSearchSubmit}
//           className="flex-1 relative flex items-center ml-3"
//         >
//           <FaSearch className="absolute left-3 text-gray-400 pointer-events-none" />
//           <input
//             type="text"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search for products or locations..."
//             className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-inner"
//           />
//           {searchInput && (
//             <button
//               type="button"
//               onClick={() => setSearchInput("")}
//               className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
//             >
//               <FaTimes />
//             </button>
//           )}
//         </form>
//       </div>

//       <FilterBar sortOption={sortOption} handleSort={handleSort} />

//       <section className="pb-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
//         <main className="flex-1 flex flex-col gap-4">
//           <h1 className="text-xl font-semibold mt-4 lg:mb-4">
//             Here’s what we found for "{query}"
//           </h1>

//           {results.length === 0 ? (
//             <p className="text-gray-500">No products found</p>
//           ) : (
//             <div className="grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
//               {results.map((item, idx) => (
//                 <React.Fragment key={idx}>
//                   <div
//                     className="relative bg-white border border-gray-300 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform
//         flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-col" // fallback for bigger screens
//                     onClick={() =>
//                       navigate(`/product/${item._id}`, {
//                         state: { product: item, allProducts: results },
//                       })
//                     }
//                   >
//                     {/* Small Device Layout (Image Left, Details Right) */}
//                     <div className="flex sm:block p-2">
//                       {/* Image */}
//                       <div className="relative w-32 h-28 flex-shrink-0 sm:w-full sm:h-40 md:h-48">
//                         <img
//                           src={item.images?.[0] || "/placeholder.png"}
//                           alt={`${item.fields.Brand} ${item.fields.Model}`}
//                           className="w-full h-full object-cover rounded"
//                           loading="lazy"
//                         />

//                         {/* Featured Badge */}
//                         {item.featured && (
//                           <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
//                             Featured
//                           </span>
//                         )}


//                       </div>

//                       {/* Details */}
//                       <div className="flex flex-col justify-between px-3 sm:px-0 sm:py-2">
//                         <h4 className="text-base md:text-lg font-bold mb-1">
//                           {item.fields.Brand} {item.fields.Model}
//                         </h4>
//                         <p className="text-gray-800 font-semibold text-sm md:text-base">
//                           {item.fields.Price
//                             ? `₹${Number(item.fields.Price).toLocaleString()}`
//                             : item.fields.Role || "N/A"}
//                         </p>
//                         <p className="text-gray-500 text-sm mb-1">
//                           {item.fields.Location || "Unknown location"}
//                         </p>
//                         <p className="text-gray-400 text-xs">
//                           Published: {new Date(item.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>

//                       {/* Wishlist + Share (absolute, top-right) */}
//                       <div className="absolute top-2 right-2 flex flex-col gap-2">
//                         <FaHeart
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleWishlist(item._id);
//                           }}
//                           className={`text-lg cursor-pointer bg-black transition ${wishlist.includes(item._id) ? "text-red-500" : "text-white"
//                             }`}
//                         />

//                         <FaShareAlt
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             const url = `${window.location.origin}/product/${item._id}`;
//                             if (navigator.share) {
//                               navigator
//                                 .share({
//                                   title: `${item.fields.Brand} ${item.fields.Model}`,
//                                   url,
//                                 })
//                                 .catch((err) => console.error("Error sharing:", err));
//                             } else {
//                               navigator.clipboard.writeText(url);
//                               alert("Product link copied to clipboard!");
//                             }
//                           }}
//                           className="text-white bg-black p-2 text-lg cursor-pointer hover:text-green-500 transition"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Ad Banner after every 6 items */}
//                   {(idx + 1) % 8 === 0 && (
//                     <div className="col-span-full w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 text-lg md:text-xl font-semibold">
//                       Advertisement Banner
//                     </div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>

//           )}
//         </main>
//       </section>
//     </>
//   );
// };

// export default SearchPage;
