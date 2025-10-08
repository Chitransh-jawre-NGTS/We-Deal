// src/pages/StoreTransactions.jsx
import React, { useEffect, useState } from "react";
import { FaReceipt } from "react-icons/fa";

// Dummy data; replace with backend API
const dummyTransactions = [
  {
    id: "TXN001",
    plan: "Base Plan",
    quantity: 2,
    amount: 19,
    gst: 6.84,
    platformFee: 1,
    total: 46.84,
    date: "2025-09-30",
  },
  {
    id: "TXN002",
    plan: "Premium Plan",
    quantity: 1,
    amount: 29,
    gst: 5.22,
    platformFee: 1,
    total: 35.22,
    date: "2025-09-28",
  },
];

export default function StoreTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Replace with API call
    setTransactions(dummyTransactions);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white rounded-2xl">
      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
            <FaReceipt className="text-blue-600" /> Transaction History
          </h2>

          {transactions.length === 0 ? (
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
                        key={txn.id}
                        className={`transition hover:bg-blue-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-blue-50/50"
                        }`}
                      >
                        <td className="py-3 px-4 font-medium">{txn.id}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                              txn.plan === "Premium Plan"
                                ? "bg-blue-700"
                                : "bg-sky-500"
                            }`}
                          >
                            {txn.plan}
                          </span>
                        </td>
                        <td className="py-3 px-4">{txn.quantity}</td>
                        <td className="py-3 px-4">₹{txn.amount}</td>
                        <td className="py-3 px-4">₹{txn.gst}</td>
                        <td className="py-3 px-4">₹{txn.platformFee}</td>
                        <td className="py-3 px-4 font-bold text-blue-700">₹{txn.total}</td>
                        <td className="py-3 px-4">{txn.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="border border-blue-200 rounded-xl shadow-md p-4 bg-white"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-blue-700">{txn.plan}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                          txn.plan === "Premium Plan"
                            ? "bg-blue-700"
                            : "bg-sky-500"
                        }`}
                      >
                        {txn.plan}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Txn ID: {txn.id}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Qty:</strong> {txn.quantity}</p>
                      <p><strong>Amount:</strong> ₹{txn.amount}</p>
                      <p><strong>GST:</strong> ₹{txn.gst}</p>
                      <p><strong>Platform Fee:</strong> ₹{txn.platformFee}</p>
                      <p className="col-span-2 font-bold text-blue-700">
                        Total: ₹{txn.total}
                      </p>
                      <p className="col-span-2 text-gray-600 text-xs">
                        Date: {txn.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note Section */}
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-700 rounded-r-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> Total includes 18% GST and ₹1 platform fee per plan.
                  GST is calculated based on the plan amount multiplied by quantity. Platform fee is fixed.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
