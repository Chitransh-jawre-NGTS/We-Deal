import React, { useState } from "react";
import { FaTrash, FaBan, FaCheck, FaBoxOpen, FaMobileAlt } from "react-icons/fa";

const DashboardPage = () => {
  const [activeListings, setActiveListings] = useState([
    {
      id: 1,
      brand: "Apple",
      model: "iPhone 13",
      price: 70000,
      status: "Active",
    },
    {
      id: 2,
      brand: "Samsung",
      model: "Galaxy S22",
      price: 50000,
      status: "Active",
    },
  ]);

  const [bookedMobiles, setBookedMobiles] = useState([
    {
      id: 3,
      brand: "OnePlus",
      model: "OnePlus 11",
      price: 45000,
      bookedBy: "Rahul Sharma",
      status: "Booked",
    },
  ]);

  const removeListing = (id) => {
    setActiveListings(activeListings.filter((item) => item.id !== id));
  };

  const deactivateListing = (id) => {
    setActiveListings(
      activeListings.map((item) =>
        item.id === id ? { ...item, status: "Deactivated" } : item
      )
    );
  };

  const markAsSold = (id) => {
    const soldItem = activeListings.find((item) => item.id === id);
    if (soldItem) {
      setActiveListings(activeListings.filter((item) => item.id !== id));
      setBookedMobiles([
        ...bookedMobiles,
        { ...soldItem, bookedBy: "Sold", status: "Sold" },
      ]);
    }
  };

  // Status badge component
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
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${color}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-white rounded-2xl min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Seller Dashboard
      </h1>

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
            <h2 className="text-xl font-semibold text-gray-800">
              {bookedMobiles.length}
            </h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
          <FaTrash className="text-blue-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Sold/Removed</p>
            <h2 className="text-xl font-semibold text-gray-800">
              {
                bookedMobiles.filter((item) => item.status === "Sold")
                  .length
              }
            </h2>
          </div>
        </div>
      </div>

      {/* Active Listings */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Active Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeListings.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow hover:shadow-xl transition p-5 border ${
                item.status === "Deactivated" ? "opacity-70" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.brand} {item.model}
                </h3>
                <StatusBadge status={item.status} />
              </div>
              <p className="text-gray-600 mb-2">Price: ₹{item.price}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => removeListing(item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-400 text-red-600 hover:bg-red-50 transition text-sm font-medium"
                >
                  <FaTrash /> Remove
                </button>
                {item.status === "Active" && (
                  <>
                    <button
                      onClick={() => deactivateListing(item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-yellow-400 text-yellow-700 hover:bg-yellow-50 transition text-sm font-medium"
                    >
                      <FaBan /> Deactivate
                    </button>
                    <button
                      onClick={() => markAsSold(item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-blue-400 text-blue-700 hover:bg-blue-50 transition text-sm font-medium"
                    >
                      <FaCheck /> Mark as Sold
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {activeListings.length === 0 && (
            <div className="col-span-full text-center py-10">
              <FaBoxOpen className="mx-auto text-gray-400 text-4xl mb-2" />
              <p className="text-gray-500">No active listings available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Current Bookings */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Current Bookings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedMobiles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition p-5 border"
            >
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
          ))}
          {bookedMobiles.length === 0 && (
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
