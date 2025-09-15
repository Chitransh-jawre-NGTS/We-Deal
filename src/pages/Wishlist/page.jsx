import React, { useState } from "react";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const sampleWishlist = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    price: "₹90,000",
    image: "https://picsum.photos/seed/iphone14/300/200",
    category: "Mobiles",
  },
  {
    id: 2,
    title: "Maruti Swift",
    price: "₹5,00,000",
    image: "https://picsum.photos/seed/swift/300/200",
    category: "Cars",
  },
  {
    id: 3,
    title: "Sofa Set",
    price: "₹25,000",
    image: "https://picsum.photos/seed/sofa/300/200",
    category: "Furniture",
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(sampleWishlist);
  const navigate = useNavigate();

  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center gap-4 p-4 md:p-6">
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

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24">
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 text-lg">
            Your wishlist is empty 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                {/* Product Image */}
                <Link to={`/product/${item.category}/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover hover:scale-105 transition"
                  />
                </Link>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-blue-600 font-bold mt-1">{item.price}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm md:text-base"
                    >
                      <FaTrashAlt />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
