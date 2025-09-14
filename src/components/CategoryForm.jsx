// src/pages/CategoryForm.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CategoryForm = () => {
  const { slug } = useParams();

  // You can map different fields based on category
  const formFields = {
    cars: ["Brand", "Model", "Year", "Price"],
    motorcycles: ["Brand", "Model", "Year", "Price"],
    "mobile-phones": ["Brand", "Model", "Storage", "Price"],
    "for-sale:-houses-&-apartments": ["Location", "Size (sq ft)", "Price"],
    scooters: ["Brand", "Model", "Year", "Price"],
    "commercial-&-other-vehicles": ["Type", "Brand", "Model", "Price"],
    "for-rent:-houses-&-apartments": ["Location", "Size", "Rent per month"],
  };

  const fields = formFields[slug] || ["Title", "Description", "Price"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="flex items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
        <Link to="/categories" className="text-gray-700 text-xl mr-4">
          <FaArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold capitalize">{slug.replace(/-/g, " ")}</h1>
      </header>

      {/* Dynamic Form */}
      <div className="p-4">
        <form className="space-y-4 bg-white p-4 rounded-lg shadow">
          {fields.map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{field}</label>
              <input
                type="text"
                placeholder={`Enter ${field}`}
                className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
