// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [blockedUsers, setBlockedUsers] = useState([]);

  // Mock fetch blocked users (replace with API later)
  useEffect(() => {
    setBlockedUsers([
      { id: 1, name: "John Doe", avatar: "/default-avatar.png" },
      { id: 2, name: "Jane Smith", avatar: "/default-avatar.png" },
    ]);
  }, []);

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
      "Are you sure you want to deactivate your account? This action can be reversed by logging back in."
    );
    if (confirm) {
      alert("Account deactivated ❌");
      // TODO: API call for account deactivation
    }
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "⚠️ Are you sure you want to permanently delete your account? This cannot be undone."
    );
    if (confirm) {
      alert("Account deleted permanently 🗑️");
      // TODO: API call for account deletion
    }
  };

  const handleUnblock = (userId) => {
    setBlockedUsers((prev) => prev.filter((user) => user.id !== userId));
    alert("User unblocked ✅");
    // TODO: API call to unblock
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
        <div className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-10">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Settings ⚙️
          </h1>

          {/* Blocked Users */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Blocked Users 🚫
            </h2>
            {blockedUsers.length === 0 ? (
              <p className="text-gray-500">You haven’t blocked anyone yet.</p>
            ) : (
              <ul className="space-y-3">
                {blockedUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {user.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleUnblock(user.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Unblock
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

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

          {/* Account Options */}
          <div>
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Account Management
            </h2>
            <div className="space-y-4">
              <button
                onClick={handleDeactivate}
                className="w-full py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition"
              >
                Deactivate My Account
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
              >
                Delete My Account Permanently
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="pt-6 border-t text-center text-gray-500 text-sm">
            <p>
              🔒 Your privacy and security are our top priorities.  
              Manage your account safely and responsibly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
