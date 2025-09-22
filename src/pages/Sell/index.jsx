// src/pages/AllCategorys.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { categoryData } from "../../data/categoryFields";
import Navbar from "../../components/Navbar";

const categoryIcons = {
  cars: "https://cdn-icons-png.flaticon.com/512/743/743007.png",
  motorcycles: "https://cdn-icons-png.flaticon.com/512/741/741407.png",
  "mobile-phones": "https://cdn-icons-png.flaticon.com/512/15/15874.png",
  furniture: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  electronics: "https://cdn-icons-png.flaticon.com/512/106/106855.png",
  "home-appliances": "https://cdn-icons-png.flaticon.com/512/1040/1040981.png",
  jobs: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  fashion: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
};

const AllCategorys = () => {
  const categories = Object.keys(categoryData);

  return (
   <>
   <Navbar ShowMobileTop={false}/>
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar for large devices */}

   <header className="flex items-center md:hidden bg-white px-4 py-3 shadow sticky top-0 z-50 mb-4">
          <Link to="/" className="text-gray-700 text-xl mr-4">
            <FaArrowLeft />
          </Link>
          <h1 className="text-lg p-0 font-semibold">Which service you like to provide</h1>
        </header>
      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Mobile Topbar */}
     

        {/* Grid for categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/sells/${cat}`}
              className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
            >
              <img
                src={categoryIcons[cat] || "https://cdn-icons-png.flaticon.com/512/616/616408.png"}
                alt={cat}
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="text-gray-700 font-semibold text-center">
                {cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div></>
    
  );
};

export default AllCategorys;
