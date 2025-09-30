import React, { useState, useEffect } from "react";
import { FaUpload, FaBell, FaMoon, FaGlobe } from "react-icons/fa";
import axios from "axios";

const DashSetting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shopName: "",
    gstNumber: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [avatar, setAvatar] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(true);

  // Fetch store profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/store/profile", {
          headers: {
            "x-store-token": localStorage.getItem("storeToken"),
          },
        });

        const profile = res.data;
        setFormData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          shopName: profile.shopName || "",
          gstNumber: profile.gstNumber || "",
          address: profile.address || "",
          pincode: profile.pincode || "",
          city: profile.city || "",
          state: profile.state || "",
        });
        setAvatar(profile.shopLogo || "https://i.pravatar.cc/100");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setAvatar(URL.createObjectURL(e.target.files[0]));

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto bg-white rounded-2xl shadow p-6 ">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Store Settings</h1>

        {/* Profile Section */}
        <div className="flex items-center gap-6 border-b border-gray-200 pb-6 mb-6">
          <div className="relative">
            <img src={avatar} alt="Store Logo" className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover" />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition">
              <FaUpload />
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">{formData.name}</h2>
            <p className="text-sm text-gray-500">{formData.email}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phone", type: "text" },
            { label: "Shop Name", name: "shopName", type: "text" },
            { label: "GST Number", name: "gstNumber", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Pincode", name: "pincode", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          ))}

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaBell className="text-gray-500 text-lg" />
              <p className="font-medium text-gray-700">Notifications</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only" />
              <div className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ${notifications ? "bg-blue-500" : "bg-gray-300"}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${notifications ? "translate-x-5" : ""}`}></div>
              </div>
            </label>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaMoon className="text-gray-500 text-lg" />
              <p className="font-medium text-gray-700">Dark Mode</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="sr-only" />
              <div className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ${darkMode ? "bg-blue-500" : "bg-gray-300"}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${darkMode ? "translate-x-5" : ""}`}></div>
              </div>
            </label>
          </div>

          {/* Language & Currency */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => alert("Static: Changes not saved (demo only).")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashSetting;
