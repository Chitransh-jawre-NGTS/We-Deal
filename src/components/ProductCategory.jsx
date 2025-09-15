import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const categoriesList = [
  "Mobiles",
  "Cars",
  "Furniture",
  "Jobs",
  "Fashion",
  "Electronics",
  "Home Appliances",
  "Sports",
];

// Example products mapped by category
const productsByCategory = {
  mobiles: [
    { title: "iPhone 14 Pro", price: "₹90,000", image: "https://picsum.photos/400/300?random=21" },
    { title: "Samsung Galaxy S23", price: "₹75,000", image: "https://picsum.photos/400/300?random=22" },
    { title: "OnePlus 11", price: "₹55,000", image: "https://picsum.photos/400/300?random=23" },
  ],
  cars: [
    { title: "Maruti Swift", price: "₹5,00,000", image: "https://picsum.photos/400/300?random=31" },
    { title: "Honda City", price: "₹7,50,000", image: "https://picsum.photos/400/300?random=32" },
  ],
  furniture: [
    { title: "Sofa Set", price: "₹15,000", image: "https://picsum.photos/400/300?random=41" },
    { title: "Dining Table", price: "₹20,000", image: "https://picsum.photos/400/300?random=42" },
  ],
};

const CategoryDetails = () => {
  const { category } = useParams();
  const products = productsByCategory[category] || [];

  return (
   <>
   <Navbar />
    <div className="min-h-screen bg-gray-50 font-sans">


      {/* Main Content */}
      <section className="py-8 md:py-16 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="font-bold text-lg mb-4 text-purple-700">Categories</h4>
            <ul className="space-y-2 text-gray-700 text-sm md:text-base">
              {categoriesList.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    to={`/category/${cat.toLowerCase()}`}
                    className="hover:text-purple-600 transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-4 space-y-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.length > 0 ? (
              products.map((item, idx) => (
               <Link to={`/product/${category}/${idx}`}>
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-40 md:h-48 object-cover"
      loading="lazy"
    />
    <div className="p-3 md:p-4">
      <h4 className="text-base md:text-lg font-bold mb-1">{item.title}</h4>
      <p className="text-purple-600 font-semibold text-sm md:text-base">{item.price}</p>
    </div>
  </motion.div>
</Link>
              ))
            ) : (
              <p className="col-span-full text-gray-500">No products found in this category.</p>
            )}
          </div>
        </main>
      </section>
    </div>
    </>
  );
};

export default CategoryDetails;
