import React, { useState, useEffect } from "react";
import { FaTrash, FaBan, FaCheck, FaBoxOpen, FaMobileAlt } from "react-icons/fa";
import { getStoreAds, removeAd, updateAdStatus } from "../api/storeApi/dashboard";

const DashboardPage = () => {
  const [activeListings, setActiveListings] = useState([]);
  const [bookedMobiles, setBookedMobiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const storeToken = localStorage.getItem("storeToken");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const ads = await getStoreAds(storeToken);

        // Infer status if not present
        const adsWithStatus = ads.map((ad) => ({
          ...ad,
          status: ad.status || (ad.bookedBy ? "Booked" : "Active"),
        }));

        const active = adsWithStatus.filter((item) => item.status === "Active");
        const booked = adsWithStatus.filter(
          (item) => item.status === "Booked" || item.status === "Sold"
        );

        setActiveListings(active);
        setBookedMobiles(booked);
      } catch (err) {
        console.error("Error fetching ads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [storeToken]);

  const removeListing = async (id) => {
    try {
      await removeAd(id, storeToken);
      setActiveListings(activeListings.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to remove listing:", err);
    }
  };

  const deactivateListing = async (id) => {
    try {
      await updateAdStatus(id, "Deactivated", storeToken);
      setActiveListings(
        activeListings.map((item) =>
          item._id === id ? { ...item, status: "Deactivated" } : item
        )
      );
    } catch (err) {
      console.error("Failed to deactivate listing:", err);
    }
  };

  const markAsSold = async (id) => {
    try {
      const soldItem = activeListings.find((item) => item._id === id);
      if (!soldItem) return;

      await updateAdStatus(id, "Sold", storeToken);
      setActiveListings(activeListings.filter((item) => item._id !== id));
      setBookedMobiles([
        ...bookedMobiles,
        { ...soldItem, bookedBy: "Sold", status: "Sold" },
      ]);
    } catch (err) {
      console.error("Failed to mark as sold:", err);
    }
  };

  const StatusBadge = ({ status }) => {
    let color =
      status === "Active"
        ? "bg-green-100 text-green-700"
        : status === "Deactivated"
        ? "bg-gray-200 text-gray-700"
        : status === "Sold"
        ? "bg-blue-100 text-blue-700"
        : status === "Booked"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-800";

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${color}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading your listings...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-2xl min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Seller Dashboard</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <FaMobileAlt className="text-blue-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Total Listings</p>
            <h2 className="text-xl font-semibold text-gray-800">
              {activeListings.length + bookedMobiles.length}
            </h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <FaCheck className="text-green-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Active</p>
            <h2 className="text-xl font-semibold text-gray-800">
              {activeListings.filter((item) => item.status === "Active").length}
            </h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <FaBoxOpen className="text-yellow-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Booked</p>
            <h2 className="text-xl font-semibold text-gray-800">{bookedMobiles.length}</h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <FaTrash className="text-blue-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Sold/Removed</p>
            <h2 className="text-xl font-semibold text-gray-800">
              {bookedMobiles.filter((item) => item.status === "Sold").length}
            </h2>
          </div>
        </div>
      </div>

      {/* Active Listings */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Active Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeListings.length > 0 ? (
            activeListings.map((item) => (
              <div
                key={item._id}
                className={`bg-white rounded-xl shadow hover:shadow-xl transition p-5 border ${
                  item.status === "Deactivated" ? "opacity-70" : ""
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
                    onClick={() => removeListing(item._id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-400 text-red-600 hover:bg-red-50 transition text-sm font-medium"
                  >
                    <FaTrash /> Remove
                  </button>
                  {item.status === "Active" && (
                    <>
                      <button
                        onClick={() => deactivateListing(item._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-yellow-400 text-yellow-700 hover:bg-yellow-50 transition text-sm font-medium"
                      >
                        <FaBan /> Deactivate
                      </button>
                      <button
                        onClick={() => markAsSold(item._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-blue-400 text-blue-700 hover:bg-blue-50 transition text-sm font-medium"
                      >
                        <FaCheck /> Mark as Sold
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <FaBoxOpen className="mx-auto text-gray-400 text-4xl mb-2" />
              <p className="text-gray-500">No active listings available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Current Bookings */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Bookings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedMobiles.length > 0 ? (
            bookedMobiles.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition p-5 border"
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
                <p className="text-gray-600">
                  Booked By: <span className="font-medium">{item.bookedBy}</span>
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <FaBoxOpen className="mx-auto text-gray-400 text-4xl mb-2" />
              <p className="text-gray-500">No bookings yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
