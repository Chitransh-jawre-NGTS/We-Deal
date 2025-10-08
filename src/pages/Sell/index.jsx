// src/pages/AllCategorys.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { categoryData } from "../../data/categoryFields";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ✅ Import all images directly
import carsImg from "../../assets/images/categoryimage/swift-exterior-right-front-three-quarter-31.webp";
import motorcyclesImg from "../../assets/images/categoryimage/yamaha-fz-x-ride-free-bike-500x500.webp";
import mobilesImg from "../../assets/images/categoryimage/mobiles.webp";
import furnitureImg from "../../assets/images/categoryimage/furniture.webp";
import scootersImg from "../../assets/images/categoryimage/scooty.jpg";
import electronicsImg from "../../assets/images/categoryimage/electronics.jpg";
import homeAppliancesImg from "../../assets/images/categoryimage/kitchen-appliances-banner.png";
import fashionImg from "../../assets/images/categoryimage/fashion.jpg";

// ✅ Use imported variables instead of string paths
const categoryIcons = {
  cars: carsImg,
  motorcycles: motorcyclesImg,
  "mobile-phones": mobilesImg,
  furniture: furnitureImg,
  scooters: scootersImg,
  electronics: electronicsImg,
  "home-appliances": homeAppliancesImg,
  fashion: fashionImg,
};

const AllCategorys = () => {
  const categories = Object.keys(categoryData);

  return (
    <>
      <Navbar ShowMobileTop={false} />

        {/* Header for mobile */}
        <header className="flex items-center lg:hidden bg-white px-4 py-3 shadow sticky top-0 z-50 mb-4">
          <Link to="/" className="text-gray-700 text-xl mr-4">
            <FaArrowLeft />
          </Link>
          <h1 className="text-lg p-0 font-semibold">
            Which service you like to provide
          </h1>
        </header>
      <div className="bg-gray-50 flex flex-col md:flex-row">


        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/sells/${cat}`}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
              >
                <img
                  src={
                    categoryIcons[cat] ||
                    "https://cdn-icons-png.flaticon.com/512/616/616408.png"
                  }
                  alt={cat}
                  className="w-40 h-40 object-contain mb-3"
                />
                <span className="text-gray-700 font-semibold text-center">
                  {cat
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default AllCategorys;
