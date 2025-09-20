// // src/pages/Store.jsx
// import React from "react";
// import { FaStore, FaClock } from "react-icons/fa";
// import Navbar from "../../components/Navbar";

// const Store = () => {
//   return (
//     <>
//       <Navbar />
//       <div
//         className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')",
//         }}
//       >
//         {/* Gradient Overlay for readability */}
//         <div className="absolute inset-0 bg-black/40"></div>

//         {/* Content */}
//         <div className="relative z-10 bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 max-w-lg w-full transform transition duration-300 hover:scale-105">
//           {/* Icon Section */}
//           <div className="flex justify-center mb-6">
//             <div className="w-24 h-24 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-inner">
//               <FaStore className="text-5xl animate-bounce" />
//             </div>
//           </div>

//           {/* Title */}
//           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
//             Not Serving in Your Area Yet
//           </h1>

//           {/* Subtitle */}
//           <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
//             Don’t worry, we’re expanding quickly 🚀  
//             Soon we’ll be available in your city to serve you better.
//           </p>

//           {/* Coming Soon Button */}
//           <button className="w-full py-3 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
//             <FaClock className="animate-spin-slow" />
//             Coming Soon
//           </button>
//         </div>

//         {/* Footer / Extra Note */}
//         <p className="relative z-10 mt-10 text-white/80 text-sm">
//           📍 Stay tuned for updates in your area.
//         </p>
//       </div>
//     </>
//   );
// };

// export default Store;


// src/pages/Store.jsx



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const carouselImages = [
  "https://picsum.photos/1200/400?random=1",
  "https://picsum.photos/1200/400?random=2",
  "https://picsum.photos/1200/400?random=3",
];

const productsData = {
  mobiles: [
    { id: 1, name: "iPhone 12", price: 45000, image: "https://picsum.photos/300/300?random=11" },
    { id: 2, name: "Samsung Galaxy S21", price: 35000, image: "https://picsum.photos/300/300?random=12" },
    { id: 3, name: "OnePlus 9", price: 30000, image: "https://picsum.photos/300/300?random=13" },
  ],
  bikes: [
    { id: 4, name: "Honda CB Shine", price: 50000, image: "https://picsum.photos/300/300?random=21" },
    { id: 5, name: "Royal Enfield Classic 350", price: 120000, image: "https://picsum.photos/300/300?random=22" },
    { id: 6, name: "Bajaj Pulsar 150", price: 75000, image: "https://picsum.photos/300/300?random=23" },
  ],
  covers: [
    { id: 7, name: "iPhone Cover", price: 499, image: "https://picsum.photos/300/300?random=31" },
    { id: 8, name: "Samsung Cover", price: 399, image: "https://picsum.photos/300/300?random=32" },
    { id: 9, name: "OnePlus Cover", price: 299, image: "https://picsum.photos/300/300?random=33" },
  ],
  featured: [
    { id: 10, name: "Featured Phone", price: 40000, image: "https://picsum.photos/300/300?random=41" },
    { id: 11, name: "Featured Bike", price: 95000, image: "https://picsum.photos/300/300?random=42" },
    { id: 12, name: "Featured Cover", price: 299, image: "https://picsum.photos/300/300?random=43" },
  ],
};

const testimonials = [
  { id: 1, name: "Alice", feedback: "Great store! Found exactly what I needed.", rating: 5 },
  { id: 2, name: "Bob", feedback: "Amazing products and fast delivery.", rating: 4 },
  { id: 3, name: "Charlie", feedback: "Highly recommend this store.", rating: 5 },
];

const Store = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  const renderProducts = (products) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <Link to={`/product/${product.id}`} className="flex justify-center items-center h-48 bg-gray-50 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full object-contain transition-transform hover:scale-105"
            />
          </Link>
          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-lg font-medium text-gray-800 line-clamp-2">{product.name}</h2>
            <p className="text-blue-600 font-semibold text-lg mt-1">₹{product.price.toLocaleString()}</p>
            <Link
              to={`/product/${product.id}`}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm text-center transition"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Carousel */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <img
            src={carouselImages[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Featured Products */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            {renderProducts(productsData.featured)}
          </section>

          {/* Offers / Discounts */}
          <section className="mb-10 bg-blue-50 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-600">Special Offers!</h2>
            <p className="mt-2 text-gray-700">Get flat 20% off on all used mobiles this week!</p>
            <Link
              to="/store"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>
          </section>

          {/* Product Sections */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800">Used Mobiles</h2>
            {renderProducts(productsData.mobiles)}
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800">Used Bikes</h2>
            {renderProducts(productsData.bikes)}
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800">Mobile Covers</h2>
            {renderProducts(productsData.covers)}
          </section>

          {/* Customer Testimonials */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                  <div className="flex items-center mb-2">
                    {[...Array(t.rating)].map((_, idx) => (
                      <FaStar key={idx} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-2">"{t.feedback}"</p>
                  <p className="text-gray-900 font-semibold">- {t.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="mb-10 bg-gray-100 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">Subscribe to Our Newsletter</h2>
            <p className="text-gray-700 mt-2">Get updates on latest products and offers.</p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 flex-1"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Store;
