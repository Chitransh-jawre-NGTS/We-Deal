import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BannerUploadPage = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [amount, setAmount] = useState(10);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  const impressions = amount * 1000;

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

      // Refresh banners list after creation
      fetchBanners();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Your Banner Ad
        </h1>

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
              Budget (₹) <span className="text-sm text-gray-500">(Min ₹10)</span>
            </label>
            <input
              type="number"
              min="10"
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
                className="mt-4 rounded-xl w-full h-56 object-cover border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Create Banner Ad"}
          </button>
        </form>

        {/* Store's Banners */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Your Banners</h2>
          {loadingBanners ? (
            <p>Loading banners...</p>
          ) : banners.length === 0 ? (
            <p>No banners created yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((banner) => (
                <div
                  key={banner._id}
                  className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />
                  <h3 className="font-semibold text-lg">{banner.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{banner.link}</p>
                  <p className="text-sm text-gray-500">
                    Impressions: {banner.currentImpressions} / {banner.totalImpressions}
                  </p>
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
