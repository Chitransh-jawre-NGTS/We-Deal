import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const BecomeSeller = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

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
    password: "",
    confirmPassword: "",
    shopLogo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Register as Seller
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    for (let key in formData) {
      if (!formData[key]) {
        alert(`Please fill the ${key} field`);
        return;
      }
    }

    try {
      setLoading(true);
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      // Call backend store register API
      const res = await axios.post(
        "http://localhost:5000/api/store/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // user must be logged in
          },
        }
      );

      alert(res.data.message || "Registered successfully!");
      navigate("/dashboard"); // Redirect to dashboard after registration
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Seller Login
 const handleLogin = async (e) => {
  e.preventDefault();
  if (!formData.email || !formData.password) {
    alert("Please enter email and password");
    return;
  }

  try {
    setLoading(true);
    const res = await axios.post("http://localhost:5000/api/store/login", {
      email: formData.email,
      password: formData.password,
    });

    // Save store token in localStorage
    localStorage.setItem("storeToken", res.data.storeToken || res.data.token); 
    // Use res.data.storeToken if your backend sends "storeToken", else fallback to "token"

    alert("Login successful");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white shadow-md py-4 px-6 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-gray-900">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Become Seller</h1>
      </div>

      {/* Main Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
          {isLogin ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Seller Login</h2>
              <p className="text-gray-500 text-center mb-6">
                Enter your email and password to access your dashboard.
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <p className="mt-4 text-center text-gray-500 text-sm">
                  Don't have an account?{" "}
                  <span
                    className="text-gray-800 font-medium hover:underline cursor-pointer"
                    onClick={() => setIsLogin(false)}
                  >
                    Register
                  </span>
                </p>
              </form>
            </>
          ) : (
            <>
              <div className="bg-yellow-100 text-yellow-800 text-center text-sm rounded-md px-4 py-2 mb-4 border border-yellow-300">
                ⚠️ This registration is only for real shop owners. Please provide authentic shop details.
              </div>

              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Register as Seller</h2>
              <p className="text-gray-500 text-center mb-6">
                Join our platform and start selling your products today!
              </p>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Shop Name */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Shop Name</label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* GST Number */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Address Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-700 font-medium">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700 font-medium">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700 font-medium">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Shop Logo */}
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Shop Logo</label>
                  <input
                    type="file"
                    name="shopLogo"
                    onChange={handleChange}
                    className="w-full"
                    accept="image/*"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
                >
                  {loading ? "Registering..." : "Register as Seller"}
                </button>

                <p className="mt-6 text-center text-gray-500 text-sm">
                  Already a seller?{" "}
                  <span
                    className="text-gray-800 font-medium hover:underline cursor-pointer"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </span>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
