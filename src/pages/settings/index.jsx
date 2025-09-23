// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [message, setMessage] = useState(null);

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    avatar: "/default-avatar.png",
  });

  // Password state
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification state
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  useEffect(() => {
    setBlockedUsers([
      { id: 1, name: "Jane Smith", avatar: "/default-avatar.png" },
    ]);
  }, []);

  const handleMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    handleMessage("success", "Profile updated successfully ✅");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      handleMessage("error", "New passwords do not match!");
      return;
    }
    handleMessage("success", "Password updated 🔑");
  };

  const handleUnblock = (id) => {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== id));
    handleMessage("success", "User unblocked ✅");
  };

  const handleDeactivate = () => {
    if (window.confirm("Deactivate your account?")) {
      handleMessage("warning", "Account deactivated ❌");
    }
  };

  const handleDelete = () => {
    if (window.confirm("⚠️ Delete permanently? This cannot be undone.")) {
      handleMessage("error", "Account deleted 🗑️");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-auto bg-gray-100 flex flex-col lg:flex-row px-4 lg:px-10 py-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block w-72 bg-white shadow-md rounded-xl p-6 border border-blue-100 h-fit">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Settings</h2>
          <nav className="space-y-2">
            {[
              { key: "profile", label: "Profile" },
              { key: "password", label: "Change Password" },
              { key: "blocked", label: "Blocked Users" },
              { key: "notifications", label: "Notifications" },
              { key: "security", label: "Security" },
              { key: "account", label: "Account" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.key
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Top Tabs (mobile) */}
        <div className="flex lg:hidden overflow-x-auto space-x-2 mb-6">
          {["profile", "password", "blocked", "notifications", "security", "account"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
            {/* Inline Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg font-medium ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : message.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Profile */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                  Profile Information
                </h2>
                <form
                  onSubmit={handleProfileUpdate}
                  className="space-y-6 max-w-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={profile.avatar}
                      alt="avatar"
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Change Avatar
                    </button>
                  </div>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Change Password */}
            {activeTab === "password" && (
              <div>
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                  Change Password
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {/* Blocked Users */}
            {activeTab === "blocked" && (
              <div>
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                  Blocked Users
                </h2>
                {blockedUsers.length === 0 ? (
                  <p className="text-gray-500 italic">
                    You haven’t blocked anyone yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {blockedUsers.map((user) => (
                      <li
                        key={user.id}
                        className="flex items-center justify-between p-3 border border-blue-100 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
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
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Unblock
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() =>
                        setNotifications((p) => ({ ...p, email: !p.email }))
                      }
                      className="w-5 h-5 text-blue-600"
                    />
                    Email Notifications
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() =>
                        setNotifications((p) => ({ ...p, push: !p.push }))
                      }
                      className="w-5 h-5 text-blue-600"
                    />
                    Push Notifications
                  </label>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                  Security Settings
                </h2>
                <div className="space-y-4">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Enable Two-Factor Authentication
                  </button>
                  <button className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    View Active Sessions
                  </button>
                </div>
              </div>
            )}

            {/* Account */}
            {activeTab === "account" && (
              <div>
                <h2 className="text-2xl font-semibold text-red-600 mb-6">
                  Account Management
                </h2>
                <div className="space-y-4">
                  <button
                    onClick={handleDeactivate}
                    className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Deactivate My Account
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete My Account Permanently
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Note */}
          {/* <p className="mt-6 text-center text-gray-500 text-sm">
            🔒 Your privacy and security are our top priorities. Manage your
            account responsibly.
          </p> */}
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default Settings;
