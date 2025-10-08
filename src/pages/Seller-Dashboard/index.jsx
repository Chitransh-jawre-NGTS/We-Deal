// src/pages/SellerDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaMobileAlt,
  FaCog,
  FaBars,
  FaUserCircle,
  FaBell,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import companyLogo from "../../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";

import SellMobileForm from "../../components/SellItemForm";
import DashboardPage from "../../components/Dashboard";
import DashSetting from "../../components/DashSetting";
import MyStoreListings from "../MyStoreListings";
import StorePlan from "../../components/StorePlan";
import StoreTransactions from "../StoreTransactions";
import { getStoreProfile } from "../../api/storeApi/adminApi";
import SellItemForm from "../../components/SellItemForm";
import StoreHelp from "../../components/StoreHelp";
import BannerPage from "../../components/BannerPage";

// Placeholder for My Listings (if empty)
const MyListings = () => (
  <div className="text-gray-700 text-center text-lg mt-10">
    <p>Your listings will appear here.</p>
  </div>
);

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "Dashboard"
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [storeProfile, setStoreProfile] = useState({ name: "", shopLogo: "" });
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Upload Products", icon: <FaMobileAlt /> },
    { name: "My Listings", icon: <FaClipboardList /> },
    { name: "Store Plan", icon: <FaCog /> },
    { name: "Store Transection", icon: <FaCog /> },
    { name: "My Banner", icon: <FaCog /> },
     { name: "Store Help", icon: <FaCog /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  const notifications = [
    { id: 1, text: "Your mobile listing was approved ✅" },
    { id: 2, text: "New buyer request received 📩" },
    { id: 3, text: "Update your profile for better visibility ⚡" },
  ];

  // Fetch store profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const storeToken = localStorage.getItem("storeToken");
        if (!storeToken) {
          navigate("/"); // redirect if no token
          return;
        }
        const data = await getStoreProfile(storeToken);
        setStoreProfile({
          name: data.name,
          shopLogo: data.shopLogo || "https://i.pravatar.cc/100",
        });
      } catch (err) {
        console.error("Failed to fetch store profile:", err);
        navigate("/"); // redirect on error
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  // Handle menu click and persist active tab
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("storeToken");
    setTimeout(() => {
      navigate("/store");
    }, 0);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-black bg-opacity-30 transition-opacity ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full bg-white text-gray-800 flex flex-col transition-transform duration-300
          w-64 shadow-xl rounded-r-2xl
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:relative lg:translate-x-0 lg:w-64`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <img src={companyLogo} alt="Logo" className="h-10 object-contain" />
          <button
            className="text-gray-600 focus:outline-none lg:hidden p-2 rounded hover:bg-gray-100 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 flex-1 flex flex-col px-2">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-4 cursor-pointer px-4 py-3 rounded-xl transition-all mb-2 hover:bg-blue-50 hover:text-blue-700 ${
                activeMenu === item.name
                  ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 font-semibold shadow-md"
                  : "text-gray-700 border  border-gray-300 hover:border-blue-200"
              }`}
              onClick={() => handleMenuClick(item.name)}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-200 p-4 mt-auto rounded-t-xl bg-gradient-to-t from-white to-gray-50">
          <div className="flex items-center gap-3">
            <img
              src={storeProfile.shopLogo}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border-2 border-blue-200 shadow-sm"
            />
            <div className="flex flex-col flex-1">
              <p className="text-sm font-semibold text-gray-800">{storeProfile.name}</p>
              <button className="flex items-center text-xs text-blue-600 hover:underline mt-1">
                <FaUserCircle className="mr-1" /> Profile
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="relative flex items-center justify-between bg-white shadow px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                className="text-gray-600 focus:outline-none lg:hidden p-2 rounded hover:bg-gray-100 transition"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800">{activeMenu}</h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6 relative">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-600 hover:text-blue-600 relative focus:outline-none"
              >
                <FaBell size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-bold">
                  {notifications.length}
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="px-4 py-3 font-semibold text-gray-700 border-b bg-gray-50 flex justify-between items-center">
                    <span>Notifications</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-gray-400 hover:text-gray-600 transition"
                      aria-label="Close notifications"
                    >
                      ×
                    </button>
                  </div>
                  <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    {notifications.length > 0 ? (
                      notifications.map((note) => (
                        <li
                          key={note.id}
                          className="px-4 py-3 hover:bg-blue-50 transition cursor-pointer flex justify-between items-start"
                        >
                          <div className="flex-1 text-gray-700 text-sm">{note.text}</div>
                          <span className="text-xs text-gray-400 ml-2">Just now</span>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-gray-500 text-sm text-center">
                        No new notifications
                      </li>
                    )}
                  </ul>
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-100 text-center bg-gray-50">
                      <button className="text-blue-600 text-sm hover:underline">View All</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <span className="text-gray-600 hidden md:block font-medium">{storeProfile.name}</span>
            <img
              src={storeProfile.shopLogo}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border-2 border-blue-200 shadow-sm"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeMenu === "Dashboard" && <DashboardPage />}
          {activeMenu === "Upload Products" && <SellItemForm />}
          {activeMenu === "My Listings" && <MyStoreListings />}
          {activeMenu === "Settings" && <DashSetting />}
          {activeMenu === "Store Plan" && <StorePlan />}
          {activeMenu === "My Banner" && <BannerPage />}
          {activeMenu === "Store Transection" && <StoreTransactions />}
          {activeMenu === "Store Help" && <StoreHelp />}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
