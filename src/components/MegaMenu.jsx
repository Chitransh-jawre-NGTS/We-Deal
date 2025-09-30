// src/components/MegaMenu.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Categories } from "../data/categorys";

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="relative hidden md:flex items-center gap-6 px-6 py-2 bg-gray-50 border-t border-gray-200">
      {Categories.map((category) => (
        <div
          key={category.id}
          className="relative group"
          onMouseEnter={() => setActiveCategory(category.id)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          {/* Category Name with Icon */}
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium text-sm transition">
            <img
              src={category.icon}
              alt={category.name}
              className="w-6 h-6 rounded object-cover"
            />
            {category.name}
          </button>

          {/* Mega Dropdown */}
          {activeCategory === category.id && (
            <div className="absolute left-0 top-full mt-2 w-[600px] bg-white shadow-lg rounded-lg p-6 grid grid-cols-3 gap-4 z-50 animate-fadeIn">
              {category.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/category/${category.id}/product/${product.id}`}
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <img
                    src={product.brandLogo}
                    alt={product.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Store Button */}
      <Link
        to="/store"
        className="ml-auto px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-md hover:bg-blue-700 transition"
      >
        Store
      </Link>
    </div>
  );
};

export default MegaMenu;
