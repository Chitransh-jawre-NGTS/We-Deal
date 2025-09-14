// src/pages/AllCategorys.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Example category data with images
const categories = [
  { name: "Cars", img: "https://cdn-icons-png.flaticon.com/512/743/743007.png" },
  { name: "Motorcycles", img: "https://cdn-icons-png.flaticon.com/512/741/741407.png" },
  { name: "Mobile Phones", img: "https://cdn-icons-png.flaticon.com/512/15/15874.png" },
  { name: "For Sale: Houses & Apartments", img: "https://cdn-icons-png.flaticon.com/512/619/619153.png" },
  { name: "Scooters", img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png" },
  { name: "Commercial & Other Vehicles", img: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png" },
  { name: "For Rent: Houses & Apartments", img: "https://cdn-icons-png.flaticon.com/512/1040/1040981.png" },
];

const AllCategorys = () => {
  return (
    <div className="md:hidden min-h-screen bg-gray-50">
      {/* Topbar with back button */}
      <header className="flex items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
        <Link to="/" className="text-gray-700 text-xl mr-4">
          <FaArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold">Which service you like to provide</h1>
      </header>

      {/* Category grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={`/sells/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition"
          >
            <img src={cat.img} alt={cat.name} className="w-12 h-12 object-contain mb-2" />
            <span className="text-sm font-medium text-gray-700 text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategorys;
