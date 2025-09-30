import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { findOrCreateChat } from "../redux/slices/chatSlice";
import BannerCarousel from "./BannerCrousal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(
    useQuery().get("query")?.toLowerCase() || ""
  );
  const [currentImage, setCurrentImage] = useState(0);

  const { loading: chatLoading, error: chatError } = useSelector(
    (state) => state.chat
  );

  const product = location.state?.product;
  const allProducts = location.state?.allProducts || [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-sans">
        Product not found.
      </div>
    );
  }

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImage((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const handleChat = async () => {
    if (!product) return;

    try {
      const response = await dispatch(findOrCreateChat(product._id)).unwrap();
      navigate(`/chatroom/${response._id}`);
    } catch (err) {
      console.error("Failed to open chat:", err);
    }
  };

  return (
    <>

      <div className="bg-gray-100 font-sans  ">

        <Navbar ShowBottomNav={false} ShowMobileTop={false} />

        {/* Back Arrow for Small Devices */}
        <div className="lg:hidden flex items-center px-4 py-3 bg-white shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <FaArrowLeft size={22} />
            <span className="text-xl font-medium">Back</span>
          </button>
        </div>
        {/* Top Image Banner */}
        <div className="relative max-w-6xl  mx-auto h-[35vh] bg-gray-900 md:h-[60vh] lg:h-[70vh] overflow-hidden ">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[currentImage]}
              alt={`Product ${currentImage + 1}`}
              className="max-w-120 mx-auto h-full object-cover"
            />
          ) : (
            <img
              src="/placeholder.png"
              alt="No image available"
              className="w-full h-full object-cover"
            />
          )}

          {/* Left / Right Arrows */}
          {product.images && product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
              >
                <FaArrowRight size={20} />
              </button>
            </>
          )}

          {/* Image Count */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImage + 1} / {product.images.length}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <section className="max-w-6xl mx-auto bg-gray-50 px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Product Info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Product Header */}
              <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                  {product.fields.Brand} {product.fields.Model} {product.fields.Type}
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {product.fields.description || "No description provided."}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-4 py-1.5 text-sm md:text-base rounded-full bg-blue-100 text-blue-700 font-medium">
                    Year: {product.fields.Year || "Unknown"}
                  </span>
                  <span className="px-4 py-1.5 text-sm md:text-base rounded-full bg-green-100 text-green-700 font-medium">
                    Published: {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Seller Info */}
              <div
                onClick={() => navigate(`/seller/${product.sellerId}`)}
                className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={product.seller?.avatar || "/placeholder-avatar.png"}
                  alt={product.seller?.name || "Seller"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="text-lg text-gray-900 font-semibold">
                    {product.seller?.name || "Unknown Seller"}
                  </p>
                  <p className="text-gray-500 text-sm">View Seller Details</p>
                </div>
              </div>

              {/* Report Ad */}
              <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
                <p className="text-gray-500 text-sm">
                  Ad ID:{" "}
                  <span className="font-mono font-medium text-gray-800">
                    {product._id}
                  </span>
                </p>
                <button
                  onClick={() => alert(`Ad ID ${product._id} reported!`)}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-sm font-semibold"
                >
                  Report Ad
                </button>
              </div>
            </div>

            {/* Right Side - Pricing & Actions */}
            <div className="flex flex-col gap-6">
              {/* Price Block */}
              <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                <p className="text-4xl font-extrabold text-blue-600">
                  ₹{Number(product.fields.Price).toLocaleString()}
                </p>
                <p className="text-gray-500 mt-2">Price (Negotiable)</p>
              </div>

              {/* Action Buttons */}
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                  Make a Deal
                </button>

                <button
                  onClick={handleChat}
                  disabled={chatLoading}
                  className={`w-full px-6 py-3 font-semibold rounded-lg transition ${chatLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  {chatLoading ? "Opening Chat..." : "Chat with Seller"}
                </button>

                {chatError && (
                  <p className="text-red-600 text-sm text-center">{chatError}</p>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* Map Section */}
        <section className="px-4 md:px-16 max-w-7xl mx-auto pb-20">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Location</h3>
          <div className="w-full h-64 md:h-96 lg:h-[28rem] rounded-xl overflow-hidden shadow-md border">
            <iframe
              title="Product Location"
              src={
                product.location?.coordinates
                  ? `https://www.google.com/maps?q=${product.location.coordinates[1]},${product.location.coordinates[0]}&output=embed`
                  : "https://www.google.com/maps?q=0,0&output=embed"
              }
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-sm md:text-base text-gray-600">Indore, Madhya Pradesh</p>
        </section>
      </div>
    </>
  );
};

export default ProductDescription;
