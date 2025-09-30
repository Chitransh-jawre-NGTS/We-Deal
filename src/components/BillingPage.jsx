import React, { useState } from "react";
import Navbar from "./Navbar";
import { paymentApi } from "../api/payment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const plans = [
  { name: "Base Plan", price: 15, features: ["1 Normal Listing"], type: "one-time" },
  { name: "Premium Plan", price: 30, features: ["Batch Listings", "Priority Placement"], type: "one-time", recommended: true },
];

const monthlyPlans = [
  { name: "Starter", price: 100, features: ["10 Listings / Month", "Basic Support"], type: "monthly" },
  { name: "Pro", price: 250, features: ["50 Listings / Month", "Priority Support", "Featured Ads"], type: "monthly", recommended: true },
];

const BillingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlanPurchase = async (planType) => {
    try {
      setLoading(true);
      const response = await paymentApi.activatePlan(planType);
      console.log("Plan activated:", response.data);
      toast.success("Plan activated! You can now post your ad.");
      navigate("/sell/image-upload"); // Redirect to ad creation
    } catch (err) {
      console.error(err);
      toast.error("Failed to activate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-black p-8 text-white">
        <h1 className="text-4xl font-extrabold mb-10 text-center tracking-wide">
          Choose Your Future Plan
        </h1>

        {/* One-time Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <div key={idx} className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              {plan.recommended && (
                <div className="absolute -top-4 right-4 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase shadow-lg">
                  Recommended
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <p className="text-3xl font-extrabold mb-6">₹{plan.price}</p>
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg before:content-['✓'] before:text-green-400">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                disabled={loading}
                onClick={() => handlePlanPurchase(plan.type)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-2xl font-bold text-lg text-black hover:scale-105 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>
            </div>
          ))}
        </div>

        {/* Monthly Plans */}
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
          Monthly Plans
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {monthlyPlans.map((plan, idx) => (
            <div key={idx} className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              {plan.recommended && (
                <div className="absolute -top-4 right-4 bg-green-400 text-black px-4 py-1 rounded-full text-sm font-semibold uppercase shadow-lg">
                  Best Value
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <p className="text-3xl font-extrabold mb-6">₹{plan.price} / Month</p>
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg before:content-['✓'] before:text-green-400">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                disabled={loading}
                onClick={() => handlePlanPurchase(plan.type)}
                className="w-full bg-gradient-to-r from-green-400 to-blue-400 py-3 rounded-2xl font-bold text-lg text-black hover:scale-105 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BillingPage;
