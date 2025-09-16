import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";


const SellProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Example: Get userId from localStorage (or props/context if you already store it differently)
const userId = ("68c835462d0f254471957f80"); // ✅ fixed

useEffect(() => {
  const fetchUserProducts = async () => {
    if (!userId) {
      setError("User ID not found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`http://localhost:5000/api/product/68c835462d0f254471957f80`, {
        withCredentials: true,
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  fetchUserProducts();
}, [userId]);


  return (
    <div className="max-h-screen bg-white pt-4 pb-40 md:pt-24 md:pb-10 px-4 md:px-6 max-w-[1400px] mx-auto">
      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-6 bg-white shadow-md p-3 fixed w-full left-0 top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">My Listings</h1>
      </div>

      {/* Content */}
      <div className="mt-20">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product._id}
                className={`bg-white p-5 rounded-xl border border-blue-300 shadow-md hover:shadow-lg transition flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${
                  product.status === "Deactive" ? "opacity-70 grayscale" : ""
                }`}
              >
                {/* Image + Info */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.fields?.Brand || product.name}
                    className="w-28 h-20 rounded-lg object-cover border border-blue-300"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold text-lg">
                      {product.fields?.Brand} {product.fields?.Model}
                    </p>
                    <p className="text-gray-500 text-sm">ID: {product._id}</p>
                    {/* Status + Timeline */}
                    <div className="flex flex-col items-start md:items-center">
                      <p
                        className={`flex items-center gap-1 font-medium ${
                          product.status === "Active"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {product.status === "Active" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        {product.status}
                      </p>
                      <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <Clock className="w-4 h-4" /> {product.timeline || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellProducts;
