// src/pages/StorePlanQuantity.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png"; // Replace with your logo

export default function StorePlanQuantity() {
  const location = useLocation();
  const { plan } = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!plan) return <p className="text-center mt-10">No plan selected.</p>;

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Price calculations
  const baseTotal = plan.price * quantity;
  const gst = +(baseTotal * 0.18).toFixed(2); // 18% GST
  const platformFee = 1;
  const totalPrice = baseTotal + gst + platformFee;

  const handleBuy = async () => {
    setLoading(true);
    try {
      // Replace with your backend API endpoint
      const { data } = await axios.post("http://localhost:5000/api/plans/purchase", {
        planId: plan.id,
        quantity,
        baseTotal,
        gst,
        platformFee,
        totalPrice,
      });

      if (data.success) {
        alert(`✅ Order Created Successfully!\nOrder ID: ${data.orderId}`);
        // TODO: Redirect to payment gateway page (e.g. Razorpay)
      } else {
        alert("❌ Failed to create order.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-center">
        <img src={logo} alt="Company Logo" className="h-12 md:h-14" />
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-8 text-center">
          Confirm Your Plan
        </h1>

        <div className="bg-white border border-gray-400 shadow-xl p-8 max-w-lg w-full hover:shadow-purple-400 transition">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-4">
            {plan.name}
          </h2>
          <p className="text-gray-600 mb-6">{plan.description}</p>

          {/* Quantity selector */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-800 font-semibold text-lg">
              Select Quantity:
            </span>
            <div className="flex items-center border rounded-xl border-gray-300 overflow-hidden">
              <button
                onClick={decrement}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-bold"
              >
                -
              </button>
              <span className="px-6 text-lg font-semibold">{quantity}</span>
              <button
                onClick={increment}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-4 text-gray-800">
            <div className="flex justify-between mb-1">
              <span>Base Price:</span>
              <span>₹{baseTotal}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>GST (18%):</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Platform Fee:</span>
              <span>₹{platformFee}</span>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center mb-6 text-lg md:text-xl">
            <span className="font-bold text-gray-800">Total Price:</span>
            <span className="text-2xl md:text-3xl font-extrabold text-purple-700">
              ₹{totalPrice}
            </span>
          </div>

          <button
            onClick={handleBuy}
            disabled={loading}
            className={`w-full py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700 transition"
            }`}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </main>

      <footer className="bg-white shadow-inner py-6 mt-auto text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </footer>
    </div>
  );
}
