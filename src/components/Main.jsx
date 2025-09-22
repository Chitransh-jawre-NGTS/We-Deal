// import React, { useState, useEffect, useRef } from "react";
// import { FaHeart, FaShareAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { productApi } from "../api/product";
// import { wishlistApi } from "../api/wishlist";
// import { calculateDistance } from "../utils/distance";
// import toast, { Toaster } from "react-hot-toast";

// const ListingsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userCoords, setUserCoords] = useState(null);
//   const navigate = useNavigate();
//   const observerRef = useRef();
//   const PRODUCTS_PER_PAGE = 50; // load all for categorization

//   const getCoordsFromSelectedLocation = async (city) => {
//     if (!city) return null;
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//           city
//         )}&format=json&limit=1`
//       );
//       const data = await res.json();
//       if (data.length > 0)
//         return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
//       return null;
//     } catch (err) {
//       console.error("Error fetching city coordinates:", err);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const loadLocation = async () => {
//       const storedLocation = localStorage.getItem("selectedLocation");
//       if (storedLocation) {
//         const { city } = JSON.parse(storedLocation);
//         const coords = await getCoordsFromSelectedLocation(city);
//         if (coords) setUserCoords(coords);
//       } else {
//         navigator.geolocation.getCurrentPosition(
//           (pos) =>
//             setUserCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
//           (err) => console.error("Location error:", err)
//         );
//       }
//     };
//     loadLocation();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await productApi.getAll();
//         let fetchedProducts = Array.isArray(response.data.products)
//           ? response.data.products
//           : [];

//         if (userCoords) {
//           fetchedProducts = fetchedProducts.map((p) => {
//             let distance = null;

//             if (p.location?.coordinates) {
//               const [lon, lat] = p.location.coordinates;
//               distance = calculateDistance(userCoords.latitude, userCoords.longitude, lat, lon);
//             }

//             return {
//               ...p,
//               distance,
//               locationName: p.location?.name || p.location?.city || "",
//             };
//           });

//           // sort by distance
//           fetchedProducts.sort((a, b) => {
//             if (a.distance === null) return 1;
//             if (b.distance === null) return -1;
//             return a.distance - b.distance;
//           });
//         }

//         setProducts(fetchedProducts);
//         setDisplayedProducts(fetchedProducts.slice(0, PRODUCTS_PER_PAGE));
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [userCoords]);

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

