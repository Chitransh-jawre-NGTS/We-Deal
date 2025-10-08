import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiInfo, FiShield, FiImage } from "react-icons/fi";

const BannerUploadPage = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [amount, setAmount] = useState(10);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  const impressions = amount * 100;

  // Fetch banners of the current store
  const fetchBanners = async () => {
    try {
      setLoadingBanners(true);
      const token = localStorage.getItem("storeToken");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/ads/banner/mystore`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBanners(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your banners");
    } finally {
      setLoadingBanners(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload a banner image");
    if (amount < 10) return toast.error("Minimum amount is ₹10");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("amount", amount);
    formData.append("image", image);

    try {
      setLoading(true);
      const token = localStorage.getItem("storeToken");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/ads/banner/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Banner Ad Created Successfully 🎉");
      setTitle("");
      setLink("");
      setAmount(10);
      setImage(null);
      setPreview(null);

      fetchBanners();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create banner");
    } finally {
      setLoading(false);
    }
  };
  const handlePayment = async () => {
  if (!image) return toast.error("Please upload a banner image");
  if (amount < 10) return toast.error("Minimum amount is ₹10");

  try {
    setLoading(true);

    // 1. Create order on backend
    const token = localStorage.getItem("storeToken");
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/payment/create-order`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { orderId, amount: orderAmount, currency, key } = res.data;

    // 2. Open Razorpay checkout
    const options = {
      key, // Razorpay key
      amount: orderAmount,
      currency,
      name: "Your Business Name",
      description: title,
      order_id: orderId,
      handler: async function (response) {
        // 3. Payment success callback
        await uploadBannerAfterPayment(response);
      },
      prefill: {
        email: "", // optional
        contact: "", // optional
      },
      theme: { color: "#2563eb" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast.error("Payment initialization failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-white rounded-2xl py-10">
      <div className=" mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Create Your Banner Ad
        </h1>

        {/* Info / Notes Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl flex items-start gap-3">
            <FiImage size={24} className="text-blue-500 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-700">Image Guidelines</h3>
              <p className="text-sm text-gray-700">
                Recommended sizes: <strong>728×90, 970×250, 300×250, 160×600, 320×50</strong>.
                Maximum file size: <strong>2MB</strong>. Supported formats: <strong>PNG, JPG, JPEG</strong>.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-xl flex items-start gap-3">
            <FiShield size={24} className="text-yellow-500 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-700">Security & Content Policy</h3>
              <p className="text-sm text-gray-700">
                Only upload banners related to your business. 
                <strong>No adult, pornographic, illegal, or copyrighted content</strong> will be allowed.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl flex items-start gap-3">
            <FiInfo size={24} className="text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-green-700">Budget & Impressions</h3>
              <p className="text-sm text-gray-700">
                Minimum budget: ₹10. Each ₹10 guarantees approximately <strong>1000 impressions</strong>.
                Higher budgets get proportionally more impressions.
              </p>
            </div>
          </div>
        </div>

        {/* Banner Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Banner Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mega Sale 50% Off"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Target Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://yourstore.com"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Budget (₹) <span className="text-sm text-gray-500">(Min ₹10)  (Max ₹100)</span>
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="mt-2 text-sm text-gray-600">
              Estimated Impressions:{" "}
              <span className="font-semibold text-blue-600">{impressions.toLocaleString()}</span>
            </p>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Upload Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-xl px-3 py-2"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded-xl w-full h-56 object-cover border shadow-sm"
              />
            )}
          </div>

        <button
  type="button"
  onClick={handlePayment}
  disabled={loading || !image}
  className="w-full bg-blue-900 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-50"
>
  {loading ? "Processing..." : "Proceed to Payment"}
</button>

        </form>

        {/* Store's Banners */}
       <div className="mt-10">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Banners</h2>

  {loadingBanners ? (
    <p className="text-gray-600">Loading banners...</p>
  ) : banners.length === 0 ? (
    <p className="text-gray-600">No banners created yet.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {banners.map((banner) => (
        <div
          key={banner._id}
          className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-gray-800">{banner.title}</h3>
            <p className="text-sm text-blue-600 truncate hover:underline">{banner.link}</p>
            <p className="text-sm text-gray-500">
              Impressions:{" "}
              <span className="font-medium text-gray-700">{banner.currentImpressions}</span>{" "}
              /{" "}
              <span className="font-medium text-gray-700">{banner.totalImpressions}</span>
            </p>
            {/* Optional progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(banner.currentImpressions / banner.totalImpressions) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default BannerUploadPage;
