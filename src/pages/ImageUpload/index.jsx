import React, { useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { productApi } from "../../api/product";
import toast from "react-hot-toast"; // ✅ import toast

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const formDataObj = location.state?.formValues || {};
  const category = location.state?.category || "general";
  let coords = location.state?.coords || null;

  if (!coords) coords = { longitude: 75.8577, latitude: 22.7196 };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 8) {
      toast.error("You can upload a maximum of 8 images."); // ✅ hot toast
      return;
    }
    setImages((prev) => [...prev, ...files]);
    setError("");
  };

  const removeImage = (index) => setImages((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (images.length < 1) {
      toast.error("Please upload at least 1 image."); // ✅ hot toast
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fields", JSON.stringify(formDataObj));
      formData.append("category", category);
      formData.append(
        "location",
        JSON.stringify({
          type: "Point",
          coordinates: [coords.longitude, coords.latitude],
        })
      );
      images.forEach((img) => formData.append("images", img));

      const response = await productApi.create(formData);
      console.log("Product created:", response.data);

      toast.success("Ad submitted successfully!"); // ✅ hot toast
      navigate("/");
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Failed to submit ad. Please try again."); // ✅ hot toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
        <Link to="/sell" className="text-gray-700 text-xl mr-4">
          <FaArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold">Upload Images</h1>
      </header>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium mb-2">Select 1–8 images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mb-3"
          />

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <div className="grid grid-cols-3 gap-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Upload ${idx}`}
                  className="w-full h-28 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded-full"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Ad"}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
