// src/pages/MyStoreListings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyStoreListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
      // Remove the deleted item from the state
      setListings(listings.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Failed to delete listing. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading your listings...</p>;

  return (
    <div className="max-w-7xl bg-white rounded-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>

      {listings.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">You have no listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={item.images[0] || "https://via.placeholder.com/300"}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg line-clamp-2">{item.brand} {item.model}</h2>
                <h2 className="font-semibold text-lg line-clamp-2">{item.title}</h2>
                <p className="text-blue-600 font-bold mt-2">₹{item.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-1">
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className={`flex-1 px-3 py-2 text-white rounded-lg flex items-center justify-center gap-1 ${
                      deletingId === item._id ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    <FaTrash /> {deletingId === item._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStoreListings;
