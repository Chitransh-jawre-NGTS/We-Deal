import React, { useState, useRef } from "react";
import { FaCamera, FaUpload, FaTimes } from "react-icons/fa";

const categories = ["Cars", "Mobiles", "Furniture", "Electronics", "Fashion"];

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product submitted:", formData, images);
    alert("Product submitted successfully!");
  };

  return (
    <div className=" bg-gray-100 pt-4 pb-24 px-4 md:px-6 max-w-[700px] mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Sell Your Item
      </h1> */}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold mb-1">
            Images
          </label>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-28 h-28 object-cover rounded-xl border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
              <FaUpload />
              Upload
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </label>
            <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition">
              <FaCamera />
              Camera
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows={5}
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-blue-600 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-blue-700 transition text-lg"
        >
          List Item
        </button>
      </form>
    </div>
  );
};

export default Sell;
