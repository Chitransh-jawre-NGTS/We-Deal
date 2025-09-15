// src/pages/ProductDescription.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

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
      <div className="flex bg-white md-hidden sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-inner"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for products or locations..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </form>
      </div>

      {/* Product Details */}
      <div className="bg-gray-50 font-sans pb-24">
        <section className="md:py-16 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <main className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-6">
              {/* Images Carousel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex gap-2 overflow-x-auto rounded-xl"
              >
                {product.images && product.images.length > 0 ? (
                  product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.fields.Brand} ${product.fields.Model} ${idx + 1}`}
                      className="w-64 h-64 object-cover rounded-xl flex-shrink-0"
                    />
                  ))
                ) : (
                  <img
                    src="/placeholder.png"
                    alt="No image available"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </motion.div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-purple-800">
                  {product.fields.Brand} {product.fields.Model}
                </h2>
                <p className="text-2xl md:text-3xl text-purple-600 font-semibold">
                  ₹{Number(product.fields.Price).toLocaleString()}
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  Year: {product.fields.Year || "Unknown"}
                </p>
                <p className="text-gray-400 text-xs">
                  Published: {new Date(product.createdAt).toLocaleDateString()}
                </p>

                {/* Description */}
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-purple-700 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    {product.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </section>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t p-4 flex justify-center gap-4 z-50">
          <button className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition">
            Make a Deal
          </button>
          <button className="flex-1 px-6 py-3 bg-white border border-purple-600 text-purple-600 font-semibold rounded hover:bg-purple-50 transition">
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