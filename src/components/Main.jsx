import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

// Sample items with date
const featuredItemsData = [
  { title: "iPhone 14 Pro", price: 90000, date: "2025-09-10", image: "https://picsum.photos/400/300?random=1", featured: true, location: "Seoni, Madhya Pradesh" },
  { title: "Maruti Swift", price: 500000, date: "2025-09-08", image: "https://picsum.photos/400/300?random=2", featured: false, location: "Indore, Madhya Pradesh" },
  { title: "Sofa Set", price: 15000, date: "2025-09-05", image: "https://picsum.photos/400/300?random=3", featured: true, location: "Bhopal, Madhya Pradesh" },
  { title: "Laptop Dell XPS", price: 120000, date: "2025-09-12", image: "https://picsum.photos/400/300?random=4", featured: false, location: "Jabalpur, Madhya Pradesh" },
  { title: "Samsung Galaxy S23", price: 75000, date: "2025-09-01", image: "https://picsum.photos/400/300?random=5", featured: false, location: "Seoni, Madhya Pradesh" },
  { title: "Honda City", price: 750000, date: "2025-09-11", image: "https://picsum.photos/400/300?random=6", featured: true, location: "Indore, Madhya Pradesh" },
];

const ListingsPage = () => {
  const [sortOption, setSortOption] = useState("");
  const [featuredItems, setFeaturedItems] = useState(featuredItemsData);

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sortedItems = [...featuredItems];

    if (option === "priceLowHigh") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighLow") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (option === "dateNewOld") {
      sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "dateOldNew") {
      sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFeaturedItems(sortedItems);
  };

  return (
    <section className="py-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
        {/* 🔹 Filter Bar */}
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-bold text-lg text-purple-700 mb-3">Sort Products</h4>
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="dateNewOld">Date: New to Old</option>
            <option value="dateOldNew">Date: Old to New</option>
          </select>
        </div>

        {/* Sponsored Ads */}
        <div className="bg-white hidden lg:block rounded-xl shadow p-4 space-y-3">
          <h4 className="font-bold text-lg text-purple-700">Sponsored Ads</h4>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 h-32 md:h-40 flex items-center justify-center text-gray-500 rounded-lg text-sm md:text-base"
            >
              Google Ad Space
            </div>
          ))}
        </div>
      </aside>

      {/* Listings */}
      <main className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
          {featuredItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="relative bg-white border p-2 border-purple-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform">
                {item.featured && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                <FaHeart className="absolute top-5 right-3 text-white border-gray-500 text-lg cursor-pointer" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 md:h-48 object-cover"
                  loading="lazy"
                />
                <div className=" md:p-4">
                  <h4 className="text-base md:text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-purple-600 font-semibold text-sm md:text-base">₹{item.price.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm mb-1">{item.location}</p>
                  <p className="text-gray-400 text-xs">Published: {item.date}</p>
                </div>
              </div>

              {(idx + 1) % 6 === 0 && (
                <div className="col-span-full w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 text-lg md:text-xl font-semibold">
                  Advertisement Banner
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </section>
  );
};

export default ListingsPage;
