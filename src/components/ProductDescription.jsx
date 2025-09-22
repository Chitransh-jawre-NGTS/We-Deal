// src/pages/ProductDescription.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { findOrCreateChat } from "../redux/slices/chatSlice";

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

  const { loading: chatLoading, error: chatError } = useSelector(
    (state) => state.chat
  );

  const product = location.state?.product;
  const allProducts = location.state?.allProducts || [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-sans">
        Product not found.
      </div>
    );
  }
const handleChat = () => {
  // Just navigate to the chat room with productId
  navigate(`/chatroom/${product._id}`);
};

  return (
    <>
      {/* Navbar */}
      <Navbar showBottomNav={false} showMobileMenu={false} ShowMobileTop={false} />

      {/* Topbar for mobile */}
      <div className="flex justify-between items-center md:hidden sticky top-0 z-50 px-4 py-3 
                bg-gradient-to-b from-blue-400 to-white backdrop-blur-md shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-300 shadow-sm"
        >
          <FaArrowLeft className="text-white text-xl" />
        </button>

        <button
          onClick={() => navigate("/wishlist")}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-300 shadow-sm"
        >
          <FaHeart className="text-white text-xl" />
        </button>
      </div>

      {/* Product Details */}
      <div className="bg-gray-50 font-sans pb-32 md:pb-28">
        <section className="py-6 md:py-12 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 relative flex gap-4 overflow-x-auto rounded-xl snap-x snap-mandatory scroll-smooth"
          >
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.fields.Brand} ${product.fields.Model} ${idx + 1}`}
                  className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] object-cover rounded-xl flex-shrink-0 snap-center border border-gray-200"
                />
              ))
            ) : (
              <img
                src="/placeholder.png"
                alt="No image available"
                className="w-full h-full object-cover rounded-xl border"
              />
            )}

            {product.images && product.images.length > 0 && (
              <div className="hidden lg:flex absolute bottom-4 right-4 bg-black/60 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
                {product.images.length} Images
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col gap-5">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {product.category}
            </h2>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {product.fields.Brand} {product.fields.Model} {product.fields.Type}
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl text-blue-600 font-extrabold">
              ₹{Number(product.fields.Price).toLocaleString()}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 text-sm md:text-base rounded-full bg-blue-100 text-blue-700 font-medium">
                Year: {product.fields.Year || "Unknown"}
              </span>
              <span className="px-4 py-1.5 text-sm md:text-base rounded-full bg-gray-100 text-gray-600">
                Published: {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
                {product.fields.description || "No description provided."}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Make a Deal
              </button>

              <button
                onClick={handleChat}
                disabled={chatLoading}
                className={`px-6 py-3 font-semibold rounded-lg transition ${
                  chatLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {chatLoading ? "Opening Chat..." : "Chat with Seller"}
              </button>

              {chatError && (
                <p className="text-red-600 text-sm mt-2">{chatError}</p>
              )}
            </div>
          </div>
        </section>

        {/* Seller Section */}
        <section className="px-4 md:px-16 max-w-7xl mx-auto mb-6">
          <div
            onClick={() => navigate(`/seller/${product.sellerId}`)}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.seller?.avatar || "/placeholder-avatar.png"}
                alt={product.seller?.name || "Seller"}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border"
              />
              <div>
                <p className="text-gray-800 font-semibold text-sm md:text-base">
                  {product.seller?.name || "Unknown Seller"}
                </p>
                <p className="text-gray-500 text-xs md:text-sm">View Seller Details</p>
              </div>
            </div>
            <FaArrowRight className="text-gray-400 text-lg md:text-xl" />
          </div>
        </section>

        {/* Report Ad Section */}
        <section className="px-4 md:px-16 max-w-7xl mx-auto mb-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
            <div>
              <p className="text-gray-500 text-sm md:text-base">
                Ad ID: <span className="font-mono text-gray-800">{product._id}</span>
              </p>
            </div>
            <button
              onClick={() => alert(`Ad ID ${product._id} reported!`)}
              className="px-4 py-2 bg-red-600 text-white text-sm md:text-base rounded-xl hover:bg-red-700 transition"
            >
              Report Ad
            </button>
          </div>
        </section>

        {/* Map Section */}
        <section className="px-4 md:px-16 max-w-7xl mx-auto mb-20">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
            Location
          </h3>
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

        {/* Fixed Bottom Bar for mobile */}
        <div className="fixed md:hidden bottom-0 left-0 w-full bg-white shadow-lg border-t p-4 flex flex-row justify-center gap-4 z-50">
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition text-sm md:text-base">
            Make a Deal
          </button>

          <button
            onClick={handleChat}
            disabled={chatLoading}
            className={`flex-1 px-6 py-3 font-semibold rounded-2xl transition text-sm md:text-base ${
              chatLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {chatLoading ? "Opening Chat..." : "Chat with Seller"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;








































// {/* Recommended Products */}
//           {recommendedProducts.length > 0 && (
//             <div>
//               <h3 className="text-2xl font-bold text-blue-800 mb-4">Recommended Products</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//                 {recommendedProducts.map((item, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() =>
//                       navigate(`/product/${idx}`, { state: { product: item, allProducts } })
//                     }
//                     className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-40 md:h-48 object-cover"
//                     />
//                     <div className="p-3 md:p-4">
//                       <h4 className="text-base md:text-lg font-bold mb-1">{item.title}</h4>
//                       <p className="text-blue-600 font-semibold text-sm md:text-base">₹{item.price.toLocaleString()}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//  {/* Sidebar */}
//         <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
//           <div className="bg-white hidden md:block rounded-xl shadow p-4">
//             <h4 className="font-bold text-lg mb-4 text-blue-700">Categories</h4>
//             <ul className="space-y-2 text-gray-700 text-sm md:text-base">
//               <li>
//                 <Link to="/" className="hover:text-blue-600 transition">Home</Link>
//               </li>
//               {/* Add more static categories if needed */}
//             </ul>
//           </div>

//           <div className="bg-white rounded-xl hidden md:block shadow p-4 space-y-3">
//             <h4 className="font-bold text-lg text-blue-700">Sponsored Ads</h4>
//             {[...Array(2)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-100 h-32 md:h-40 flex items-center justify-center text-gray-500 rounded-lg text-sm md:text-base"
//               >
//                 Google Ad Space
//               </div>
//             ))}
//           </div>
//         </aside>