//   const toggleWishlist = async (productId) => {
//     try {
//       if (wishlist.includes(productId)) {
//         const res = await wishlistApi.remove(productId);
//         setWishlist(res.data.products.map((p) => p._id));
//         toast.success("Removed from wishlist");
//       } else {
//         const res = await wishlistApi.add(productId);
//         setWishlist(res.data.products.map((p) => p._id));
//         toast.success("Added to wishlist");
//       }
//     } catch (err) {
//       console.error("Error updating wishlist", err);
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const shareProduct = (productId) => {
//     const url = `${window.location.origin}/product/${productId}`;
//     if (navigator.share) {
//       navigator.share({ title: "Check this product", url }).catch(console.error);
//     } else {
//       navigator.clipboard.writeText(url);
//       alert("Product link copied to clipboard!");
//     }
//   };

//   const ProductSkeleton = () => (
//     <div className="animate-pulse bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
//       <div className="h-40 md:h-48 bg-gray-200 w-full" />
//       <div className="p-4 space-y-2">
//         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//         <div className="h-3 bg-gray-200 rounded w-1/4"></div>
//       </div>
//     </div>
//   );

//   // Categorize products
//   const nearbyProducts = displayedProducts.filter(
//     (p) => typeof p.distance === "number" && p.distance <= 5
//   );
//   const under10kmProducts = displayedProducts.filter(
//     (p) => typeof p.distance === "number" && p.distance > 5 && p.distance <= 10
//   );
//   const under50kmProducts = displayedProducts.filter(
//     (p) => typeof p.distance === "number" && p.distance > 10 && p.distance <= 50
//   );

//   const renderProducts = (items) =>
//     items.map((item) => (
//       <div
//         key={item._id}
//         className="relative bg-white border p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
//       >
//         <FaHeart
//           onClick={() => toggleWishlist(item._id)}
//           className={`absolute top-5 right-3 text-lg cursor-pointer transition ${
//             wishlist.includes(item._id) ? "text-red-500" : "text-white"
//           }`}
//         />
//         <FaShareAlt
//           onClick={() => shareProduct(item._id)}
//           className="absolute top-12 right-3 text-lg cursor-pointer text-white hover:text-green-500 transition"
//         />
//         <img
//           src={item.images[0]}
//           alt={`${item.fields.Brand} ${item.fields.Model}`}
//           className="w-full h-40 md:h-48 object-cover"
//           loading="lazy"
//           onClick={() =>
//             navigate(`/product/${item._id}`, { state: { product: item, allProducts: products } })
//           }
//         />
//         <div className="md:p-4">
//           <p className="text-gray-800 font-semibold text-lg md:text-base">
//             {item.fields.Price
//               ? `₹${Number(item.fields.Price).toLocaleString()}`
//               : item.fields.Role || "N/A"}
//           </p>
//           <h4 className="text-base md:text-lg font-bold mb-1">
//             {item.fields.Brand} {item.fields.Model}
//           </h4>
//           <p className="text-gray-500 text-sm mb-1">
//             {item.fields.Year} {item.fields.Km}
//           </p>
//           {item.locationName && (
//             <p className="text-gray-600 text-xs font-medium">{item.fields.location}</p>
//           )}
//           <p className="text-gray-400 text-xs">
//             Published: {new Date(item.createdAt).toLocaleDateString()}
//           </p>
//         </div>
//       </div>
//     ));

//   return (
//     <>
//       <Toaster position="top-right" reverseOrder={false} />
//       <section className="py-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col gap-8">
//         {nearbyProducts.length > 0 && (
//           <>
//             <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-800">
//               Nearby Products
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
//               {renderProducts(nearbyProducts)}
//             </div>
//           </>
//         )}
//         {under10kmProducts.length > 0 && (
//           <>
//             <h2 className="text-2xl font-bold mb-4">Products under 10 km</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
//               {renderProducts(under10kmProducts)}
//             </div>
//           </>
//         )}
//         {under50kmProducts.length > 0 && (
//           <>
//             <h2 className="text-2xl font-bold mb-4">Products under 50 km</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
//               {renderProducts(under50kmProducts)}
//             </div>
//           </>
//         )}
//       </section>
//     </>
//   );
// };

// export default ListingsPage;




// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { FaHeart, FaShareAlt } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { productApi } from "../api/product";
// import { wishlistApi } from "../api/wishlist";
// import { calculateDistance } from "../utils/distance";
// import toast, { Toaster } from "react-hot-toast";

// const categoriesList = [
//   "Mobiles", "Cars", "Furniture", "Jobs",
//   "Fashion", "Electronics", "Home Appliances", "Sports"
// ];

// const ListingsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [userCoords, setUserCoords] = useState(null);
//   const [page, setPage] = useState(1); // for lazy loading
//   const navigate = useNavigate();

//   const observerRef = useRef();

//   const PRODUCTS_PER_PAGE = 10;

//   // Get user location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => setUserCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
//       (err) => console.error("Location error:", err)
//     );
//   }, []);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await productApi.getAll();
//         let fetchedProducts = Array.isArray(response.data.products)
//           ? response.data.products
//           : [];

//         // calculate distance
//         if (userCoords) {
//           fetchedProducts = fetchedProducts.map((p) => {
//             if (p.location?.lat && p.location?.lon) {
//               const distance = calculateDistance(
//                 userCoords.latitude,
//                 userCoords.longitude,
//                 p.location.lat,
//                 p.location.lon
//               );
//               return { ...p, distance };
//             }
//             return { ...p, distance: Infinity };
//           });

//           fetchedProducts.sort((a, b) => {
//             const getGroup = (d) => (d <= 10 ? 1 : d <= 50 ? 2 : d <= 100 ? 3 : 4);
//             const groupA = getGroup(a.distance);
//             const groupB = getGroup(b.distance);
//             if (groupA !== groupB) return groupA - groupB;
//             return a.distance - b.distance;
//           });
//         }

//         setProducts(fetchedProducts);
//         setDisplayedProducts(fetchedProducts.slice(0, PRODUCTS_PER_PAGE));
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [userCoords]);

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

//   // Lazy loading with IntersectionObserver
//   const lastProductRef = useCallback((node) => {
//     if (loading) return;
//     if (observerRef.current) observerRef.current.disconnect();

//     observerRef.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && displayedProducts.length < products.length) {
//         setPage((prev) => prev + 1);
//         setDisplayedProducts(products.slice(0, (page + 1) * PRODUCTS_PER_PAGE));
//       }
//     });

//     if (node) observerRef.current.observe(node);
//   }, [loading, displayedProducts, products, page]);

//   // Wishlist toggle
//  const toggleWishlist = async (productId) => {
//   try {
//     if (wishlist.includes(productId)) {
//       const res = await wishlistApi.remove(productId);
//       setWishlist(res.data.products.map((p) => p._id));
//       toast.success("Removed from wishlist");
//     } else {
//       const res = await wishlistApi.add(productId);
//       setWishlist(res.data.products.map((p) => p._id));
//       toast.success("Added to wishlist");
//     }
//   } catch (err) {
//     console.error("Error updating wishlist", err);
//     toast.error("Failed to update wishlist");
//   }
// };


