// src/pages/Transactions.jsx
import React from "react";
import { FaReceipt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const navigate = useNavigate();

  const transactions = [
    {
      _id: "1",
      user: { name: "Amit Sharma" },
      planName: "Monthly Plan",
      amount: 299,
      status: "success",
      createdAt: "2025-09-01T10:20:30Z",
    },
    {
      _id: "2",
      user: { name: "Priya Verma" },
      planName: "One-Time Ad",
      amount: 49,
      status: "pending",
      createdAt: "2025-09-10T14:15:00Z",
    },
    {
      _id: "3",
      user: { name: "Rahul Singh" },
      planName: "Annual Plan",
      amount: 1999,
      status: "failed",
      createdAt: "2025-09-12T18:45:10Z",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Simple Navbar */}
      <header className="bg-white shadow-md py-3 px-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700  transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Transactions</h1>
      </header>

      {/* ✅ Main content */}
      <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
        {/* Transactions Table */}
        <div className="overflow-x-auto bg-white shadow-lg ">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-purple-100 text-purple-900">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={tx._id}
                  className={`transition hover:bg-purple-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-purple-50/40"
                  }`}
                >
                  <td className="px-4 py-3 font-medium">
                    {tx.user?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-3">{tx.planName}</td>
                  <td className="px-4 py-3 font-semibold">₹{tx.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.status === "success"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instruction Section */}
        <section className="mt-10 bg-white shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">
            How Transactions Work
          </h2>
          <ul className="space-y-2 text-gray-600 text-sm md:text-base">
            <li>✔️ Every user gets a set number of free ads each month.</li>
            <li>✔️ Paid plans allow users to post additional ads.</li>
            <li>✔️ Each transaction shows the plan purchased, amount, and status.</li>
            <li>
              ✔️ Transactions marked{" "}
              <span className="text-green-600 font-medium">success</span> are completed.
            </li>
            <li>
              ✔️ <span className="text-yellow-600 font-medium">Pending</span> transactions may take a few minutes to confirm.
            </li>
            <li>
              ✔️ <span className="text-red-600 font-medium">Failed</span> transactions mean the payment did not go through.
            </li>
          </ul>
        </section>
      </main>

      {/* ✅ Simple Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4 mt-10 text-center">
        © {new Date().getFullYear()} WeDeal. All rights reserved.
      </footer>
    </div>
  );
}
