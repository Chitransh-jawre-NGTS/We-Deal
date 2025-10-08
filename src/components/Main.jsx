import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlices";
import { fetchWishlist, toggleWishlist } from "../redux/slices/wishlistSlice";
import { detectCurrentLocation } from "../redux/slices/locationSlice";
import toast, { Toaster } from "react-hot-toast";

const categoriesList = [
  "Mobiles", "Cars", "Furniture", 
  "Fashion", "Electronics", "Home Appliances",
];

// Component for empty product state
const NoProducts = ({ message }) => (
  <div className="w-full text-center py-12 bg-gray-50 rounded-xl shadow-md">
    <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">{message}</h3>
    <p className="text-gray-500">Be the first to post in your area!</p>
    <Link
      to="/post-ad"
      className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
    >
      Post Your Ad
    </Link>
  </div>
);

// Product card component
const ProductCard = ({ item, wishlist, handleToggleWishlist, navigate }) => {
  const isFeatured = item.featured;

  return (
    <div
      className={`relative bg-white border p-2 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105
        ${isFeatured ? "border-2 border-yellow-400" : "border border-blue-200"}`}
    >
      {isFeatured && (
        <>
          <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
            FEATURED
          </span>
        </>
      )}

      <div
        onClick={() => handleToggleWishlist(item._id)}
        className={`absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-md cursor-pointer transition 
          ${wishlist.includes(item._id) ? "text-red-500" : "text-gray-400 hover:text-red-500 hover:bg-gray-100"}`}
      >
        <FaHeart className="text-lg" />
      </div>

      <img
        src={item.images[0] || "https://via.placeholder.com/300"}
        alt={`${item.fields.Brand} ${item.fields.Model}`}
        className="w-full h-40 md:h-48 object-contain rounded-md transition-transform duration-300 hover:scale-110"
        loading="lazy"
        onClick={() =>
          navigate(`/product/${item._id}`, { state: { product: item } })
        }
      />

      <div className="md:p-4">
        <p className={`text-lg font-semibold mb-1 ${isFeatured ? "text-yellow-600" : "text-gray-800"}`}>
          {item.fields.Price ? `₹${Number(item.fields.Price).toLocaleString()}` : item.fields.Role || "N/A"}
        </p>
        <h4 className="text-base md:text-lg font-bold mb-1">{item.fields.Brand} {item.fields.Model}</h4>
        <p className="text-gray-500 text-sm mb-1">{item.fields.Year} {item.fields.Km}</p>
        <p className="text-gray-400 text-xs mb-1">Published: {new Date(item.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-500 text-sm">{item.fields.location}</p>
      </div>
    </div>
  );
};

const ListingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products, status: productStatus } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { selected: currentLocation, status: locationStatus } = useSelector((state) => state.location);

  const [sortOption, setSortOption] = useState("");
  const [banners, setBanners] = useState([]);

  // Detect location
  useEffect(() => {
    if (!currentLocation?.city) {
      dispatch(detectCurrentLocation());
    }
  }, [dispatch, currentLocation]);

  // Fetch products & wishlist
  useEffect(() => {
    if (currentLocation?.latitude && currentLocation?.longitude) {
      dispatch(fetchProducts({ latitude: currentLocation.latitude, longitude: currentLocation.longitude }));
      dispatch(fetchWishlist());
    }
  }, [dispatch, currentLocation]);

 

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/ads/banner/active`);
        setBanners(res.data);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };

    fetchBanners();
  }, []);

  const handleToggleWishlist = (id) => {
    dispatch(toggleWishlist(id))
      .unwrap()
      .then(() => toast.success("Wishlist updated"))
      .catch(() => toast.error("Failed to update wishlist"));
  };

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "priceLowHigh": return a.fields.Price - b.fields.Price;
      case "priceHighLow": return b.fields.Price - a.fields.Price;
      case "dateNewOld": return new Date(b.createdAt) - new Date(a.createdAt);
      case "dateOldNew": return new Date(a.createdAt) - new Date(b.createdAt);
      default: return 0;
    }
  });

  const nearbyProducts = sortedProducts.filter((p) => p.distance <= 5);
  const under10kmProducts = sortedProducts.filter((p) => p.distance > 5 && p.distance <= 10);
  const under50kmProducts = sortedProducts.filter((p) => p.distance > 10 && p.distance <= 50);

  // Merge products with banners
  const renderProductsWithBanners = (items) => {
    const elements = [];
    const bannerCount = banners.length;

    items.forEach((item, index) => {
      elements.push(
        <ProductCard key={item._id} item={item} wishlist={wishlist} handleToggleWishlist={handleToggleWishlist} navigate={navigate} />
      );

      // Insert banner after every 8 products
      if ((index + 1) % 4 === 0 && bannerCount > 0) {
        const bannerIndex = Math.floor(index / 8) % bannerCount;
        const banner = banners[bannerIndex];

        elements.push(
          <div key={`banner-${banner._id}`} className="w-full my-6 flex justify-center">
            <a href={banner.link || "#"}>
              <img
                src={banner.image}
                alt="Store Banner"
                className="w-full md:w-4/5 object-cover rounded-lg shadow-lg"
              />
            </a>
          </div>
        );
      }
    });

    return elements;
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="py-8 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full hidden lg:block lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h4 className="font-extrabold text-xl mb-5 text-blue-700 tracking-wide">Categories</h4>
            <ul className="space-y-3">
              {categoriesList.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    to={`/search?query=${encodeURIComponent(cat.toLowerCase())}`}
                    className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg group"
                  >
                    <span className="font-medium group-hover:font-semibold">{cat}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="font-bold text-lg text-blue-700 mb-3">Sort Products</h4>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
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

        {/* Products */}
        <section className="flex-1 flex flex-col gap-2">
          {productStatus === "loading" || locationStatus === "loading" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-gray-200 shadow-md rounded-md overflow-hidden h-48" />
              ))}
            </div>
          ) : (
            <>
              {nearbyProducts.length > 0 ? (
                <>
                  <h2 className="w-full bg-blue-500 text-white text-center text-2xl md:text-3xl font-extrabold py-3 mb-4">
                    Nearby Products
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-6">
                    {renderProductsWithBanners(nearbyProducts)}
                  </div>
                </>
              ) : <NoProducts message="No products nearby" />}

              {under10kmProducts.length > 0 && (
                <>
                  <h2 className="w-full bg-blue-500 text-white text-center text-2xl md:text-3xl font-extrabold py-3 mb-4">
                    Products under 10 km
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-6">
                    {renderProductsWithBanners(under10kmProducts)}
                  </div>
                </>
              )}

              {under50kmProducts.length > 0 && (
                <>
                  <h2 className="w-full bg-blue-500 text-white text-center text-2xl md:text-3xl font-extrabold py-3 mb-4">
                    Products under 50 km
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-6">
                    {renderProductsWithBanners(under50kmProducts)}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default ListingsPage;
