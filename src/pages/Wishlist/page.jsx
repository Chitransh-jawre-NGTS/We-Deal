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
      <div className="bg-gray-100 min-h-screen">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center gap-4 p-4 md:p-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-6xl mb-20 mx-auto px-4 md:px-6 pt-24">
          {loading ? (
            <p className="text-center text-gray-500 mt-20 text-lg animate-pulse">
              Loading...
            </p>
          ) : wishlist.length === 0 ? (
            <div className="flex flex-col items-center mt-20 text-center px-4">
              <img
                src="/empty-wishlist.png"
                alt="Empty Wishlist"
                className="w-56 mb-6 opacity-90"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Don’t leave your Wishlist empty!
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-md">
                Save the items you love 💖 and easily find them later. Browse
                products now and start building your wishlist.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <main className="flex-1 flex flex-col gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
                {wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="relative bg-white border  p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
                  >
                    {/* Heart */}
                    <FaHeart
                      onClick={() => toggleWishlist(item._id)}
                      className={`absolute top-5 right-3 text-lg cursor-pointer transition ${wishlist.some(w => w._id === item._id) ? "text-red-500" : "text-white"
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
                      onClick={() => navigate(`/product/${item._id}`, { state: { product: item, allProducts: wishlist } })}
                    />

                    {/* Details */}
                    <div className="md:p-4">
                      <p className="text-gray-800 font-semibold text-lg md:text-base">
                        {item.fields?.Price ? `₹${Number(item.fields.Price).toLocaleString()}` : item.fields?.Role || "N/A"}
                      </p>
                      <h4 className="text-base md:text-lg font-bold mb-1">
                        {item.fields?.Brand} {item.fields?.Model}
                      </h4>
                      <p className="text-gray-500 text-sm mb-1">{item.fields?.Year} {item.fields?.Km}</p>
                      {item.distance !== undefined && item.distance !== Infinity && (
                        <p className="text-green-600 text-xs font-medium">📍 {item.distance.toFixed(1)} km away</p>
                      )}
                      <p className="text-gray-400 text-xs">Published: {new Date(item.createdAt).toLocaleDateString()}</p>

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
            </main>

          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Removal
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove this product from your wishlist?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={removeItem}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
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