//   // Share product
//   const shareProduct = (productId) => {
//     const url = `${window.location.origin}/product/${productId}`;
//     if (navigator.share) {
//       navigator.share({ title: "Check this product", url }).catch(console.error);
//     } else {
//       navigator.clipboard.writeText(url);
//       alert("Product link copied to clipboard!");
//     }
//   };

//   // Skeleton loader
//   const ProductSkeleton = () => (
//     <div className="animate-pulse bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
//       <div className="h-40 md:h-48 bg-gray-200 w-full" />
//       <div className="p-4 space-y-2">
//         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//         <div className="h-3 bg-gray-200 rounded w-1/4"></div>
//       </div>
//     </div>
//   );

//   return (
//    <>
//     <Toaster position="top-right" reverseOrder={false} />
//     <section className="py-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
//       <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
//         {/* Categories & Sorting */}
//         <div className="bg-white rounded-2xl hidden lg:block shadow-xl p-6">
//           <h4 className="font-extrabold text-xl mb-5 text-blue-700 tracking-wide">Categories</h4>
//           <ul className="space-y-3">
//             {categoriesList.map((cat, idx) => (
//               <li key={idx}>
//                 <Link
//                   to={`/search?query=${encodeURIComponent(cat.toLowerCase())}`}
//                   className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg group"
//                 >
//                   <span className="font-medium group-hover:font-semibold">{cat}</span>
//                   <svg className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-white rounded-xl shadow p-4">
//           <h4 className="font-bold text-lg text-blue-700 mb-3">Sort Products</h4>
//           <select
//             value={sortOption}
//             onChange={(e) => {
//               handleSort(e.target.value);
//               setPage(1);
//             }}
//             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select</option>
//             <option value="priceLowHigh">Price: Low to High</option>
//             <option value="priceHighLow">Price: High to Low</option>
//             <option value="dateNewOld">Date: New to Old</option>
//             <option value="dateOldNew">Date: Old to New</option>
//           </select>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col gap-6">
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
//           {loading
//             ? Array.from({ length: 8 }).map((_, idx) => <ProductSkeleton key={idx} />)
//             : displayedProducts.map((item, idx) => {
//                 if (displayedProducts.length === idx + 1) {
//                   return (
//                     <div
//                       ref={lastProductRef}
//                       key={item._id}
//                       className="relative bg-white border p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
//                     >
//                       <FaHeart
//                         onClick={() => toggleWishlist(item._id)}
//                         className={`absolute top-5 right-3 text-lg cursor-pointer transition ${
//                           wishlist.includes(item._id) ? "text-red-500" : "text-white"
//                         }`}
//                       />
//                       <FaShareAlt
//                         onClick={() => shareProduct(item._id)}
//                         className="absolute top-12 right-3 text-lg cursor-pointer text-white hover:text-green-500 transition"
//                       />
//                       <img
//                         src={item.images[0]}
//                         alt={`${item.fields.Brand} ${item.fields.Model}`}
//                         className="w-full h-40 md:h-48 object-cover"
//                         loading="lazy"
//                         onClick={() => navigate(`/product/${item._id}`, { state: { product: item, allProducts: products } })}
//                       />
//                       <div className="md:p-4">
//                         <p className="text-gray-800 font-semibold text-lg md:text-base">
//                           {item.fields.Price ? `₹${Number(item.fields.Price).toLocaleString()}` : item.fields.Role || "N/A"}
//                         </p>
//                         <h4 className="text-base md:text-lg font-bold mb-1">
//                           {item.fields.Brand} {item.fields.Model}
//                         </h4>
//                         <p className="text-gray-500 text-sm mb-1">{item.fields.Year} {item.fields.Km}</p>
//                         {item.distance !== undefined && item.distance !== Infinity && (
//                           <p className="text-green-600 text-xs font-medium">📍 {item.distance.toFixed(1)} km away</p>
//                         )}
//                         <p className="text-gray-400 text-xs">Published: {new Date(item.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   );
//                 } else {
//                   return (
//                     <div
//                       key={item._id}
//                       className="relative bg-white border p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
//                     >
//                       <FaHeart
//                         onClick={() => toggleWishlist(item._id)}
//                         className={`absolute top-5 right-3 text-lg cursor-pointer transition ${
//                           wishlist.includes(item._id) ? "text-red-500" : "text-white"
//                         }`}
//                       />
//                       <FaShareAlt
//                         onClick={() => shareProduct(item._id)}
//                         className="absolute top-12 right-3 text-lg cursor-pointer text-white hover:text-green-500 transition"
//                       />
//                       <img
//                         src={item.images[0]}
//                         alt={`${item.fields.Brand} ${item.fields.Model}`}
//                         className="w-full h-40 md:h-48 object-cover"
//                         loading="lazy"
//                         onClick={() => navigate(`/product/${item._id}`, { state: { product: item, allProducts: products } })}
//                       />
//                       <div className="md:p-4">
//                         <p className="text-gray-800 font-semibold text-lg md:text-base">
//                           {item.fields.Price ? `₹${Number(item.fields.Price).toLocaleString()}` : item.fields.Role || "N/A"}
//                         </p>
//                         <h4 className="text-base md:text-lg font-bold mb-1">
//                           {item.fields.Brand} {item.fields.Model}
//                         </h4>
//                         <p className="text-gray-500 text-sm mb-1">{item.fields.Year} {item.fields.Km}</p>
//                         {item.distance !== undefined && item.distance !== Infinity && (
//                           <p className="text-green-600 text-xs font-medium">📍 {item.distance.toFixed(1)} km away</p>
//                         )}
//                         <p className="text-gray-400 text-xs">Published: {new Date(item.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   );
//                 }
//               })}
//         </div>

