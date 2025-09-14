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
  { title: "Royal Enfield Classic 350", price: 190000, date: "2025-09-07", image: "https://picsum.photos/400/300?random=7", featured: true, location: "Ujjain, Madhya Pradesh" },
  { title: "LG Refrigerator", price: 32000, date: "2025-09-04", image: "https://picsum.photos/400/300?random=8", featured: false, location: "Bhopal, Madhya Pradesh" },
  { title: "Dining Table 6 Seater", price: 28000, date: "2025-09-03", image: "https://picsum.photos/400/300?random=9", featured: true, location: "Indore, Madhya Pradesh" },
  { title: "Apple Watch Series 9", price: 45000, date: "2025-09-02", image: "https://picsum.photos/400/300?random=10", featured: false, location: "Gwalior, Madhya Pradesh" },
  { title: "Yamaha FZ Bike", price: 120000, date: "2025-09-09", image: "https://picsum.photos/400/300?random=11", featured: true, location: "Jabalpur, Madhya Pradesh" },
  { title: "Sony Bravia 55 inch TV", price: 65000, date: "2025-09-06", image: "https://picsum.photos/400/300?random=12", featured: false, location: "Indore, Madhya Pradesh" },
  { title: "MacBook Pro M2", price: 185000, date: "2025-09-13", image: "https://picsum.photos/400/300?random=13", featured: true, location: "Bhopal, Madhya Pradesh" },
  { title: "Hero Splendor Plus", price: 70000, date: "2025-09-10", image: "https://picsum.photos/400/300?random=14", featured: false, location: "Seoni, Madhya Pradesh" },
  { title: "Whirlpool Washing Machine", price: 25000, date: "2025-09-08", image: "https://picsum.photos/400/300?random=15", featured: true, location: "Jabalpur, Madhya Pradesh" },
  { title: "Canon EOS 1500D Camera", price: 42000, date: "2025-09-07", image: "https://picsum.photos/400/300?random=16", featured: false, location: "Indore, Madhya Pradesh" },
  { title: "HP Pavilion Gaming Laptop", price: 95000, date: "2025-09-05", image: "https://picsum.photos/400/300?random=17", featured: true, location: "Bhopal, Madhya Pradesh" },
  { title: "Nike Air Jordans", price: 12000, date: "2025-09-03", image: "https://picsum.photos/400/300?random=18", featured: false, location: "Gwalior, Madhya Pradesh" },
  { title: "Mahindra Scorpio", price: 1450000, date: "2025-09-12", image: "https://picsum.photos/400/300?random=19", featured: true, location: "Indore, Madhya Pradesh" },
  { title: "Xiaomi Mi Pad 6", price: 28000, date: "2025-09-11", image: "https://picsum.photos/400/300?random=20", featured: false, location: "Seoni, Madhya Pradesh" },
  { title: "Tata Nexon EV", price: 1450000, date: "2025-09-14", image: "https://picsum.photos/400/300?random=21", featured: true, location: "Bhopal, Madhya Pradesh" },
  { title: "Wooden Wardrobe", price: 18000, date: "2025-09-02", image: "https://picsum.photos/400/300?random=22", featured: false, location: "Jabalpur, Madhya Pradesh" },
  { title: "Asus ROG Phone 7", price: 89000, date: "2025-09-05", image: "https://picsum.photos/400/300?random=23", featured: true, location: "Indore, Madhya Pradesh" },
  { title: "Honda Activa 6G", price: 85000, date: "2025-09-09", image: "https://picsum.photos/400/300?random=24", featured: false, location: "Ujjain, Madhya Pradesh" },
  { title: "LG Air Conditioner", price: 40000, date: "2025-09-06", image: "https://picsum.photos/400/300?random=25", featured: true, location: "Bhopal, Madhya Pradesh" },
  { title: "Dell Inspiron Laptop", price: 62000, date: "2025-09-08", image: "https://picsum.photos/400/300?random=26", featured: false, location: "Indore, Madhya Pradesh" },
  { title: "Boat Bluetooth Speaker", price: 3500, date: "2025-09-04", image: "https://picsum.photos/400/300?random=27", featured: true, location: "Seoni, Madhya Pradesh" },
  { title: "Hyundai Creta", price: 1150000, date: "2025-09-03", image: "https://picsum.photos/400/300?random=28", featured: false, location: "Gwalior, Madhya Pradesh" },
  { title: "Gaming Chair", price: 15000, date: "2025-09-10", image: "https://picsum.photos/400/300?random=29", featured: true, location: "Indore, Madhya Pradesh" },
  { title: "OnePlus 12", price: 68000, date: "2025-09-12", image: "https://picsum.photos/400/300?random=30", featured: false, location: "Bhopal, Madhya Pradesh" },
  { title: "Sony PlayStation 5", price: 55000, date: "2025-09-07", image: "https://picsum.photos/400/300?random=31", featured: true, location: "Jabalpur, Madhya Pradesh" },
  { title: "Smart LED Bulbs (Pack of 4)", price: 2000, date: "2025-09-01", image: "https://picsum.photos/400/300?random=32", featured: false, location: "Ujjain, Madhya Pradesh" },
  { title: "Fossil Smartwatch", price: 18000, date: "2025-09-13", image: "https://picsum.photos/400/300?random=33", featured: true, location: "Indore, Madhya Pradesh" },
  { title: "Samsung Tablet A9", price: 24000, date: "2025-09-11", image: "https://picsum.photos/400/300?random=34", featured: false, location: "Seoni, Madhya Pradesh" },
  { title: "KTM Duke 390", price: 320000, date: "2025-09-05", image: "https://picsum.photos/400/300?random=35", featured: true, location: "Bhopal, Madhya Pradesh" },
  { title: "Godrej Single Bed", price: 12000, date: "2025-09-08", image: "https://picsum.photos/400/300?random=36", featured: false, location: "Gwalior, Madhya Pradesh" },
  { title: "Mi Soundbar", price: 6000, date: "2025-09-09", image: "https://picsum.photos/400/300?random=37", featured: true, location: "Indore, Madhya Pradesh" },
  { title: "Treadmill Machine", price: 35000, date: "2025-09-06", image: "https://picsum.photos/400/300?random=38", featured: false, location: "Bhopal, Madhya Pradesh" },
  { title: "Oppo Reno 11", price: 36000, date: "2025-09-04", image: "https://picsum.photos/400/300?random=39", featured: true, location: "Seoni, Madhya Pradesh" },
  { title: "Honda CBR 250R", price: 190000, date: "2025-09-03", image: "https://picsum.photos/400/300?random=40", featured: false, location: "Indore, Madhya Pradesh" },
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
          {[...Array(1)].map((_, i) => (
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
