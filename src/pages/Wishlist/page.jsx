import React, { useState } from "react";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";


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

  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="max-h-screen border border-gray-300 mt-2 pb-24 px-4 md:px-6 max-w-[1200px] mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Wishlist
      </h1> */}

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 mt-20 text-lg">
          Your wishlist is empty 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
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
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-blue-600 font-bold mt-1">{item.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex ms-auto items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    <FaTrashAlt />
                    Remove
                  </button>
                  {/* <Link
                    to={`/product/${item.category}/${item.id}`}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                  >
                    <FaShoppingCart />
                    View
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
