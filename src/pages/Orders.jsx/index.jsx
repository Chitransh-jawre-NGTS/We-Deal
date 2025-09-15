import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";

const products = [
  {
    id: "P12345",
    name: "iPhone 14 Pro",
    status: "Active",
    timeline: "20 days left",
    likes: 145,
    image: "https://picsum.photos/seed/iphone14/150/100",
  },
  {
    id: "P12346",
    name: "Maruti Swift 2020",
    status: "Deactive",
    timeline: "Expired",
    likes: 78,
    image: "https://picsum.photos/seed/swift2020/150/100",
  },
  {
    id: "P12347",
    name: "Samsung Galaxy S23",
    status: "Active",
    timeline: "15 days left",
    likes: 89,
    image: "https://picsum.photos/seed/galaxyS23/150/100",
  },
  {
    id: "P12348",
    name: "Royal Enfield Classic 350",
    status: "Deactive",
    timeline: "Expired",
    likes: 120,
    image: "https://picsum.photos/seed/royalenfield/150/100",
  },
  {
    id: "P12349",
    name: "Dell XPS 15 Laptop",
    status: "Active",
    timeline: "30 days left",
    likes: 65,
    image: "https://picsum.photos/seed/dellxps/150/100",
  },
  {
    id: "P12350",
    name: "Honda City 2022",
    status: "Deactive",
    timeline: "Expired",
    likes: 102,
    image: "https://picsum.photos/seed/hondacity/150/100",
  },
];

const SellProducts = () => {
  const navigate = useNavigate();

  return (
    <div className="max-h-screen bg-white pt-4 pb-40 md:pt-24 md:pb-10 px-4 md:px-6 max-w-[1400px] mx-auto">

      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-6 bg-white shadow-md p-3  fixed w-full left-0 top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">My Listings</h1>
      </div>

      {/* Product List */}
      <div className="space-y-6 mt-15">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white p-5 rounded-xl border border-blue-300 shadow-md hover:shadow-lg transition flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${
              product.status === "Deactive" ? "opacity-70 grayscale" : ""
            }`}
          >
            {/* Image + Info */}
            <div className="flex items-center gap-4 flex-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-20 rounded-lg object-cover border border-blue-300"
              />
              <div>
                <p className="text-gray-800 font-semibold text-lg">{product.name}</p>
                <p className="text-gray-500 text-sm">ID: {product.id}</p>
                {/* Status + Timeline */}
                <div className="flex flex-col items-start md:items-center">
                  <p
                    className={`flex items-center gap-1 font-medium ${
                      product.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {product.status === "Active" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {product.status}
                  </p>
                  <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <Clock className="w-4 h-4" /> {product.timeline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellProducts;