//         {/* Loading spinner */}
//         {displayedProducts.length < products.length && (
//           <div className="text-center mt-4 text-gray-500">Loading more products...</div>
//         )}
//       </main>
//     </section>
//     </>
//   );
// };

// export default ListingsPage;





import React, { useEffect, useState } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlices";
import { fetchWishlist, toggleWishlist } from "../redux/slices/wishlistSlice";
import toast, { Toaster } from "react-hot-toast";

const ListingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products, status: productStatus } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [userCoords, setUserCoords] = useState(null);
  const { selected: currentLocation } = useSelector((state) => state.location);

  // get coords
  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      const { city } = JSON.parse(storedLocation);
      fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0)
            setUserCoords({
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
            });
        });
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => console.error("Location error:", err)
      );
    }
  }, [currentLocation]);

  useEffect(() => {
    if (userCoords) dispatch(fetchProducts(userCoords));
    dispatch(fetchWishlist());
  }, [dispatch, userCoords]);

  const handleToggleWishlist = (id) => {
    dispatch(toggleWishlist(id))
      .unwrap()
      .then(() => toast.success("Wishlist updated"))
      .catch(() => toast.error("Failed to update wishlist"));
  };

  const shareProduct = (productId) => {
    const url = `${window.location.origin}/product/${productId}`;
    if (navigator.share) {
      navigator.share({ title: "Check this product", url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert("Product link copied to clipboard!");
    }
  };

  const nearbyProducts = products.filter((p) => p.distance <= 5);
  const under10kmProducts = products.filter((p) => p.distance > 5 && p.distance <= 10);
  const under50kmProducts = products.filter((p) => p.distance > 10 && p.distance <= 50);

  const renderProducts = (items) =>
    items.map((item) => (
      <div
        key={item._id}
        className="relative bg-white border p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105"
      >
        <FaHeart
          onClick={() => handleToggleWishlist(item._id)}
          className={`absolute top-5 right-3 text-lg cursor-pointer transition ${
            wishlist.includes(item._id) ? "text-red-500" : "text-white"
          }`}
        />
        <FaShareAlt
          onClick={() => shareProduct(item._id)}
          className="absolute top-12 right-3 text-lg cursor-pointer text-white hover:text-green-500"
        />
        <img
          src={item.images[0]}
          alt={`${item.fields.Brand} ${item.fields.Model}`}
          className="w-full h-40 md:h-48 object-cover"
          loading="lazy"
          onClick={() =>
            navigate(`/product/${item._id}`, { state: { product: item, allProducts: products } })
          }
        />
        <div className="md:p-4">
          <p className="text-gray-800 font-semibold text-lg md:text-base">
            {item.fields.Price
              ? `₹${Number(item.fields.Price).toLocaleString()}`
              : item.fields.Role || "N/A"}
          </p>
          <h4 className="text-base md:text-lg font-bold mb-1">
            {item.fields.Brand} {item.fields.Model}
          </h4>
          <p className="text-gray-500 text-sm mb-1">
            {item.fields.Year} {item.fields.Km}
          </p>
          <p className="text-gray-400 text-xs">
            Published: {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    ));

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="py-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col gap-8">
        {productStatus === "loading" && <p>Loading...</p>}
        {nearbyProducts.length > 0 && (
          <>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-800">Nearby Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
              {renderProducts(nearbyProducts)}
            </div>
          </>
        )}
        {under10kmProducts.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Products under 10 km</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
              {renderProducts(under10kmProducts)}
            </div>
          </>
        )}
        {under50kmProducts.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Products under 50 km</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
              {renderProducts(under50kmProducts)}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ListingsPage;
