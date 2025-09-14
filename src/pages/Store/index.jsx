// src/pages/Store.jsx
import React from "react";
import { FaStore, FaClock } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const Store = () => {
  return (
   <>
   <Navbar/>
    <div className="h-100 flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
            <FaStore className="text-4xl" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Not Serving in Your Area Yet
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Don’t worry, we’re expanding quickly 🚀  
          Soon we’ll be available in your city to serve you better.
        </p>
        <button className="w-full py-2 flex items-center justify-center gap-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
          <FaClock />
          Coming Soon
        </button>
      </div>
    </div>
    </>
  );
};

export default Store;
