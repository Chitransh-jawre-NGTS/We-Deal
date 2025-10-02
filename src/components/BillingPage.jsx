import React, { useState } from "react";
import { paymentApi } from "../api/payment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Shield, Zap, Users, Info, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Base Plan",
    originalPrice: 20,
    discount: 25,
    features: ["1 Normal Listing", "Visibility 7 Days", "Basic Support"],
    planType: "base", // ✅ Updated
  },
  {
    name: "Premium Plan",
    originalPrice: 50,
    discount: 40,
    features: ["Unlimited Listings", "Priority Placement", "Featured Tag", "24/7 Premium Support"],
    planType: "premium", // ✅ Updated
    recommended: true,
  },
];

const BillingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Handle plan purchase
  const handlePlanPurchase = async (planType) => {
    try {
      setLoading(true);
      await paymentApi.activatePlan(planType); // send "base" or "premium"
      toast.success("🎉 Plan activated! You can now post your ad.");
      navigate("/sell/image-upload", { state: { planType } }); // pass planType to next page
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to activate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate discounted price
  const getDiscountedPrice = (originalPrice, discount) => {
    return Math.round(originalPrice - (originalPrice * discount) / 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white z-50 fixed top-0 left-0 w-full shadow-md py-4 px-6 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">Billing Page</h1>
      </nav>

      {/* Hero Section */}
      <section className="relative mt-18 lg:mt-0 bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 text-white py-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Take Your Selling to the Next Level
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Choose a plan that suits your business. Gain visibility, attract serious
            buyers, and maximize your sales with our powerful tools.
          </p>
          <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition">
            Learn More
          </button>
        </div>
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Choose Your Plan
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {plans.map((plan, idx) => {
            const discountedPrice = getDiscountedPrice(plan.originalPrice, plan.discount);
            return (
              <div
                key={idx}
                className={`relative backdrop-blur-xl bg-white/80 rounded-3xl shadow-lg p-10 border transition-transform hover:-translate-y-3 hover:shadow-2xl ${
                  plan.recommended
                    ? "border-blue-500 ring-2 ring-blue-400"
                    : "border-gray-200"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-5 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase shadow-md">
                    Best Value
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-4 text-gray-900">{plan.name}</h3>

                <div className="mb-6">
                  <p className="text-gray-500 line-through text-lg">
                    ₹{plan.originalPrice}
                  </p>
                  <p className="text-5xl font-extrabold text-blue-600">
                    ₹{discountedPrice}
                    <span className="text-lg text-green-600 font-medium ml-2">
                      -{plan.discount}%
                    </span>
                  </p>
                  <span className="text-gray-500 font-medium">/one-time</span>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  disabled={loading}
                  onClick={() => handlePlanPurchase(plan.planType)} // ✅ pass planType
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Buy Now"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14 text-gray-800">
            Why Upgrade With Us?
          </h2>
          <div className="grid md:grid-cols-4 gap-10">
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Wider Reach</h3>
              <p className="text-gray-600">Reach thousands of potential buyers daily.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Priority Placement</h3>
              <p className="text-gray-600">
                Premium listings appear at the top of search results.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <Shield className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trusted Platform</h3>
              <p className="text-gray-600">
                Secure transactions and verified users ensure safe selling.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <Info className="w-10 h-10 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">Our support team is available 24/7 to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">We-Deal</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BillingPage;
