import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { productApi } from "../api/product";
import { wishlistApi } from "../api/wishlist";
import { calculateDistance } from "../utils/distance";
import toast, { Toaster } from "react-hot-toast";

const categoriesList = [
  "Mobiles", "Cars", "Furniture", "Jobs",
  "Fashion", "Electronics", "Home Appliances", "Sports"
];

const ListingsPage = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null);
  const [page, setPage] = useState(1); // for lazy loading
  const navigate = useNavigate();

  const observerRef = useRef();

  const PRODUCTS_PER_PAGE = 10;

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => console.error("Location error:", err)
    );
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        let fetchedProducts = Array.isArray(response.data.products)
          ? response.data.products
          : [];

        // calculate distance
        if (userCoords) {
          fetchedProducts = fetchedProducts.map((p) => {
            if (p.location?.lat && p.location?.lon) {
              const distance = calculateDistance(
                userCoords.latitude,
                userCoords.longitude,
                p.location.lat,
                p.location.lon
              );
              return { ...p, distance };
            }
            return { ...p, distance: Infinity };
          });

          fetchedProducts.sort((a, b) => {
            const getGroup = (d) => (d <= 10 ? 1 : d <= 50 ? 2 : d <= 100 ? 3 : 4);
            const groupA = getGroup(a.distance);
            const groupB = getGroup(b.distance);
            if (groupA !== groupB) return groupA - groupB;
            return a.distance - b.distance;
          });
        }

        setProducts(fetchedProducts);
        setDisplayedProducts(fetchedProducts.slice(0, PRODUCTS_PER_PAGE));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [userCoords]);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await wishlistApi.get();
        const productIds = res.data.products.map((p) => p._id);
        setWishlist(productIds);
      } catch (err) {
        console.error("Error fetching wishlist", err);
      }
    };
    fetchWishlist();
  }, []);

  // Lazy loading with IntersectionObserver
  const lastProductRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && displayedProducts.length < products.length) {
        setPage((prev) => prev + 1);
        setDisplayedProducts(products.slice(0, (page + 1) * PRODUCTS_PER_PAGE));
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, displayedProducts, products, page]);

  // Wishlist toggle
 const toggleWishlist = async (productId) => {
  try {
    if (wishlist.includes(productId)) {
      const res = await wishlistApi.remove(productId);
      setWishlist(res.data.products.map((p) => p._id));
      toast.success("Removed from wishlist");
    } else {
      const res = await wishlistApi.add(productId);
      setWishlist(res.data.products.map((p) => p._id));
      toast.success("Added to wishlist");
    }
  } catch (err) {
    console.error("Error updating wishlist", err);
    toast.error("Failed to update wishlist");
  }
};


  // Share product
  const shareProduct = (productId) => {
    const url = `${window.location.origin}/product/${productId}`;
    if (navigator.share) {
      navigator.share({ title: "Check this product", url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert("Product link copied to clipboard!");
    }
  };

  // Skeleton loader
  const ProductSkeleton = () => (
    <div className="animate-pulse bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
      <div className="h-40 md:h-48 bg-gray-200 w-full" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
   <>
    <Toaster position="top-right" reverseOrder={false} />
    <section className="py-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
        {/* Categories & Sorting */}
        <div className="bg-white rounded-2xl hidden lg:block shadow-xl p-6">
          <h4 className="font-extrabold text-xl mb-5 text-blue-700 tracking-wide">Categories</h4>
          <ul className="space-y-3">
            {categoriesList.map((cat, idx) => (
              <li key={idx}>
                <Link
                  to={`/search?query=${encodeURIComponent(cat.toLowerCase())}`}
                  className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg group"
                >
                  <span className="font-medium group-hover:font-semibold">{cat}</span>
                  <svg className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-bold text-lg text-blue-700 mb-3">Sort Products</h4>
          <select
            value={sortOption}
            onChange={(e) => {
              handleSort(e.target.value);
              setPage(1);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="dateNewOld">Date: New to Old</option>
            <option value="dateOldNew">Date: Old to New</option>
          </select>
        </div>
      </aside>

      <main className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => <ProductSkeleton key={idx} />)
            : displayedProducts.map((item, idx) => {
                if (displayedProducts.length === idx + 1) {
                  return (
                    <div
                      ref={lastProductRef}
                      key={item._id}
                      className="relative bg-white border p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
                    >
                      <FaHeart
                        onClick={() => toggleWishlist(item._id)}
                        className={`absolute top-5 right-3 text-lg cursor-pointer transition ${
                          wishlist.includes(item._id) ? "text-red-500" : "text-white"
                        }`}
                      />
                      <FaShareAlt
                        onClick={() => shareProduct(item._id)}
                        className="absolute top-12 right-3 text-lg cursor-pointer text-white hover:text-green-500 transition"
                      />
                      <img
                        src={item.images[0]}
                        alt={`${item.fields.Brand} ${item.fields.Model}`}
                        className="w-full h-40 md:h-48 object-cover"
                        loading="lazy"
                        onClick={() => navigate(`/product/${item._id}`, { state: { product: item, allProducts: products } })}
                      />
                      <div className="md:p-4">
                        <p className="text-gray-800 font-semibold text-lg md:text-base">
                          {item.fields.Price ? `₹${Number(item.fields.Price).toLocaleString()}` : item.fields.Role || "N/A"}
                        </p>
                        <h4 className="text-base md:text-lg font-bold mb-1">
                          {item.fields.Brand} {item.fields.Model}
                        </h4>
                        <p className="text-gray-500 text-sm mb-1">{item.fields.Year} {item.fields.Km}</p>
                        {item.distance !== undefined && item.distance !== Infinity && (
                          <p className="text-green-600 text-xs font-medium">📍 {item.distance.toFixed(1)} km away</p>
                        )}
                        <p className="text-gray-400 text-xs">Published: {new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={item._id}
                      className="relative bg-white border p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
                    >
                      <FaHeart
                        onClick={() => toggleWishlist(item._id)}
                        className={`absolute top-5 right-3 text-lg cursor-pointer transition ${
                          wishlist.includes(item._id) ? "text-red-500" : "text-white"
                        }`}
                      />
                      <FaShareAlt
                        onClick={() => shareProduct(item._id)}
                        className="absolute top-12 right-3 text-lg cursor-pointer text-white hover:text-green-500 transition"
                      />
                      <img
                        src={item.images[0]}
                        alt={`${item.fields.Brand} ${item.fields.Model}`}
                        className="w-full h-40 md:h-48 object-cover"
                        loading="lazy"
                        onClick={() => navigate(`/product/${item._id}`, { state: { product: item, allProducts: products } })}
                      />
                      <div className="md:p-4">
                        <p className="text-gray-800 font-semibold text-lg md:text-base">
                          {item.fields.Price ? `₹${Number(item.fields.Price).toLocaleString()}` : item.fields.Role || "N/A"}
                        </p>
                        <h4 className="text-base md:text-lg font-bold mb-1">
                          {item.fields.Brand} {item.fields.Model}
                        </h4>
                        <p className="text-gray-500 text-sm mb-1">{item.fields.Year} {item.fields.Km}</p>
                        {item.distance !== undefined && item.distance !== Infinity && (
                          <p className="text-green-600 text-xs font-medium">📍 {item.distance.toFixed(1)} km away</p>
                        )}
                        <p className="text-gray-400 text-xs">Published: {new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  );
                }
              })}
        </div>

        {/* Loading spinner */}
        {displayedProducts.length < products.length && (
          <div className="text-center mt-4 text-gray-500">Loading more products...</div>
        )}
      </main>
    </section>
    </>
  );
};

export default ListingsPage;
