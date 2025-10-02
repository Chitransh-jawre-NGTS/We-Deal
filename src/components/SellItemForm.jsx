// src/components/SellItemForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAd } from "../api/storeApi/adds";
import { itemFields } from "../data/itemFields";

const SellItemForm = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("mobile-phones"); // default category
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    storage: "",
    ram: "",
    year: "",
    price: "",
    title: "",
    description: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const fieldsConfig = itemFields[category].fields;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files).slice(0, 5) });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "brand") setFormData((prev) => ({ ...prev, model: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.brand || !formData.model || !formData.title) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      for (let key in formData) {
        if (key === "images") formData.images.forEach((img) => data.append("images", img));
        else data.append(key, formData[key]);
      }

      const storeToken = localStorage.getItem("storeToken");
      const res = await createAd(data, storeToken);

      alert(res.message);
      navigate("/store/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit ad.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get dynamic options
  const getOptions = (field) => {
    if (field.dependsOn) {
      return formData[field.dependsOn.toLowerCase()]
        ? field.options[formData[field.dependsOn.toLowerCase()]]
        : [];
    }
    return field.options || [];
  };

  // Reset form when switching category
  const switchCategory = (cat) => {
    setCategory(cat);
    setFormData({
      brand: "",
      model: "",
      storage: "",
      ram: "",
      year: "",
      price: "",
      title: "",
      description: "",
      images: [],
    });
  };

  return (
    <div className="w-full mx-auto mt-2 p-6 bg-white rounded-xl shadow-lg">
      {/* Category Switch Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => switchCategory("mobile-phones")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            category === "mobile-phones" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Mobile Phones
        </button>
        <button
          type="button"
          onClick={() => switchCategory("laptops")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            category === "laptops" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Laptops
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sell Your {category.replace("-", " ")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fieldsConfig.map((field) => {
          const options = getOptions(field);
          if (field.type === "select") {
            return (
              <div key={field.name}>
                <label className="block text-gray-700 mb-1">{field.name}</label>
                <select
                  name={field.name.toLowerCase()}
                  value={formData[field.name.toLowerCase()] || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={field.dependsOn && !formData[field.dependsOn.toLowerCase()]}
                >
                  <option value="">Select {field.name}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (field.type === "number") {
            return (
              <div key={field.name}>
                <label className="block text-gray-700 mb-1">{field.name}</label>
                <input
                  type="number"
                  name={field.name.toLowerCase()}
                  value={formData[field.name.toLowerCase()] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field.name}`}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            );
          }
          return null;
        })}

        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title for your listing"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a brief description about the item"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 mb-1">Upload Images (Max 5)</label>
          <input type="file" name="images" accept="image/*" multiple onChange={handleChange} className="w-full" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Listing"}
        </button>
      </form>
    </div>
  );
};

export default SellItemForm;
