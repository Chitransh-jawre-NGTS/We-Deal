import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaCarSide,
  FaCouch,
  FaBriefcase,
  FaTshirt,
  FaTv,
  FaBlender,
  FaBasketballBall,
} from "react-icons/fa";

const categories = [
  { name: "Mobiles", icon: FaMobileAlt },
  { name: "Cars", icon: FaCarSide },
  { name: "Furniture", icon: FaCouch },
  { name: "Jobs", icon: FaBriefcase },
  { name: "Fashion", icon: FaTshirt },
  { name: "Electronics", icon: FaTv },
  { name: "Home Appliances", icon: FaBlender },
  { name: "Sports", icon: FaBasketballBall },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/categorydetails`);
  };

  // Duplicate categories for infinite scroll effect
  const infiniteCategories = [...categories, ...categories];

  return (
    <div className="bg-gray-50 font-sans">
      <section className="py-2 md:py-16 px-4 md:px-16 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-800 mb-4 md:mb-6">
          Explore Categories
        </h2>
        <p className="text-gray-700 text-sm md:text-lg max-w-xl md:max-w-2xl mx-auto mb-2">
          Browse through our categories to find what you are looking for. Click on any category to explore related items.
        </p>

        {/* Small & medium devices: infinite horizontal scroll carousel */}
        <div className="lg:hidden overflow-x-auto py-2 scroll-smooth snap-x snap-mandatory">
          <div className="flex gap-4">
            {infiniteCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleClick(cat.name)}
                  className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl w-32 flex flex-col items-center justify-center p-4 flex-shrink-0 snap-center"
                >
                  <div className="text-blue-700 text-4xl mb-2">
                    <Icon />
                  </div>
                  <h3 className="text-xs font-bold text-blue-700">{cat.name}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Large devices: grid layout */}
        <div className="hidden lg:grid grid-cols-4 gap-6 justify-items-center">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => handleClick(cat.name)}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl w-48 flex flex-col items-center justify-center p-4"
              >
                <div className="text-blue-700 text-6xl mb-2">
                  <Icon />
                </div>
                <h3 className="text-base font-bold text-blue-700">{cat.name}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Categories;
