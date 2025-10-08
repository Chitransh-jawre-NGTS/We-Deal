// src/pages/StorePlan.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaInfinity } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";

export default function StorePlan() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 29,
      listings: "1 Listing",
      description: "Perfect for individual sellers posting one ad.",
      icon: <BsPostcard className="text-blue-600 text-3xl" />,
      benefits: [
        "1 active ad listing",
        "Standard visibility",
        "30-day validity",
      ],
    },
    {
      id: "unlimited",
      name: "Unlimited Plan",
      price: 799,
      listings: "Unlimited Listings",
      description:
        "Ideal for store owners posting multiple products anytime.",
      icon: <FaInfinity className="text-blue-600 text-3xl" />,
      benefits: [
        "Unlimited ad listings",
        "Featured placement",
        "Priority customer support",
        "Unlimited validity",
      ],
      recommended: true,
    },
  ];

  const handleBuyPlan = () => {
    if (!selectedPlan) return alert("Please select a plan first!");

    // Remove icon before navigation to avoid cloning error
    const { icon, ...planWithoutIcon } = plans.find((p) => p.id === selectedPlan);
    navigate("/store-plan/quantity", {
      state: { plan: planWithoutIcon },
    });
  };

  return (
    <div className="min-h-screen bg-white rounded-2xl p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Choose Your Store Plan
      </h1>
      <p className="text-center text-gray-700 mb-12 text-lg">
        Select a plan that fits your selling needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl shadow-lg p-8 border transition-transform transform hover:scale-105 cursor-pointer ${
              selectedPlan === plan.id
                ? "border-blue-500 bg-gradient-to-br from-blue-100 to-sky-50"
                : "border-gray-200 bg-white"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.recommended && (
              <div className="absolute -top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Recommended
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div>{plan.icon}</div>
              <h2 className="text-2xl font-bold text-blue-700">{plan.name}</h2>
            </div>

            <p className="text-gray-600 mb-4">{plan.description}</p>

            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-gray-800">
                {plan.listings}
              </span>
              <span className="text-3xl font-extrabold text-blue-700">
                ₹{plan.price}
              </span>
            </div>

            <ul className="mb-6 space-y-2">
              {plan.benefits.map((b, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <FaCheckCircle className="text-green-400 mr-2" /> {b}
                </li>
              ))}
            </ul>

            {selectedPlan === plan.id && (
              <div className="text-center mt-4 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md">
                Selected
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={handleBuyPlan}
          className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-shadow shadow-md"
        >
          Buy Plan
        </button>
      </div>
    </div>
  );
}
