import React from "react";
import { Clock, Heart, Store, CheckCircle, XCircle } from "lucide-react";


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
  return (
    <div className="max-h-screen bg-white pt-4  pb-40 md:pt-24 md:pb-10 px-4 md:px-6 max-w-[1400px] mx-auto">
      {/* <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-gray-800">
        My Listings
      </h1> */}

      <div className="space-y-6">
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
                <p className="text-gray-800 font-semibold text-lg">
                  {product.name}
                </p>
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

            

            {/* Likes */}
            {/* <div className="flex items-center gap-2 text-gray-700">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-medium">{product.likes}</span>
            </div> */}

            {/* Action Button */}
            {/* <button
              className={`px-5 py-2.5 rounded-md text-white font-medium transition w-full md:w-auto ${
                product.status === "Active"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.status !== "Active"}
            >
              Manage
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellProducts;
