// src/pages/ListingDetails.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ListingDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = state?.product;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p>Product details not found 😢</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center gap-4 p-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          Product Details
        </h1>
      </div>

      {/* Product Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.fields?.Brand || product.name}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {product.fields?.Brand} {product.fields?.Model}
        </h2>
        <p className="text-lg text-blue-600 font-semibold mb-4">
          ₹{Number(product.fields?.Price || 0).toLocaleString()}
        </p>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Category:</span>{" "}
            {product.category || "—"}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            {product.status || "—"}
          </p>
          <p>
            <span className="font-medium">Timeline:</span>{" "}
            {product.timeline || "—"}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {product.fields?.Description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
