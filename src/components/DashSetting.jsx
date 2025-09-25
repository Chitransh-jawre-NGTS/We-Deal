import React, { useState } from "react";
import { FaUserCircle, FaLock, FaBell, FaGlobe, FaMoon } from "react-icons/fa";

const DashSetting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR");

  return (
    <div className="bg-gray-100 min-h-screen p-">
      <div className="w-full mx-auto bg-white rounded-2xl shadow p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6"> Settings</h1>

        {/* Profile Section */}
        <div className="flex items-center gap-6 border-b border-gray-200 pb-6 mb-6">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="h-16 w-16 rounded-full border-2 border-gray-300 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">Seller Name</h2>
            <p className="text-sm text-gray-500">seller@example.com</p>
          </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-6">
          {/* Change Password */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <FaLock className="text-gray-500 text-lg" />
              <div>
                <p className="font-medium text-gray-700">Change Password</p>
                <p className="text-sm text-gray-500">
                  Update your account password regularly.
                </p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
              Update
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <FaBell className="text-gray-500 text-lg" />
              <div>
                <p className="font-medium text-gray-700">Notifications</p>
                <p className="text-sm text-gray-500">
                  Get alerts about your listings and offers.
                </p>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                  notifications ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    notifications ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <FaMoon className="text-gray-500 text-lg" />
              <div>
                <p className="font-medium text-gray-700">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch dashboard theme.</p>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                  darkMode ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    darkMode ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <FaGlobe className="text-gray-500 text-lg" />
              <div>
                <p className="font-medium text-gray-700">Language</p>
                <p className="text-sm text-gray-500">
                  Choose your preferred language.
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>

          {/* Currency */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <FaGlobe className="text-gray-500 text-lg" />
              <div>
                <p className="font-medium text-gray-700">Currency</p>
                <p className="text-sm text-gray-500">
                  Select default currency for your sales.
                </p>
              </div>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            >
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashSetting;
