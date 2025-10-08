// src/pages/Transactions.jsx
import React, { useEffect, useState } from "react";
import { FaReceipt, FaArrowLeft } from "react-icons/fa";
import { paymentApi } from "../api/payment"; // your API to fetch transactions
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await paymentApi.getMyTransactions(); // fetch user payments
      setTransactions(data.payments || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-md py-3 px-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Transactions</h1>
      </header>

      {/* Main content */}
      <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
          <FaReceipt className="text-blue-600" /> Transaction History
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No transactions yet.</p>
        ) : (
          <>
            {/* Desktop / Tablet Table */}
            <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white p-4">
              <table className="min-w-full border-collapse">
                <thead className="bg-blue-100 text-blue-900">
                  <tr>
                    {["Txn ID", "Plan", "Qty", "Amount", "GST", "Platform Fee", "Total", "Date"].map((head) => (
                      <th
                        key={head}
                        className="py-3 px-4 text-left font-semibold uppercase text-sm"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, index) => (
                    <tr
                      key={txn._id}
                      className={`transition hover:bg-blue-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-blue-50/50"
                      }`}
                    >
                      <td className="py-3 px-4 font-medium">{txn.razorpayPaymentId}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                            txn.planId?.name === "Premium Plan" ? "bg-blue-700" : "bg-sky-500"
                          }`}
                        >
                          {txn.planId?.name || txn.planType}
                        </span>
                      </td>
                      <td className="py-3 px-4">{txn.quantity || 1}</td>
                      <td className="py-3 px-4">₹{txn.amount}</td>
                      <td className="py-3 px-4">₹{txn.gst || 0}</td>
                      <td className="py-3 px-4">₹{txn.platformFee || 0}</td>
                      <td className="py-3 px-4 font-bold text-blue-700">₹{txn.totalAmount}</td>
                      <td className="py-3 px-4">{new Date(txn.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {transactions.map((txn) => (
                <div
                  key={txn._id}
                  className="border border-blue-200 rounded-xl shadow-md p-4 bg-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-blue-700">{txn.planId?.name || txn.planType}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        txn.planId?.name === "Premium Plan" ? "bg-blue-700" : "bg-sky-500"
                      }`}
                    >
                      {txn.planId?.name || txn.planType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Txn ID: {txn.razorpayPaymentId}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Qty:</strong> {txn.quantity || 1}</p>
                    <p><strong>Amount:</strong> ₹{txn.amount}</p>
                    <p><strong>GST:</strong> ₹{txn.gst || 0}</p>
                    <p><strong>Platform Fee:</strong> ₹{txn.platformFee || 0}</p>
                    <p className="col-span-2 font-bold text-blue-700">Total: ₹{txn.totalAmount}</p>
                    <p className="col-span-2 text-gray-600 text-xs">Date: {new Date(txn.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note Section */}
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-700 rounded-r-lg">
              <p className="text-gray-700 text-sm">
                <strong>Note:</strong> Total includes GST and platform fee per plan.
                GST is calculated based on the plan amount multiplied by quantity.
                Platform fee is fixed. Transactions marked success are completed.
              </p>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-4 mt-10 text-center">
        © {new Date().getFullYear()} WeDeal. All rights reserved.
      </footer>
    </div>
  );
}
