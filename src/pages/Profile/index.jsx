import React, { useState } from "react";
import { FaUser, FaEnvelope, FaIdCard, FaUpload, FaPhone } from "react-icons/fa";
import { storage } from "../../utils/localstorage";
import { userApi } from "../../api/auth";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const ProfileVerification = () => {
  const user = storage.get("user");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    aadhaarNumber: user?.aadhaarNumber || "",
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = storage.get("user");
    if (!user || !user._id) return alert("Login required");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("aadhaarNumber", formData.aadhaarNumber);
    if (avatar) data.append("avatar", avatar);

    try {
      const res = await userApi.updateProfile(user._id, data);
      alert("Profile updated successfully!");
      storage.set("user", res.data);
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  return (
   <>
   <Navbar ShowBottomNav={false} ShowMobileTop={false}/>
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col items-center">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : user?.avatar || "https://via.placeholder.com/150"
              }
              alt="Avatar"
              className="w-28 h-28 rounded-full border mb-4 object-cover"
            />
            <h2 className="text-lg font-semibold text-gray-800">{user?.name || "User"}</h2>
            <p className="text-sm text-gray-500">{user?.email || "Email not provided"}</p>

            <label
              htmlFor="avatar"
              className="mt-3 text-sm text-blue-600 cursor-pointer hover:underline"
            >
              <FaUpload className="inline mr-1" /> Change Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Verified Info */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Confirmed Information
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FaUser className="text-green-600" /> Identity
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-green-600" /> Email address
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-green-600" /> Phone number
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2">
          {/* Profile Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">About {user?.name || "User"}</h2>
              <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-100">
                Edit Profile
              </button>
            </div>
            <p className="text-gray-600 text-sm">
              Lives in {user?.location || "Not specified"}
            </p>
          </div>

          {/* Update Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-md font-semibold mb-4 text-gray-800">Update Your Details</h3>

            {/* Name */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Aadhaar */}
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Aadhaar Number
              </label>
              <input
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                placeholder="Enter Aadhaar Number"
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
    </>

  );
};

export default ProfileVerification;
