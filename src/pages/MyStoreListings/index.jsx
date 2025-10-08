import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaToggleOn,
  FaToggleOff,
  FaBan,
  FaCheck,
} from "react-icons/fa";

// StatusBadge component
const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-semibold ${
      status === "Active"
        ? "bg-green-100 text-green-800"
        : status === "Inactive"
        ? "bg-red-100 text-red-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

const MyStoreListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch seller listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/store/my-ads", {
          headers: {
            "x-store-token": localStorage.getItem("storeToken"),
          },
        });
        setListings(res.data.ads || []);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Delete listing
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/store/delete/${id}`, {
        headers: {
          "x-store-token": localStorage.getItem("storeToken"),
        },
      });
      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Failed to delete listing. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (ad) => {
    try {
      setUpdatingId(ad._id);
      const newStatus = ad.status === "Active" ? "Inactive" : "Active";
      await axios.patch(
        `http://localhost:5000/api/store/deactivate/${ad._id}`,
        { status: newStatus },
        {
          headers: {
            "x-store-token": localStorage.getItem("storeToken"),
          },
        }
      );
      setListings((prev) =>
        prev.map((item) =>
          item._id === ad._id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter ads by tab
  const filteredListings = listings.filter((item) => {
    const status = item.status?.toLowerCase();
    if (activeTab === "active") return status === "active";
    if (activeTab === "inactive") return status === "inactive";
    return true; // all
  });

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading your listings...
      </p>
    );

  return (
    <div className="max-w-7xl bg-white rounded-2xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-700">
        My Store Listings
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {["all", "active", "inactive"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border ${
              activeTab === tab
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
            }`}
          >
            {tab === "all"
              ? "All Ads"
              : tab === "active"
              ? "Active Ads"
              : "Inactive Ads"}
          </button>
        ))}
      </div>

      {/* Listings */}
      {filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 text-gray-600">
          <FaBoxOpen className="text-6xl text-blue-400 mb-4" />
          <p className="text-lg font-medium mb-2">
            No {activeTab !== "all" ? activeTab + " " : ""}listings found.
          </p>
          <p className="text-sm text-gray-500">
            Start selling by adding your first product.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredListings.map((item) => (
            <div
              key={item._id}
              className={`bg-white rounded-xl shadow hover:shadow-xl transition p-5 border ${
                item.status === "Inactive" ? "opacity-70" : ""
              }`}
            >
              <img
                src={item.images?.[0] || "https://picsum.photos/300/200?random=1"}
                alt={`${item.brand} ${item.model}`}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.brand} {item.model}
                </h3>
                <StatusBadge status={item.status} />
              </div>
              <p className="text-gray-600 mb-2">Price: ₹{item.price}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-400 text-red-600 hover:bg-red-50 transition text-sm font-medium"
                >
                  <FaTrash /> Remove
                </button>
                <button
                  onClick={() => toggleStatus(item)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-yellow-400 text-yellow-700 hover:bg-yellow-50 transition text-sm font-medium"
                >
                  {item.status === "Active" ? (
                    <>
                      <FaBan /> Deactivate
                    </>
                  ) : (
                    <>
                      <FaToggleOn /> Activate
                    </>
                  )}
                </button>
                {item.status !== "Sold" && item.status !== "Inactive" && (
                  <button
                    onClick={() => toggleStatus({ ...item, status: "Sold" })}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-blue-400 text-blue-700 hover:bg-blue-50 transition text-sm font-medium"
                  >
                    <FaCheck /> Mark as Sold
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStoreListings;
