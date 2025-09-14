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
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="bg-gray-50 lg:hidden font-sans">
      <section className="py-12 md:py-16 px-4 md:px-16 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-purple-800 mb-4 md:mb-6">
          Explore Categories
        </h2>
        <p className="text-gray-700 text-sm md:text-lg max-w-xl md:max-w-2xl mx-auto mb-8">
          Browse through our categories to find what you are looking for. Click on any category to explore related items.
        </p>

        {/* Horizontal scroll with 2 rows */}
        <div className="overflow-x-auto">
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleClick(cat.name)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl w-32 md:w-40 flex flex-col items-center justify-center p-4"
                >
                  <div className="text-purple-700 text-4xl md:text-5xl mb-2">
                    <Icon />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-purple-700">
                    {cat.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
