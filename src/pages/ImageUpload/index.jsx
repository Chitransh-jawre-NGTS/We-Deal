// src/pages/ImageUpload.jsx
import React, { useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Access form data passed from CategoryForm
  const formData = location.state?.formValues || {};

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 8) {
      alert("You can upload a maximum of 8 images.");
      return;
    }

    setImages((prev) => [...prev, ...files]);
    setError(""); // clear error when an image is added
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (images.length < 1) {
      setError("Please upload at least 1 image.");
      return;
    }

    // Here you can send formData + images to backend
    console.log("Form Data:", formData);
    console.log("Images:", images);

    alert("Ad submitted successfully!");
    navigate("/"); // redirect to home or success page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="flex items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
        <Link to="/sell" className="text-gray-700 text-xl mr-4">
          <FaArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold">Upload Images</h1>
      </header>

      {/* Image Upload */}
      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium mb-2">
            Select 1–8 images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mb-3"
          />

          {/* Error Message */}
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Submit Ad
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
