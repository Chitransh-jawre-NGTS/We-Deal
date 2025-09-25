import React, { useState, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Categories } from "../data/categorys";
import DesktopNavbar from "./DextopNavbar";
import Navbar from "./Navbar";

const CategoryPage = () => {
  const [active, setActive] = useState("cars");
  const navigate = useNavigate();
  const sectionRefs = useRef({});

  const handleCategoryClick = (id) => {
    setActive(id);
    if (sectionRefs.current[id]) {
      sectionRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
     <Navbar ShowMobileTop={false} ShowBottomNav={false} />
      {/* Futuristic Top Navbar */}
      <div
        className="flex lg:hidden items-center gap-3 p-4 sticky top-0 z-50
        bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-md"
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200/70 transition"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-700 bg-clip-text">
          Categories
        </h1>
      </div>
     

      <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Sidebar (Always visible on large, scroll on small/medium) */}
        <aside
          className=" w-30  lg:w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 
          p-4 overflow-y-auto shadow-lg flex flex-col items-center space-y-6 
          scrollbar-hide"
        >
          {Categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`p-3 w-full rounded-2xl transition bg-blue-50 flex flex-col items-center group 
                ${
                  active === cat.id
                    ? "bg-gradient-to-br from-purple-500 to-cyan-400 text-white shadow-lg scale-110"
                    : "hover:bg-gray-100/70"
                }`}
              title={cat.name}
            >
              <img
                src={cat.icon}
                alt={cat.name}
                className="w-30 h-30 object-contain"
              />
              <span className="mt-1 text-xs text-gray-600 ">
                {cat.name}
              </span>
            </button>
          ))}
        </aside>

        {/* Products Section */}
        <main
          className="flex-1 p-6 overflow-y-auto scroll-smooth scrollbar-hide"
        >
          <div
            className="
              block lg:hidden
            "
          >
            {/* Mobile/Tablet: Scroll sections */}
            {Categories.map((cat) => (
              <div
                key={cat.id}
                ref={(el) => (sectionRefs.current[cat.id] = el)}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold text-gray-800 tracking-wide">
                    {cat.name}
                  </h3>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
                  {cat.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center text-center group cursor-pointer"
                      onClick={() =>
                        navigate(`/search?query=${product.name.toLowerCase()}`)
                      }
                    >
                      <div
                        className="w-20 h-20 rounded-full bg-blue-50 backdrop-blur-md 
                          flex items-center justify-center overflow-hidden shadow-md 
                          hover:shadow-xl hover:scale-105 transition relative"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-contain"
                        />
                        <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-cyan-400/50"></div>
                      </div>
                      <h4 className="mt-2 text-xs sm:text-sm text-gray-700 truncate w-20 opacity-80 group-hover:opacity-100 transition">
                        {product.name}
                      </h4>
                    </div>
                  ))}

                  {/* View All */}
                  <div className="flex flex-col items-center justify-center cursor-pointer hover:text-purple-600 transition group">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg hover:scale-110 transition">
                      <FaArrowRight className="text-white text-lg" />
                    </div>
                    <span className="mt-2 text-xs sm:text-sm text-gray-600 group-hover:text-gray-800">
                      View All
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="
              hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-8
            "
          >
            {/* Large: Show all categories in grid side by side */}
            {Categories.map((cat) => (
              <div key={cat.id} className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{cat.name}</h3>
                <div className="grid grid-cols-3 gap-4">
                  {cat.products.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center text-center group cursor-pointer"
                      onClick={() =>
                        navigate(`/search?query=${product.name.toLowerCase()}`)
                      }
                    >
                      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shadow hover:scale-105 transition">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <h4 className="mt-2 text-xs text-gray-700 truncate w-16">{product.name}</h4>
                    </div>
                  ))}

                  {/* View All */}
                  <div className="flex flex-col items-center justify-center cursor-pointer hover:text-purple-600 transition group">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg hover:scale-110 transition">
                      <FaArrowRight className="text-white text-sm" />
                    </div>
                    <span className="mt-2 text-xs text-gray-600 group-hover:text-gray-800">
                      View All
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
