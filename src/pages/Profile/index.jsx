import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaUpload, FaArrowLeft } from "react-icons/fa";
import { userApi } from "../../api/auth";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const ProfileVerification = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ user: {}, profile: {} });
  const [formData, setFormData] = useState({ name: "", email: "", aadhaarNumber: "", avatar: "" });
  const [editing, setEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userApi.getProfile();
        setData(res.data);
        setFormData({
          name: res.data.profile?.name || "",
          email: res.data.user?.email || "",
          aadhaarNumber: res.data.profile?.aadhaarNumber || "",
          avatar: res.data.profile?.avatar || "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setFormData({ ...formData, avatar: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileId = data.profile?._id;
    if (!profileId) return alert("Profile not found");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("aadhaarNumber", formData.aadhaarNumber);
    if (avatarFile) form.append("avatar", avatarFile);

    try {
      const res = await userApi.updateProfile(profileId, form);
      alert("Profile updated successfully!");
      setData((prev) => ({ ...prev, profile: res.data }));
      setEditing(false);
      setAvatarFile(null);
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  return (
    <>
      <Navbar ShowBottomNav={false} ShowMobileTop={false} />
      {/* Top Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-20 flex items-center px-4 py-3 gap-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Profile Verification</h1>
      </div>

      <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col items-center transition hover:shadow-lg">
            <div className="relative w-32 h-32">
              <img
                src={formData.avatar || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="w-full h-full rounded-full border object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{formData.name || "User"}</h2>
            <p className="text-sm text-gray-500">{formData.email || "Email not provided"}</p>

            <label
              htmlFor="avatar"
              className="mt-3 text-sm text-blue-600 cursor-pointer hover:underline flex items-center gap-1"
            >
              <FaUpload /> Change Avatar
            </label>
            <input type="file" id="avatar" onChange={handleFileChange} className="hidden" />

            {/* Verified Info */}
            <div className="mt-6 w-full">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Confirmed Information</h3>
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
          <div className="col-span-2 flex flex-col gap-6">
            {/* Profile Info Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex justify-between items-center transition hover:shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800">
                About {formData.name || "User"}
              </h2>
              <button
                onClick={() => setEditing(!editing)}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
              >
                {editing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>

            {/* Update Form */}
            {editing && (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Update Your Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full border rounded-lg px-3 py-2 text-gray-400 bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {/* Aadhaar */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Aadhaar Number</label>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileVerification;
