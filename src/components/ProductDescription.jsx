// src/pages/ProductDescription.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import Navbar from "./Navbar";
import { chatApi } from "../api/chatApi"; // ✅ import the object

// ...



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery().get("query")?.toLowerCase() || "";
  const [searchInput, setSearchInput] = useState(query);

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

  return (
    <>
      {/* Topbar */}
      <Navbar showBottomNav={false} showMobileMenu={false} ShowMobileTop={false} />
      <div className="flex bg-white md:hidden sticky top-0 z-50 shadow-sm px-3 py-2 items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5"
        >
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products or locations..."
            className="w-full bg-transparent text-sm md:text-base focus:outline-none"
          />
        </form>
      </div>

      {/* Product Details */}
      <div className="bg-gray-50 font-sans pb-32 md:pb-28">
        <section className="py-6 md:py-12 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Left: Images */}
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

            {/* ✅ Total Images Counter (only visible on lg+) */}
            {product.images && product.images.length > 0 && (
              <div className="hidden lg:flex absolute bottom-4 right-4 bg-black/60 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
                {product.images.length} Images
              </div>
            )}
          </motion.div>


          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col gap-5">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {product.fields.Brand} {product.fields.Model}
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl text-purple-600 font-extrabold">
              ₹{Number(product.fields.Price).toLocaleString()}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 text-sm md:text-base rounded-full bg-purple-100 text-purple-700 font-medium">
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
                {product.description || "No description provided."}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
                Make a Deal
              </button>
              <button
                onClick={async () => {
                  try {
                    const productId = product._id;
                    let token = localStorage.getItem("token");
                    if (!token) {
                      const match = document.cookie.match(/token=([^;]+)/);
                      token = match ? match[1] : null;
                    }

                    const data = await findOrCreateByProduct(productId, token); // ✅ Fixed function call
                    const chatId = data._id;
                    navigate(`/chatroom/${chatId}`);
                  } catch (err) {
                    console.error("Error opening chat:", err);
                    alert(err.message);
                  }
                }}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Chat
              </button>
              {/* Safety Instructions */}
              <section className=" w-full ">
                <div className=" border-l-4 w-full border-blue-400 p-4 rounded-lg shadow-sm">
                  <h4 className="text-blue-800 font-semibold text-base md:text-lg mb-2">
                    Stay Safe When Buying & Selling
                  </h4>
                  <ul className="list-disc pl-5 text-gray-700 text-sm md:text-base space-y-1">
                    <li>Meet the seller in a safe, public place.</li>
                    <li>Never share sensitive personal information.</li>
                    <li>Inspect the product carefully before making payment.</li>
                    <li>Prefer cash on delivery or secure payment methods.</li>
                    <li>Trust your instincts — if something feels off, walk away.</li>
                  </ul>
                </div>
              </section>
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
              {/* Seller Avatar */}
              <img
                src={product.seller?.avatar || "/placeholder-avatar.png"}
                alt={product.seller?.name || "Seller"}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border"
              />
              {/* Seller Name */}
              <div>
                <p className="text-gray-800 font-semibold text-sm md:text-base">
                  {product.seller?.name || "Unknown Seller"}
                </p>
                <p className="text-gray-500 text-xs md:text-sm">View Seller Details</p>
              </div>
            </div>
            {/* Right Arrow Icon */}
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
              onClick={() => {
                alert(`Ad ID ${product._id} reported!`);
              }}
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



        {/* Fixed Bottom Bar */}
        <div className="fixed md:hidden bottom-0 left-0 w-full bg-white shadow-lg border-t p-4 flex flex-col md:flex-row justify-center gap-4 z-50">
          <button className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-2xl hover:bg-purple-700 transition text-sm md:text-base">
            Make a Deal
          </button>

          <button
            onClick={async () => {
              try {
                const productId = product._id;
                let token = localStorage.getItem("token");
                if (!token) {
                  const match = document.cookie.match(/token=([^;]+)/);
                  token = match ? match[1] : null;
                }

                const data = await chatApi.findOrCreateByProduct(productId, token);// ✅ Fixed function call
                const chatId = data._id;
                navigate(`/chatroom/${chatId}`);
              } catch (err) {
                console.error("Error opening chat:", err);
                alert(err.message);
              }
            }}
            className="flex-1 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-2xl hover:bg-purple-50 transition text-sm md:text-base"
          >
            Chat with Seller
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
//               <h3 className="text-2xl font-bold text-purple-800 mb-4">Recommended Products</h3>
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
//                       <p className="text-purple-600 font-semibold text-sm md:text-base">₹{item.price.toLocaleString()}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//  {/* Sidebar */}
//         <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
//           <div className="bg-white hidden md:block rounded-xl shadow p-4">
//             <h4 className="font-bold text-lg mb-4 text-purple-700">Categories</h4>
//             <ul className="space-y-2 text-gray-700 text-sm md:text-base">
//               <li>
//                 <Link to="/" className="hover:text-purple-600 transition">Home</Link>
//               </li>
//               {/* Add more static categories if needed */}
//             </ul>
//           </div>

//           <div className="bg-white rounded-xl hidden md:block shadow p-4 space-y-3">
//             <h4 className="font-bold text-lg text-purple-700">Sponsored Ads</h4>
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