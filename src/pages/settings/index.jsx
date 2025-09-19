// src/pages/Settings.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully! 🔑");
    // TODO: API call for password change
  };

  const handleDeactivate = () => {
    const confirm = window.confirm(
      "Are you sure you want to deactivate your account? This action cannot be undone."
    );
    if (confirm) {
      alert("Account deactivated ❌");
      // TODO: API call for account deactivation
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-10">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Settings ⚙️
          </h1>

          {/* Change Password */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Deactivate Account */}
          <div>
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Deactivate Account
            </h2>
            <p className="text-gray-600 mb-4">
              Once you deactivate your account, all your data will be permanently
              removed and you won’t be able to recover it.
            </p>
            <button
              onClick={handleDeactivate}
              className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
            >
              Deactivate My Account
            </button>
          </div>

          {/* Note */}
          <div className="pt-6 border-t text-center text-gray-500 text-sm">
            <p>
              🔒 Your privacy and security are our top priorities.  
              Please ensure your credentials are kept safe.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
