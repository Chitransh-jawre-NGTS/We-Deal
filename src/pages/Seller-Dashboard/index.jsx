import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaMobileAlt,
  FaCog,
  FaBars,
  FaUserCircle,
  FaBell,
} from "react-icons/fa";
import companyLogo from "../../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
import profileAvatar from "../../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
import SellMobileForm from "../../components/SellMobileForm";
import DashboardPage from "../../components/Dashboard";
import DashSetting from "../../components/DashSetting";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Sell Mobile", icon: <FaMobileAlt /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  // Example notifications (replace with API data later)
  const notifications = [
    { id: 1, text: "Your mobile listing was approved ✅" },
    { id: 2, text: "New buyer request received 📩" },
    { id: 3, text: "Update your profile for better visibility ⚡" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Overlay for small devices */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-black bg-opacity-30 transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full bg-white text-gray-800 flex flex-col transition-all duration-300
          w-64 shadow-lg
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:relative lg:translate-x-0 lg:w-64
        `}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <img src={companyLogo} alt="Logo" className="h-10 object-contain" />
          <button
            className="text-gray-600 focus:outline-none lg:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 flex-1 flex flex-col">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center border-b gap-4 cursor-pointer px-4 py-3 transition rounded-lg mx-2 my-1 ${
                activeMenu === item.name
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveMenu(item.name);
                setSidebarOpen(false); // close sidebar on small devices
              }}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </nav>

        {/* Profile Section at Bottom */}
        <div className="border-t  border-gray-200 p-4 mt-auto">
          <div className="flex items-center gap-3">
            <img
              src={profileAvatar}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border border-gray-300"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">Seller Name</p>
              <button className="flex items-center text-xs text-blue-600 hover:underline mt-1">
                <FaUserCircle className="mr-1" /> Profile
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="relative flex items-center justify-between bg-white shadow px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                className="text-gray-600 focus:outline-none lg:hidden p-2 rounded hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800">
              {activeMenu}
            </h1>
          </div>

          {/* Right side with notifications + profile */}
          <div className="flex items-center gap-6 relative">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-600 hover:text-blue-600 relative focus:outline-none"
              >
                <FaBell size={20} />
                {/* Red dot for unread */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-3 font-semibold text-gray-700 border-b">
                    Notifications
                  </div>
                  <ul className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((note) => (
                        <li
                          key={note.id}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {note.text}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-gray-500">
                        No new notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Seller Name & Avatar */}
            <span className="text-gray-600 hidden md:block font-medium">Seller Name</span>
            <img
              src={profileAvatar}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto">
          {activeMenu === "Dashboard" && <DashboardPage />}
          {activeMenu === "Sell Mobile" && <SellMobileForm />}
          {activeMenu === "Settings" && (<DashSetting/>
          )}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
