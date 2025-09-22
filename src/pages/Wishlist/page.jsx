import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaArrowLeft, FaShareAlt, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { wishlistApi } from "../../api/wishlist";
import Navbar from "../../components/Navbar";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await wishlistApi.get();
      setWishlist(res.data.products || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Trigger modal for deletion
  const confirmDelete = (productId) => {
    setDeleteItemId(productId);
    setShowModal(true);
  };

  // Delete item after confirmation
  const removeItem = async () => {
    if (!deleteItemId) return;
    try {
      await wishlistApi.remove(deleteItemId);
      setWishlist((prev) => prev.filter((item) => item._id !== deleteItemId));
      setShowModal(false);
      setDeleteItemId(null);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      alert("Failed to remove item. Please try again.");
    }
  };

  return (
    <>
      <Navbar ShowMobileTop={false} />
      <div className=" min-h-screen">
        {/* Top Bar */}
        <div className="fixed top-0 md:hidden left-0 w-full bg-white shadow-md z-50 flex items-center gap-4 p-4 md:p-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            My Wishlist
          </h1>
        </div>
        <main className="flex flex-col py-20 lg:py-10 lg:flex-row gap-6">
          {/* Sidebar Filters - visible only on lg+ */}
          <aside className="hidden lg:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-fit sticky top-24">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

            {/* Example Filter: Brand */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Brand</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" /> Maruti
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" /> Hyundai
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" /> Tata
                </label>
              </div>
            </div>

            {/* Example Filter: Price */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h3>
              <input
                type="range"
                min="50000"
                max="2000000"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹50k</span>
                <span>₹20L</span>
              </div>
            </div>

            {/* Example Filter: Year */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Year</h3>
              <select className="w-full border rounded-lg p-2 text-sm">
                <option>All</option>
                <option>2023 & Newer</option>
                <option>2020 - 2022</option>
                <option>2015 - 2019</option>
                <option>Before 2015</option>
              </select>
            </div>

            {/* Apply Filters */}
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Apply Filters
            </button>
          </aside>

        {/* Wishlist Products */}
<div className="flex-1">
  {loading ? (
    <p className="text-center mt-10 text-gray-500">Loading your wishlist...</p>
  ) : wishlist.length === 0 ? (
    <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500 space-y-4 p-6">
      <FaHeart className="text-6xl text-blue-400" />
      <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
      <p className="text-gray-400 text-sm">
        Browse products and add your favorites to your wishlist.
      </p>
      <Link
        to="/sell"
        className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Browse Products
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
      {wishlist.map((item) => (
        <div
          key={item._id}
          className="relative bg-white border p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
        >
          {/* Heart */}
          <FaHeart
            onClick={() => toggleWishlist(item._id)}
            className={`absolute top-5 right-3 text-lg cursor-pointer transition ${
              wishlist.some((w) => w._id === item._id)
                ? "text-red-500"
                : "text-white"
            }`}
          />

          {/* Share */}
          <FaShareAlt
            onClick={() => shareProduct(item._id)}
            className="absolute top-12 right-3 text-lg cursor-pointer text-white hover:text-green-500 transition"
          />

          {/* Image */}
          <img
            src={item.images?.[0] || "/placeholder.png"}
            alt={`${item.fields?.Brand} ${item.fields?.Model}`}
            className="w-full h-40 md:h-48 object-cover"
            loading="lazy"
            onClick={() =>
              navigate(`/product/${item._id}`, {
                state: { product: item, allProducts: wishlist },
              })
            }
          />

          {/* Details */}
          <div className="md:p-4">
            <p className="text-gray-800 font-semibold text-lg md:text-base">
              {item.fields?.Price
                ? `₹${Number(item.fields.Price).toLocaleString()}`
                : item.fields?.Role || "N/A"}
            </p>
            <h4 className="text-base md:text-lg font-bold mb-1">
              {item.fields?.Brand} {item.fields?.Model}
            </h4>
            <p className="text-gray-500 text-sm mb-1">
              {item.fields?.Year} {item.fields?.Km}
            </p>
            {item.distance !== undefined && item.distance !== Infinity && (
              <p className="text-green-600 text-xs font-medium">
                📍 {item.distance.toFixed(1)} km away
              </p>
            )}
            <p className="text-gray-400 text-xs">
              Published: {new Date(item.createdAt).toLocaleDateString()}
            </p>

            {/* Remove */}
            <button
              onClick={() => confirmDelete(item._id)}
              className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition text-sm"
            >
              <FaTrashAlt className="text-sm" /> Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        </main>
        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-6">Are you sure you want to remove this item from your wishlist?</p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={removeItem}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
};

export default Wishlist;
