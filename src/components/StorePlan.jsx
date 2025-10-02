// src/pages/StorePlan.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function StorePlan() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      id: "base",
      name: "Base Plan",
      items: 1,
      price: 10,
      description: "Post 1 mobile ad with standard listing.",
      benefits: ["Standard ad visibility", "30-day validity"],
    },
    {
      id: "premium",
      name: "Premium Plan",
      items: 1,
      price: 19,
      description: "Post 1 mobile ad with batch upload and featured listing.",
      benefits: ["Featured listing", "Batch upload", "Priority support", "30-day validity"],
      recommended: true,
    },
  ];

  const handleBuyPlan = () => {
    if (!selectedPlan) return alert("Please select a plan first!");
    // Navigate to Quantity Page with selected plan info
    navigate("/store-plan/quantity", { state: { plan: plans.find(p => p.id === selectedPlan) } });
  };

  return (
    <div className="min-h-screen bg-white rounded-2xl p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-700">Upgrade Your Store Plan</h1>
      <p className="text-center text-gray-700 mb-12 text-lg">
        Your free ad limit is over. Choose a plan to continue posting your mobile ads.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl shadow-lg p-8 border transition-transform transform hover:scale-105 cursor-pointer
              ${selectedPlan === plan.id ? "border-purple-500 bg-gradient-to-br from-purple-100 to-yellow-50" : "border-gray-200 bg-white"}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.recommended && (
              <div className="absolute -top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Recommended
              </div>
            )}

            <h2 className="text-2xl font-bold text-purple-700 mb-3">{plan.name}</h2>
            <p className="text-gray-600 mb-6">{plan.description}</p>

            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-gray-800">{plan.items} Item</span>
              <span className="text-2xl font-extrabold text-purple-700">₹{plan.price}</span>
            </div>

            <ul className="mb-6 space-y-2">
              {plan.benefits.map((b, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <FaCheckCircle className="text-yellow-400 mr-2" /> {b}
                </li>
              ))}
            </ul>

            {selectedPlan === plan.id && (
              <div className="text-center mt-4 py-2 bg-purple-600 text-white font-semibold rounded-xl shadow-md">
                Selected
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={handleBuyPlan}
          className="bg-purple-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-purple-700 transition-shadow shadow-md"
        >
          Buy Plan
        </button>
      </div>
    </div>
  );
}
