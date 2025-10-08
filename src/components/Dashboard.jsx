// src/pages/Dashboard.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from "recharts";
import { FaEye, FaMousePointer, FaChartBar, FaDollarSign } from "react-icons/fa";

const impressionsData = [
  { day: "Mon", impressions: 400, clicks: 240 },
  { day: "Tue", impressions: 300, clicks: 139 },
  { day: "Wed", impressions: 500, clicks: 200 },
  { day: "Thu", impressions: 478, clicks: 220 },
  { day: "Fri", impressions: 589, clicks: 300 },
  { day: "Sat", impressions: 439, clicks: 210 },
  { day: "Sun", impressions: 600, clicks: 350 },
];

const recentActivities = [
  { user: "John Doe", action: "Clicked Ad", time: "10:00 AM" },
  { user: "Jane Smith", action: "Viewed Product", time: "10:15 AM" },
  { user: "Alice Brown", action: "Signed Up", time: "11:00 AM" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white rounded-2xl">

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white p-5 rounded-xl shadow-lg flex items-center space-x-4 hover:scale-105 transition">
            <FaEye className="w-10 h-10 opacity-80" />
            <div>
              <p className="text-sm">Impressions</p>
              <p className="text-2xl font-bold">3,245</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-5 rounded-xl shadow-lg flex items-center space-x-4 hover:scale-105 transition">
            <FaMousePointer className="w-10 h-10 opacity-80" />
            <div>
              <p className="text-sm">Clicks</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-white p-5 rounded-xl shadow-lg flex items-center space-x-4 hover:scale-105 transition">
            <FaChartBar className="w-10 h-10 opacity-80" />
            <div>
              <p className="text-sm">CTR</p>
              <p className="text-2xl font-bold">38%</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-5 rounded-xl shadow-lg flex items-center space-x-4 hover:scale-105 transition">
            <FaDollarSign className="w-10 h-10 opacity-80" />
            <div>
              <p className="text-sm">Revenue</p>
              <p className="text-2xl font-bold">$1,234</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Impressions Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impressionsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="impressions" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Clicks Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={impressionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill="#10b981" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="px-6 py-4 whitespace-nowrap">{activity.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{activity.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
