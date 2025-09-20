import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Package } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import { productApi } from "../../api/product";

const SellProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteProductId, setDeleteProductId] = useState(null); // product to delete
  const [showModal, setShowModal] = useState(false);

  const userId = "68c835462d0f254471957f80"; // Example userId

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
        const res = await productApi.getUserProducts(userId);
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

  // Trigger modal
  const confirmDelete = (productId) => {
    setDeleteProductId(productId);
    setShowModal(true);
  };

  // Delete product after confirmation
  const handleDelete = async () => {
    if (!deleteProductId) return;

    try {
      await productApi.delete(deleteProductId);
      setProducts((prev) => prev.filter((p) => p._id !== deleteProductId));
      setShowModal(false);
      setDeleteProductId(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 relative">
      {/* Top Bar */}
      <div className="flex items-center gap-4 bg-white shadow-md p-4 fixed w-full left-0 top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">My Listings</h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24">
        {loading ? (
          <p className="text-center text-gray-500 mt-20">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-20">{error}</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center mt-24 text-center">
            <Package className="w-20 h-20 text-gray-400 mb-4" />
            <h2 className="text-lg md:text-2xl font-semibold text-gray-700">
              No Listings Yet
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-md mt-2">
              Looks like you haven’t listed any products yet. Start selling your
              items today and reach thousands of buyers!
            </p>
            <button
              onClick={() => navigate("/sell")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Post a Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className={`bg-white p-5 rounded-xl border border-blue-300 shadow-md hover:shadow-lg transition flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${
                  product.status === "Deactive" ? "opacity-70 grayscale" : ""
                }`}
              >
                {/* Image + Info */}
                <Link
                  to={`/my-listings/${product._id}`}
                  state={{ product }}
                  className="flex items-center gap-4 flex-1 cursor-pointer"
                >
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
                    <p
                      className={`flex items-center gap-1 font-medium ${
                        product.status === "Active" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {product.status}
                    </p>
                  </div>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => confirmDelete(product._id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Overlay Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellProducts;
