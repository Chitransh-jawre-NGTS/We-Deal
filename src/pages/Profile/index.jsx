import React, { useState } from "react";
import { FaUser, FaEnvelope, FaIdCard, FaUpload, FaPhone } from "react-icons/fa";
import { storage } from "../../utils/localstorage";
import { userApi } from "../../api/auth"; // ✅ using userApi

const ProfileVerification = () => {
  const user = storage.get("user"); // ✅ from localStorage
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
      storage.set("user", res.data); // update local storage
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-6">
      
      {/* Display All User Data */}
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-2xl mb-6 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Profile Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Name:</strong> {user?.name || "N/A"}
          </div>
          <div>
            <strong>Email:</strong> {user?.email || "N/A"}
          </div>
          <div>
            <strong>Phone:</strong> {user?.phone || "N/A"}
          </div>
          <div>
            <strong>Aadhaar:</strong> {user?.aadhaarNumber || "N/A"}
          </div>
          <div className="col-span-2">
            <strong>Avatar:</strong>
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-24 h-24 rounded-full mt-2 border-2 border-white object-cover"
            />
          </div>
        </div>
      </div>

      {/* Existing Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-lg text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Your Profile
        </h2>

        {/* Avatar Upload */}
        <div className="mb-6 text-center">
          <label htmlFor="avatar" className="cursor-pointer block">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : user?.avatar || "https://via.placeholder.com/150"
              }
              alt="Avatar"
              className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-md hover:scale-105 transition"
            />
            <span className="flex items-center justify-center gap-2 text-sm bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">
              <FaUpload /> Upload Avatar
            </span>
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <div className="flex items-center bg-white/20 rounded-lg px-3">
            <FaUser className="text-gray-200 mr-2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full bg-transparent border-none py-2 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <div className="flex items-center bg-white/20 rounded-lg px-3">
            <FaEnvelope className="text-gray-200 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full bg-transparent border-none py-2 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Aadhaar */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">
            Aadhaar Number
          </label>
          <div className="flex items-center bg-white/20 rounded-lg px-3">
            <FaIdCard className="text-gray-200 mr-2" />
            <input
              type="text"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              placeholder="Enter Aadhaar Number"
              className="w-full bg-transparent border-none py-2 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileVerification;
