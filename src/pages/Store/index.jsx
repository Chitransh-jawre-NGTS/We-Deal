// src/pages/Store.jsx
import React from "react";
import { FaStore, FaClock } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const Store = () => {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')",
        }}
      >
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 max-w-lg w-full transform transition duration-300 hover:scale-105">
          {/* Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-inner">
              <FaStore className="text-5xl animate-bounce" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            Not Serving in Your Area Yet
          </h1>

          {/* Subtitle */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            Don’t worry, we’re expanding quickly 🚀  
            Soon we’ll be available in your city to serve you better.
          </p>

          {/* Coming Soon Button */}
          <button className="w-full py-3 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
            <FaClock className="animate-spin-slow" />
            Coming Soon
          </button>
        </div>

        {/* Footer / Extra Note */}
        <p className="relative z-10 mt-10 text-white/80 text-sm">
          📍 Stay tuned for updates in your area.
        </p>
      </div>
    </>
  );
};

export default Store;
