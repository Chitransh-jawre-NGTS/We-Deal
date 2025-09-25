import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const mobileFields = {
    "mobile-phones": {
        fields: [
            {
                name: "Brand",
                type: "select",
                options: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Google", "Motorola"]
            },
            {
                name: "Model",
                type: "select",
                dependsOn: "Brand",
                options: {
                    Apple: ["iPhone 13", "iPhone 13 Pro", "iPhone 14", "iPhone 14 Pro", "iPhone 15"],
                    Samsung: ["Galaxy S22", "Galaxy S23", "Galaxy A52", "Galaxy A73", "Galaxy M33", "Galaxy Z Fold 4"],
                    OnePlus: ["OnePlus 9", "OnePlus 9 Pro", "OnePlus 10T", "OnePlus Nord 2", "OnePlus Nord CE 2"],
                    Xiaomi: ["Redmi Note 10", "Redmi Note 11", "Mi 11X", "Mi 12 Pro"],
                    Oppo: ["Reno 6", "Reno 7", "F19 Pro", "A74"],
                    Vivo: ["V21", "V23", "Y20", "Y21"],
                    Realme: ["Realme 8", "Realme 9 Pro", "Realme GT Master"],
                    Google: ["Pixel 6", "Pixel 6a", "Pixel 7", "Pixel 7 Pro"],
                    Motorola: ["Moto G60", "Moto Edge 20", "Moto G71"]
                }
            },
            { name: "Storage", type: "select", options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
            { name: "Year", type: "number" },
            { name: "Price", type: "number" }
        ]
    }
};

const SellMobileForm = () => {
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        storage: "",
        year: "",
        price: "",
        title: "",
        description: "",
        images: [],
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "images") {
            const selectedFiles = Array.from(files).slice(0, 5); // max 5 images
            setFormData({ ...formData, images: selectedFiles });
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

            // Prepare FormData for file upload
            const data = new FormData();
            for (let key in formData) {
                if (key === "images") {
                    formData.images.forEach((img) => data.append("images", img));
                } else {
                    data.append(key, formData[key]);
                }
            }

            const storeToken = localStorage.getItem("storeToken"); // your token

            const res = await axios.post("http://localhost:5000/api/create", data, {
                headers: {
                    "x-store-token": storeToken, // custom header
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(res.data.message);
            navigate("/dashboard"); // redirect after success
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to submit ad.");
        } finally {
            setLoading(false);
        }
    };

    const brandOptions = mobileFields["mobile-phones"].fields.find(f => f.name === "Brand").options;
    const modelOptions = formData.brand
        ? mobileFields["mobile-phones"].fields.find(f => f.name === "Model").options[formData.brand]
        : [];
    const storageOptions = mobileFields["mobile-phones"].fields.find(f => f.name === "Storage").options;

    return (
        <div className="w-full mx-auto mt-2 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sell Your Mobile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Brand */}
                <div>
                    <label className="block text-gray-700 mb-1">Brand</label>
                    <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Brand</option>
                        {brandOptions.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                {/* Model */}
                <div>
                    <label className="block text-gray-700 mb-1">Model</label>
                    <select
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={!formData.brand}
                    >
                        <option value="">Select Model</option>
                        {modelOptions && modelOptions.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* Storage */}
                <div>
                    <label className="block text-gray-700 mb-1">Storage</label>
                    <select
                        name="storage"
                        value={formData.storage}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Storage</option>
                        {storageOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {/* Year */}
                <div>
                    <label className="block text-gray-700 mb-1">Year of Purchase</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="e.g., 2022"
                        min="2000"
                        max={new Date().getFullYear()}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-gray-700 mb-1">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter Price"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

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
                        placeholder="Write a brief description about the phone"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>

                {/* Images Upload */}
                <div>
                    <label className="block text-gray-700 mb-1">Upload Images (Max 5)</label>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Listing"}
                </button>
            </form>
        </div>
    );
};

export default SellMobileForm;
